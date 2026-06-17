// src/routes/board.ts — Kanban board columns + cards (Supabase REST client)
import Router from '@koa/router';
import { db } from '../db/index.ts';
import { requireAuth } from '../middleware/auth.ts';
import { broadcast } from '../ws/manager.ts';

const router = new Router({ prefix: '/api/workspaces/:wsId/board' });
router.use(requireAuth);

const genId = (prefix: string) => prefix + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const now   = () => new Date().toISOString();

router.param('wsId', async (wsId, ctx, next) => {
  const { data } = await db.from('workspaces').select('id').eq('id', wsId).eq('user_id', ctx.state.auth.userId).single();
  if (!data) { ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return; }
  await next();
});

// ─── FULL BOARD ───────────────────────────────────────────────────────────────
router.get('/', async ctx => {
  const [colsR, cardsR] = await Promise.all([
    db.from('board_columns').select('*').eq('workspace_id', ctx.params.wsId).order('position'),
    db.from('board_cards').select('*').eq('workspace_id', ctx.params.wsId).order('position'),
  ]);
  ctx.body = { columns: colsR.data || [], cards: cardsR.data || [] };
});

// ─── COLUMNS ─────────────────────────────────────────────────────────────────
router.post('/columns', async ctx => {
  const { title, color } = ctx.request.body as any;
  if (!title) { ctx.status = 400; ctx.body = { error: 'title required' }; return; }
  const { data: last } = await db.from('board_columns').select('position').eq('workspace_id', ctx.params.wsId).order('position', { ascending: false }).limit(1).single();
  const col = {
    id:           genId('c'),
    workspace_id: ctx.params.wsId,
    title,
    color:        color || '#4a4a6a',
    position:     (last?.position ?? -1) + 1,
  };
  await db.from('board_columns').insert(col);
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
  await db.from('board_columns').update(patch).eq('id', ctx.params.colId);
  const { data: updated } = await db.from('board_columns').select('*').eq('id', ctx.params.colId).single();
  broadcast(ctx.params.wsId, { type: 'col:updated', payload: updated });
  ctx.body = updated;
});

router.delete('/columns/:colId', async ctx => {
  await db.from('board_cards').delete().eq('col_id', ctx.params.colId);
  await db.from('board_columns').delete().eq('id', ctx.params.colId);
  broadcast(ctx.params.wsId, { type: 'col:deleted', payload: { id: ctx.params.colId } });
  ctx.status = 204;
});

// ─── CARDS ────────────────────────────────────────────────────────────────────
router.post('/cards', async ctx => {
  const { col_id, title, priority, tags, progress, due, assigneeIdx } = ctx.request.body as any;
  if (!col_id || !title) { ctx.status = 400; ctx.body = { error: 'col_id and title required' }; return; }
  const { data: last } = await db.from('board_cards').select('position').eq('col_id', col_id).order('position', { ascending: false }).limit(1).single();
  const createdAt = now();
  const card = {
    id:           genId('k'),
    workspace_id: ctx.params.wsId,
    col_id,
    title,
    priority:     priority    || 'MED',
    tags:         Array.isArray(tags) ? tags : [],
    progress:     progress    ?? 0,
    due:          due         || null,
    assignee_idx: assigneeIdx ?? null,
    position:     (last?.position ?? -1) + 1,
    created_at:   createdAt,
    updated_at:   createdAt,
  };
  await db.from('board_cards').insert(card);
  broadcast(ctx.params.wsId, { type: 'card:created', payload: card });
  ctx.status = 201;
  ctx.body   = card;
});

router.patch('/cards/:cardId', async ctx => {
  const { col_id, title, priority, tags, progress, due, assigneeIdx, position } = ctx.request.body as any;
  const patch: any = { updated_at: now() };
  if (col_id      !== undefined) patch.col_id       = col_id;
  if (title       !== undefined) patch.title        = title;
  if (priority    !== undefined) patch.priority     = priority;
  if (tags        !== undefined) patch.tags         = Array.isArray(tags) ? tags : [];
  if (progress    !== undefined) patch.progress     = progress;
  if (due         !== undefined) patch.due          = due;
  if (assigneeIdx !== undefined) patch.assignee_idx = assigneeIdx;
  if (position    !== undefined) patch.position     = position;
  await db.from('board_cards').update(patch).eq('id', ctx.params.cardId);
  const { data: updated } = await db.from('board_cards').select('*').eq('id', ctx.params.cardId).single();
  broadcast(ctx.params.wsId, { type: 'card:updated', payload: updated });
  ctx.body = updated;
});

router.delete('/cards/:cardId', async ctx => {
  await db.from('board_cards').delete().eq('id', ctx.params.cardId);
  broadcast(ctx.params.wsId, { type: 'card:deleted', payload: { id: ctx.params.cardId } });
  ctx.status = 204;
});

export default router;
