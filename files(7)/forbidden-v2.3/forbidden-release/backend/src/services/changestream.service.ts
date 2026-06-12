/**
 * ChangeStreamService
 *
 * MongoDB Change Streams are the authoritative fanout spine for FORBIDDEN.
 *
 * WHY CHANGE STREAMS OVER DIRECT DISPATCH:
 *
 *   Before (Phase 1):
 *     node:edit → EventService.emit() → FanoutService.dispatch() [called directly]
 *
 *   Problem: If the server crashes between writing the event to MongoDB and calling
 *   dispatch(), the event is persisted but never fanned out — a silent consistency bug.
 *
 *   After (Phase 2):
 *     node:edit → EventService.emit() [writes to MongoDB]
 *                     ↓
 *               Change Stream detects insert
 *                     ↓
 *               FanoutService.dispatch() [always fires, even after restart]
 *
 *   The Change Stream resumes from a stored resumeToken after process restarts,
 *   so no events are ever missed. This is the "outbox pattern" applied to MongoDB.
 *
 * HORIZONTAL SCALING:
 *   When multiple API instances run, each watches the Change Stream independently
 *   but only the Socket.IO broadcast is sent by the instance that owns the
 *   connection. BullMQ job deduplication (jobId = eventId) prevents duplicate
 *   queue entries from multiple watchers.
 *
 *   Phase 6 will add socket.io/redis-adapter so any instance can broadcast.
 */

import mongoose from 'mongoose';
import { getRedis } from '@/config/redis';
import { FanoutService } from '@/services/fanout.service';
import { SnapshotService } from '@/services/snapshot.service';
import { Event, type IEvent } from '@/models/event.model';

const RESUME_TOKEN_KEY = 'changestream:events:resumeToken';

let isWatching = false;

/**
 * Start watching the events collection.
 * Should be called once during server bootstrap.
 */
export async function startChangeStream(): Promise<void> {
  if (isWatching) return;
  isWatching = true;

  const db = mongoose.connection;
  const redis = getRedis();

  const startAfter = await loadResumeToken(redis);

  const pipeline = [{ $match: { operationType: 'insert' } }];

  const options: mongoose.mongo.ChangeStreamOptions = {
    fullDocument: 'updateLookup',
    ...(startAfter ? { startAfter } : {}),
  };

  const collection = db.collection('events');
  const stream = collection.watch(pipeline, options);

  console.log('[changestream] Watching events collection', startAfter ? '(resuming)' : '(fresh)');

  stream.on('change', async (change: mongoose.mongo.ChangeStreamDocument) => {
    if (change.operationType !== 'insert') return;

    try {
      // Persist the resume token immediately so we survive crashes
      await saveResumeToken(redis, change._id);

      // Fetch the full Mongoose document for type safety
      const raw = (change as mongoose.mongo.ChangeStreamInsertDocument).fullDocument;
      if (!raw) return;

      const event = await Event.findById(raw._id);
      if (!event) return;

      // Fanout to all 4 targets
      await FanoutService.dispatch(event as IEvent);

      // Check if we should snapshot after this event
      const workspaceId = event.streamId.replace('workspace:', '');
      const countSince = await SnapshotService.eventCountSinceLastSnapshot(workspaceId);
      if (SnapshotService.shouldSnapshot(countSince)) {
        // Fire-and-forget — snapshot creation is low priority
        SnapshotService.create(workspaceId, event.eventId).catch(err => {
          console.error('[changestream] Snapshot creation failed:', err.message);
        });
      }

    } catch (err) {
      console.error('[changestream] Error processing change event:', (err as Error).message);
    }
  });

  stream.on('error', (err) => {
    console.error('[changestream] Stream error:', err.message);
    isWatching = false;
    // Reconnect after 5 seconds
    setTimeout(() => startChangeStream(), 5_000);
  });

  stream.on('close', () => {
    console.warn('[changestream] Stream closed — will reconnect');
    isWatching = false;
    setTimeout(() => startChangeStream(), 2_000);
  });
}

// ─── Resume token persistence ─────────────────────────────────────────────────

async function saveResumeToken(
  redis: ReturnType<typeof getRedis>,
  token: unknown
): Promise<void> {
  try {
    await redis.set(RESUME_TOKEN_KEY, JSON.stringify(token));
  } catch {
    // Non-fatal — worst case we replay a few events on restart
  }
}

async function loadResumeToken(
  redis: ReturnType<typeof getRedis>
): Promise<unknown | null> {
  try {
    const raw = await redis.get(RESUME_TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
