/**
 * WorkspaceMetadata Model
 *
 * Stores ownership and display metadata for each workspace.
 *
 * WHY THIS IS SEPARATE FROM NODES/EVENTS:
 *   The core event-sourced system (events, nodes, snapshots) only knows about
 *   workspaceId strings. There is no "workspaces" collection in the core system
 *   because the event stream itself is the source of truth for workspace *content*.
 *
 *   However, we need somewhere to store:
 *   - Who owns this workspace (which team)
 *   - The workspace display name
 *   - When it was created and by whom
 *   - Template metadata (which template was it created from)
 *   - Workspace-level soft delete
 *
 * CREATION:
 *   Created by POST /api/workspaces (Phase 7). A workspace is only accessible
 *   once its metadata record exists. The WorkspaceMember entry for the creator
 *   is also written at this time (with role 'owner').
 *
 * ACCESS CONTROL INTEGRATION:
 *   AccessService.resolveRole() reads `teamId` from this model to look up
 *   the operator's team role. If teamId is null, only explicit WorkspaceMember
 *   entries grant access.
 */

import { Schema, model, type Document } from 'mongoose';

export interface IWorkspaceMetadata extends Document {
  workspaceId:  string;
  name:         string;
  description?: string;
  teamId:       string | null;   // null = personal workspace (no team)
  createdBy:    string;
  /** The template this workspace was created from, if any */
  templateId?:  string;
  /** Soft delete — workspace data stays in MongoDB but it is no longer accessible */
  archivedAt?:  Date;
  createdAt:    Date;
  updatedAt:    Date;
}

const WorkspaceMetadataSchema = new Schema<IWorkspaceMetadata>(
  {
    workspaceId:  { type: String, required: true, unique: true },
    name:         { type: String, required: true, minlength: 1, maxlength: 120 },
    description:  String,
    teamId:       { type: String, default: null },
    createdBy:    { type: String, required: true },
    templateId:   String,
    archivedAt:   Date,
  },
  { timestamps: true }
);

// Lookup workspaces by team
WorkspaceMetadataSchema.index({ teamId: 1, archivedAt: 1 });

// Lookup personal workspaces
WorkspaceMetadataSchema.index({ createdBy: 1, archivedAt: 1 });

export const WorkspaceMetadata = model<IWorkspaceMetadata>('WorkspaceMetadata', WorkspaceMetadataSchema);
