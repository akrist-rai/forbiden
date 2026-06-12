/**
 * Activity Feed Model
 *
 * A cross-workspace, per-operator unified feed of significant events.
 *
 * PURPOSE:
 *   An operator with access to 10 workspaces currently has to open each one
 *   individually to see what's happening. The activity feed aggregates events
 *   from all workspaces the operator has access to into one scrollable view —
 *   like a GitHub notifications feed or a Slack sidebar.
 *
 * HOW IT IS POPULATED:
 *   The fanout pipeline (FanoutService.dispatch) enqueues a BullMQ job on
 *   every workspace event. The activity worker:
 *     1. Looks up all operators who have access to the workspace
 *     2. For each operator, upserts an ActivityFeedEntry
 *
 *   Only SIGNIFICANT_EVENT_TYPES are published to the feed. High-frequency
 *   events like NODE_MOVED would generate too much noise.
 *
 * READING:
 *   GET /api/feed — returns the operator's feed, newest first, paginated.
 *   Clients poll this endpoint or listen on the `feed:new` Socket.IO event.
 *
 * UNREAD TRACKING:
 *   Each entry has a `readAt` field. NULL means unread. The feed endpoint
 *   returns an `unreadCount` in the response. Clients POST /api/feed/read-all
 *   to mark everything as read.
 *
 * RETENTION:
 *   60-day TTL — feed entries are informational and don't need to be kept
 *   as long as the audit log.
 */

import { Schema, model, type Document } from 'mongoose';

/** Event types that appear in the activity feed */
export const SIGNIFICANT_EVENT_TYPES = new Set([
  'NODE_CREATED',
  'NODE_EDITED',
  'NODE_DELETED',
  'NOTE_SAVED',
  'GROUP_CREATED',
  'GROUP_DELETED',
  'WORKSPACE_SNAPSHOT',
]);

export interface IActivityFeedEntry extends Document {
  /** The operator who should see this entry */
  operatorId:  string;
  workspaceId: string;
  workspaceName?: string;  // Denormalised for display — avoids workspace lookup on read
  eventId:     string;
  eventType:   string;
  /** Human-readable description, generated from the event payload */
  summary:     string;
  /** Which operator caused this event */
  actorId:     string;
  actorName:   string;
  nodeId?:     string;
  nodeLabel?:  string;
  /** null = unread */
  readAt:      Date | null;
  createdAt:   Date;
}

const ActivityFeedSchema = new Schema<IActivityFeedEntry>(
  {
    operatorId:    { type: String, required: true, index: true },
    workspaceId:   { type: String, required: true },
    workspaceName: String,
    eventId:       { type: String, required: true },
    eventType:     { type: String, required: true },
    summary:       { type: String, required: true },
    actorId:       { type: String, required: true },
    actorName:     { type: String, required: true },
    nodeId:        String,
    nodeLabel:     String,
    readAt:        { type: Date, default: null },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Primary feed query: operator's feed, newest first
ActivityFeedSchema.index({ operatorId: 1, createdAt: -1 });

// Deduplication: one entry per (operator, event)
ActivityFeedSchema.index({ operatorId: 1, eventId: 1 }, { unique: true });

// Unread count query
ActivityFeedSchema.index({ operatorId: 1, readAt: 1 });

// 60-day TTL
ActivityFeedSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 24 * 60 * 60 });

export const ActivityFeedEntry = model<IActivityFeedEntry>('ActivityFeedEntry', ActivityFeedSchema);

/** Generate a human-readable summary for a feed entry */
export function makeFeedSummary(eventType: string, payload: Record<string, unknown>): string {
  switch (eventType) {
    case 'NODE_CREATED':  return `Created node: ${payload['label'] ?? payload['nodeId']}`;
    case 'NODE_EDITED':   return `Edited code in: ${payload['nodeId']}`;
    case 'NODE_DELETED':  return `Deleted node: ${payload['nodeId']}`;
    case 'NOTE_SAVED':    return `Updated note on: ${payload['nodeId']}`;
    case 'GROUP_CREATED': return `Created group: ${payload['name'] ?? payload['groupId']}`;
    case 'GROUP_DELETED': return `Deleted group: ${payload['groupId']}`;
    case 'WORKSPACE_SNAPSHOT': return `Checkpoint: ${payload['label'] ?? 'Manual snapshot'}`;
    default:              return eventType;
  }
}
