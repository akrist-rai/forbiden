// src/routes/nodes.ts — Node + Code CRUD routes
import Router from '@koa/router';
import { db } from '../db/index.ts';
import * as schema from '../db/schema.ts';
import * as git from '../git/manager.ts';
import { eq, and } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.ts';
import { broadcast } from '../ws/manager.ts';

const router = new Router({ prefix: '/api/workspaces/:wsId' });
router.use(requireAuth);

const uuid12 = () => 'n_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const now    = () => new Date().toISOString();

// ─── PARAM GUARD ─────────────────────────────────────────────────────────────
router.param('wsId', async (wsId, ctx, next) => {
  const { userId } = ctx.state.auth;
  const ws = await db.query.workspaces.findFirst({
    where: and(eq(schema.workspaces.id, wsId), eq(schema.workspaces.userId, userId)),
  });
  if (!ws) { ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return; }
  ctx.state.workspace = ws;
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
    id:          uuid12(),
    workspaceId: ctx.params.wsId,
    label,
    filepath:    rest.filepath || label,
    type:        rest.type     || 'function',
    isMain:      !!rest.isMain,
    x:           rest.x        ?? 0,
    y:           rest.y        ?? 0,
    themeIdx:    rest.themeIdx ?? 0,
    classId:     null,
    modified:    false,
    createdAt,
    updatedAt:   createdAt,
  };
  await db.insert(schema.nodes).values(node);
  git.writeFile(ctx.params.wsId, node.filepath, code);
  const full = { ...node, code };
  broadcast(ctx.params.wsId, { type: 'node:created', payload: full });
  ctx.status = 201;
  ctx.body   = full;
});

// ─── GET NODE ─────────────────────────────────────────────────────────────────
router.get('/nodes/:nodeId', async ctx => {
  const node = await db.query.nodes.findFirst({
    where: and(eq(schema.nodes.id, ctx.params.nodeId), eq(schema.nodes.workspaceId, ctx.params.wsId)),
  });
  if (!node) { ctx.status = 404; ctx.body = { error: 'Node not found' }; return; }
  ctx.body = { ...node, code: git.readFile(ctx.params.wsId, node.filepath) ?? '' };
});

// ─── PATCH NODE ───────────────────────────────────────────────────────────────
router.patch('/nodes/:nodeId', async ctx => {
  const node = await db.query.nodes.findFirst({
    where: and(eq(schema.nodes.id, ctx.params.nodeId), eq(schema.nodes.workspaceId, ctx.params.wsId)),
  });
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const { filepath, ...rest } = ctx.request.body as any;
  if (filepath && filepath !== node.filepath) git.renameFile(ctx.params.wsId, node.filepath, filepath);
  const patch: any = { ...rest, updatedAt: now() };
  if (filepath) patch.filepath = filepath;
  await db.update(schema.nodes).set(patch).where(eq(schema.nodes.id, ctx.params.nodeId));
  const updated = await db.query.nodes.findFirst({ where: eq(schema.nodes.id, ctx.params.nodeId) });
  broadcast(ctx.params.wsId, { type: 'node:updated', payload: { ...updated, code: git.readFile(ctx.params.wsId, updated!.filepath) ?? '' } });
  ctx.body = updated;
});

// ─── DELETE NODE ──────────────────────────────────────────────────────────────
router.delete('/nodes/:nodeId', async ctx => {
  const node = await db.query.nodes.findFirst({
    where: and(eq(schema.nodes.id, ctx.params.nodeId), eq(schema.nodes.workspaceId, ctx.params.wsId)),
  });
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  git.deleteFile(ctx.params.wsId, node.filepath);
  await db.delete(schema.edges).where(eq(schema.edges.source, node.id));
  await db.delete(schema.edges).where(eq(schema.edges.target, node.id));
  await db.delete(schema.nodes).where(eq(schema.nodes.id, node.id));
  broadcast(ctx.params.wsId, { type: 'node:deleted', payload: { id: node.id } });
  ctx.status = 204;
});

// ─── BULK POSITION ────────────────────────────────────────────────────────────
router.put('/nodes/positions', async ctx => {
  const { positions } = ctx.request.body as any;
  if (!Array.isArray(positions)) { ctx.status = 400; ctx.body = { error: 'positions array required' }; return; }
  await Promise.all(positions.map(({ id, x, y }: any) =>
    db.update(schema.nodes).set({ x, y, updatedAt: now() }).where(eq(schema.nodes.id, id))
  ));
  ctx.body = { updated: positions.length };
});

// ─── CODE ─────────────────────────────────────────────────────────────────────
router.get('/nodes/:nodeId/code', async ctx => {
  const node = await db.query.nodes.findFirst({
    where: and(eq(schema.nodes.id, ctx.params.nodeId), eq(schema.nodes.workspaceId, ctx.params.wsId)),
  });
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const content = git.readFile(ctx.params.wsId, node.filepath);
  if (content === null) { ctx.status = 404; ctx.body = { error: 'File not on disk' }; return; }
  ctx.type = 'text/plain';
  ctx.body = content;
});

router.put('/nodes/:nodeId/code', async ctx => {
  const node = await db.query.nodes.findFirst({
    where: and(eq(schema.nodes.id, ctx.params.nodeId), eq(schema.nodes.workspaceId, ctx.params.wsId)),
  });
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const body = ctx.request.body as any;
  const code = typeof body.code === 'string' ? body.code : JSON.stringify(body);
  git.writeFile(ctx.params.wsId, node.filepath, code);
  await db.update(schema.nodes).set({ modified: true, updatedAt: now() }).where(eq(schema.nodes.id, node.id));
  broadcast(ctx.params.wsId, { type: 'node:code', payload: { id: node.id, code } });
  ctx.body = { saved: true, filepath: node.filepath };
});

router.get('/nodes/:nodeId/code/:hash', async ctx => {
  const node = await db.query.nodes.findFirst({
    where: and(eq(schema.nodes.id, ctx.params.nodeId), eq(schema.nodes.workspaceId, ctx.params.wsId)),
  });
  if (!node) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
  const content = await git.showFileAtCommit(ctx.params.wsId, node.filepath, ctx.params.hash);
  if (!content) { ctx.status = 404; ctx.body = { error: 'File not found at commit' }; return; }
  ctx.type = 'text/plain';
  ctx.body = content;
});

// ─── EDGES ────────────────────────────────────────────────────────────────────
router.get('/edges', async ctx => {
  ctx.body = await db.query.edges.findMany({ where: eq(schema.edges.workspaceId, ctx.params.wsId) });
});

router.post('/edges', async ctx => {
  const { source, target } = ctx.request.body as any;
  if (!source || !target) { ctx.status = 400; ctx.body = { error: 'source and target required' }; return; }
  const edge = { id: 'e_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12), workspaceId: ctx.params.wsId, source, target, createdAt: now() };
  await db.insert(schema.edges).values(edge);
  broadcast(ctx.params.wsId, { type: 'edge:created', payload: edge });
  ctx.status = 201;
  ctx.body   = edge;
});

router.delete('/edges/:edgeId', async ctx => {
  await db.delete(schema.edges).where(eq(schema.edges.id, ctx.params.edgeId));
  broadcast(ctx.params.wsId, { type: 'edge:deleted', payload: { id: ctx.params.edgeId } });
  ctx.status = 204;
});

// ─── GROUPS ───────────────────────────────────────────────────────────────────
router.get('/groups', async ctx => {
  ctx.body = await db.query.groups.findMany({ where: eq(schema.groups.workspaceId, ctx.params.wsId) });
});

router.post('/groups', async ctx => {
  const { name, color, nodeIds } = ctx.request.body as any;
  if (!name || !Array.isArray(nodeIds) || nodeIds.length < 2) {
    ctx.status = 400; ctx.body = { error: 'name and nodeIds (min 2) required' }; return;
  }
  const group = { id: 'g_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12), workspaceId: ctx.params.wsId, name, color: color || '#10b981', nodeIds: [...new Set(nodeIds as string[])], createdAt: now() };
  await db.insert(schema.groups).values(group);
  await Promise.all((nodeIds as string[]).map(id => db.update(schema.nodes).set({ classId: group.id, updatedAt: now() }).where(eq(schema.nodes.id, id))));
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
    const old = await db.query.groups.findFirst({ where: eq(schema.groups.id, ctx.params.groupId) });
    if (old) await Promise.all((old.nodeIds as string[]).map(id => db.update(schema.nodes).set({ classId: null }).where(eq(schema.nodes.id, id))));
    patch.nodeIds = [...new Set(nodeIds as string[])];
    await Promise.all((nodeIds as string[]).map(id => db.update(schema.nodes).set({ classId: ctx.params.groupId }).where(eq(schema.nodes.id, id))));
  }
  await db.update(schema.groups).set(patch).where(eq(schema.groups.id, ctx.params.groupId));
  const updated = await db.query.groups.findFirst({ where: eq(schema.groups.id, ctx.params.groupId) });
  broadcast(ctx.params.wsId, { type: 'group:updated', payload: updated });
  ctx.body = updated;
});

router.delete('/groups/:groupId', async ctx => {
  const group = await db.query.groups.findFirst({ where: eq(schema.groups.id, ctx.params.groupId) });
  if (group) await Promise.all((group.nodeIds as string[]).map(id => db.update(schema.nodes).set({ classId: null }).where(eq(schema.nodes.id, id))));
  await db.delete(schema.groups).where(eq(schema.groups.id, ctx.params.groupId));
  broadcast(ctx.params.wsId, { type: 'group:deleted', payload: { id: ctx.params.groupId } });
  ctx.status = 204;
});

// ─── CODE SEARCH ─────────────────────────────────────────────────────────────
router.get('/search', async ctx => {
  const q = ((ctx.query.q as string) || '').trim().toLowerCase();
  if (!q) { ctx.body = []; return; }
  const nodes = await db.query.nodes.findMany({ where: eq(schema.nodes.workspaceId, ctx.params.wsId) });
  ctx.body = nodes.reduce((acc: any[], n) => {
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
