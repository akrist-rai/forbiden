/**
 * Terminal Handlers (Phase 5 revision)
 *
 * PTY bridge between the browser (xterm.js) and the workspace Docker container.
 *
 * CHANGES IN PHASE 5:
 *   Added PTY output recording. Terminal stdout is now buffered and periodically
 *   flushed to the `ptyoutputs` MongoDB collection for session replay and debugging.
 *
 *   Two BullMQ jobs are used:
 *   - pty-output queue: persists output chunks asynchronously (does not block the PTY stream)
 *
 * OUTPUT RECORDING STRATEGY:
 *   Raw PTY output is noisy — cursor movements, ANSI escapes, shell prompts.
 *   We buffer output in RAM, flush every PTY_OUTPUT_FLUSH_INTERVAL_MS (5s),
 *   or immediately when the buffer exceeds PTY_OUTPUT_MAX_BYTES (32KB).
 *   Identical consecutive flushes are skipped (shell prompt repetition suppression).
 */

import type { Socket, Server } from 'socket.io';
import type Docker from 'dockerode';
import { z } from 'zod';
import {
  PtyAuditEntry,
  classifyInput,
  sanitiseInput,
} from '@/models/pty-audit.model';
import { PtyOutput, cleanPtyOutput, hashPtyOutput, PTY_OUTPUT_MAX_BYTES, PTY_OUTPUT_FLUSH_INTERVAL_MS } from '@/models/pty-output.model';
import { touchContainer } from '@/services/container.service';

let docker: Docker | null = null;

async function getDocker(): Promise<Docker> {
  if (!docker) {
    const mod = await import('dockerode');
    docker = new mod.default();
  }
  return docker;
}

interface TermSession {
  stream:         NodeJS.ReadWriteStream;
  lineBuffer:     string;
  flushTimer:     ReturnType<typeof setTimeout> | null;
  // Output recording state
  outputBuffer:   Buffer[];
  outputFlushTimer: ReturnType<typeof setTimeout> | null;
  outputSeq:      number;
  lastOutputHash: string | null;
  operatorId:     string;
  workspaceId:    string;
}

const sessions = new Map<string, TermSession>();
const AUDIT_FLUSH_MS = 30_000;

export function registerTerminalHandlers(socket: Socket, _io: Server) {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };
  const operatorId = (socket.data.operator as { sub: string }).sub;

  socket.on('terminal:open', async (raw, ack) => {
    try {
      z.object({ workspaceId: z.string() }).parse({ workspaceId });

      const docker = await getDocker();
      const containerName = `forbidden-ws-${workspaceId}`;
      let container: Docker.Container;

      try {
        container = docker.getContainer(containerName);
        await container.inspect();
      } catch {
        container = await docker.createContainer({
          name: containerName,
          Image: 'forbidden/runtime:latest',
          Tty: true,
          AttachStdin: true,
          AttachStdout: true,
          AttachStderr: true,
          HostConfig: {
            Memory:   512 * 1024 * 1024,
            CpuQuota: 50_000,
            CapDrop:  ['ALL'],
            SecurityOpt: ['no-new-privileges'],
          },
        });
        await container.start();
      }

      const exec = await container.exec({
        Cmd: ['/bin/zsh'],
        Tty: true,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
      });

      const stream = await exec.start({ hijack: true, stdin: true });

      const session: TermSession = {
        stream,
        lineBuffer:       '',
        flushTimer:       null,
        outputBuffer:     [],
        outputFlushTimer: null,
        outputSeq:        0,
        lastOutputHash:   null,
        operatorId,
        workspaceId,
      };
      sessions.set(socket.id, session);

      // Forward output to browser AND buffer for recording
      stream.on('data', (chunk: Buffer) => {
        socket.emit('terminal:output', chunk.toString());

        // Accumulate for recording
        session.outputBuffer.push(chunk);
        const totalLen = session.outputBuffer.reduce((acc, b) => acc + b.length, 0);

        if (totalLen >= PTY_OUTPUT_MAX_BYTES) {
          flushOutput(session, socket.id);
        } else {
          scheduleOutputFlush(session, socket.id);
        }
      });

      stream.on('close', () => {
        socket.emit('terminal:closed');
        const s = sessions.get(socket.id);
        if (s) {
          if (s.lineBuffer)     flushAudit(s, socket.id, true);
          if (s.outputBuffer.length) flushOutput(s, socket.id);
        }
        sessions.delete(socket.id);
      });

      touchContainer(workspaceId).catch(() => {});
      ack?.({ ok: true });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  socket.on('terminal:input', (input: string) => {
    const session = sessions.get(socket.id);
    if (!session) return;

    session.stream.write(input);
    touchContainer(workspaceId).catch(() => {});

    const sanitised = sanitiseInput(input);
    if (!sanitised) return;

    session.lineBuffer += sanitised;

    if (sanitised.endsWith('\r') || sanitised.endsWith('\n') || sanitised.endsWith('\r\n')) {
      flushAudit(session, socket.id, false);
    } else {
      scheduleFlush(session, socket.id);
    }
  });

  socket.on('terminal:resize', ({ cols, rows }: { cols: number; rows: number }) => {
    const stream = sessions.get(socket.id)?.stream;
    if (stream && 'setWindow' in stream) {
      (stream as unknown as { setWindow: (rows: number, cols: number) => void }).setWindow(rows, cols);
    }
  });

  socket.on('disconnect', () => {
    const session = sessions.get(socket.id);
    if (session) {
      if (session.lineBuffer) flushAudit(session, socket.id, true);
      if (session.outputBuffer.length) flushOutput(session, socket.id);
      session.stream.end();
      sessions.delete(socket.id);
    }
  });
}

// ─── Input audit helpers ──────────────────────────────────────────────────────

function scheduleFlush(session: TermSession, socketId: string): void {
  if (session.flushTimer) clearTimeout(session.flushTimer);
  session.flushTimer = setTimeout(() => flushAudit(session, socketId, true), AUDIT_FLUSH_MS);
}

function flushAudit(session: TermSession, socketId: string, partial: boolean): void {
  if (session.flushTimer) { clearTimeout(session.flushTimer); session.flushTimer = null; }
  const raw = session.lineBuffer.trim();
  session.lineBuffer = '';
  if (!raw) return;

  const { category: autoCategory, command, ctrlName } = classifyInput(raw);
  const category = partial && autoCategory === 'partial' ? 'partial' : autoCategory;

  PtyAuditEntry.create({
    workspaceId: session.workspaceId,
    operatorId:  session.operatorId,
    sessionId:   socketId,
    rawInput:    raw,
    command,
    category,
    ctrlName,
    length:      raw.length,
  }).catch(err => console.warn('[pty-audit] Write failed:', err.message));
}

// ─── Output recording helpers ─────────────────────────────────────────────────

function scheduleOutputFlush(session: TermSession, socketId: string): void {
  if (session.outputFlushTimer) return; // already scheduled
  session.outputFlushTimer = setTimeout(
    () => flushOutput(session, socketId),
    PTY_OUTPUT_FLUSH_INTERVAL_MS,
  );
}

function flushOutput(session: TermSession, socketId: string): void {
  if (session.outputFlushTimer) { clearTimeout(session.outputFlushTimer); session.outputFlushTimer = null; }
  if (!session.outputBuffer.length) return;

  const raw = Buffer.concat(session.outputBuffer);
  session.outputBuffer = [];

  // Skip if this chunk is identical to the last (suppresses repeated prompts)
  const hash = hashPtyOutput(raw);
  if (hash === session.lastOutputHash) return;
  session.lastOutputHash = hash;

  const seq = ++session.outputSeq;
  const clean = cleanPtyOutput(raw);

  PtyOutput.create({
    workspaceId: session.workspaceId,
    operatorId:  session.operatorId,
    sessionId:   socketId,
    seq,
    content:     clean,
    length:      raw.length,
  }).catch(err => console.warn('[pty-output] Write failed:', err.message));
}
