/**
 * EventService
 *
 * Writes events to the append-only store.
 * Fanout is NOT triggered here — it is driven by the MongoDB Change Stream
 * (changestream.service.ts) which watches for inserts and calls FanoutService.dispatch().
 *
 * This eliminates the write-before-broadcast race condition from Phase 1.
 */

import { v7 as uuidv7 } from 'uuid';
import { Event, type EventType, type IEvent } from '@/models/event.model';
import { Snapshot } from '@/models/snapshot.model';

export interface EmitEventInput {
  workspaceId: string;
  type: EventType;
  payload: Record<string, unknown>;
  operatorId: string;
  sessionId: string;
  clientEventId?: string;
  clientTimestamp?: Date;
}

export class EventService {
  /**
   * Write an event to the append-only store.
   * Idempotent: if clientEventId already exists, returns the existing event.
   *
   * NOTE: Fanout is handled by the Change Stream watcher, NOT here.
   */
  static async emit(input: EmitEventInput): Promise<IEvent> {
    const { workspaceId, type, payload, operatorId, sessionId, clientEventId, clientTimestamp } = input;

    // Deduplication — return existing event if client already sent this
    if (clientEventId) {
      const existing = await Event.findOne({ clientEventId });
      if (existing) return existing;
    }

    const event = await Event.create({
      eventId:  uuidv7(),
      streamId: `workspace:${workspaceId}`,
      type,
      payload,
      meta: {
        operatorId,
        sessionId,
        clientTimestamp: clientTimestamp ?? new Date(),
        serverTimestamp: new Date(),
      },
      clientEventId,
    });

    // The MongoDB Change Stream detects this insert and calls FanoutService.dispatch().
    // No explicit fanout call needed here.

    return event;
  }

  /**
   * Replay events for a workspace stream, optionally starting from a snapshot.
   *
   * Algorithm:
   *   1. Find the most recent snapshot (or use `since` cursor if provided)
   *   2. Query events after the snapshot's highestEventId
   *   3. Return snapshot state + delta events to the caller
   *
   * The caller reconstructs state by applying events on top of the snapshot.
   */
  static async replay(workspaceId: string, options?: {
    since?: string;   // eventId cursor — skip snapshot if provided
    limit?: number;
    types?: EventType[];
  }): Promise<{
    snapshot: typeof Snapshot.prototype | null;
    events: IEvent[];
  }> {
    const streamId = `workspace:${workspaceId}`;
    const limit = options?.limit ?? 200;

    // If caller provides an explicit cursor, skip snapshot lookup
    if (options?.since) {
      const events = await Event.find({
        streamId,
        eventId: { $gt: options.since },
        ...(options.types?.length ? { type: { $in: options.types } } : {}),
      })
        .sort({ eventId: 1 })
        .limit(limit)
        .lean();

      return { snapshot: null, events: events as unknown as IEvent[] };
    }

    // Find nearest snapshot for efficient replay
    const snapshot = await Snapshot.findOne({ workspaceId }).sort({ seq: -1 }).lean();

    const eventQuery: Record<string, unknown> = { streamId };
    if (snapshot) {
      eventQuery['eventId'] = { $gt: snapshot.highestEventId };
    }
    if (options?.types?.length) {
      eventQuery['type'] = { $in: options.types };
    }

    const events = await Event.find(eventQuery)
      .sort({ eventId: 1 })
      .limit(limit)
      .lean();

    return {
      snapshot: snapshot as unknown as typeof Snapshot.prototype | null,
      events: events as unknown as IEvent[],
    };
  }
}
