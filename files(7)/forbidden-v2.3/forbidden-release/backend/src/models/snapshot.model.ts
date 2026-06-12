/**
 * Snapshot Model
 *
 * A snapshot is a materialised checkpoint of workspace state at a given event boundary.
 * Created automatically every SNAPSHOT_INTERVAL events per stream.
 *
 * Replay can start from the nearest snapshot instead of event 0, keeping
 * replay fast even after millions of events.
 *
 *   ──events──►  0 ··· 499 [snap v1] 500 ··· 999 [snap v2] 1000 ···
 *
 * To rebuild state at event 1234:
 *   1. Find snapshot with highestEventSeq ≤ 1234
 *   2. Replay events from snapshot.highestEventSeq → 1234
 */

import { Schema, model, type Document } from 'mongoose';

export interface ISnapshotNodeState {
  id: string;
  label: string;
  code: string;
  language: string;
  noteContent: string;
  color: string;
  groupId?: string;
  position: { x: number; y: number };
  edges: Array<{ targetId: string; edgeType: string }>;
  modified: boolean;
}

export interface ISnapshot extends Document {
  workspaceId: string;
  streamId: string;
  /** The eventId of the last event included in this snapshot */
  highestEventId: string;
  /** Monotonic sequence number for ordering */
  seq: number;
  /** Full denormalised node graph at this point in time */
  nodes: ISnapshotNodeState[];
  /** All active edge pairs (source → target) */
  edges: Array<{ source: string; target: string; edgeType: string }>;
  /** All groups */
  groups: Array<{ id: string; name: string; color: string; nodeIds: string[] }>;
  createdAt: Date;
}

const SnapshotSchema = new Schema<ISnapshot>(
  {
    workspaceId:    { type: String, required: true, index: true },
    streamId:       { type: String, required: true },
    highestEventId: { type: String, required: true },
    seq:            { type: Number, required: true },
    nodes: [{
      id:          String,
      label:       String,
      code:        String,
      language:    String,
      noteContent: String,
      color:       String,
      groupId:     String,
      position:    { x: Number, y: Number },
      edges: [{ targetId: String, edgeType: String, _id: false }],
      modified:    Boolean,
      _id:         false,
    }],
    edges: [{ source: String, target: String, edgeType: String, _id: false }],
    groups: [{ id: String, name: String, color: String, nodeIds: [String], _id: false }],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Fast lookup: latest snapshot for a workspace
SnapshotSchema.index({ workspaceId: 1, seq: -1 });
// Efficient "find snapshot before eventId" query
SnapshotSchema.index({ streamId: 1, highestEventId: 1 });

export const Snapshot = model<ISnapshot>('Snapshot', SnapshotSchema);

/** Number of events between snapshots */
export const SNAPSHOT_INTERVAL = 500;
