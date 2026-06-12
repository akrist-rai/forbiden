/**
 * ContainerService
 *
 * Manages per-workspace Docker containers.
 * Code lives in MongoDB as the source of truth.
 * This service writes code files into the container filesystem so operators
 * can use git (and any other tools) natively inside the terminal.
 *
 * Container layout at /workspace:
 *   /workspace/
 *   ├── nodes/
 *   │   └── {nodeId}.{ext}     ← synced from MongoDB on every NODE_EDITED
 *   ├── notes/
 *   │   └── {nodeId}.md        ← synced on NOTE_SAVED
 *   └── manifest.json          ← node graph topology
 */

import Docker from 'dockerode';
import path from 'node:path';

const docker = new Docker();

const CONTAINER_IMAGE  = process.env.WORKSPACE_IMAGE ?? 'forbidden/runtime:latest';
const WORKSPACE_ROOT   = '/workspace';
const CONTAINER_PREFIX = 'forbidden-ws-';

// ─── Language → file extension map ───────────────────────────────────────────

const LANG_EXT: Record<string, string> = {
  javascript: 'js',
  typescript: 'ts',
  python:     'py',
  rust:       'rs',
  go:         'go',
  sql:        'sql',
  markdown:   'md',
  html:       'html',
  css:        'css',
  json:       'json',
  bash:       'sh',
};

export function nodeFilename(nodeId: string, language = 'javascript'): string {
  const ext = LANG_EXT[language] ?? 'txt';
  return `nodes/${nodeId}.${ext}`;
}

// ─── Container lifecycle ──────────────────────────────────────────────────────

export async function getOrCreateContainer(workspaceId: string): Promise<Docker.Container> {
  const name = `${CONTAINER_PREFIX}${workspaceId}`;

  try {
    const container = docker.getContainer(name);
    const info = await container.inspect();

    // Resume paused container
    if (info.State.Paused) await container.unpause();
    if (!info.State.Running) await container.start();

    return container;
  } catch {
    // Container doesn't exist — create it
    const container = await docker.createContainer({
      name,
      Image: CONTAINER_IMAGE,
      Tty: true,
      AttachStdin: false,
      OpenStdin: true,
      WorkingDir: WORKSPACE_ROOT,
      Env: [`WORKSPACE_ID=${workspaceId}`],
      HostConfig: {
        Memory:           512 * 1024 * 1024,  // 512 MB
        CpuQuota:         50_000,              // 0.5 CPU
        ReadonlyRootfs:   false,
        CapDrop:          ['ALL'],
        SecurityOpt:      ['no-new-privileges'],
        // No volume mount — files are written programmatically via exec
        // This keeps MongoDB as the only source of truth
      },
    });

    await container.start();

    // Bootstrap workspace directory structure
    await execInContainer(container, ['mkdir', '-p', '/workspace/nodes', '/workspace/notes']);
    await execInContainer(container, ['git', 'init', '/workspace']);
    await execInContainer(container, ['git', '-C', '/workspace', 'config', 'user.email', 'operator@forbidden.local']);
    await execInContainer(container, ['git', '-C', '/workspace', 'config', 'user.name', 'FORBIDDEN Operator']);

    return container;
  }
}

export async function pauseContainer(workspaceId: string): Promise<void> {
  try {
    const container = docker.getContainer(`${CONTAINER_PREFIX}${workspaceId}`);
    const info = await container.inspect();
    if (info.State.Running && !info.State.Paused) await container.pause();
  } catch {}
}

export async function destroyContainer(workspaceId: string): Promise<void> {
  try {
    const container = docker.getContainer(`${CONTAINER_PREFIX}${workspaceId}`);
    await container.stop({ t: 5 });
    await container.remove({ v: true });
  } catch {}
}

// ─── File sync — writes MongoDB code into the container filesystem ─────────────

/**
 * Write a node's code into the container as a file.
 * Called by the container-sync BullMQ worker on every NODE_EDITED event.
 */
export async function syncNodeToContainer(
  workspaceId: string,
  nodeId: string,
  code: string,
  language: string,
): Promise<void> {
  const container = await getOrCreateContainer(workspaceId);
  const filePath  = path.join(WORKSPACE_ROOT, nodeFilename(nodeId, language));

  // Write file content via `sh -c` with base64 to avoid shell escaping issues
  const encoded = Buffer.from(code).toString('base64');
  await execInContainer(container, [
    'sh', '-c',
    `mkdir -p "$(dirname "${filePath}")" && echo "${encoded}" | base64 -d > "${filePath}"`,
  ]);
}

export async function deleteNodeFromContainer(
  workspaceId: string,
  nodeId: string,
  language: string,
): Promise<void> {
  try {
    const container = await getOrCreateContainer(workspaceId);
    const filePath  = path.join(WORKSPACE_ROOT, nodeFilename(nodeId, language));
    await execInContainer(container, ['rm', '-f', filePath]);
  } catch {}
}

export async function syncNoteToContainer(
  workspaceId: string,
  nodeId: string,
  content: string,
): Promise<void> {
  const container = await getOrCreateContainer(workspaceId);
  const filePath  = path.join(WORKSPACE_ROOT, `notes/${nodeId}.md`);
  const encoded   = Buffer.from(content).toString('base64');
  await execInContainer(container, [
    'sh', '-c',
    `mkdir -p /workspace/notes && echo "${encoded}" | base64 -d > "${filePath}"`,
  ]);
}

export async function syncManifestToContainer(
  workspaceId: string,
  manifest: Record<string, unknown>,
): Promise<void> {
  const container = await getOrCreateContainer(workspaceId);
  const encoded   = Buffer.from(JSON.stringify(manifest, null, 2)).toString('base64');
  await execInContainer(container, [
    'sh', '-c',
    `echo "${encoded}" | base64 -d > /workspace/manifest.json`,
  ]);
}

/**
 * On workspace load, push all nodes from MongoDB into a fresh container.
 * Used when a container is recreated after idle destruction.
 */
export async function hydrateContainer(
  workspaceId: string,
  nodes: Array<{ id: string; code: string; language: string; noteContent: string }>,
  manifest: Record<string, unknown>,
): Promise<void> {
  await getOrCreateContainer(workspaceId);
  await Promise.all([
    ...nodes.map(n => syncNodeToContainer(workspaceId, n.id, n.code, n.language)),
    ...nodes.map(n => syncNoteToContainer(workspaceId, n.id, n.noteContent)),
    syncManifestToContainer(workspaceId, manifest),
  ]);
}

// ─── Exec helper ─────────────────────────────────────────────────────────────

async function execInContainer(container: Docker.Container, cmd: string[]): Promise<string> {
  const exec = await container.exec({
    Cmd: cmd,
    AttachStdout: true,
    AttachStderr: true,
  });

  return new Promise((resolve, reject) => {
    exec.start({ hijack: false, stdin: false }, (err, stream) => {
      if (err) return reject(err);
      const chunks: Buffer[] = [];
      stream?.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream?.on('end', () => resolve(Buffer.concat(chunks).toString()));
      stream?.on('error', reject);
    });
  });
}

// ─── Idle Management ──────────────────────────────────────────────────────────
//
// Containers are tracked in a Redis sorted set:
//   Key:   container:lastActive
//   Score: Unix timestamp (seconds) of last activity
//   Member: workspaceId
//
// A BullMQ scheduled job (idle-reaper) runs every 5 minutes and:
//   - Pauses containers idle > IDLE_PAUSE_MS   (default: 15 min)
//   - Destroys containers idle > IDLE_DESTROY_MS (default: 7 days)
//
// On reconnect / workspace load, hydrateContainer() recreates and re-fills
// destroyed containers from MongoDB — so no data is lost.

import { getRedis } from '@/config/redis';

const LAST_ACTIVE_KEY = 'container:lastActive';
const IDLE_PAUSE_MS   = 15 * 60 * 1000;      // 15 minutes
const IDLE_DESTROY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Record activity for a workspace container.
 * Call this on every meaningful interaction (code edit, terminal input, etc.)
 */
export async function touchContainer(workspaceId: string): Promise<void> {
  try {
    const redis = getRedis();
    await redis.zadd(LAST_ACTIVE_KEY, Date.now(), workspaceId);
  } catch {
    // Non-fatal — idle reaper will catch up
  }
}

/**
 * Remove a workspace from the active tracking set.
 * Called when a container is destroyed.
 */
async function untrackContainer(workspaceId: string): Promise<void> {
  try {
    const redis = getRedis();
    await redis.zrem(LAST_ACTIVE_KEY, workspaceId);
  } catch {}
}

/**
 * Idle reaper — called by the BullMQ scheduled worker every 5 minutes.
 * Returns a summary of what was paused/destroyed for logging.
 */
export async function reapIdleContainers(): Promise<{
  paused: string[];
  destroyed: string[];
}> {
  const redis = getRedis();
  const now = Date.now();

  // All workspaceIds with their last-active timestamps (score = unix ms)
  const entries = await redis.zrangebyscore(LAST_ACTIVE_KEY, '-inf', '+inf', 'WITHSCORES');

  const paused: string[] = [];
  const destroyed: string[] = [];

  // entries = ['wsId1', '1700000000000', 'wsId2', ...]
  for (let i = 0; i < entries.length; i += 2) {
    const workspaceId = entries[i];
    const lastActive  = Number(entries[i + 1]);
    const idleMs      = now - lastActive;

    if (idleMs > IDLE_DESTROY_MS) {
      await destroyContainer(workspaceId).catch(() => {});
      await untrackContainer(workspaceId);
      destroyed.push(workspaceId);
    } else if (idleMs > IDLE_PAUSE_MS) {
      await pauseContainer(workspaceId).catch(() => {});
      paused.push(workspaceId);
    }
  }

  return { paused, destroyed };
}

/**
 * Get the current activity snapshot for all tracked containers.
 * Used by the admin dashboard or health endpoint.
 */
export async function getContainerActivity(): Promise<Array<{
  workspaceId: string;
  lastActiveMs: number;
  idleMinutes: number;
}>> {
  const redis = getRedis();
  const entries = await redis.zrangebyscore(LAST_ACTIVE_KEY, '-inf', '+inf', 'WITHSCORES');
  const now = Date.now();
  const result = [];

  for (let i = 0; i < entries.length; i += 2) {
    const workspaceId = entries[i];
    const lastActiveMs = Number(entries[i + 1]);
    result.push({
      workspaceId,
      lastActiveMs,
      idleMinutes: Math.floor((now - lastActiveMs) / 60_000),
    });
  }

  return result.sort((a, b) => b.lastActiveMs - a.lastActiveMs);
}

// ─── Container status broadcast ──────────────────────────────────────────────

export type ContainerStatus = 'starting' | 'running' | 'paused' | 'dead';

let _io: import('socket.io').Server | null = null;
export function setSocketIO(io: import('socket.io').Server) { _io = io; }

function emitContainerStatus(workspaceId: string, status: ContainerStatus) {
  try { _io?.to(`workspace:${workspaceId}`).emit('container:status', { status }); } catch {}
}

export async function getContainerStatus(workspaceId: string): Promise<ContainerStatus> {
  try {
    const container = docker.getContainer(`${CONTAINER_PREFIX}${workspaceId}`);
    const info = await container.inspect();
    if (info.State.Paused) return 'paused';
    if (info.State.Running) return 'running';
    return 'dead';
  } catch { return 'dead'; }
}

export async function wakeContainer(workspaceId: string): Promise<void> {
  emitContainerStatus(workspaceId, 'starting');
  try {
    await getOrCreateContainer(workspaceId);
    emitContainerStatus(workspaceId, 'running');
  } catch (err) {
    emitContainerStatus(workspaceId, 'dead');
    throw err;
  }
}

// ─── Inline node execution ────────────────────────────────────────────────────

const INTERPRETER: Record<string, string[]> = {
  python: ['python3'], javascript: ['node'],
  typescript: ['bun', 'run'], bash: ['bash'], go: ['go', 'run'],
};

export async function runNodeCode(
  workspaceId: string,
  nodeId: string,
  language: string,
  onOutput: (chunk: string, stream: 'stdout' | 'stderr') => void,
): Promise<number> {
  const container = await getOrCreateContainer(workspaceId);
  const filePath  = path.join(WORKSPACE_ROOT, nodeFilename(nodeId, language));
  const interp    = INTERPRETER[language] ?? ['sh'];
  const exec = await container.exec({
    Cmd: [...interp, filePath], AttachStdout: true, AttachStderr: true, WorkingDir: WORKSPACE_ROOT,
  });
  return new Promise((resolve, reject) => {
    exec.start({ hijack: true, stdin: false }, (err, stream) => {
      if (err) return reject(err);
      if (!stream) return resolve(1);
      container.modem.demuxStream(
        stream,
        { write(c: Buffer) { onOutput(c.toString(), 'stdout'); }, end() {} } as unknown as NodeJS.WritableStream,
        { write(c: Buffer) { onOutput(c.toString(), 'stderr'); }, end() {} } as unknown as NodeJS.WritableStream,
      );
      stream.on('end', async () => {
        try { resolve((await exec.inspect()).ExitCode ?? 0); } catch { resolve(0); }
      });
      stream.on('error', reject);
    });
  });
}

// ─── Topological sort for pipeline ────────────────────────────────────────────

export function topoSort(nodeIds: string[], edges: Array<{ source: string; target: string }>): string[] {
  const inDeg = new Map<string, number>(nodeIds.map(id => [id, 0]));
  const adj   = new Map<string, string[]>(nodeIds.map(id => [id, []]));
  for (const { source, target } of edges) {
    if (!inDeg.has(target) || !inDeg.has(source)) continue;
    inDeg.set(target, (inDeg.get(target) ?? 0) + 1);
    adj.get(source)!.push(target);
  }
  const queue  = nodeIds.filter(id => inDeg.get(id) === 0);
  const result: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node);
    for (const next of (adj.get(node) ?? [])) {
      const d = (inDeg.get(next) ?? 0) - 1;
      inDeg.set(next, d);
      if (d === 0) queue.push(next);
    }
  }
  if (result.length !== nodeIds.length) throw new Error('Cycle detected in pipeline graph');
  return result;
}
