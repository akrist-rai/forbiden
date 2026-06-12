// src/ws/handlers.ts — WebSocket message router
import { spawn } from 'node:child_process';
import { db }    from '../db/index.ts';
import * as schema from '../db/schema.ts';
import * as git  from '../git/manager.ts';
import { eq }    from 'drizzle-orm';
import { joinRoom, leaveRoom, broadcast, send, type WsClient } from './manager.ts';
import { syncWorkspaceRepo } from '../git/manager.ts';

// ─── TERMINAL SESSIONS ────────────────────────────────────────────────────────
const termSessions = new Map<number, { proc: ReturnType<typeof spawn>; wsId: string }>();

function spawnTerminal(ws: WsClient, wsId: string) {
  const repoDir = git.repoPath(wsId);
  const shell   = process.platform === 'win32' ? 'cmd.exe' : '/bin/bash';
  const proc    = spawn(shell, [], {
    env: { ...process.env, TERM: 'xterm-256color' },
    cwd: repoDir,
  });
  proc.stdout!.on('data', (d: Buffer) => send(ws, { type: 'terminal:output', data: d.toString() }));
  proc.stderr!.on('data', (d: Buffer) => send(ws, { type: 'terminal:output', data: d.toString(), stream: 'stderr' }));
  proc.on('exit', (code: number | null) => {
    send(ws, { type: 'terminal:exit', code });
    termSessions.delete(ws._clientId!);
  });
  termSessions.set(ws._clientId!, { proc, wsId });
}

function killTerminal(clientId?: number) {
  if (!clientId) return;
  const s = termSessions.get(clientId);
  if (s) { try { s.proc.kill(); } catch {} termSessions.delete(clientId); }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
async function buildState(wsId: string) {
  const [ws_nodes, ws_edges, ws_groups, cols, cards] = await Promise.all([
    db.query.nodes.findMany({ where: eq(schema.nodes.workspaceId, wsId), orderBy: schema.nodes.createdAt }),
    db.query.edges.findMany({ where: eq(schema.edges.workspaceId, wsId) }),
    db.query.groups.findMany({ where: eq(schema.groups.workspaceId, wsId) }),
    db.query.boardColumns.findMany({ where: eq(schema.boardColumns.workspaceId, wsId), orderBy: schema.boardColumns.position }),
    db.query.boardCards.findMany({ where: eq(schema.boardCards.workspaceId, wsId), orderBy: schema.boardCards.position }),
  ]);
  const gitStatus = await git.status(wsId).catch(() => ({}));
  const gitGraph  = await git.graphLog(wsId, 150).catch(() => ({ commits: [], lanes: 0 }));
  return { nodes: ws_nodes, edges: ws_edges, groups: ws_groups, columns: cols, cards, git: { status: gitStatus, graph: gitGraph } };
}

// ─── MESSAGE ROUTER ───────────────────────────────────────────────────────────
export async function handleMessage(ws: WsClient, raw: string) {
  let msg: { type: string; wsId: string; payload: Record<string, any> };
  try { msg = JSON.parse(raw); } catch { return; }
  const { type, wsId, payload = {} } = msg;

  // ── JOIN ────────────────────────────────────────────────────────────────
  if (type === 'workspace:join') {
    joinRoom(ws, wsId);
    const workspace = await db.query.workspaces.findFirst({ where: eq(schema.workspaces.id, wsId) });
    await git.ensureRepo(wsId, workspace?.gitUser ?? undefined, workspace?.gitEmail ?? undefined).catch(() => {});
    git.watchRepo(wsId, async filepath => {
      const code = git.readFile(wsId, filepath);
      broadcast(wsId, { type: 'file:changed', payload: { filepath, code } });
      const s = await git.status(wsId).catch(() => ({}));
      broadcast(wsId, { type: 'git:status', payload: s });
    });
    const state = await buildState(wsId);
    send(ws, { type: 'workspace:state', wsId, payload: state });
    broadcast(wsId, { type: 'presence:joined', payload: { avatar: payload['avatar'] ?? 0 } }, ws);
    return;
  }

  if (type === 'workspace:leave') { leaveRoom(ws); return; }

  // ── CODE SAVE ───────────────────────────────────────────────────────────
  if (type === 'node:code') {
    broadcast(wsId, { type: 'node:code', payload }, ws);
    const node = await db.query.nodes.findFirst({ where: eq(schema.nodes.id, payload['id']) });
    if (node) {
      git.writeFile(wsId, node.filepath, payload['code']);
      await db.update(schema.nodes).set({ modified: true, updatedAt: new Date().toISOString() }).where(eq(schema.nodes.id, node.id));
      const s = await git.status(wsId).catch(() => ({}));
      send(ws, { type: 'git:status', payload: s });
    }
    return;
  }

  // ── NODE POSITION ────────────────────────────────────────────────────────
  if (type === 'node:position') {
    broadcast(wsId, { type: 'node:position', payload }, ws);
    await db.update(schema.nodes).set({ x: payload['x'], y: payload['y'], updatedAt: new Date().toISOString() }).where(eq(schema.nodes.id, payload['id']));
    return;
  }

  // ── NODE CREATE / DELETE ─────────────────────────────────────────────────
  if (type === 'node:create') {
    const id = 'n_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    const now = new Date().toISOString();
    const node = { id, workspaceId: wsId, label: payload['label'], filepath: payload['filepath'] || payload['label'], type: payload['type'] || 'function', isMain: !!payload['isMain'], x: payload['x'] || 0, y: payload['y'] || 0, themeIdx: payload['themeIdx'] || 0, classId: null, modified: false, createdAt: now, updatedAt: now };
    await db.insert(schema.nodes).values(node);
    git.writeFile(wsId, node.filepath, payload['code'] || '');
    broadcast(wsId, { type: 'node:created', payload: { ...node, code: payload['code'] || '' } });
    return;
  }
  if (type === 'node:delete') {
    const node = await db.query.nodes.findFirst({ where: eq(schema.nodes.id, payload['id']) });
    if (node) git.deleteFile(wsId, node.filepath);
    await db.delete(schema.nodes).where(eq(schema.nodes.id, payload['id']));
    await db.delete(schema.edges).where(eq(schema.edges.source, payload['id']));
    await db.delete(schema.edges).where(eq(schema.edges.target, payload['id']));
    broadcast(wsId, { type: 'node:deleted', payload: { id: payload['id'] } });
    return;
  }

  // ── EDGES ────────────────────────────────────────────────────────────────
  if (type === 'edge:create') {
    const edge = { id: 'e_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12), workspaceId: wsId, source: payload['source'], target: payload['target'], createdAt: new Date().toISOString() };
    await db.insert(schema.edges).values(edge);
    broadcast(wsId, { type: 'edge:created', payload: edge });
    return;
  }
  if (type === 'edge:delete') {
    await db.delete(schema.edges).where(eq(schema.edges.id, payload['id']));
    broadcast(wsId, { type: 'edge:deleted', payload: { id: payload['id'] } });
    return;
  }

  // ── GROUPS ───────────────────────────────────────────────────────────────
  if (type === 'group:create') {
    const group = { id: 'g_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12), workspaceId: wsId, name: payload['name'], color: payload['color'] || '#10b981', nodeIds: payload['nodeIds'] || [], createdAt: new Date().toISOString() };
    await db.insert(schema.groups).values(group);
    broadcast(wsId, { type: 'group:created', payload: group });
    return;
  }
  if (type === 'group:delete') {
    await db.delete(schema.groups).where(eq(schema.groups.id, payload['id']));
    broadcast(wsId, { type: 'group:deleted', payload: { id: payload['id'] } });
    return;
  }

  // ── GIT OPS ─────────────────────────────────────────────────────────────
  if (type === 'git:commit') {
    try {
      const hash = await git.commit(wsId, payload['message']);
      await db.update(schema.nodes).set({ modified: false, updatedAt: new Date().toISOString() }).where(eq(schema.nodes.workspaceId, wsId));
      const graph = await git.graphLog(wsId, 150).catch(() => ({ commits: [], lanes: 0 }));
      broadcast(wsId, { type: 'git:committed', payload: { hash, message: payload['message'] } });
      broadcast(wsId, { type: 'git:graph', payload: graph });
    } catch (e: any) { send(ws, { type: 'git:error', payload: { op: 'commit', error: e.message } }); }
    return;
  }

  if (type === 'git:push') {
    try {
      await git.push(wsId, payload['remote'] || 'origin', payload['branch'] || '');
      broadcast(wsId, { type: 'git:pushed', payload: { remote: payload['remote'] || 'origin' } });
    } catch (e: any) { send(ws, { type: 'git:error', payload: { op: 'push', error: e.message } }); }
    return;
  }

  if (type === 'git:pull') {
    try {
      await git.pull(wsId, payload['remote'] || 'origin', payload['branch'] || '');
      const state = await buildState(wsId);
      broadcast(wsId, { type: 'git:pulled', payload: { nodes: state.nodes, graph: state.git.graph } });
      broadcast(wsId, { type: 'git:graph',  payload: state.git.graph });
    } catch (e: any) { send(ws, { type: 'git:error', payload: { op: 'pull', error: e.message } }); }
    return;
  }

  if (type === 'git:get_graph') {
    const graph = await git.graphLog(wsId, payload['limit'] || 150).catch(() => ({ commits: [], lanes: 0 }));
    send(ws, { type: 'git:graph', payload: graph });
    return;
  }

  if (type === 'git:get_status') {
    const s = await git.status(wsId).catch(() => ({}));
    send(ws, { type: 'git:status', payload: s });
    return;
  }

  if (type === 'git:checkout') {
    try {
      await git.checkoutBranch(wsId, payload['branch']);
      const state = await buildState(wsId);
      broadcast(wsId, { type: 'git:branch_switched', payload: { branch: payload['branch'], nodes: state.nodes, graph: state.git.graph } });
      broadcast(wsId, { type: 'git:status', payload: state.git.status });
      broadcast(wsId, { type: 'git:graph',  payload: state.git.graph });
    } catch (e: any) { send(ws, { type: 'git:error', payload: { op: 'checkout', error: e.message } }); }
    return;
  }

  if (type === 'git:diff') {
    const d = await git.diff(wsId, payload['filepath'] || '').catch(() => '');
    send(ws, { type: 'git:diff_result', payload: { filepath: payload['filepath'], diff: d } });
    return;
  }

  if (type === 'git:blame') {
    const b = await git.blame(wsId, payload['filepath']).catch(() => []);
    send(ws, { type: 'git:blame_result', payload: { filepath: payload['filepath'], blame: b } });
    return;
  }

  // ── BOARD ────────────────────────────────────────────────────────────────
  if (type === 'card:update') {
    const { id, ...patch } = payload;
    await db.update(schema.boardCards).set({ ...patch, updatedAt: new Date().toISOString() }).where(eq(schema.boardCards.id, id));
    const card = await db.query.boardCards.findFirst({ where: eq(schema.boardCards.id, id) });
    broadcast(wsId, { type: 'card:updated', payload: card });
    return;
  }

  // ── TERMINAL ────────────────────────────────────────────────────────────
  if (type === 'terminal:spawn') {
    if (!termSessions.has(ws._clientId!)) spawnTerminal(ws, wsId);
    send(ws, { type: 'terminal:ready', payload: { cwd: git.repoPath(wsId) } });
    return;
  }
  if (type === 'terminal:input') {
    const session = termSessions.get(ws._clientId!);
    if (session) session.proc.stdin!.write(payload['data']);
    return;
  }
  if (type === 'terminal:kill') { killTerminal(ws._clientId); return; }

  // ── CURSOR / CHAT / NOTES ────────────────────────────────────────────────
  if (type === 'cursor:update') {
    broadcast(wsId, { type: 'cursor:update', payload: { ...payload, clientId: ws._clientId } }, ws);
    return;
  }
  if (type === 'chat:message') {
    broadcast(wsId, { type: 'chat:message', payload: { text: payload['text'], avatar: payload['avatar'], ts: Date.now() } });
    return;
  }
  if (type === 'notes:save') {
    await db.insert(schema.operatorNotes).values({ workspaceId: wsId, content: payload['content'], updatedAt: new Date().toISOString() })
      .onConflictDoUpdate({ target: schema.operatorNotes.workspaceId, set: { content: payload['content'], updatedAt: new Date().toISOString() } });
    broadcast(wsId, { type: 'notes:updated', payload: { content: payload['content'] } }, ws);
    return;
  }
}
