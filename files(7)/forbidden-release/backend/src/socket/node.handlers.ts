import type { Socket, Server } from 'socket.io';
import { z } from 'zod';
import { EventService } from '@/services/event.service';

import { Node } from '@/models/node.model';
import { v7 as uuidv7 } from 'uuid';
import { runNodeCode, topoSort } from '@/services/container.service';

// ─── Zod Schemas (input validation) ──────────────────────────────────────────

const NodeAddSchema = z.object({
  nodeId:         z.string().optional(),
  label:          z.string().max(120).default('Untitled'),
  type:           z.string().max(40).default('function'),
  themeIdx:       z.number().int().min(0).max(15).default(0),
  code:           z.string().max(1_048_576).optional(),
  language:       z.string().default('python'),
  color:          z.string().default('default'),
  position:       z.object({ x: z.number(), y: z.number() }),
  groupId:        z.string().optional(),
  clientEventId:  z.string().uuid().optional(),
  createdAt:      z.number().optional(),
});

const NodeEditSchema = z.object({
  nodeId:         z.string(),
  code:           z.string().max(1_048_576).optional(), // 1MB cap
  language:       z.string().optional(),
  position:       z.object({ x: z.number(), y: z.number() }).optional(),
  noteContent:    z.string().max(51_200).optional(),
  clientEventId:  z.string().uuid().optional(),
});

const NodeDeleteSchema = z.object({
  nodeId:         z.string(),
  clientEventId:  z.string().uuid().optional(),
});

const NodeJoinSchema = z.object({
  sourceId:       z.string(),
  targetId:       z.string(),
  edgeType: z.enum(['default','imports','calls','data-flow','inherits','test','dependency','data','reference']).default('default'),
  label:          z.string().optional(),
  clientEventId:  z.string().uuid().optional(),
});

const NodeCutSchema = z.object({
  sourceId:       z.string(),
  targetId:       z.string(),
  clientEventId:  z.string().uuid().optional(),
});

const NoteSaveSchema = z.object({
  nodeId:         z.string(),
  content:        z.string().max(51_200),
  clientEventId:  z.string().uuid().optional(),
});

// ─── Handler Registration ─────────────────────────────────────────────────────

export function registerNodeHandlers(socket: Socket, _io: Server) {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };
  const { id: operatorId } = socket.data.operator;
  const sessionId = socket.id;

  socket.on('node:add', async (raw, ack) => {
    try {
      const data = NodeAddSchema.parse(raw);
      const nodeId = data.nodeId ?? uuidv7();

      // Create CQRS read model document
      await Node.create({
        id: nodeId,
        workspaceId,
        label: data.label,
        type: data.type,
        code: data.code ?? '',
        language: data.language,
        color: data.color,
        themeIdx: data.themeIdx,
        position: data.position,
        groupId: data.groupId,
      });

      const event = await EventService.emit({
        workspaceId, operatorId, sessionId,
        type: 'NODE_CREATED',
        payload: { nodeId, ...data },
        clientEventId: data.clientEventId,
      });


      ack?.({ ok: true, nodeId, eventId: event.eventId });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  socket.on('node:edit', async (raw, ack) => {
    try {
      const data = NodeEditSchema.parse(raw);
      const update: Record<string, unknown> = {};
      if (data.code !== undefined) {
        update.code = data.code;
        update.modified = true;
      }
      if (data.language !== undefined) update.language = data.language;
      if (data.position !== undefined) update.position = data.position;
      if (data.noteContent !== undefined) update.noteContent = data.noteContent;

      if (Object.keys(update).length > 0) {
        await Node.updateOne(
          { id: data.nodeId, workspaceId },
          { $set: update }
        );
      }

      const event = await EventService.emit({
        workspaceId, operatorId, sessionId,
        type: 'NODE_EDITED',
        payload: { nodeId: data.nodeId, code: data.code, language: data.language, position: data.position, noteContent: data.noteContent },
        clientEventId: data.clientEventId,
      });


      ack?.({ ok: true, eventId: event.eventId });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  socket.on('node:delete', async (raw, ack) => {
    try {
      const data = NodeDeleteSchema.parse(raw);

      await Node.updateOne(
        { id: data.nodeId, workspaceId },
        { $set: { deletedAt: new Date() } }
      );

      const event = await EventService.emit({
        workspaceId, operatorId, sessionId,
        type: 'NODE_DELETED',
        payload: { nodeId: data.nodeId },
        clientEventId: data.clientEventId,
      });


      ack?.({ ok: true, eventId: event.eventId });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  socket.on('node:join', async (raw, ack) => {
    try {
      const data = NodeJoinSchema.parse(raw);

      await Node.updateOne(
        { id: data.sourceId, workspaceId },
        { $addToSet: { edges: { targetId: data.targetId, edgeType: data.edgeType, label: data.label } } }
      );

      const event = await EventService.emit({
        workspaceId, operatorId, sessionId,
        type: 'NODE_JOINED',
        payload: { sourceId: data.sourceId, targetId: data.targetId, edgeType: data.edgeType, label: data.label },
        clientEventId: data.clientEventId,
      });


      ack?.({ ok: true, eventId: event.eventId });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  socket.on('node:cut', async (raw, ack) => {
    try {
      const data = NodeCutSchema.parse(raw);

      await Node.updateOne(
        { id: data.sourceId, workspaceId },
        { $pull: { edges: { targetId: data.targetId } } }
      );

      const event = await EventService.emit({
        workspaceId, operatorId, sessionId,
        type: 'NODE_CUT',
        payload: { sourceId: data.sourceId, targetId: data.targetId },
        clientEventId: data.clientEventId,
      });


      ack?.({ ok: true, eventId: event.eventId });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });

  socket.on('note:save', async (raw, ack) => {
    try {
      const data = NoteSaveSchema.parse(raw);
      const node = await Node.findOne({ id: data.nodeId, workspaceId });
      if (!node) throw new Error('Node not found');

      const version = (node.noteVersions.at(-1)?.version ?? 0) + 1;
      const event = await EventService.emit({
        workspaceId, operatorId, sessionId,
        type: 'NOTE_SAVED',
        payload: { nodeId: data.nodeId, content: data.content, version },
        clientEventId: data.clientEventId,
      });

      node.noteContent = data.content;
      node.noteVersions.push({ version, content: data.content, authorId: operatorId, savedAt: new Date(), eventId: event.eventId });
      await node.save();


      ack?.({ ok: true, eventId: event.eventId, version });
    } catch (err) {
      ack?.({ ok: false, error: (err as Error).message });
    }
  });
}

// ─── node:run — inline execution ─────────────────────────────────────────────

export function registerRunHandlers(socket: Socket, _io: Server) {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };

  socket.on('node:run', async (raw) => {
    const { nodeId } = z.object({ nodeId: z.string() }).parse(raw);
    const node = await Node.findOne({ id: nodeId, workspaceId }).lean();
    if (!node) return;

    await Node.updateOne({ id: nodeId, workspaceId }, { $set: { execStatus: 'running' } });
    socket.emit('node:run:status', { nodeId, status: 'running' });

    try {
      const exitCode = await runNodeCode(
        workspaceId, nodeId, node.language,
        (chunk, stream) => socket.emit('node:run:output', { nodeId, chunk, stream }),
      );
      const status = exitCode === 0 ? 'success' : 'error';
      await Node.updateOne({ id: nodeId, workspaceId }, { $set: { execStatus: status, lastExitCode: exitCode } });
      socket.emit('node:run:done', { nodeId, exitCode });
    } catch (err) {
      await Node.updateOne({ id: nodeId, workspaceId }, { $set: { execStatus: 'error', lastExitCode: 1 } });
      socket.emit('node:run:done', { nodeId, exitCode: 1, error: (err as Error).message });
    }
  });

  socket.on('pipeline:run', async (raw) => {
    const { nodeIds } = z.object({ nodeIds: z.array(z.string()) }).parse(raw);
    const nodes = await Node.find({ id: { $in: nodeIds }, workspaceId }).lean();
    const execEdges = nodes.flatMap(n =>
      n.edges
        .filter(e => e.edgeType === 'data-flow' || e.edgeType === 'calls')
        .map(e => ({ source: n.id, target: e.targetId }))
    );

    let sorted: string[];
    try {
      sorted = topoSort(nodeIds, execEdges);
    } catch {
      socket.emit('pipeline:error', { error: 'Cycle detected — cannot run pipeline' });
      return;
    }

    socket.emit('pipeline:start', { order: sorted, total: sorted.length });

    for (let i = 0; i < sorted.length; i++) {
      const nodeId = sorted[i];
      const node   = nodes.find(n => n.id === nodeId);
      if (!node) continue;

      socket.emit('pipeline:node:start', { nodeId, index: i, total: sorted.length });
      await Node.updateOne({ id: nodeId, workspaceId }, { $set: { execStatus: 'running' } });

      try {
        const exitCode = await runNodeCode(
          workspaceId, nodeId, node.language,
          (chunk, stream) => socket.emit('node:run:output', { nodeId, chunk, stream }),
        );
        const status = exitCode === 0 ? 'success' : 'error';
        await Node.updateOne({ id: nodeId, workspaceId }, { $set: { execStatus: status, lastExitCode: exitCode } });
        socket.emit('pipeline:node:done', { nodeId, exitCode, index: i });

        if (exitCode !== 0) {
          socket.emit('pipeline:error', { error: `Node ${node.label} failed with exit code ${exitCode}`, nodeId });
          return;
        }
      } catch (err) {
        await Node.updateOne({ id: nodeId, workspaceId }, { $set: { execStatus: 'error', lastExitCode: 1 } });
        socket.emit('pipeline:error', { error: (err as Error).message, nodeId });
        return;
      }
    }

    socket.emit('pipeline:done', { total: sorted.length });
  });
}
