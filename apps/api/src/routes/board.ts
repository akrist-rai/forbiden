// src/routes/board.ts — Kanban board columns + cards
import Router from '@koa/router';
import { db } from '../db/index.ts';
import * as schema from '../db/schema.ts';
import { eq, and } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.ts';
import { broadcast } from '../ws/manager.ts';

const router = new Router({ prefix: '/api/workspaces/:wsId/board' });
router.use(requireAuth);

const uuid12 = () => crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const now    = () => new Date().toISOString();

router.param('wsId', async (wsId, ctx, next) => {
  const ws = await db.query.workspaces.findFirst({
    where: and(eq(schema.workspaces.id, wsId), eq(schema.workspaces.userId, ctx.state.auth.userId)),
  });
  if (!ws) { ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return; }
  await next();
});

// ─── FULL BOARD ───────────────────────────────────────────────────────────────
router.get('/', async ctx => {
  const [columns, cards] = await Promise.all([
    db.query.boardColumns.findMany({ where: eq(schema.boardColumns.workspaceId, ctx.params.wsId), orderBy: schema.boardColumns.position }),
    db.query.boardCards.findMany({ where: eq(schema.boardCards.workspaceId, ctx.params.wsId), orderBy: schema.boardCards.position }),
  ]);
  ctx.body = { columns, cards };
});

// ─── COLUMNS ─────────────────────────────────────────────────────────────────
router.post('/columns', async ctx => {
  const { title, color } = ctx.request.body as any;
  if (!title) { ctx.status = 400; ctx.body = { error: 'title required' }; return; }
  const last = await db.query.boardColumns.findFirst({
    where: eq(schema.boardColumns.workspaceId, ctx.params.wsId),
    orderBy: (t, { desc }) => [desc(t.position)],
  });
  const col = { id: 'c_' + uuid12(), workspaceId: ctx.params.wsId, title, color: color || '#4a4a6a', position: (last?.position ?? -1) + 1 };
  await db.insert(schema.boardColumns).values(col);
  broadcast(ctx.params.wsId, { type: 'col:created', payload: col });
  ctx.status = 201;
  ctx.body   = col;
});

router.patch('/columns/:colId', async ctx => {
  const { title, color, position } = ctx.request.body as any;
  const patch: any = {};
  if (title    !== undefined) patch.title    = title;
  if (color    !== undefined) patch.color    = color;
  if (position !== undefined) patch.position = position;
  await db.update(schema.boardColumns).set(patch).where(eq(schema.boardColumns.id, ctx.params.colId));
  const updated = await db.query.boardColumns.findFirst({ where: eq(schema.boardColumns.id, ctx.params.colId) });
  broadcast(ctx.params.wsId, { type: 'col:updated', payload: updated });
  ctx.body = updated;
});

router.delete('/columns/:colId', async ctx => {
  await db.delete(schema.boardCards).where(eq(schema.boardCards.colId, ctx.params.colId));
  await db.delete(schema.boardColumns).where(eq(schema.boardColumns.id, ctx.params.colId));
  broadcast(ctx.params.wsId, { type: 'col:deleted', payload: { id: ctx.params.colId } });
  ctx.status = 204;
});

// ─── CARDS ────────────────────────────────────────────────────────────────────
router.post('/cards', async ctx => {
  const { col_id, title, priority, tags, progress, due, assigneeIdx } = ctx.request.body as any;
  if (!col_id || !title) { ctx.status = 400; ctx.body = { error: 'col_id and title required' }; return; }
  const last = await db.query.boardCards.findFirst({
    where: eq(schema.boardCards.colId, col_id),
    orderBy: (t, { desc }) => [desc(t.position)],
  });
  const createdAt = now();
  const card = {
    id:          'k_' + uuid12(),
    workspaceId: ctx.params.wsId,
    colId:       col_id,
    title,
    priority:    priority   || 'MED',
    tags:        Array.isArray(tags) ? tags : [],
    progress:    progress   ?? 0,
    due:         due        || null,
    assigneeIdx: assigneeIdx ?? null,
    position:    (last?.position ?? -1) + 1,
    createdAt,
    updatedAt:   createdAt,
  };
  await db.insert(schema.boardCards).values(card);
  broadcast(ctx.params.wsId, { type: 'card:created', payload: card });
  ctx.status = 201;
  ctx.body   = card;
});

router.patch('/cards/:cardId', async ctx => {
  const { col_id, title, priority, tags, progress, due, assigneeIdx, position } = ctx.request.body as any;
  const patch: any = { updatedAt: now() };
  if (col_id      !== undefined) patch.colId       = col_id;
  if (title       !== undefined) patch.title       = title;
  if (priority    !== undefined) patch.priority    = priority;
  if (tags        !== undefined) patch.tags        = Array.isArray(tags) ? tags : [];
  if (progress    !== undefined) patch.progress    = progress;
  if (due         !== undefined) patch.due         = due;
  if (assigneeIdx !== undefined) patch.assigneeIdx = assigneeIdx;
  if (position    !== undefined) patch.position    = position;
  await db.update(schema.boardCards).set(patch).where(eq(schema.boardCards.id, ctx.params.cardId));
  const updated = await db.query.boardCards.findFirst({ where: eq(schema.boardCards.id, ctx.params.cardId) });
  broadcast(ctx.params.wsId, { type: 'card:updated', payload: updated });
  ctx.body = updated;
});

router.delete('/cards/:cardId', async ctx => {
  await db.delete(schema.boardCards).where(eq(schema.boardCards.id, ctx.params.cardId));
  broadcast(ctx.params.wsId, { type: 'card:deleted', payload: { id: ctx.params.cardId } });
  ctx.status = 204;
});

export default router;
