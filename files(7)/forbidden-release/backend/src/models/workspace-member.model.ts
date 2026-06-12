/**
 * WorkspaceMember Model
 *
 * Per-workspace role overrides that supplement team-level access.
 *
 * WHY THIS EXISTS ALONGSIDE TEAM ROLES:
 *   Team roles give access to ALL workspaces in a team. Sometimes you need
 *   a finer grain:
 *     - A contractor who should access only one workspace, not the whole team
 *     - A client who should view one workspace as read-only
 *     - A team editor who should have owner-level rights on one specific workspace
 *
 * ACCESS RESOLUTION ORDER:
 *   1. Check WorkspaceMember — if an explicit entry exists for (workspace, operator),
 *      that role takes precedence over the team role
 *   2. Fall back to the operator's role in the workspace's team
 *   3. If the operator is not in the team and has no explicit entry, access denied
 *
 * WORKSPACE OWNERSHIP:
 *   The workspace creator is automatically added as WorkspaceMember with role 'owner'.
 *   They retain owner rights even if their team role is lower.
 *
 * INVITATION FLOW:
 *   Admin invites operator → WorkspaceMember created with `status: 'pending'`
 *   Operator accepts → status flips to 'active'
 *   Until accepted, the member cannot access the workspace.
 */

import { Schema, model, type Document } from 'mongoose';
import type { TeamRole } from '@/models/team.model';

export type MemberStatus = 'active' | 'pending' | 'revoked';

export interface IWorkspaceMember extends Document {
  workspaceId: string;
  operatorId:  string;
  operatorName: string;
  /** Explicit role override for this workspace */
  role:        TeamRole;
  status:      MemberStatus;
  /** True if this is a team-external collaborator (no team membership) */
  isGuest:     boolean;
  invitedBy:   string;
  invitedAt:   Date;
  acceptedAt?: Date;
  revokedAt?:  Date;
  createdAt:   Date;
  updatedAt:   Date;
}

const WorkspaceMemberSchema = new Schema<IWorkspaceMember>(
  {
    workspaceId:  { type: String, required: true },
    operatorId:   { type: String, required: true },
    operatorName: { type: String, required: true },
    role:         { type: String, enum: ['owner', 'admin', 'editor', 'viewer'], required: true },
    status:       { type: String, enum: ['active', 'pending', 'revoked'], default: 'active' },
    isGuest:      { type: Boolean, default: false },
    invitedBy:    { type: String, required: true },
    invitedAt:    { type: Date, default: Date.now },
    acceptedAt:   Date,
    revokedAt:    Date,
  },
  { timestamps: true }
);

// Unique membership per (workspace, operator)
WorkspaceMemberSchema.index({ workspaceId: 1, operatorId: 1 }, { unique: true });

// Look up all workspaces an operator has been explicitly added to
WorkspaceMemberSchema.index({ operatorId: 1, status: 1 });

// Admin views: all members of a workspace
WorkspaceMemberSchema.index({ workspaceId: 1, status: 1 });

export const WorkspaceMember = model<IWorkspaceMember>('WorkspaceMember', WorkspaceMemberSchema);
