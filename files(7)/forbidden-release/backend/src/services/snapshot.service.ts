/**
 * SnapshotService
 *
 * Creates and retrieves materialised workspace state snapshots.
 * Called by the snapshot BullMQ worker after every SNAPSHOT_INTERVAL events.
 */

import { Node } from '@/models/node.model';
import { Event } from '@/models/event.model';
import { Snapshot, SNAPSHOT_INTERVAL, type ISnapshot } from '@/models/snapshot.model';

export class SnapshotService {
  /**
   * Decide whether a new snapshot should be created for this stream.
   * Called after every event insert via Change Stream.
   */
  static shouldSnapshot(eventCount: number): boolean {
    return eventCount > 0 && eventCount % SNAPSHOT_INTERVAL === 0;
  }

  /**
   * Create a snapshot of the current workspace state.
   * Reads denormalised state directly from the nodes collection (the CQRS read model).
   */
  static async create(workspaceId: string, highestEventId: string): Promise<ISnapshot> {
    const streamId = `workspace:${workspaceId}`;

    // Count existing snapshots to determine seq number
    const prevCount = await Snapshot.countDocuments({ workspaceId });

    // Collect all live nodes
    const nodes = await Node.find({ workspaceId, deletedAt: null }).lean();

    // Derive edge list from nodes
    const edgeSet = new Map<string, { source: string; target: string; edgeType: string }>();
    for (const node of nodes) {
      for (const edge of node.edges ?? []) {
        const key = `${node.id}→${edge.targetId}`;
        if (!edgeSet.has(key)) {
          edgeSet.set(key, { source: node.id, target: edge.targetId, edgeType: edge.edgeType });
        }
      }
    }

    // Derive groups from node groupIds
    const groupMap = new Map<string, string[]>();
    for (const node of nodes) {
      if (node.groupId) {
        const members = groupMap.get(node.groupId) ?? [];
        members.push(node.id);
        groupMap.set(node.groupId, members);
      }
    }

    const snapshot = await Snapshot.create({
      workspaceId,
      streamId,
      highestEventId,
      seq: prevCount + 1,
      nodes: nodes.map(n => ({
        id:          n.id,
        label:       n.label,
        code:        n.code,
        language:    n.language,
        noteContent: n.noteContent,
        color:       n.color,
        groupId:     n.groupId,
        position:    n.position,
        edges:       n.edges,
        modified:    n.modified,
      })),
      edges: [...edgeSet.values()],
      groups: [...groupMap.entries()].map(([id, nodeIds]) => ({
        id,
        name: id,  // group name is stored on the group document; simplified here
        color: '#10b981',
        nodeIds,
      })),
    });

    console.log(`[snapshot] Created seq=${snapshot.seq} for workspace:${workspaceId} at event ${highestEventId}`);
    return snapshot;
  }

  /**
   * Find the most recent snapshot for a workspace.
   * Returns null if no snapshots exist yet (full replay from event 0 required).
   */
  static async findLatest(workspaceId: string): Promise<ISnapshot | null> {
    return Snapshot.findOne({ workspaceId }).sort({ seq: -1 }).lean() as unknown as Promise<ISnapshot | null>;
  }

  /**
   * Find the nearest snapshot strictly before a given eventId.
   * Used to start a bounded replay from the right checkpoint.
   */
  static async findBefore(workspaceId: string, eventId: string): Promise<ISnapshot | null> {
    return Snapshot
      .findOne({ workspaceId, highestEventId: { $lt: eventId } })
      .sort({ seq: -1 })
      .lean() as unknown as Promise<ISnapshot | null>;
  }

  /**
   * Count events in a stream since the last snapshot.
   * Used to trigger snapshot creation at the right interval.
   */
  static async eventCountSinceLastSnapshot(workspaceId: string): Promise<number> {
    const streamId = `workspace:${workspaceId}`;
    const latest = await Snapshot.findOne({ workspaceId }).sort({ seq: -1 }).lean();

    const query: Record<string, unknown> = { streamId };
    if (latest) {
      query['eventId'] = { $gt: latest.highestEventId };
    }

    return Event.countDocuments(query);
  }
}
