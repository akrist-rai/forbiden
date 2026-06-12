// src/routes/git.ts — All Git REST endpoints
import Router from '@koa/router';
import { db } from '../db/index.ts';
import * as schema from '../db/schema.ts';
import * as git from '../git/manager.ts';
import { eq, and } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.ts';
import { broadcast } from '../ws/manager.ts';

const router = new Router({ prefix: '/api/workspaces/:wsId/git' });
router.use(requireAuth);

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

router.get('/status', async ctx => { ctx.body = await git.status(ctx.params.wsId); });
router.get('/files',  async ctx => { ctx.body = await git.listFiles(ctx.params.wsId); });

router.get('/log', async ctx => {
  ctx.body = await git.log(ctx.params.wsId, { limit: parseInt(ctx.query.limit as string) || 100, branch: (ctx.query.branch as string) || '' });
});

router.get('/graph', async ctx => {
  ctx.body = await git.graphLog(ctx.params.wsId, parseInt(ctx.query.limit as string) || 150);
});

router.get('/log/search', async ctx => {
  const q = (ctx.query.q as string) || '';
  ctx.body = q ? await git.searchCommits(ctx.params.wsId, q) : [];
});

router.post('/commit', async ctx => {
  const { message } = ctx.request.body as any;
  if (!message) { ctx.status = 400; ctx.body = { error: 'message required' }; return; }
  try {
    const hash  = await git.commit(ctx.params.wsId, message);
    await db.update(schema.nodes).set({ modified: false, updatedAt: new Date().toISOString() }).where(eq(schema.nodes.workspaceId, ctx.params.wsId));
    const graph = await git.graphLog(ctx.params.wsId, 150);
    broadcast(ctx.params.wsId, { type: 'git:committed', payload: { hash, message, graph } });
    ctx.body = { hash, message };
  } catch (e: any) { ctx.status = 500; ctx.body = { error: e.message }; }
});

router.post('/stage',   async ctx => { await git.stageFiles(ctx.params.wsId, (ctx.request.body as any).files || ['.']).catch(() => {}); ctx.body = { staged: 'ok' }; });
router.post('/unstage', async ctx => { await git.unstageFile(ctx.params.wsId, (ctx.request.body as any).filepath); ctx.body = { unstaged: 'ok' }; });

router.get('/diff', async ctx => {
  ctx.type = 'text/plain';
  ctx.body = await git.diff(ctx.params.wsId, (ctx.query.file as string) || '');
});
router.get('/diff/:hashA/:hashB', async ctx => {
  ctx.type = 'text/plain';
  ctx.body = await git.diffCommits(ctx.params.wsId, ctx.params.hashA, ctx.params.hashB);
});
router.get('/show/:hash', async ctx => { ctx.body = await git.showCommit(ctx.params.wsId, ctx.params.hash); });
router.get('/blame', async ctx => {
  const file = ctx.query.file as string;
  if (!file) { ctx.status = 400; ctx.body = { error: 'file query param required' }; return; }
  ctx.body = await git.blame(ctx.params.wsId, file);
});

// ─── BRANCHES ────────────────────────────────────────────────────────────────
router.get('/branches', async ctx => { ctx.body = await git.listBranches(ctx.params.wsId); });
router.post('/branches', async ctx => {
  const { name, from } = ctx.request.body as any;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }
  await git.createBranch(ctx.params.wsId, name, from);
  broadcast(ctx.params.wsId, { type: 'git:branch_created', payload: { name } });
  ctx.body = { created: name };
});
router.post('/branches/checkout', async ctx => {
  const { name } = ctx.request.body as any;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }
  await git.checkoutBranch(ctx.params.wsId, name);
  broadcast(ctx.params.wsId, { type: 'git:branch_switched', payload: { branch: name } });
  ctx.body = { checked_out: name };
});
router.delete('/branches/:name', async ctx => {
  await git.deleteBranch(ctx.params.wsId, ctx.params.name, ctx.query.force === 'true');
  broadcast(ctx.params.wsId, { type: 'git:branch_deleted', payload: { name: ctx.params.name } });
  ctx.status = 204;
});
router.post('/branches/merge', async ctx => {
  const { source, message } = ctx.request.body as any;
  if (!source) { ctx.status = 400; ctx.body = { error: 'source branch required' }; return; }
  try {
    await git.mergeBranch(ctx.params.wsId, source, message);
    broadcast(ctx.params.wsId, { type: 'git:merged', payload: { source } });
    ctx.body = { merged: source };
  } catch (e: any) { ctx.status = 409; ctx.body = { error: e.message, conflict: true }; }
});

// ─── TAGS ────────────────────────────────────────────────────────────────────
router.get('/tags', async ctx => { ctx.body = await git.listTags(ctx.params.wsId); });
router.post('/tags', async ctx => {
  const { name, message } = ctx.request.body as any;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }
  await git.createTag(ctx.params.wsId, name, message);
  broadcast(ctx.params.wsId, { type: 'git:tag_created', payload: { name } });
  ctx.body = { created: name };
});
router.delete('/tags/:name', async ctx => {
  await git.deleteTag(ctx.params.wsId, ctx.params.name);
  ctx.status = 204;
});

// ─── STASH ────────────────────────────────────────────────────────────────────
router.get('/stash',     async ctx => { ctx.body = await git.stashList(ctx.params.wsId); });
router.post('/stash',     async ctx => { ctx.body = await git.stashPush(ctx.params.wsId, (ctx.request.body as any).message || '').catch(e => ({ error: (e as Error).message })); });
router.post('/stash/pop', async ctx => { ctx.body = await git.stashPop(ctx.params.wsId, (ctx.request.body as any).index ?? 0).catch(e => ({ error: (e as Error).message })); });

// ─── REMOTE ──────────────────────────────────────────────────────────────────
router.get('/remotes', async ctx => { ctx.body = await git.getRemotes(ctx.params.wsId); });
router.post('/remote', async ctx => {
  const { url } = ctx.request.body as any;
  if (!url) { ctx.status = 400; ctx.body = { error: 'url required' }; return; }
  await git.setRemote(ctx.params.wsId, url);
  await db.update(schema.workspaces).set({ remoteUrl: url, updatedAt: new Date().toISOString() }).where(eq(schema.workspaces.id, ctx.params.wsId));
  ctx.body = { set: url };
});
router.post('/push', async ctx => {
  const { remote = 'origin', branch = '' } = ctx.request.body as any;
  try {
    await git.push(ctx.params.wsId, remote, branch);
    broadcast(ctx.params.wsId, { type: 'git:pushed', payload: { remote, branch } });
    ctx.body = { pushed: true };
  } catch (e: any) { ctx.status = 500; ctx.body = { error: e.message }; }
});
router.post('/pull', async ctx => {
  const { remote = 'origin', branch = '' } = ctx.request.body as any;
  try {
    await git.pull(ctx.params.wsId, remote, branch);
    broadcast(ctx.params.wsId, { type: 'git:pulled', payload: { remote, branch } });
    ctx.body = { pulled: true };
  } catch (e: any) { ctx.status = 500; ctx.body = { error: e.message }; }
});
router.post('/fetch', async ctx => {
  try {
    await git.fetch(ctx.params.wsId, (ctx.request.body as any).remote || 'origin');
    const graph = await git.graphLog(ctx.params.wsId, 150);
    broadcast(ctx.params.wsId, { type: 'git:fetched', payload: { graph } });
    ctx.body = { fetched: true, graph };
  } catch (e: any) { ctx.status = 500; ctx.body = { error: e.message }; }
});
router.post('/clone', async ctx => {
  const { url } = ctx.request.body as any;
  if (!url) { ctx.status = 400; ctx.body = { error: 'url required' }; return; }
  try {
    await git.cloneRemote(ctx.params.wsId, url);
    await db.update(schema.workspaces).set({ remoteUrl: url, updatedAt: new Date().toISOString() }).where(eq(schema.workspaces.id, ctx.params.wsId));
    ctx.body = { cloned: url };
  } catch (e: any) { ctx.status = 500; ctx.body = { error: e.message }; }
});
router.post('/reset', async ctx => {
  const { hash, mode = 'mixed' } = ctx.request.body as any;
  if (!hash) { ctx.status = 400; ctx.body = { error: 'hash required' }; return; }
  await git.resetToCommit(ctx.params.wsId, hash, mode);
  broadcast(ctx.params.wsId, { type: 'git:reset', payload: { hash } });
  ctx.body = { reset: hash, mode };
});
router.post('/revert/:hash', async ctx => {
  try { await git.revertCommit(ctx.params.wsId, ctx.params.hash); ctx.body = { reverted: ctx.params.hash }; }
  catch (e: any) { ctx.status = 500; ctx.body = { error: e.message }; }
});
router.post('/checkout-file', async ctx => {
  const { filepath, hash } = ctx.request.body as any;
  if (!filepath || !hash) { ctx.status = 400; ctx.body = { error: 'filepath and hash required' }; return; }
  await git.checkoutFileAtCommit(ctx.params.wsId, filepath, hash);
  const code = git.readFile(ctx.params.wsId, filepath) ?? '';
  broadcast(ctx.params.wsId, { type: 'git:file_restored', payload: { filepath, hash, code } });
  ctx.body = { restored: filepath };
});

// ─── TERMINAL HISTORY ────────────────────────────────────────────────────────
router.get('/terminal/history', async ctx => {
  ctx.body = await db.query.terminalHistory.findMany({
    where: eq(schema.terminalHistory.workspaceId, ctx.params.wsId),
    orderBy: schema.terminalHistory.createdAt,
    limit: parseInt(ctx.query.limit as string) || 50,
  });
});

export default router;
