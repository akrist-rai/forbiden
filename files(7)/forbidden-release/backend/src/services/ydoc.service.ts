/**
 * YDocService
 *
 * Manages the lifecycle of Yjs documents: loading from MongoDB, applying
 * incoming updates, and flushing back to disk.
 *
 * IN-MEMORY CACHE:
 *   Active documents are kept in a Map so that multiple socket connections
 *   editing the same node share one in-process YDoc. The cache is keyed by
 *   docId (workspaceId:nodeId).
 *
 *   Cache entries are evicted when all editors of a node disconnect.
 *   Pending updates are flushed to MongoDB before eviction.
 *
 * FLUSH STRATEGY:
 *   We debounce flushes by 2 seconds. This means at most 1 MongoDB write per
 *   node per 2 seconds regardless of how many keystrokes happen.
 *
 *   On flush:
 *     1. Write YDoc binary state + state vector to the ydocs collection
 *     2. Extract plaintext from YText("code") and write to node.code
 *        (so search, display, container sync, and snapshots stay current)
 *
 * INITIALISATION FROM PLAIN TEXT:
 *   If no YDoc exists yet for a node (first time a node is opened for collab),
 *   we seed the YText with the existing node.code content. This ensures
 *   legacy plaintext nodes become collaborative without data loss.
 */

import * as Y from 'yjs';
import { YDoc, makeDocId, type IYDoc } from '@/models/ydoc.model';
import { Node } from '@/models/node.model';

interface LiveDoc {
  doc: Y.Doc;
  refCount: number;
  flushTimer: ReturnType<typeof setTimeout> | null;
  dirty: boolean;
}

const cache = new Map<string, LiveDoc>();

const FLUSH_DEBOUNCE_MS = 2_000;
const TEXT_FIELD = 'code';

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Get or create an in-memory YDoc for a node.
 * On first access, loads persisted state from MongoDB (or seeds from node.code).
 */
export async function getOrCreateDoc(
  workspaceId: string,
  nodeId: string,
): Promise<Y.Doc> {
  const docId = makeDocId(workspaceId, nodeId);

  if (cache.has(docId)) {
    cache.get(docId)!.refCount++;
    return cache.get(docId)!.doc;
  }

  const doc = new Y.Doc({ gc: true });

  // Try to load persisted CRDT state
  const persisted = await YDoc.findOne({ docId }).lean();
  if (persisted?.state?.length) {
    Y.applyUpdate(doc, persisted.state);
  } else {
    // No CRDT state yet — seed from plain-text node.code
    const node = await Node.findOne({ id: nodeId, workspaceId }).lean();
    if (node?.code) {
      const yText = doc.getText(TEXT_FIELD);
      doc.transact(() => {
        yText.insert(0, node.code);
      });
    }
  }

  cache.set(docId, { doc, refCount: 1, flushTimer: null, dirty: false });
  return doc;
}

export const getOrLoadDoc = getOrCreateDoc;

/**
 * Apply a binary Yjs update to an in-memory document and schedule a flush.
 * Called when a client sends a `crdt:update` event.
 */
export function applyUpdate(workspaceId: string, nodeId: string, update: Uint8Array): void {
  const docId = makeDocId(workspaceId, nodeId);
  const live = cache.get(docId);
  if (!live) return;

  Y.applyUpdate(live.doc, update);
  live.dirty = true;
  schedulFlush(workspaceId, nodeId, live);
}

/**
 * Release a reference to a document (called on socket disconnect).
 * Flushes immediately if this was the last editor, then evicts from cache.
 */
export async function releaseDoc(workspaceId: string, nodeId: string): Promise<void> {
  const docId = makeDocId(workspaceId, nodeId);
  const live = cache.get(docId);
  if (!live) return;

  live.refCount = Math.max(0, live.refCount - 1);

  if (live.refCount === 0) {
    // Last editor left — flush immediately and evict
    if (live.flushTimer) clearTimeout(live.flushTimer);
    if (live.dirty) await flush(workspaceId, nodeId, live);
    live.doc.destroy();
    cache.delete(docId);
  }
}

/**
 * Encode the full state of a document as a binary update.
 * Used to respond to sync-step-1 requests.
 */
export function encodeStateAsUpdate(
  workspaceId: string,
  nodeId: string,
  incomingStateVector?: Uint8Array,
): Uint8Array | null {
  const docId = makeDocId(workspaceId, nodeId);
  const live = cache.get(docId);
  if (!live) return null;

  return incomingStateVector
    ? Y.encodeStateAsUpdate(live.doc, incomingStateVector)
    : Y.encodeStateAsUpdate(live.doc);
}

/**
 * Encode the state vector of an in-memory document.
 */
export function encodeStateVector(workspaceId: string, nodeId: string): Uint8Array | null {
  const docId = makeDocId(workspaceId, nodeId);
  const live = cache.get(docId);
  if (!live) return null;
  return Y.encodeStateVector(live.doc);
}

/**
 * Extract current plaintext from a live YDoc.
 */
export function getPlaintext(workspaceId: string, nodeId: string): string | null {
  const docId = makeDocId(workspaceId, nodeId);
  const live = cache.get(docId);
  if (!live) return null;
  return live.doc.getText(TEXT_FIELD).toString();
}

/**
 * How many active in-memory docs are currently cached.
 */
export function cacheSize(): number {
  return cache.size;
}

// ─── Internal ─────────────────────────────────────────────────────────────────

function schedulFlush(workspaceId: string, nodeId: string, live: LiveDoc): void {
  if (live.flushTimer) clearTimeout(live.flushTimer);
  live.flushTimer = setTimeout(() => flush(workspaceId, nodeId, live), FLUSH_DEBOUNCE_MS);
}

async function flush(workspaceId: string, nodeId: string, live: LiveDoc): Promise<void> {
  try {
    const state       = Y.encodeStateAsUpdate(live.doc);
    const stateVector = Y.encodeStateVector(live.doc);
    const plaintext   = live.doc.getText(TEXT_FIELD).toString();
    const docId       = makeDocId(workspaceId, nodeId);

    await YDoc.findOneAndUpdate(
      { docId },
      { $set: { workspaceId, nodeId, state: Buffer.from(state), stateVector: Buffer.from(stateVector) } },
      { upsert: true, new: true },
    );

    // Keep the plain-text read model current
    await Node.updateOne(
      { id: nodeId, workspaceId },
      { $set: { code: plaintext, modified: true } },
    );

    live.dirty = false;
    live.flushTimer = null;
  } catch (err) {
    console.error(`[ydoc] Flush failed for ${workspaceId}:${nodeId}:`, (err as Error).message);
  }
}
