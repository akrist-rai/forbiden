/**
 * YDoc Model
 *
 * Stores the binary-encoded Yjs document state for each node's code buffer.
 *
 * WHY BINARY:
 *   Yjs document state is a compact binary encoding of the CRDT. Storing it
 *   as a Buffer is more efficient than JSON and avoids encoding round-trips.
 *   The state vector is stored separately for fast sync-step-1 responses.
 *
 * RELATIONSHIP TO node.model.ts:
 *   - `node.code` = the last-saved plaintext snapshot (used for search, display,
 *     container sync, and fallback when no YDoc exists)
 *   - `ydoc.state` = live CRDT binary used by active collaborators
 *
 *   On every Yjs update flush (debounced 2s), we:
 *     1. Extract plaintext from YText and write to node.code
 *     2. Write the new encoded state to ydoc.state
 *
 * ONE YDOC PER NODE:
 *   Each graph node has its own independent YDoc with a single YText named "code".
 *   This keeps documents small and makes parallel editing of different nodes cheap.
 */

import { Schema, model, type Document } from 'mongoose';

export interface IYDoc extends Document {
  /** workspaceId:nodeId composite key */
  docId: string;
  workspaceId: string;
  nodeId: string;
  /**
   * Full binary-encoded Yjs document state.
   * Produced by: Y.encodeStateAsUpdate(ydoc)
   * Applied via:  Y.applyUpdate(ydoc, state)
   */
  state: Buffer;
  /**
   * Binary-encoded state vector for efficient sync-step-1 replies.
   * Produced by: Y.encodeStateVector(ydoc)
   */
  stateVector: Buffer;
  updatedAt: Date;
}

const YDocSchema = new Schema<IYDoc>(
  {
    docId:       { type: String, required: true, unique: true },
    workspaceId: { type: String, required: true, index: true },
    nodeId:      { type: String, required: true },
    state:       { type: Buffer, required: true },
    stateVector: { type: Buffer, required: true },
  },
  {
    timestamps: true,
  }
);

// Fast lookup for workspace-level operations (e.g., export all docs)
YDocSchema.index({ workspaceId: 1, nodeId: 1 });

export const YDoc = model<IYDoc>('YDoc', YDocSchema);

/** Compose the canonical document ID from workspace + node */
export function makeDocId(workspaceId: string, nodeId: string): string {
  return `${workspaceId}:${nodeId}`;
}
