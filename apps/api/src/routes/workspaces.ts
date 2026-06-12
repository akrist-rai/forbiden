// src/routes/workspaces.ts — Workspace CRUD routes
import Router from '@koa/router';
import { db } from '../db/index.ts';
import * as schema from '../db/schema.ts';
import * as git from '../git/manager.ts';
import { eq, and } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.ts';
import { broadcast } from '../ws/manager.ts';

const router = new Router({ prefix: '/api/workspaces' });
router.use(requireAuth);

const uuid12 = () => 'ws_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
const now    = () => new Date().toISOString();

// ─── LIST ─────────────────────────────────────────────────────────────────────
router.get('/', async ctx => {
  const { userId } = ctx.state.auth;
  ctx.body = await db.query.workspaces.findMany({
    where: eq(schema.workspaces.userId, userId),
    orderBy: [schema.workspaces.updatedAt],
  });
});

// ─── CREATE ───────────────────────────────────────────────────────────────────
router.post('/', async ctx => {
  const { userId } = ctx.state.auth;
  const { name, theme, avatar, remoteUrl, gitUser, gitEmail } = ctx.request.body as any;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }

  const id        = uuid12();
  const createdAt = now();
  const ws = await db.insert(schema.workspaces).values({
    id, userId, name,
    theme:     theme    || 'manga',
    avatar:    avatar   ?? 0,
    remoteUrl: remoteUrl || null,
    gitUser:   gitUser  || 'FORBINDEN Operator',
    gitEmail:  gitEmail || 'operator@forbinden.local',
    createdAt,
    updatedAt: createdAt,
  }).returning();

  await git.ensureRepo(id, gitUser, gitEmail);
  ctx.status = 201;
  ctx.body   = ws[0];
});

// ─── PARAM GUARD ─────────────────────────────────────────────────────────────
router.param('wsId', async (wsId, ctx, next) => {
  const { userId } = ctx.state.auth;
  const ws = await db.query.workspaces.findFirst({
    where: and(eq(schema.workspaces.id, wsId), eq(schema.workspaces.userId, userId)),
  });
  if (!ws) { ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return; }
  ctx.state.workspace = ws;
  await git.ensureRepo(wsId, ws.gitUser ?? undefined, ws.gitEmail ?? undefined).catch(() => {});
  await next();
});

// ─── GET ──────────────────────────────────────────────────────────────────────
router.get('/:wsId', ctx => { ctx.body = ctx.state.workspace; });

// ─── PATCH ────────────────────────────────────────────────────────────────────
router.patch('/:wsId', async ctx => {
  const { name, theme, avatar, remoteUrl, gitUser, gitEmail } = ctx.request.body as any;
  const patch: Record<string, any> = { updatedAt: now() };
  if (name      !== undefined) patch['name']      = name;
  if (theme     !== undefined) patch['theme']     = theme;
  if (avatar    !== undefined) patch['avatar']    = avatar;
  if (remoteUrl !== undefined) patch['remoteUrl'] = remoteUrl;
  if (gitUser   !== undefined) patch['gitUser']   = gitUser;
  if (gitEmail  !== undefined) patch['gitEmail']  = gitEmail;

  if (remoteUrl) await git.setRemote(ctx.params.wsId, remoteUrl).catch(() => {});
  const updated = await db.update(schema.workspaces).set(patch).where(eq(schema.workspaces.id, ctx.params.wsId)).returning();
  ctx.body = updated[0];
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
router.delete('/:wsId', async ctx => {
  const wsId = ctx.params.wsId;
  await db.delete(schema.boardCards).where(eq(schema.boardCards.workspaceId, wsId));
  await db.delete(schema.boardColumns).where(eq(schema.boardColumns.workspaceId, wsId));
  await db.delete(schema.edges).where(eq(schema.edges.workspaceId, wsId));
  await db.delete(schema.groups).where(eq(schema.groups.workspaceId, wsId));
  await db.delete(schema.nodes).where(eq(schema.nodes.workspaceId, wsId));
  await db.delete(schema.operatorNotes).where(eq(schema.operatorNotes.workspaceId, wsId));
  await db.delete(schema.terminalHistory).where(eq(schema.terminalHistory.workspaceId, wsId));
  await db.delete(schema.workspaces).where(eq(schema.workspaces.id, wsId));
  ctx.status = 204;
});

// ─── FULL STATE (single-round-trip boot) ──────────────────────────────────────
router.get('/:wsId/state', async ctx => {
  const wsId = ctx.params.wsId;
  const [ws_nodes, ws_edges, ws_groups, cols, cards] = await Promise.all([
    db.query.nodes.findMany({ where: eq(schema.nodes.workspaceId, wsId), orderBy: schema.nodes.createdAt }),
    db.query.edges.findMany({ where: eq(schema.edges.workspaceId, wsId) }),
    db.query.groups.findMany({ where: eq(schema.groups.workspaceId, wsId) }),
    db.query.boardColumns.findMany({ where: eq(schema.boardColumns.workspaceId, wsId), orderBy: schema.boardColumns.position }),
    db.query.boardCards.findMany({ where: eq(schema.boardCards.workspaceId, wsId), orderBy: schema.boardCards.position }),
  ]);
  const gitStatus = await git.status(wsId).catch(() => ({}));
  const gitGraph  = await git.graphLog(wsId, 150).catch(() => ({ commits: [], lanes: 0 }));
  ctx.body = {
    workspace: ctx.state.workspace,
    nodes:     ws_nodes,
    edges:     ws_edges,
    groups:    ws_groups,
    columns:   cols,
    cards,
    git:       { status: gitStatus, graph: gitGraph },
  };
});

export default router;
