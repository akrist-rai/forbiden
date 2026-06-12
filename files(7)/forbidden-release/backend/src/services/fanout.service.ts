/**
 * FanoutService
 *
 * Dispatches an event to all downstream targets after the MongoDB Change Stream
 * confirms the event was persisted. This is called by changestream.service.ts,
 * NOT by EventService.emit() directly.
 *
 * FANOUT TARGETS (in order):
 *
 *   ①  Timeline Projection  — BullMQ async — creates TimelineEntry
 *   ②  Dashboard To-Do      — BullMQ async — updates Task status
 *   ③  Container File Sync  — BullMQ async — writes code to Docker filesystem
 *   ④  Activity Feed        — BullMQ async — Phase 5: cross-workspace feed entries
 *   ⑤  Live UI Broadcast    — Socket.IO sync — all connected clients see it ~5ms
 *
 * WHY BULLMQ FOR ASYNC TARGETS:
 *   BullMQ persists jobs in Redis. If a worker crashes mid-job, it retries from
 *   the beginning (idempotent workers). This guarantees every event eventually
 *   reaches all targets, even across process restarts.
 *
 * WHY SOCKET.IO IS SYNCHRONOUS:
 *   The UI broadcast is fire-and-forget. Connected clients receive it immediately
 *   or not at all. Clients that miss it catch up via the snapshot+replay endpoint
 *   on reconnect. Making it async would add latency with no durability benefit.
 *
 * DEDUPLICATION (horizontal scaling):
 *   When multiple API instances watch the Change Stream, each fires dispatch().
 *   BullMQ deduplication prevents duplicate queue entries: each job is keyed by
 *   `eventId` so identical jobs from concurrent instances collapse into one.
 *   Socket.IO with the Redis adapter handles broadcast deduplication internally.
 */

import { Queue } from 'bullmq';
import { getRedis } from '@/config/redis';
import type { IEvent } from '@/models/event.model';
import { getSocketIOInstance } from '@/services/socket-io.service';

const queueConnection = (() => {
  try {
    return getRedis() as any;
  } catch {
    return { host: '127.0.0.1', port: 6379 } as any;
  }
})();

const connection = { connection: queueConnection };

export const timelineQueue   = new Queue('timeline-projection', connection);
export const todoQueue        = new Queue('todo-update',         connection);
export const syncQueue        = new Queue('container-sync',      connection);
export const activityQueue    = new Queue('activity-feed',       connection);  // Phase 5
export const activityFeedQueue = activityQueue;

// ─── Classification sets ──────────────────────────────────────────────────────

/** Events that require syncing code files into the Docker container filesystem */
export const CODE_EVENTS = new Set([
  'NODE_CREATED', 'NODE_EDITED', 'NODE_DELETED', 'NOTE_SAVED',
]);

/** Events excluded from the timeline (too noisy) */
const SUPPRESS_TIMELINE = new Set(['NODE_MOVED']);

// ─── Fanout ───────────────────────────────────────────────────────────────────

export class FanoutService {
  static async dispatch(event: IEvent): Promise<void> {
    const workspaceId = event.streamId.replace('workspace:', '');
    const jobId = event.eventId; // deduplication key — same eventId = same job

    // ① Timeline
    if (!SUPPRESS_TIMELINE.has(event.type)) {
      await timelineQueue.add('project', { event: event.toObject() }, {
        jobId,
        attempts: 3,
        backoff:  { type: 'exponential', delay: 1_000 },
      });
    }

    // ② To-Do
    await todoQueue.add('update', { event: event.toObject() }, {
      jobId:    `todo:${jobId}`,
      attempts: 3,
      backoff:  { type: 'exponential', delay: 500 },
    });

    // ③ Container file sync (only code-touching events)
    if (CODE_EVENTS.has(event.type)) {
      await syncQueue.add('write-files', { event: event.toObject() }, {
        jobId:    `sync:${jobId}`,
        attempts: 5,
        backoff:  { type: 'exponential', delay: 500 },
      });
    }

    // ④ Activity feed (Phase 5) — notifies all operators with workspace access
    await activityQueue.add('publish', { event: event.toObject() }, {
      jobId:    `feed:${jobId}`,
      attempts: 3,
      backoff:  { type: 'exponential', delay: 2_000 },
    });

    // ⑤ Live UI broadcast — synchronous, immediate
    getSocketIOInstance()?.to(`workspace:${workspaceId}`).emit('event:new', event.toObject());
  }
}
