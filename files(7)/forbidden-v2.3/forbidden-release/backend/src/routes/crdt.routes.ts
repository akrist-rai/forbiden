/**
 * CRDT REST Routes
 *
 * Provides HTTP access to collaborative document state for:
 *   - Export / backup tooling
 *   - Health checks and admin dashboards
 *   - Late-joining clients that need awareness before opening a socket
 *
 * All routes require workspace-scoped JWT auth (enforced by apiRouter middleware).
 */

import Router from '@koa/router';
import { z } from 'zod';
import { getPlaintext, encodeStateVector, cacheSize } from '@/services/ydoc.service';
import { getWorkspaceAwareness, getOnlineSummary, getNodeAwareness } from '@/services/awareness.service';
import { YDoc } from '@/models/ydoc.model';

const crdtRoutes = new Router();

// ─── GET /crdt/:workspaceId/awareness ─────────────────────────────────────────
// All operator awareness states in a workspace

crdtRoutes.get('/:workspaceId/awareness', async (ctx) => {
  const { workspaceId } = ctx.params;
  const states = await getWorkspaceAwareness(workspaceId);
  ctx.body = { workspaceId, awareness: states, count: states.length };
});

// ─── GET /crdt/:workspaceId/online ────────────────────────────────────────────
// Compact "who's online" summary

crdtRoutes.get('/:workspaceId/online', async (ctx) => {
  const { workspaceId } = ctx.params;
  ctx.body = await getOnlineSummary(workspaceId);
});

// ─── GET /crdt/:workspaceId/:nodeId/awareness ─────────────────────────────────
// Awareness for operators currently editing a specific node

crdtRoutes.get('/:workspaceId/:nodeId/awareness', async (ctx) => {
  const { workspaceId, nodeId } = ctx.params;
  const states = await getNodeAwareness(workspaceId, nodeId);
  ctx.body = { workspaceId, nodeId, awareness: states };
});

// ─── GET /crdt/:workspaceId/:nodeId/text ──────────────────────────────────────
// Current plaintext extracted from the live in-memory YDoc (if loaded)
// Falls back to the persisted YDoc state in MongoDB

crdtRoutes.get('/:workspaceId/:nodeId/text', async (ctx) => {
  const { workspaceId, nodeId } = ctx.params;

  // Try in-memory first (most current)
  const live = getPlaintext(workspaceId, nodeId);
  if (live !== null) {
    ctx.body = { source: 'live', text: live };
    return;
  }

  // Fall back to persisted binary state
  const persisted = await YDoc.findOne({ docId: `${workspaceId}:${nodeId}` }).lean();
  if (persisted) {
    // We'd need to load the YDoc to extract text — return a flag instead
    ctx.body = {
      source: 'persisted',
      text: null,
      note: 'Node not currently loaded in memory. Open the node to hydrate.',
    };
    return;
  }

  ctx.status = 404;
  ctx.body = { error: 'No YDoc found for this node' };
});

// ─── GET /crdt/:workspaceId/:nodeId/state-vector ──────────────────────────────
// Binary state vector as base64 — used by clients for manual sync

crdtRoutes.get('/:workspaceId/:nodeId/state-vector', async (ctx) => {
  const { workspaceId, nodeId } = ctx.params;
  const sv = encodeStateVector(workspaceId, nodeId);

  if (sv) {
    ctx.body = {
      source: 'live',
      stateVector: Buffer.from(sv).toString('base64'),
    };
    return;
  }

  // Return persisted state vector from MongoDB
  const persisted = await YDoc.findOne({ docId: `${workspaceId}:${nodeId}` }).lean();
  if (persisted?.stateVector) {
    ctx.body = {
      source: 'persisted',
      stateVector: persisted.stateVector.toString('base64'),
    };
    return;
  }

  ctx.status = 404;
  ctx.body = { error: 'No state vector available' };
});

// ─── GET /crdt/health ─────────────────────────────────────────────────────────
// Health check for the CRDT subsystem

crdtRoutes.get('/health', async (ctx) => {
  const totalDocs = await YDoc.countDocuments();
  ctx.body = {
    status: 'ok',
    liveDocsCached: cacheSize(),
    persistedDocs: totalDocs,
  };
});

export default crdtRoutes;

// ─── Phase 6: Monaco model initialisation ─────────────────────────────────────
//
// GET /crdt/:workspaceId/:nodeId/init
//
// Returns everything Monaco needs to open a node for the first time:
//   - The current full text (for editor value)
//   - The Yjs state as base64 update (for y-monaco binding bootstrap)
//   - The language setting (for Monaco language mode)
//   - The version number (for Monaco model version tracking)
//
// WHY THIS EXISTS:
//   When Monaco opens a node, it needs the full current text synchronously —
//   not through the incremental crdt:sync-step-1/2 handshake which adds one
//   round-trip. This endpoint returns the complete bootstrap payload in one
//   HTTP request so the Monaco model can be set up before the Socket connects.
//
// USAGE (frontend):
//   const init = await fetch(`/api/crdt/${wsId}/${nodeId}/init`);
//   const { text, yUpdate, language, modelVersion } = await init.json();
//   monaco.editor.createModel(text, language);
//   Y.applyUpdate(ydoc, Buffer.from(yUpdate, 'base64'));

import { Node } from '@/models/node.model';
import { getOrLoadDoc } from '@/services/ydoc.service';
import * as Y from 'yjs';

crdtRoutes.get('/:workspaceId/:nodeId/init', async (ctx) => {
  const { workspaceId, nodeId } = ctx.params;

  // Try to get live CRDT state
  let text: string;
  let yUpdate: string | null = null;
  let language = 'javascript';
  let modelVersion = 1;

  // Check if a YDoc is loaded in memory
  const liveText = getPlaintext(workspaceId, nodeId);

  if (liveText !== null) {
    text = liveText;
    // Encode full live state as update for y-monaco binding
    const sv = encodeStateVector(workspaceId, nodeId);
    if (sv) {
      yUpdate = Buffer.from(sv).toString('base64');
    }
  } else {
    // Fall back to persisted YDoc or node.code
    const [persistedDoc, node] = await Promise.all([
      YDoc.findOne({ docId: `${workspaceId}:${nodeId}` }).lean(),
      Node.findOne({ id: nodeId }).lean(),
    ]);

    language = node?.language ?? 'javascript';

    if (persistedDoc?.state) {
      // Load the Yjs document from binary state to extract text
      const doc = new Y.Doc();
      Y.applyUpdate(doc, persistedDoc.state);
      text = doc.getText('code').toString() || node?.code || '';
      yUpdate = Buffer.from(Y.encodeStateAsUpdate(doc)).toString('base64');
      modelVersion = persistedDoc.updatedAt ? Math.floor(persistedDoc.updatedAt.getTime() / 1000) : 1;
      doc.destroy();
    } else {
      text = node?.code ?? '';
      language = node?.language ?? 'javascript';
    }
  }

  ctx.body = {
    workspaceId,
    nodeId,
    text,
    yUpdate,        // base64 Yjs state update — apply with Y.applyUpdate(doc, Buffer.from(yUpdate, 'base64'))
    language,
    modelVersion,   // Use as Monaco model versionId for conflict detection
  };
});
