/**
 * CRDT Socket Handlers
 *
 * Implements the Yjs synchronisation protocol over Socket.IO for collaborative
 * code editing. Each graph node has its own independent YDoc.
 *
 * ── SYNC PROTOCOL ────────────────────────────────────────────────────────────
 *
 *   Client                           Server
 *   ──────                           ──────
 *   crdt:join { nodeId }  ──────────►  Load/create YDoc
 *                         ◄──────────  crdt:sync-step-1 { stateVector }
 *   crdt:sync-step-2      ──────────►  Apply missing updates to server YDoc
 *   { nodeId, update }    ◄──────────  crdt:sync-step-2 { update }  (server → client)
 *
 *   After initial sync, incremental updates flow bidirectionally:
 *
 *   crdt:update           ──────────►  Apply update + broadcast to room
 *   { nodeId, update }    ◄──────────  crdt:update { nodeId, update } (other clients)
 *
 * ── AWARENESS ────────────────────────────────────────────────────────────────
 *
 *   crdt:awareness        ──────────►  Store in Redis (30s TTL)
 *   { nodeId, cursor,     ◄──────────  crdt:awareness (broadcast to room)
 *     selection, ... }
 *
 *   crdt:awareness-request ─────────►  Load all awareness from Redis
 *                          ◄─────────  crdt:awareness-init [ ...states ]
 *
 * ── ROOM NAMING ──────────────────────────────────────────────────────────────
 *
 *   `workspace:{workspaceId}`     — all operators in the workspace
 *   `crdt:{workspaceId}:{nodeId}` — operators editing a specific node
 *
 *   Joining a node CRDT room is separate from the workspace room so that
 *   update broadcasts only reach clients who have that node open.
 *
 * ── UPDATE ENCODING ──────────────────────────────────────────────────────────
 *
 *   Binary Yjs updates are sent as Base64-encoded strings over JSON Socket.IO
 *   because Socket.IO in polling mode does not support raw binary payloads
 *   reliably across all client versions.
 *
 *   Encoding:  Buffer.from(update).toString('base64')
 *   Decoding:  Buffer.from(b64str, 'base64')
 */

import type { Socket, Server } from 'socket.io';
import { z } from 'zod';
import * as YDocService from '@/services/ydoc.service';
import {
  setAwareness,
  removeAwareness,
  getWorkspaceAwareness,
  type AwarenessState,
} from '@/services/awareness.service';
import { touchContainer } from '@/services/container.service';

// ─── Validation schemas ───────────────────────────────────────────────────────

const JoinSchema = z.object({
  nodeId: z.string().min(1),
});

const SyncStep2Schema = z.object({
  nodeId: z.string().min(1),
  /** Base64-encoded Yjs binary update */
  update: z.string().min(1),
});

const UpdateSchema = z.object({
  nodeId: z.string().min(1),
  update: z.string().min(1),
});

const AwarenessSchema = z.object({
  nodeId:    z.string().nullable(),
  cursor:    z.object({ line: z.number(), column: z.number() }).nullable().optional(),
  selection: z.object({
    anchor: z.object({ line: z.number(), column: z.number() }),
    head:   z.object({ line: z.number(), column: z.number() }),
  }).nullable().optional(),
});

// ─── Handler registration ─────────────────────────────────────────────────────

export function registerCrdtHandlers(socket: Socket, io: Server) {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };
  const operator = socket.data.operator as {
    sub: string;
    username: string;
    avatarIndex: number;
    accentColor: string;
  };
  const operatorId = operator.sub;

  // Track which nodes this socket has joined (for cleanup on disconnect)
  const joinedNodes = new Set<string>();

  // ── crdt:join ─────────────────────────────────────────────────────────────
  //
  // Client opens a node in the editor. Server sends sync-step-1 so the client
  // can send back any updates it has that the server doesn't.

  socket.on('crdt:join', async (raw: unknown, ack?: Function) => {
    try {
      const { nodeId } = JoinSchema.parse(raw);

      // Load or create the YDoc (seeded from node.code if no prior CRDT state)
      await YDocService.getOrCreateDoc(workspaceId, nodeId);
      joinedNodes.add(nodeId);

      // Join the node-specific CRDT room
      const crdtRoom = `crdt:${workspaceId}:${nodeId}`;
      await socket.join(crdtRoom);

      // Send sync-step-1: our current state vector
      // Client will respond with sync-step-2 containing any updates we're missing
      const stateVector = YDocService.encodeStateVector(workspaceId, nodeId);
      socket.emit('crdt:sync-step-1', {
        nodeId,
        stateVector: stateVector ? Buffer.from(stateVector).toString('base64') : null,
      });

      // Touch container activity
      touchContainer(workspaceId).catch(() => {});

      ack?.({ ok: true });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  // ── crdt:sync-step-2 ──────────────────────────────────────────────────────
  //
  // Client sends updates it has that the server doesn't (response to step-1).
  // Server applies them and sends back its own full state for the client to merge.

  socket.on('crdt:sync-step-2', async (raw: unknown, ack?: Function) => {
    try {
      const { nodeId, update: b64 } = SyncStep2Schema.parse(raw);
      const clientUpdate = Buffer.from(b64, 'base64');

      // Apply what the client has that we don't
      YDocService.applyUpdate(workspaceId, nodeId, clientUpdate);

      // Send back everything we have that the client sent us a state vector for
      // In practice: the full current doc so the client converges completely
      const serverUpdate = YDocService.encodeStateAsUpdate(workspaceId, nodeId);
      if (serverUpdate) {
        socket.emit('crdt:sync-step-2', {
          nodeId,
          update: Buffer.from(serverUpdate).toString('base64'),
        });
      }

      // Broadcast the incoming update to other editors of this node
      const crdtRoom = `crdt:${workspaceId}:${nodeId}`;
      socket.to(crdtRoom).emit('crdt:update', {
        nodeId,
        update: b64,
        operatorId,
      });

      ack?.({ ok: true });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  // ── crdt:update ───────────────────────────────────────────────────────────
  //
  // Incremental update from an active editor. Server applies it and broadcasts
  // to all other editors of the same node (NOT back to sender).

  socket.on('crdt:update', async (raw: unknown) => {
    try {
      const { nodeId, update: b64 } = UpdateSchema.parse(raw);
      const update = Buffer.from(b64, 'base64');

      YDocService.applyUpdate(workspaceId, nodeId, update);

      const crdtRoom = `crdt:${workspaceId}:${nodeId}`;
      socket.to(crdtRoom).emit('crdt:update', {
        nodeId,
        update: b64,
        operatorId,
      });

      touchContainer(workspaceId).catch(() => {});
    } catch {
      // Malformed updates are silently dropped — CRDT will converge regardless
    }
  });

  // ── crdt:awareness ────────────────────────────────────────────────────────
  //
  // Cursor position / selection / focus update. Stored in Redis, broadcast to room.

  socket.on('crdt:awareness', async (raw: unknown) => {
    try {
      const data = AwarenessSchema.parse(raw);

      const state: AwarenessState = {
        operatorId,
        name:        operator.username ?? operatorId,
        avatarIndex: operator.avatarIndex ?? 0,
        accentColor: operator.accentColor ?? '#10b981',
        nodeId:      data.nodeId,
        cursor:      data.cursor ?? null,
        selection:   data.selection ?? null,
        ts:          Date.now(),
      };

      await setAwareness(workspaceId, state);

      // Broadcast to all other operators in the workspace (not just the node room)
      // so the workspace graph view can show who's editing what
      socket.to(`workspace:${workspaceId}`).emit('crdt:awareness', state);
    } catch {
      // Awareness is best-effort
    }
  });

  // ── crdt:awareness-request ────────────────────────────────────────────────
  //
  // Late-joining client asks for current awareness state of all operators.

  socket.on('crdt:awareness-request', async (_raw: unknown, ack?: Function) => {
    try {
      const states = await getWorkspaceAwareness(workspaceId);
      ack?.({ ok: true, awareness: states });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  // ── crdt:leave ────────────────────────────────────────────────────────────
  //
  // Explicit leave (tab closed, file switched). Releases the doc reference
  // so it can be flushed and evicted when no other editors remain.

  socket.on('crdt:leave', async (raw: unknown) => {
    try {
      const { nodeId } = JoinSchema.parse(raw);
      if (!joinedNodes.has(nodeId)) return;

      joinedNodes.delete(nodeId);
      await socket.leave(`crdt:${workspaceId}:${nodeId}`);
      await YDocService.releaseDoc(workspaceId, nodeId);
    } catch {}
  });

  // ── Disconnect cleanup ────────────────────────────────────────────────────

  socket.on('disconnect', async () => {
    await removeAwareness(workspaceId, operatorId);

    // Broadcast null awareness so other clients remove this operator's cursor
    io.to(`workspace:${workspaceId}`).emit('crdt:awareness', {
      operatorId,
      name: null,
      nodeId: null,
      cursor: null,
      selection: null,
      ts: Date.now(),
    });

    // Release all docs this socket had open
    for (const nodeId of joinedNodes) {
      await YDocService.releaseDoc(workspaceId, nodeId).catch(() => {});
    }
    joinedNodes.clear();
  });
}
