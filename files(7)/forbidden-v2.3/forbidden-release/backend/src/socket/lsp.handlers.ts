/**
 * LSP Socket Handlers
 *
 * Bridges Monaco Language Client (browser) to LSP servers running inside
 * workspace Docker containers via the LspService.
 *
 * SOCKET EVENTS (client → server):
 *   lsp:start   { language }              — Start or join an LSP session
 *   lsp:message { language, message }     — Forward a JSON-RPC message to LSP
 *   lsp:stop    { language }              — Release session reference
 *
 * SOCKET EVENTS (server → client):
 *   lsp:message { language, message }     — JSON-RPC response/notification from LSP
 *   lsp:ready   { language }              — LSP session is active, client can send
 *   lsp:error   { language, error }       — LSP session error
 *   lsp:closed  { language }              — LSP process exited
 *
 * MULTI-OPERATOR SESSIONS:
 *   Multiple operators can share one LSP process via refCounting in LspService.
 *   Each operator joins a Socket.IO room `lsp:{workspaceId}:{language}` so that
 *   LSP notifications (diagnostics, etc.) broadcast to all active editors.
 *
 *   However, request/response pairs must be routed back only to the requesting
 *   operator. We achieve this by stamping each outgoing request with the
 *   socket.id and filtering responses by id prefix.
 *
 * MESSAGE ID NAMESPACING:
 *   LSP JSON-RPC IDs are namespaced with the socket short-id to ensure
 *   responses route back to the correct operator in multi-user sessions:
 *
 *     Original client id: 42
 *     Sent to LSP:        "sktAbc:42"
 *     Response from LSP:  { id: "sktAbc:42", result: ... }
 *     Routed back to:     socket sktAbc
 */

import type { Socket, Server } from 'socket.io';
import { z } from 'zod';
import {
  startLsp,
  sendLsp,
  stopLsp,
  type SupportedLanguage,
} from '@/services/lsp.service';

// ─── Validation ───────────────────────────────────────────────────────────────

const SUPPORTED_LANGUAGES = ['python', 'typescript', 'javascript', 'bash', 'json', 'markdown'] as const;

const StartSchema = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
});

const MessageSchema = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
  message:  z.record(z.unknown()),
});

const StopSchema = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
});

// ─── Handler Registration ─────────────────────────────────────────────────────

export function registerLspHandlers(socket: Socket, io: Server) {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };

  // Track which language sessions this socket has joined
  const activeSessions = new Set<SupportedLanguage>();

  // Short socket id prefix for message namespacing (8 chars)
  const sockPrefix = socket.id.slice(0, 8);

  // ── lsp:start ─────────────────────────────────────────────────────────────

  socket.on('lsp:start', async (raw: unknown, ack?: Function) => {
    try {
      const { language } = StartSchema.parse(raw);
      const lspRoom = `lsp:${workspaceId}:${language}`;

      if (activeSessions.has(language)) {
        // Already joined — just confirm ready
        ack?.({ ok: true, already: true });
        return;
      }

      const emitter = await startLsp(workspaceId, language);
      activeSessions.add(language);
      await socket.join(lspRoom);

      // Route LSP responses and notifications to the correct room
      emitter.on('message', (message: Record<string, unknown>) => {
        const msgId = message['id'] as string | undefined;

        if (msgId && typeof msgId === 'string' && msgId.startsWith(sockPrefix + ':')) {
          // Response to a specific operator's request — send only to them
          const originalId = parseInt(msgId.split(':')[1], 10);
          socket.emit('lsp:message', { language, message: { ...message, id: originalId } });
        } else {
          // Notification (diagnostics, etc.) — broadcast to all editors of this language
          io.to(lspRoom).emit('lsp:message', { language, message });
        }
      });

      emitter.once('close', () => {
        io.to(lspRoom).emit('lsp:closed', { language });
        activeSessions.delete(language);
      });

      emitter.on('error', (err: Error) => {
        socket.emit('lsp:error', { language, error: err.message });
      });

      socket.emit('lsp:ready', { language });
      ack?.({ ok: true });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  // ── lsp:message ───────────────────────────────────────────────────────────

  socket.on('lsp:message', (raw: unknown) => {
    try {
      const { language, message } = MessageSchema.parse(raw);

      if (!activeSessions.has(language)) {
        socket.emit('lsp:error', { language, error: 'Session not started. Send lsp:start first.' });
        return;
      }

      // Namespace the message ID with the socket prefix
      const outMessage = { ...message };
      if (outMessage['id'] !== undefined && outMessage['id'] !== null) {
        outMessage['id'] = `${sockPrefix}:${outMessage['id']}`;
      }

      sendLsp(workspaceId, language, outMessage);
    } catch {
      // Malformed message — silently drop (LSP client will timeout and retry)
    }
  });

  // ── lsp:stop ──────────────────────────────────────────────────────────────

  socket.on('lsp:stop', async (raw: unknown) => {
    try {
      const { language } = StopSchema.parse(raw);
      if (!activeSessions.has(language)) return;

      activeSessions.delete(language);
      await socket.leave(`lsp:${workspaceId}:${language}`);
      await stopLsp(workspaceId, language);
    } catch {}
  });

  // ── Disconnect cleanup ────────────────────────────────────────────────────

  socket.on('disconnect', async () => {
    for (const language of activeSessions) {
      await stopLsp(workspaceId, language).catch(() => {});
    }
    activeSessions.clear();
  });
}
