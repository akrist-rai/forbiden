/**
 * AccessService
 *
 * Single source of truth for: "Can this operator do X in this workspace?"
 *
 * ACCESS RESOLUTION ORDER:
 *
 *   1. WorkspaceMember table (explicit per-workspace override)
 *      → Used for guests, contractors, or elevated per-workspace rights
 *      → Status must be 'active' — pending or revoked entries are ignored
 *
 *   2. Team membership (the workspace's team)
 *      → The workspace must have a teamId
 *      → The operator must be a member of that team
 *
 *   3. If neither → access denied
 *
 * PERMISSION LEVELS (in ascending power):
 *
 *   viewer  — Can read code, notes, timeline, tasks. Cannot edit or use terminal.
 *   editor  — Can edit code, notes, save files, use terminal.
 *   admin   — Can manage workspace settings, view PTY audit log, manage members.
 *   owner   — Can delete the workspace, transfer ownership.
 *
 * WORKSPACE METADATA:
 *
 *   Workspaces don't have their own MongoDB collection right now — their ID is
 *   embedded in the `streamId` of events and the `workspaceId` of nodes.
 *   Phase 7 adds a `Workspace` model. Until then, AccessService reads team
 *   ownership from the WorkspaceMetadata collection (seeded when workspace is created).
 *
 * CACHING:
 *   Access checks are cached in Redis for 60 seconds per (workspaceId, operatorId).
 *   Cache is invalidated when team membership or WorkspaceMember changes.
 *   Key: access:{workspaceId}:{operatorId} → role | "denied"
 */

import { getRedis } from '@/config/redis';
import { WorkspaceMember } from '@/models/workspace-member.model';
import { Team, TEAM_ROLE_RANK, type TeamRole } from '@/models/team.model';
import { WorkspaceMetadata } from '@/models/workspace-metadata.model';

export type Permission = 'read' | 'write' | 'admin' | 'owner';

/** The minimum role required for each permission level */
const PERMISSION_ROLE: Record<Permission, TeamRole> = {
  read:  'viewer',
  write: 'editor',
  admin: 'admin',
  owner: 'owner',
};

const CACHE_TTL = 60; // seconds
const CACHE_PREFIX = 'access:';

export class AccessService {
  /**
   * Resolve the effective role for an operator in a workspace.
   * Returns null if access is denied.
   */
  static async resolveRole(workspaceId: string, operatorId: string): Promise<TeamRole | null> {
    const redis = getRedis();
    const cacheKey = `${CACHE_PREFIX}${workspaceId}:${operatorId}`;

    // Check cache first
    const cached = await redis.get(cacheKey);
    if (cached !== null) {
      return cached === 'denied' ? null : (cached as TeamRole);
    }

    const role = await AccessService._resolveRoleUncached(workspaceId, operatorId);
    await redis.setex(cacheKey, CACHE_TTL, role ?? 'denied');
    return role;
  }

  private static async _resolveRoleUncached(
    workspaceId: string,
    operatorId: string,
  ): Promise<TeamRole | null> {
    // Step 1: Check for explicit workspace-level override
    const wsMember = await WorkspaceMember.findOne({
      workspaceId,
      operatorId,
      status: 'active',
    }).lean();

    if (wsMember) return wsMember.role;

    // Step 2: Check team membership via workspace metadata
    const meta = await WorkspaceMetadata.findOne({ workspaceId }).lean();
    if (!meta?.teamId) return null;

    const team = await Team.findOne({ teamId: meta.teamId }).lean();
    if (!team) return null;

    const member = team.members.find(m => m.operatorId === operatorId);
    return member?.role ?? null;
  }

  /**
   * Check if an operator has at least the specified permission.
   * Throws 403 if not (for use in Koa middleware / route guards).
   */
  static async require(
    workspaceId: string,
    operatorId: string,
    permission: Permission,
  ): Promise<TeamRole> {
    const role = await AccessService.resolveRole(workspaceId, operatorId);

    if (!role) {
      const err = new Error('Workspace not found or access denied') as Error & { status: number };
      err.status = 403;
      throw err;
    }

    const required = PERMISSION_ROLE[permission];
    if (TEAM_ROLE_RANK[role] < TEAM_ROLE_RANK[required]) {
      const err = new Error(`Requires ${required} role (you are ${role})`) as Error & { status: number };
      err.status = 403;
      throw err;
    }

    return role;
  }

  /**
   * Invalidate the role cache for a specific (workspace, operator) pair.
   * Call this when workspace members or team membership changes.
   */
  static async invalidate(workspaceId: string, operatorId?: string): Promise<void> {
    const redis = getRedis();
    if (operatorId) {
      await redis.del(`${CACHE_PREFIX}${workspaceId}:${operatorId}`);
    } else {
      // Invalidate all operators for this workspace
      const keys = await redis.keys(`${CACHE_PREFIX}${workspaceId}:*`);
      if (keys.length) await redis.del(...keys);
    }
  }

  /**
   * List all operators with access to a workspace.
   * Used by the activity feed worker to know who to notify.
   */
  static async listAccessible(workspaceId: string): Promise<string[]> {
    // Gather from explicit workspace members
    const wsMembers = await WorkspaceMember.find({
      workspaceId,
      status: 'active',
    }).lean();

    const operatorSet = new Set(wsMembers.map(m => m.operatorId));

    // Plus all team members
    const meta = await WorkspaceMetadata.findOne({ workspaceId }).lean();
    if (meta?.teamId) {
      const team = await Team.findOne({ teamId: meta.teamId }).lean();
      team?.members.forEach(m => operatorSet.add(m.operatorId));
    }

    return Array.from(operatorSet);
  }
}
