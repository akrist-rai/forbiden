/**
 * Team Model
 *
 * Teams are the primary unit of access control in FORBIDDEN.
 * Every workspace is owned by a team. Operators access workspaces through
 * team membership.
 *
 * ROLES:
 *   owner   — Full control: manage members, delete team, delete workspaces
 *   admin   — Can invite/remove members, create workspaces, view PTY audit
 *   editor  — Can open workspaces, edit code, use terminal
 *   viewer  — Read-only: can view code and timeline, cannot edit or use terminal
 *
 * MEMBERSHIP:
 *   ITeam stores the list of members with their roles inline.
 *   This is a design choice over a separate `teammembers` collection:
 *     - Membership changes are infrequent
 *     - The full member list is always needed when checking access
 *     - Avoids a join on every workspace access check
 *
 * SLUGS:
 *   Teams have a URL-safe slug derived from their name (e.g. "Skunk Works" →
 *   "skunk-works"). Used in API paths and workspace URLs.
 *
 * WORKSPACE OWNERSHIP:
 *   Workspaces store `teamId`. A workspace inherits the access rules of its team.
 *   Per-workspace role overrides (e.g. a guest viewer on one workspace) are
 *   handled by the WorkspaceMember collection.
 */

import { Schema, model, type Document } from 'mongoose';

export type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer';

export const TEAM_ROLE_RANK: Record<TeamRole, number> = {
  owner:  4,
  admin:  3,
  editor: 2,
  viewer: 1,
};

export interface ITeamMember {
  operatorId: string;
  name:       string;
  role:       TeamRole;
  joinedAt:   Date;
  invitedBy:  string;
}

export interface ITeam extends Document {
  teamId:       string;
  name:         string;
  slug:         string;
  description?: string;
  avatarColor:  string;   // Hex — used in UI team badges
  members:      ITeamMember[];
  createdBy:    string;
  createdAt:    Date;
  updatedAt:    Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    operatorId: { type: String, required: true },
    name:       { type: String, required: true },
    role:       { type: String, enum: ['owner', 'admin', 'editor', 'viewer'], required: true },
    joinedAt:   { type: Date, default: Date.now },
    invitedBy:  { type: String, required: true },
  },
  { _id: false }
);

const TeamSchema = new Schema<ITeam>(
  {
    teamId:      { type: String, required: true, unique: true },
    name:        { type: String, required: true, minlength: 1, maxlength: 80 },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    description: String,
    avatarColor: { type: String, default: '#10b981' },
    members:     { type: [TeamMemberSchema], default: [] },
    createdBy:   { type: String, required: true },
  },
  { timestamps: true }
);

// Look up all teams an operator belongs to
TeamSchema.index({ 'members.operatorId': 1 });

export const Team = model<ITeam>('Team', TeamSchema);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get the role of an operator in a team, or null if not a member */
export function getTeamRole(team: ITeam, operatorId: string): TeamRole | null {
  const member = team.members.find(m => m.operatorId === operatorId);
  return member?.role ?? null;
}

/** Check if an operator has at least the required role */
export function hasTeamRole(team: ITeam, operatorId: string, required: TeamRole): boolean {
  const role = getTeamRole(team, operatorId);
  if (!role) return false;
  return TEAM_ROLE_RANK[role] >= TEAM_ROLE_RANK[required];
}

/** Pick an accent color for a new team (cycles through FORBIDDEN palette) */
const TEAM_COLORS = [
  '#10b981', '#4285f4', '#bb9af7', '#ff435a', '#ffc410',
  '#0db9d7', '#ff9e64', '#9ece6a', '#2ac3de', '#f7768e',
];

export function pickTeamColor(index: number): string {
  return TEAM_COLORS[index % TEAM_COLORS.length];
}
