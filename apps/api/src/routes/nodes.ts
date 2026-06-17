// src/routes/nodes.ts — Node + Code CRUD routes (Supabase REST client)
import Router from '@koa/router';
import { db } from '../db/index.ts';
import * as git from '../git/manager.ts';
import { requireAuth } from '../middleware/auth.ts';
import { broadcast } from '../ws/manager.ts';

const router = new Router({ prefix: '/api/workspaces/:wsId' });
router.use(requireAuth);

const genId = (prefix: string) => prefix + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const now   = () => new Date().toISOString();

async function getNode(wsId: string, nodeId: string) {
  const { data } = await db.from('nodes').select('*').eq('id', nodeId).eq('workspace_id', wsId).single();
  return data;
}
async function getGroup(groupId: string) {
  const { data } = await db.from('groups').select('*').eq('id', groupId).single();
  return data;
}

// ─── PARAM GUARD ─────────────────────────────────────────────────────────────
router.param('wsId', async (wsId, ctx, next) => {
  const { userId } = ctx.state.auth;
  const { data, error } = await db.from('workspaces').select('*').eq('id', wsId).eq('user_id', userId).single();
  if (error || !data) { ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return; }
  ctx.state.workspace = data;
  await next();
});

// ─── LIST NODES ───────────────────────────────────────────────────────────────
router.get('/nodes', async ctx => {
  ctx.body = await git.syncWorkspaceRepo(ctx.params.wsId);
});

// ─── CREATE NODE ──────────────────────────────────────────────────────────────
router.post('/nodes', async ctx => {
  const { label, code = '', ...rest } = ctx.request.body as any;
  if (!label) { ctx.status = 400; ctx.body = { error: 'label required' }; return; }
  const createdAt = now();
  const node = {
    id:           genId('n'),
    workspace_id: ctx.params.wsId,
    label,
    filepath:     rest.filepath || label,
    type:         rest.type     || 'function',
    is_main:      !!rest.isMain,
    x:            rest.x        ?? 0,
    y:            rest.y        ?? 0,
    theme_idx:    rest.themeIdx ?? 0,
    class_id:     null,
    modified:     false,
    created_at:   createdAt,
    updated_at:   createdAt,
  };
  await db.from('nodes').insert(node);
  git.writeFile(ctx.params.wsId, node.filepath, code);
  const full = { ...node, code };
  broadcast(ctx.params.wsId, { type: 'node:created', payload: full });
  ctx.status = 201;
  ctx.body   = full;
});

// ─── GET NODE ─────────────────────────────────────────────────────────────────
router.get('/nodes/:nodeId', async ctx => {
  const node = await getNode(ctx.params.wsId, ctx.params.nodeId);
  if (!node) { ctx.status = 404; ctx.body = { error: 'Node not found' }; return; }
  ctx.body = { ...node, code: git.readFile(ctx.params.wsId, node.filepath) ?? '' };
});

// ─── PATCH NODE ───────────────────────────────────────────────────────────────
router.patch('/nodes/:nodeId', async ctx => {
  const node = await getNode(ctx.params.wsId, ctx.params.nodeId);
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const { filepath, x, y, label, type, isMain, themeIdx, ...rest } = ctx.request.body as any;
  if (filepath && filepath !== node.filepath) git.renameFile(ctx.params.wsId, node.filepath, filepath);
  const patch: any = { updated_at: now() };
  if (filepath  !== undefined) patch.filepath  = filepath;
  if (x         !== undefined) patch.x         = x;
  if (y         !== undefined) patch.y         = y;
  if (label     !== undefined) patch.label     = label;
  if (type      !== undefined) patch.type      = type;
  if (isMain    !== undefined) patch.is_main   = isMain;
  if (themeIdx  !== undefined) patch.theme_idx = themeIdx;
  await db.from('nodes').update(patch).eq('id', ctx.params.nodeId);
  const { data: updated } = await db.from('nodes').select('*').eq('id', ctx.params.nodeId).single();
  broadcast(ctx.params.wsId, { type: 'node:updated', payload: { ...updated, code: git.readFile(ctx.params.wsId, updated!.filepath) ?? '' } });
  ctx.body = updated;
});

// ─── DELETE NODE ──────────────────────────────────────────────────────────────
router.delete('/nodes/:nodeId', async ctx => {
  const node = await getNode(ctx.params.wsId, ctx.params.nodeId);
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  git.deleteFile(ctx.params.wsId, node.filepath);
  await db.from('edges').delete().or(`source.eq.${node.id},target.eq.${node.id}`);
  await db.from('nodes').delete().eq('id', node.id);
  broadcast(ctx.params.wsId, { type: 'node:deleted', payload: { id: node.id } });
  ctx.status = 204;
});

// ─── BULK POSITION ────────────────────────────────────────────────────────────
router.put('/nodes/positions', async ctx => {
  const { positions } = ctx.request.body as any;
  if (!Array.isArray(positions)) { ctx.status = 400; ctx.body = { error: 'positions array required' }; return; }
  await Promise.all(positions.map(({ id, x, y }: any) =>
    db.from('nodes').update({ x, y, updated_at: now() }).eq('id', id)
  ));
  ctx.body = { updated: positions.length };
});

// ─── CODE ─────────────────────────────────────────────────────────────────────
router.get('/nodes/:nodeId/code', async ctx => {
  const node = await getNode(ctx.params.wsId, ctx.params.nodeId);
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const content = git.readFile(ctx.params.wsId, node.filepath);
  if (content === null) { ctx.status = 404; ctx.body = { error: 'File not on disk' }; return; }
  ctx.type = 'text/plain';
  ctx.body = content;
});

router.put('/nodes/:nodeId/code', async ctx => {
  const node = await getNode(ctx.params.wsId, ctx.params.nodeId);
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const body = ctx.request.body as any;
  const code = typeof body.code === 'string' ? body.code : JSON.stringify(body);
  git.writeFile(ctx.params.wsId, node.filepath, code);
  await db.from('nodes').update({ modified: true, updated_at: now() }).eq('id', node.id);
  broadcast(ctx.params.wsId, { type: 'node:code', payload: { id: node.id, code } });
  ctx.body = { saved: true, filepath: node.filepath };
});

router.get('/nodes/:nodeId/code/:hash', async ctx => {
  const node = await getNode(ctx.params.wsId, ctx.params.nodeId);
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const content = await git.showFileAtCommit(ctx.params.wsId, node.filepath, ctx.params.hash);
  if (!content) { ctx.status = 404; ctx.body = { error: 'File not found at commit' }; return; }
  ctx.type = 'text/plain';
  ctx.body = content;
});

// ─── EDGES ────────────────────────────────────────────────────────────────────
router.get('/edges', async ctx => {
  const { data } = await db.from('edges').select('*').eq('workspace_id', ctx.params.wsId);
  ctx.body = data || [];
});

router.post('/edges', async ctx => {
  const { source, target } = ctx.request.body as any;
  if (!source || !target) { ctx.status = 400; ctx.body = { error: 'source and target required' }; return; }
  const edge = { id: genId('e'), workspace_id: ctx.params.wsId, source, target, created_at: now() };
  await db.from('edges').insert(edge);
  broadcast(ctx.params.wsId, { type: 'edge:created', payload: edge });
  ctx.status = 201;
  ctx.body   = edge;
});

router.delete('/edges/:edgeId', async ctx => {
  await db.from('edges').delete().eq('id', ctx.params.edgeId);
  broadcast(ctx.params.wsId, { type: 'edge:deleted', payload: { id: ctx.params.edgeId } });
  ctx.status = 204;
});

// ─── GROUPS ───────────────────────────────────────────────────────────────────
router.get('/groups', async ctx => {
  const { data } = await db.from('groups').select('*').eq('workspace_id', ctx.params.wsId);
  ctx.body = data || [];
});

router.post('/groups', async ctx => {
  const { name, color, nodeIds } = ctx.request.body as any;
  if (!name || !Array.isArray(nodeIds) || nodeIds.length < 2) {
    ctx.status = 400; ctx.body = { error: 'name and nodeIds (min 2) required' }; return;
  }
  const group = {
    id:           genId('g'),
    workspace_id: ctx.params.wsId,
    name,
    color:        color || '#10b981',
    node_ids:     [...new Set(nodeIds as string[])],
    created_at:   now(),
  };
  await db.from('groups').insert(group);
  await Promise.all((nodeIds as string[]).map(id =>
    db.from('nodes').update({ class_id: group.id, updated_at: now() }).eq('id', id)
  ));
  broadcast(ctx.params.wsId, { type: 'group:created', payload: group });
  ctx.status = 201;
  ctx.body   = group;
});

router.patch('/groups/:groupId', async ctx => {
  const { name, color, nodeIds } = ctx.request.body as any;
  const patch: any = {};
  if (name)  patch.name  = name;
  if (color) patch.color = color;
  if (Array.isArray(nodeIds)) {
    const old = await getGroup(ctx.params.groupId);
    if (old?.node_ids) {
      await Promise.all((old.node_ids as string[]).map(id =>
        db.from('nodes').update({ class_id: null }).eq('id', id)
      ));
    }
    patch.node_ids = [...new Set(nodeIds as string[])];
    await Promise.all((nodeIds as string[]).map(id =>
      db.from('nodes').update({ class_id: ctx.params.groupId }).eq('id', id)
    ));
  }
  await db.from('groups').update(patch).eq('id', ctx.params.groupId);
  const { data: updated } = await db.from('groups').select('*').eq('id', ctx.params.groupId).single();
  broadcast(ctx.params.wsId, { type: 'group:updated', payload: updated });
  ctx.body = updated;
});

router.delete('/groups/:groupId', async ctx => {
  const group = await getGroup(ctx.params.groupId);
  if (group?.node_ids) {
    await Promise.all((group.node_ids as string[]).map(id =>
      db.from('nodes').update({ class_id: null }).eq('id', id)
    ));
  }
  await db.from('groups').delete().eq('id', ctx.params.groupId);
  broadcast(ctx.params.wsId, { type: 'group:deleted', payload: { id: ctx.params.groupId } });
  ctx.status = 204;
});

// ─── CODE SEARCH ─────────────────────────────────────────────────────────────
router.get('/search', async ctx => {
  const q = ((ctx.query.q as string) || '').trim().toLowerCase();
  if (!q) { ctx.body = []; return; }
  const { data: nodes } = await db.from('nodes').select('*').eq('workspace_id', ctx.params.wsId);
  ctx.body = (nodes || []).reduce((acc: any[], n: any) => {
    const code    = git.readFile(ctx.params.wsId, n.filepath) ?? '';
    const matches = code.split('\n').reduce((a: any[], line, i) => {
      if (line.toLowerCase().includes(q)) a.push({ line: i + 1, text: line.trim() });
      return a;
    }, []);
    if (n.label.toLowerCase().includes(q) || matches.length) acc.push({ node: n, matches });
    return acc;
  }, []);
});

export default router;
