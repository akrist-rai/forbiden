/**
 * BullMQ Workers
 *
 * All background workers run in the same process as the API server.
 * Each worker consumes from a dedicated named queue backed by Redis.
 *
 * WORKER ROSTER:
 *
 *   ①  timeline-projection  — Projects events into human-readable timeline entries
 *   ②  todo-update          — Manages the Kanban board automatically from events
 *   ③  container-sync       — Writes code files into Docker workspace containers
 *   ④  idle-reaper          — Pauses/destroys idle containers (scheduled, every 5min)
 *   ⑤  snapshot             — Materialises workspace state checkpoints every 500 events
 *   ⑥  activity-feed        — Publishes significant events to per-operator feed (Phase 5)
 *   ⑦  pty-output           — Persists PTY terminal output for session replay (Phase 5)
 */

import { Worker, Queue } from 'bullmq';
import { getRedis } from '@/config/redis';
import { TimelineEntry } from '@/models/timeline.model';
import { Node } from '@/models/node.model';
import { Task } from '@/models/task.model';
import { PtyOutput, PTY_OUTPUT_MAX_BYTES } from '@/models/pty-output.model';
import { getSocketIOInstance } from '@/services/socket-io.service';
import {
  syncNodeToContainer,
  deleteNodeFromContainer,
  syncNoteToContainer,
  syncManifestToContainer,
  reapIdleContainers,
} from '@/services/container.service';
import { SnapshotService } from '@/services/snapshot.service';
import { ActivityFeedService } from '@/services/activity-feed.service';
import type { IEvent } from '@/models/event.model';

const connection = getRedis() as any;

// ─── Timeline label/icon config ───────────────────────────────────────────────

const EVENT_META: Record<string, {
  icon: string;
  color: string;
  label: (p: Record<string, unknown>) => string
}> = {
  NODE_CREATED:       { icon: '⊕', color: '#10b981', label: p => `Node created: ${p['label'] ?? p['nodeId']}` },
  NODE_DELETED:       { icon: '⊗', color: '#ff435a', label: p => `Node deleted: ${p['nodeId']}` },
  NODE_EDITED:        { icon: '✎', color: '#4285f4', label: p => `Code updated in ${p['nodeId']}` },
  NODE_JOINED:        { icon: '⇢', color: '#bb9af7', label: p => `Edge: ${p['sourceId']} → ${p['targetId']}` },
  NODE_CUT:           { icon: '✂', color: '#ffc410', label: p => `Edge removed: ${p['sourceId']} ↛ ${p['targetId']}` },
  NOTE_SAVED:         { icon: '◈', color: '#0db9d7', label: p => `Note saved on ${p['nodeId']}` },
  GROUP_CREATED:      { icon: '⊞', color: '#9ece6a', label: p => `Group created: ${p['name'] ?? p['groupId']}` },
  GROUP_DELETED:      { icon: '⊟', color: '#f7768e', label: p => `Group deleted: ${p['groupId']}` },
  WORKSPACE_SNAPSHOT: { icon: '◉', color: '#e0af68', label: p => `Snapshot: ${p['label'] ?? 'checkpoint'}` },
};

// Events that skip the timeline (high-frequency noise)
const SUPPRESS_TIMELINE = new Set(['NODE_MOVED']);

// Events that write code to the container filesystem
const CODE_EVENTS = new Set(['NODE_CREATED', 'NODE_EDITED', 'NODE_DELETED', 'NOTE_SAVED']);

// ─── ① Timeline Projection Worker ─────────────────────────────────────────────

export const timelineWorker = new Worker(
  'timeline-projection',
  async (job) => {
    const event = job.data.event as IEvent;
    const workspaceId = event.streamId.replace('workspace:', '');
    if (SUPPRESS_TIMELINE.has(event.type)) return;

    const meta = EVENT_META[event.type];
    const payload = event.payload as Record<string, unknown>;
    const label = meta?.label(payload) ?? event.type;
    const icon  = meta?.icon  ?? '◈';
    const color = meta?.color ?? '#ffffff';

    // Snapshot the node state at this point in time for richer timeline display
    const nodeId = payload['nodeId'] as string | undefined;
    let nodeSnapshot: { label: string; color: string; groupId?: string } | undefined;
    if (nodeId) {
      const node = await Node.findOne({ id: nodeId }).lean();
      if (node) {
        nodeSnapshot = { label: node.label, color: node.color, groupId: node.groupId };
      }
    }

    const entry = await TimelineEntry.create({
      workspaceId,
      eventId:     event.eventId,
      eventType:   event.type,
      nodeId,
      label,
      icon,
      accentColor: color,
      nodeSnapshot,
      operatorId:  event.meta.operatorId,
    });

    getSocketIOInstance()?.to(`workspace:${workspaceId}`).emit('timeline:update', entry.toObject());
  },
  { connection, concurrency: 5 }
);

// ─── ② To-Do Dashboard Worker ─────────────────────────────────────────────────

export const todoWorker = new Worker(
  'todo-update',
  async (job) => {
    const event = job.data.event as IEvent;
    const workspaceId = event.streamId.replace('workspace:', '');
    const payload = event.payload as Record<string, unknown>;
    const nodeId  = payload['nodeId'] as string | undefined;

    if (!nodeId) return;

    switch (event.type) {
      case 'NODE_CREATED': {
        const label = (payload['label'] as string | undefined) ?? 'Untitled';
        await Task.create({
          workspaceId,
          nodeId,
          title:   `Implement node: ${label}`,
          status:  'todo',
          eventId: event.eventId,
        });
        break;
      }
      case 'NODE_EDITED': {
        await Task.updateMany(
          { workspaceId, nodeId, status: 'todo' },
          { $set: { status: 'in-progress' } }
        );
        break;
      }
      case 'NODE_DELETED': {
        await Task.updateMany(
          { workspaceId, nodeId, status: { $ne: 'archived' } },
          { $set: { status: 'archived' } }
        );
        break;
      }
    }
  },
  { connection, concurrency: 10 }
);

// ─── ③ Container File Sync Worker ─────────────────────────────────────────────

export const containerSyncWorker = new Worker(
  'container-sync',
  async (job) => {
    const event = job.data.event as IEvent;
    const workspaceId = event.streamId.replace('workspace:', '');
    const payload = event.payload as Record<string, unknown>;
    const nodeId  = payload['nodeId'] as string | undefined;

    if (!nodeId) return;

    switch (event.type) {
      case 'NODE_CREATED':
      case 'NODE_EDITED': {
        const code     = (payload['code']     as string | undefined) ?? '';
        const language = (payload['language'] as string | undefined) ?? 'javascript';
        await syncNodeToContainer(workspaceId, nodeId, code, language);
        break;
      }
      case 'NODE_DELETED': {
        const language = (payload['language'] as string | undefined) ?? 'javascript';
        await deleteNodeFromContainer(workspaceId, nodeId, language);
        break;
      }
      case 'NOTE_SAVED': {
        const content = (payload['content'] as string | undefined) ?? '';
        await syncNoteToContainer(workspaceId, nodeId, content);
        break;
      }
    }

    // Regenerate manifest so `cat /workspace/manifest.json` in the terminal is always fresh
    const allNodes = await Node.find({ workspaceId, deletedAt: null })
      .select('id label edges groupId')
      .lean();
    await syncManifestToContainer(workspaceId, {
      nodes: allNodes.map(n => ({ id: n.id, label: n.label, edges: n.edges, groupId: n.groupId })),
    });
  },
  { connection, concurrency: 3 }
);

// ─── ④ Idle Reaper Worker (scheduled every 5 minutes) ────────────────────────

export const reaperQueue = new Queue('idle-reaper', { connection });

export const reaperWorker = new Worker(
  'idle-reaper',
  async () => {
    const { paused, destroyed } = await reapIdleContainers();
    if (paused.length || destroyed.length) {
      console.log(`[reaper] Paused: ${paused.length}, Destroyed: ${destroyed.length}`);
    }
    return { paused, destroyed };
  },
  { connection, concurrency: 1 }
);

// ─── ⑤ Snapshot Worker ────────────────────────────────────────────────────────

export const snapshotQueue = new Queue('snapshot', { connection });

export const snapshotWorker = new Worker(
  'snapshot',
  async (job) => {
    const { workspaceId, highestEventId } = job.data as {
      workspaceId: string;
      highestEventId: string;
    };
    await SnapshotService.create(workspaceId, highestEventId);
  },
  { connection, concurrency: 2 }
);

// ─── ⑥ Activity Feed Worker ───────────────────────────────────────────────────
// Phase 5: Cross-workspace unified feed per operator

export const activityFeedQueue = new Queue('activity-feed', { connection });

export const activityFeedWorker = new Worker(
  'activity-feed',
  async (job) => {
    const { event } = job.data as { event: IEvent };
    await ActivityFeedService.publish(event);
  },
  {
    connection,
    concurrency: 5,
  }
);

// ─── ⑦ PTY Output Worker ──────────────────────────────────────────────────────
// Phase 5: Persists terminal session output for session replay and debugging

export const ptyOutputQueue = new Queue('pty-output', { connection });

/**
 * Flush accumulated PTY output to MongoDB.
 * Job data: { workspaceId, operatorId, sessionId, seq, content }
 *
 * Content is truncated to PTY_OUTPUT_MAX_BYTES per document.
 * Longer bursts are handled by the terminal handler which splits them
 * into sequential jobs before enqueuing.
 */
export const ptyOutputWorker = new Worker(
  'pty-output',
  async (job) => {
    const { workspaceId, operatorId, sessionId, seq, content } = job.data as {
      workspaceId: string;
      operatorId:  string;
      sessionId:   string;
      seq:         number;
      content:     string;
    };

    // Enforce the per-document size cap at the write layer as a safety net
    const truncated = content.length > PTY_OUTPUT_MAX_BYTES
      ? content.slice(0, PTY_OUTPUT_MAX_BYTES)
      : content;

    await PtyOutput.create({
      workspaceId,
      operatorId,
      sessionId,
      seq,
      content: truncated,
      length:  truncated.length,
    });
  },
  {
    connection,
    concurrency: 10,
  }
);

// ─── Start & wire error handlers ──────────────────────────────────────────────

const ALL_WORKERS = [
  timelineWorker,
  todoWorker,
  containerSyncWorker,
  reaperWorker,
  snapshotWorker,
  activityFeedWorker,
  ptyOutputWorker,
];

export async function startWorkers(): Promise<void> {
  for (const worker of ALL_WORKERS) {
    worker.on('failed', (job, err) => {
      console.error(`[worker:${worker.name}] Job ${job?.id} failed:`, err.message);
    });
    worker.on('error', (err) => {
      console.error(`[worker:${worker.name}] Worker error:`, err.message);
    });
  }

  // Schedule the idle reaper to run every 5 minutes
  await reaperQueue.add('reap', {}, {
    repeat:          { pattern: '*/5 * * * *' },
    removeOnComplete: 10,
    removeOnFail:     5,
  });

  console.log('[workers] All 7 workers started: Timeline, ToDo, ContainerSync, IdleReaper, Snapshot, ActivityFeed, PtyOutput');
}
