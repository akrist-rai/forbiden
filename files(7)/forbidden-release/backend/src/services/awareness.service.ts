/**
 * AwarenessService
 *
 * Manages real-time awareness data for collaborative editing:
 *   - Cursor position (line, column)
 *   - Selection range (anchor, head)
 *   - Operator identity (name, avatar index, accent color)
 *   - Currently focused node
 *
 * STORAGE:
 *   Each operator's awareness state is stored as a Redis HASH field inside
 *   a per-workspace hash key. The entire hash has a 30-second TTL, refreshed
 *   on every update. Individual fields are evicted on disconnect.
 *
 *   Key:    awareness:{workspaceId}
 *   Field:  {operatorId}
 *   Value:  JSON-encoded AwarenessState
 *   TTL:    30 seconds (reset on every update)
 *
 * WHY NOT PER-OPERATOR KEYS:
 *   A single hash per workspace lets us load ALL awareness in one HGETALL
 *   instead of scanning keys — much cheaper for the "who's online?" query.
 *
 * YJS AWARENESS PROTOCOL:
 *   Yjs has its own binary awareness protocol (`y-protocols/awareness`).
 *   We implement a simpler JSON version here because:
 *     1. Our clients use Monaco (not y-monaco's built-in awareness binding)
 *     2. We need to store awareness server-side for late-joiner hydration
 *     3. JSON is easier to extend with FORBIDDEN-specific fields
 *
 *   If y-monaco is added later, the binary protocol can layer on top of this.
 */

import { getRedis } from '@/config/redis';

export interface AwarenessCursor {
  line: number;
  column: number;
}

export interface AwarenessSelection {
  anchor: AwarenessCursor;
  head: AwarenessCursor;
}

export interface AwarenessState {
  operatorId: string;
  name: string;
  avatarIndex: number;
  accentColor: string;
  /** nodeId the operator currently has open in their editor */
  nodeId: string | null;
  cursor: AwarenessCursor | null;
  selection: AwarenessSelection | null;
  /** Whether the operator is actively typing right now */
  typing?: boolean;
  /** Epoch ms of last update — used to detect stale entries */
  ts: number;
}

const AWARENESS_TTL = 30; // seconds
const keyFor = (workspaceId: string) => `awareness:${workspaceId}`;

// ─── Write ────────────────────────────────────────────────────────────────────

/**
 * Upsert an operator's awareness state and refresh the workspace TTL.
 */
export async function setAwareness(
  workspaceId: string,
  state: AwarenessState,
): Promise<void> {
  const redis = getRedis();
  const key = keyFor(workspaceId);

  await redis.hset(key, state.operatorId, JSON.stringify({ ...state, ts: Date.now() }));
  await redis.expire(key, AWARENESS_TTL);
}

/**
 * Remove a single operator's entry (called on disconnect).
 */
export async function removeAwareness(
  workspaceId: string,
  operatorId: string,
): Promise<void> {
  const redis = getRedis();
  await redis.hdel(keyFor(workspaceId), operatorId);
}

// ─── Read ─────────────────────────────────────────────────────────────────────

/**
 * Get all active awareness states for a workspace.
 * Filters out entries older than TTL to handle cases where Redis TTL
 * hasn't fired yet but an operator has clearly disconnected.
 */
export async function getWorkspaceAwareness(workspaceId: string): Promise<AwarenessState[]> {
  const redis = getRedis();
  const raw = await redis.hgetall(keyFor(workspaceId));
  if (!raw) return [];

  const cutoff = Date.now() - AWARENESS_TTL * 1_000;

  return Object.values(raw)
    .map(v => JSON.parse(v) as AwarenessState)
    .filter(s => s.ts > cutoff);
}

/**
 * Get awareness states for all operators currently editing a specific node.
 */
export async function getNodeAwareness(
  workspaceId: string,
  nodeId: string,
): Promise<AwarenessState[]> {
  const all = await getWorkspaceAwareness(workspaceId);
  return all.filter(s => s.nodeId === nodeId);
}

/**
 * Compute a simple "who's online" summary for the workspace header.
 */
export async function getOnlineSummary(workspaceId: string): Promise<{
  count: number;
  operators: Array<{ operatorId: string; name: string; accentColor: string; nodeId: string | null }>;
}> {
  const states = await getWorkspaceAwareness(workspaceId);
  return {
    count: states.length,
    operators: states.map(s => ({
      operatorId: s.operatorId,
      name: s.name,
      accentColor: s.accentColor,
      nodeId: s.nodeId,
    })),
  };
}
