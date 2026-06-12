/**
 * LSP Service
 *
 * Manages Language Server Protocol sessions for workspace containers.
 *
 * ARCHITECTURE:
 *
 *   Browser Monaco ──── Socket.IO lsp:message ────► API Server
 *                                                       │
 *                                          LspService.send(workspaceId, msg)
 *                                                       │
 *                                         docker exec → LSP process stdin
 *                                                       │
 *                                         LSP stdout → response queue
 *                                                       │
 *                                      Socket.IO lsp:message ──────► Monaco
 *
 * ONE SESSION PER WORKSPACE:
 *   Each workspace gets one LSP process per language.
 *   Sessions are shared across all operators in the workspace —
 *   everyone benefits from the same warm symbol index.
 *
 * SUPPORTED LANGUAGE SERVERS:
 *   - pyright (Python) — `pyright-langserver --stdio`
 *   - typescript-language-server (JS/TS) — `typescript-language-server --stdio`
 *   - bash-language-server (shell) — `bash-language-server start`
 *
 * TRANSPORT:
 *   LSP uses JSON-RPC over stdin/stdout with Content-Length headers.
 *   We bridge this over a Docker exec stream to the workspace container.
 *
 * LIFECYCLE:
 *   1. Client sends `lsp:start { language }` → LspService.start()
 *   2. Docker exec into container, spawn LSP server
 *   3. Client sends LSP messages → LspService.send() → LSP stdin
 *   4. LSP stdout → parse Content-Length frames → emit lsp:message to client
 *   5. Client sends `lsp:stop` or disconnects → LspService.stop()
 *
 * JSON-RPC FRAMING:
 *   LSP messages are framed with HTTP-like headers:
 *     Content-Length: 123\r\n
 *     \r\n
 *     { "jsonrpc": "2.0", "id": 1, "method": "initialize", ... }
 */

import Docker from 'dockerode';
import { EventEmitter } from 'node:events';

const docker = new Docker();

export type SupportedLanguage = 'python' | 'typescript' | 'javascript' | 'bash' | 'json' | 'markdown';

const LSP_COMMANDS: Record<SupportedLanguage, string[]> = {
  python:     ['pyright-langserver', '--stdio'],
  typescript: ['typescript-language-server', '--stdio'],
  javascript: ['typescript-language-server', '--stdio'],
  bash:       ['bash-language-server', 'start'],
  json:       ['vscode-json-languageserver', '--stdio'],
  markdown:   ['unified-language-server', '--parser=remark', '--stdio'],
};

interface LspSession {
  language:    SupportedLanguage;
  workspaceId: string;
  stream:      NodeJS.ReadWriteStream;
  emitter:     EventEmitter;
  refCount:    number;
  /** Accumulation buffer for Content-Length framing */
  readBuffer:  Buffer;
}

/** sessionKey = `${workspaceId}:${language}` */
const sessions = new Map<string, LspSession>();

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Start an LSP session for a workspace+language pair.
 * If a session already exists, increments refCount and returns the emitter.
 *
 * @returns EventEmitter that fires 'message' events with JSON-RPC objects
 */
export async function startLsp(
  workspaceId: string,
  language: SupportedLanguage,
): Promise<EventEmitter> {
  const key = sessionKey(workspaceId, language);

  if (sessions.has(key)) {
    const session = sessions.get(key)!;
    session.refCount++;
    return session.emitter;
  }

  const cmd = LSP_COMMANDS[language];
  if (!cmd) throw new Error(`No LSP configured for language: ${language}`);

  const containerName = `forbidden-ws-${workspaceId}`;
  const container = docker.getContainer(containerName);

  // Verify container is running before attempting exec
  const info = await container.inspect();
  if (!info.State.Running) {
    throw new Error(`Container ${containerName} is not running. Start terminal first.`);
  }

  const exec = await container.exec({
    Cmd: cmd,
    Tty: false,           // LSP requires raw binary, not TTY
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: false,  // LSP errors on stderr are noise; suppress
  });

  const stream = await exec.start({ hijack: true, stdin: true });
  const emitter = new EventEmitter();

  const session: LspSession = {
    language,
    workspaceId,
    stream,
    emitter,
    refCount: 1,
    readBuffer: Buffer.alloc(0),
  };

  sessions.set(key, session);

  // Wire up the JSON-RPC content-length frame parser
  stream.on('data', (chunk: Buffer) => {
    session.readBuffer = Buffer.concat([session.readBuffer, chunk]);
    parseFrames(session);
  });

  stream.on('close', () => {
    emitter.emit('close');
    sessions.delete(key);
    console.log(`[lsp] Session closed: ${key}`);
  });

  stream.on('error', (err) => {
    emitter.emit('error', err);
    sessions.delete(key);
  });

  console.log(`[lsp] Session started: ${key} (${cmd.join(' ')})`);
  return emitter;
}

/**
 * Send a JSON-RPC message to the LSP process.
 * Frames the message with the Content-Length header before writing to stdin.
 */
export function sendLsp(
  workspaceId: string,
  language: SupportedLanguage,
  message: Record<string, unknown>,
): void {
  const key = sessionKey(workspaceId, language);
  const session = sessions.get(key);
  if (!session) throw new Error(`No active LSP session for ${key}`);

  const body = JSON.stringify(message);
  const header = `Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n`;
  session.stream.write(header + body);
}

/**
 * Release a reference to an LSP session.
 * When refCount reaches 0, the LSP process is terminated.
 */
export async function stopLsp(
  workspaceId: string,
  language: SupportedLanguage,
): Promise<void> {
  const key = sessionKey(workspaceId, language);
  const session = sessions.get(key);
  if (!session) return;

  session.refCount--;

  if (session.refCount <= 0) {
    try {
      // Send LSP shutdown sequence
      sendLsp(workspaceId, language, { jsonrpc: '2.0', id: 9999, method: 'shutdown', params: null });
      sendLsp(workspaceId, language, { jsonrpc: '2.0', method: 'exit', params: null });
      // Give the LSP server 1 second to exit cleanly before closing the stream
      setTimeout(() => session.stream.destroy?.(), 1_000);
    } catch {
      session.stream.destroy?.();
    }
    sessions.delete(key);
    console.log(`[lsp] Session terminated: ${key}`);
  }
}

/**
 * Stop all LSP sessions for a workspace (called when workspace container is destroyed).
 */
export async function stopAllLsp(workspaceId: string): Promise<void> {
  const toStop = [...sessions.keys()].filter(k => k.startsWith(`${workspaceId}:`));
  for (const key of toStop) {
    const [ws, lang] = key.split(':');
    await stopLsp(ws, lang as SupportedLanguage).catch(() => {});
  }
}

/**
 * List active LSP sessions. Used by the health endpoint.
 */
export function listLspSessions(): Array<{ key: string; language: string; refCount: number }> {
  return [...sessions.entries()].map(([key, s]) => ({
    key,
    language: s.language,
    refCount: s.refCount,
  }));
}

// ─── Internal ─────────────────────────────────────────────────────────────────

function sessionKey(workspaceId: string, language: SupportedLanguage): string {
  return `${workspaceId}:${language}`;
}

/**
 * Parse Content-Length framed JSON-RPC messages from the accumulation buffer.
 * May extract 0, 1, or multiple complete messages per call.
 */
function parseFrames(session: LspSession): void {
  while (true) {
    const buf = session.readBuffer;
    const headerEnd = buf.indexOf('\r\n\r\n');
    if (headerEnd === -1) break;

    const headerStr = buf.slice(0, headerEnd).toString('utf8');
    const match = headerStr.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      // Malformed frame — discard and reset
      session.readBuffer = Buffer.alloc(0);
      break;
    }

    const contentLength = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4; // skip \r\n\r\n
    const bodyEnd = bodyStart + contentLength;

    if (buf.length < bodyEnd) break; // incomplete frame — wait for more data

    const body = buf.slice(bodyStart, bodyEnd).toString('utf8');
    session.readBuffer = buf.slice(bodyEnd);

    try {
      const message = JSON.parse(body);
      session.emitter.emit('message', message);
    } catch {
      // Malformed JSON from LSP — log and continue
      console.warn('[lsp] Malformed JSON-RPC body, discarding frame');
    }
  }
}
