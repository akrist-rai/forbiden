/**
 * ActivityFeedService
 *
 * Writes cross-workspace activity feed entries when significant events fire.
 * Called by the activity-feed BullMQ worker (⑥ in the fanout pipeline).
 *
 * FANOUT FLOW (Phase 5 addition):
 *
 *   Event inserted → Change Stream → FanoutService.dispatch()
 *                                        │
 *                                        └──⑥ activity-feed queue (BullMQ)
 *                                                │
 *                                            ActivityFeedService.publish()
 *                                                │
 *                                            For each operator with workspace access:
 *                                                ActivityFeedEntry.create(...)
 *                                                io.to('feed:{operatorId}').emit('feed:new', entry)
 *
 * ROOM STRATEGY:
 *   Each operator has a personal Socket.IO room: 'feed:{operatorId}'.
 *   Operators join this room on connection (wired in index.ts Phase 5 update).
 *   This lets the server push feed updates without the operator polling.
 *
 * PERFORMANCE:
 *   For a workspace with 50 members, one event creates 50 ActivityFeedEntry documents.
 *   This is done in a single insertMany call. Each insert is idempotent via the
 *   unique index on (operatorId, eventId).
 *
 *   For very large teams (>100 members) this should be batched in chunks to avoid
 *   MongoDB write timeouts, but that is left for future optimization.
 */

import { ActivityFeedEntry, SIGNIFICANT_EVENT_TYPES, makeFeedSummary } from '@/models/activity-feed.model';
import { AccessService } from '@/services/access.service';
import { getSocketIOInstance } from '@/services/socket-io.service';
import { User } from '@/models/user.model';
import type { IEvent } from '@/models/event.model';

export class ActivityFeedService {
  /**
   * Publish an event to the activity feed of all operators with access
   * to the workspace. Silently skips event types not in SIGNIFICANT_EVENT_TYPES.
   */
  static async publish(event: IEvent): Promise<void> {
    if (!SIGNIFICANT_EVENT_TYPES.has(event.type)) return;

    const workspaceId = event.streamId.replace('workspace:', '');

    // Get actor display name (best-effort — don't fail the feed if user not found)
    let actorName = event.meta.operatorId;
    try {
      const actor = await User.findOne({ githubId: event.meta.operatorId }).lean();
      if (actor) actorName = actor.name ?? actor.login;
    } catch { /* ignore */ }

    // All operators who should see this event
    const operatorIds = await AccessService.listAccessible(workspaceId);
    if (operatorIds.length === 0) return;

    const summary = makeFeedSummary(event.type, event.payload);
    const nodeId   = (event.payload['nodeId'] as string | undefined) ?? undefined;
    const nodeLabel = (event.payload['label'] as string | undefined) ?? undefined;

    // Bulk insert — unique index silently drops duplicates on retry
    const docs = operatorIds.map(operatorId => ({
      operatorId,
      workspaceId,
      eventId:   event.eventId,
      eventType: event.type,
      summary,
      actorId:   event.meta.operatorId,
      actorName,
      nodeId,
      nodeLabel,
      readAt: null,
    }));

    let inserted: typeof docs = [];
    try {
      const result = await ActivityFeedEntry.insertMany(docs, { ordered: false });
      inserted = result as unknown as typeof docs;
    } catch (err: unknown) {
      // ordered: false means partial success is OK; E11000 duplicate key errors are expected on retry
      const e = err as { code?: number; insertedDocs?: unknown[] };
      if (e.code !== 11000) throw err;
      inserted = (e.insertedDocs ?? []) as typeof docs;
    }

    // Push real-time notification to each operator's personal feed room
    for (const doc of inserted) {
      getSocketIOInstance()?.to(`feed:${doc.operatorId}`).emit('feed:new', {
        workspaceId,
        summary,
        actorName,
        eventType: event.type,
        nodeId,
        createdAt: new Date(),
      });
    }
  }

  /**
   * Mark all feed entries as read for an operator.
   * Called by POST /api/feed/read-all.
   */
  static async markAllRead(operatorId: string): Promise<number> {
    const result = await ActivityFeedEntry.updateMany(
      { operatorId, readAt: null },
      { $set: { readAt: new Date() } },
    );
    return result.modifiedCount;
  }

  /**
   * Get the unread count for an operator.
   */
  static async unreadCount(operatorId: string): Promise<number> {
    return ActivityFeedEntry.countDocuments({ operatorId, readAt: null });
  }

  /**
   * Paginated feed for an operator.
   */
  static async getFeed(operatorId: string, options: {
    limit?: number;
    skip?: number;
    onlyUnread?: boolean;
    workspaceId?: string;
  } = {}): Promise<{
    entries: Array<{
      workspaceId: string;
      summary: string;
      actorName: string;
      eventType: string;
      nodeId?: string;
      readAt: Date | null;
      createdAt: Date;
    }>;
    unreadCount: number;
    total: number;
  }> {
    const { limit = 50, skip = 0, onlyUnread = false, workspaceId } = options;

    const query: Record<string, unknown> = { operatorId };
    if (onlyUnread) query['readAt'] = null;
    if (workspaceId) query['workspaceId'] = workspaceId;

    const [entries, unreadCount, total] = await Promise.all([
      ActivityFeedEntry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Math.min(limit, 200))
        .lean(),
      ActivityFeedEntry.countDocuments({ operatorId, readAt: null }),
      ActivityFeedEntry.countDocuments(query),
    ]);

    return {
      entries: entries as unknown as typeof entries,
      unreadCount,
      total,
    };
  }
}
