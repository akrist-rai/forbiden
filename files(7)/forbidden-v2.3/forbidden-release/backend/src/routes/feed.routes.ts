/**
 * Feed Routes — Cross-workspace activity feed
 *
 * GET  /api/feed              — Operator's unified feed (all workspaces)
 * GET  /api/feed/unread       — Unread count only (lightweight poll)
 * POST /api/feed/read-all     — Mark all entries as read
 * POST /api/feed/read/:eventId — Mark a single entry as read
 *
 * SOCKET.IO REAL-TIME PUSH:
 *   Operators receive live feed updates via the 'feed:new' Socket.IO event.
 *   They join their personal room 'feed:{operatorId}' on connect (see index.ts).
 *   These REST endpoints are the fallback for polling / initial page load.
 */

import Router from '@koa/router';
import { z } from 'zod';
import { ActivityFeedService } from '@/services/activity-feed.service';
import { ActivityFeedEntry } from '@/models/activity-feed.model';

export const feedRoutes = new Router();

// GET /api/feed — paginated feed for the authenticated operator
feedRoutes.get('/', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;

  const { limit, skip, unread, workspaceId } = z.object({
    limit:       z.coerce.number().min(1).max(200).default(50),
    skip:        z.coerce.number().min(0).default(0),
    unread:      z.enum(['true', 'false']).default('false'),
    workspaceId: z.string().optional(),
  }).parse(ctx.query);

  const result = await ActivityFeedService.getFeed(operatorId, {
    limit,
    skip,
    onlyUnread:  unread === 'true',
    workspaceId,
  });

  ctx.body = result;
});

// GET /api/feed/unread — just the count (for badge polling)
feedRoutes.get('/unread', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const count = await ActivityFeedService.unreadCount(operatorId);
  ctx.body = { unreadCount: count };
});

// POST /api/feed/read-all — mark everything as read
feedRoutes.post('/read-all', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const marked = await ActivityFeedService.markAllRead(operatorId);
  ctx.body = { marked };
});

// POST /api/feed/read/:eventId — mark one entry as read
feedRoutes.post('/read/:eventId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const { eventId } = ctx.params;

  const result = await ActivityFeedEntry.findOneAndUpdate(
    { operatorId, eventId, readAt: null },
    { $set: { readAt: new Date() } },
    { new: true },
  ).lean();

  if (!result) {
    ctx.status = 404;
    ctx.body = { error: 'Feed entry not found or already read' };
    return;
  }

  ctx.body = { ok: true };
});

export default feedRoutes;
