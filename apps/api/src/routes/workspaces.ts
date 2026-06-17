// src/routes/workspaces.ts — Workspace CRUD (Supabase REST client)
import Router from '@koa/router';
import { db } from '../db/index.ts';
import * as git from '../git/manager.ts';
import { requireAuth } from '../middleware/auth.ts';

const router = new Router({ prefix: '/api/workspaces' });
router.use(requireAuth);

const genId  = () => 'ws_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const genId2 = (prefix: string) => prefix + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const now    = () => new Date().toISOString();

function assertOk(data: any, error: any, label: string) {
  if (error) throw Object.assign(new Error(`${label}: ${error.message}`), { status: 500 });
  return data;
}

// ─── LIST ─────────────────────────────────────────────────────────────────────
router.get('/', async ctx => {
  const { userId } = ctx.state.auth;
  const { data, error } = await db.from('workspaces')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at');
  ctx.body = assertOk(data, error, 'list workspaces');
});

// ─── CREATE ───────────────────────────────────────────────────────────────────
router.post('/', async ctx => {
  const { userId } = ctx.state.auth;
  const { name, theme, avatar, remoteUrl, gitUser, gitEmail } = ctx.request.body as any;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }

  const id        = genId();
  const createdAt = now();
  const row = {
    id,
    user_id:    userId,
    name,
    theme:      theme     || 'cyber',
    avatar:     avatar    ?? 0,
    remote_url: remoteUrl || null,
    git_user:   gitUser   || 'FORBINDEN Operator',
    git_email:  gitEmail  || 'operator@forbinden.local',
    created_at: createdAt,
    updated_at: createdAt,
  };
  const { data, error } = await db.from('workspaces').insert(row).select().single();
  assertOk(data, error, 'create workspace');

  await git.ensureRepo(id, gitUser, gitEmail);
  ctx.status = 201;
  ctx.body   = data;
});

// ─── PARAM GUARD ─────────────────────────────────────────────────────────────
router.param('wsId', async (wsId, ctx, next) => {
  const { userId } = ctx.state.auth;
  const { data, error } = await db.from('workspaces')
    .select('*')
    .eq('id', wsId)
    .eq('user_id', userId)
    .single();
  if (error || !data) { ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return; }
  ctx.state.workspace = data;
  await git.ensureRepo(wsId, data.git_user, data.git_email).catch(() => {});
  await next();
});

// ─── GET ──────────────────────────────────────────────────────────────────────
router.get('/:wsId', ctx => { ctx.body = ctx.state.workspace; });

// ─── PATCH ────────────────────────────────────────────────────────────────────
router.patch('/:wsId', async ctx => {
  const { name, theme, avatar, remoteUrl, gitUser, gitEmail } = ctx.request.body as any;
  const patch: Record<string, any> = { updated_at: now() };
  if (name      !== undefined) patch['name']       = name;
  if (theme     !== undefined) patch['theme']      = theme;
  if (avatar    !== undefined) patch['avatar']     = avatar;
  if (remoteUrl !== undefined) patch['remote_url'] = remoteUrl;
  if (gitUser   !== undefined) patch['git_user']   = gitUser;
  if (gitEmail  !== undefined) patch['git_email']  = gitEmail;

  if (remoteUrl) await git.setRemote(ctx.params.wsId, remoteUrl).catch(() => {});
  const { data, error } = await db.from('workspaces')
    .update(patch).eq('id', ctx.params.wsId).select().single();
  ctx.body = assertOk(data, error, 'patch workspace');
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
router.delete('/:wsId', async ctx => {
  const wsId = ctx.params.wsId;
  const tables = ['board_cards','board_columns','edges','groups','nodes',
                  'operator_notes','terminal_history'];
  for (const t of tables) {
    await db.from(t).delete().eq('workspace_id', wsId);
  }
  await db.from('workspaces').delete().eq('id', wsId);
  ctx.status = 204;
});

// ─── FULL STATE (single-round-trip boot) ──────────────────────────────────────
router.get('/:wsId/state', async ctx => {
  const wsId = ctx.params.wsId;
  const [nodesR, edgesR, groupsR, colsR, cardsR] = await Promise.all([
    db.from('nodes').select('*').eq('workspace_id', wsId).order('created_at'),
    db.from('edges').select('*').eq('workspace_id', wsId),
    db.from('groups').select('*').eq('workspace_id', wsId),
    db.from('board_columns').select('*').eq('workspace_id', wsId).order('position'),
    db.from('board_cards').select('*').eq('workspace_id', wsId).order('position'),
  ]);
  const gitStatus = await git.status(wsId).catch(() => ({}));
  const gitGraph  = await git.graphLog(wsId, 150).catch(() => ({ commits: [], lanes: 0 }));
  ctx.body = {
    workspace: ctx.state.workspace,
    nodes:     nodesR.data   || [],
    edges:     edgesR.data   || [],
    groups:    groupsR.data  || [],
    columns:   colsR.data    || [],
    cards:     cardsR.data   || [],
    git:       { status: gitStatus, graph: gitGraph },
  };
});

// ─── GROUPS ──────────────────────────────────────────────────────────────────
router.post('/:wsId/groups', async ctx => {
  const wsId = ctx.params.wsId;
  const { name, color, node_ids } = ctx.request.body as any;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }
  const row = {
    id: genId2('grp'),
    workspace_id: wsId,
    name,
    color: color || '#4285f4',
    node_ids: node_ids || [],
    created_at: now(),
  };
  const { data, error } = await db.from('groups').insert(row).select().single();
  ctx.status = 201;
  ctx.body = assertOk(data, error, 'create group');
});

router.patch('/:wsId/groups/:groupId', async ctx => {
  const { name, color, node_ids } = ctx.request.body as any;
  const patch: Record<string, any> = {};
  if (name     !== undefined) patch['name']     = name;
  if (color    !== undefined) patch['color']    = color;
  if (node_ids !== undefined) patch['node_ids'] = node_ids;
  const { data, error } = await db.from('groups')
    .update(patch).eq('id', ctx.params.groupId).eq('workspace_id', ctx.params.wsId)
    .select().single();
  ctx.body = assertOk(data, error, 'patch group');
});

router.delete('/:wsId/groups/:groupId', async ctx => {
  await db.from('groups')
    .delete().eq('id', ctx.params.groupId).eq('workspace_id', ctx.params.wsId);
  ctx.status = 204;
});

export default router;
