/**
 * Team Routes
 *
 * Teams are the primary access control boundary in FORBIDDEN (Phase 7).
 *
 * POST /api/teams                           — Create a new team
 * GET  /api/teams                           — My teams (operator is a member)
 * GET  /api/teams/:teamId                   — Team details + member list
 * PATCH /api/teams/:teamId                  — Update name, description, avatarColor
 * DELETE /api/teams/:teamId                 — Archive team (owner only)
 *
 * POST /api/teams/:teamId/members           — Invite an operator (admin+)
 * PATCH /api/teams/:teamId/members/:operatorId  — Change a member's role (admin+)
 * DELETE /api/teams/:teamId/members/:operatorId — Remove a member (admin+ / self)
 *
 * POST /api/teams/:teamId/accept            — Accept a pending invitation
 *
 * GET  /api/teams/:teamId/workspaces        — All workspaces owned by this team
 *
 * ACCESS RULES (enforced inline for simplicity):
 *   create team  → any authenticated operator
 *   view team    → team member
 *   update team  → admin or owner
 *   delete team  → owner only
 *   invite       → admin or owner
 *   remove self  → any member
 *   remove other → admin (cannot remove owner), owner (can remove anyone)
 */

import Router from '@koa/router';
import { z } from 'zod';
import { v7 as uuidv7 } from 'uuid';
import { Team, TEAM_ROLE_RANK, pickTeamColor, getTeamRole, type TeamRole } from '@/models/team.model';
import { WorkspaceMetadata } from '@/models/workspace-metadata.model';
import { AccessService } from '@/services/access.service';
import { User } from '@/models/user.model';

const teamRoutes = new Router();

// ─── helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function requireTeamRole(team: { members: { operatorId: string; role: TeamRole }[] }, operatorId: string, required: TeamRole) {
  const role = getTeamRole(team as Parameters<typeof getTeamRole>[0], operatorId);
  if (!role || TEAM_ROLE_RANK[role] < TEAM_ROLE_RANK[required]) {
    const err = new Error(`Requires ${required} role`) as Error & { status: number };
    err.status = 403;
    throw err;
  }
  return role;
}

// ─── POST /api/teams — Create team ───────────────────────────────────────────

teamRoutes.post('/', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string; name?: string; login?: string }).sub;
  const operatorName = (ctx.state.operator as { name?: string; login?: string }).name
    ?? (ctx.state.operator as { login?: string }).login
    ?? operatorId;

  const body = z.object({
    name:        z.string().min(1).max(80),
    description: z.string().max(500).optional(),
    avatarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  }).parse(ctx.request.body);

  const teamCount = await Team.countDocuments({ 'members.operatorId': operatorId });
  const color = body.avatarColor ?? pickTeamColor(teamCount);

  const slug = slugify(body.name);
  const slugExists = await Team.exists({ slug });
  const finalSlug = slugExists ? `${slug}-${uuidv7().slice(0, 8)}` : slug;

  const team = await Team.create({
    teamId:      uuidv7(),
    name:        body.name,
    slug:        finalSlug,
    description: body.description,
    avatarColor: color,
    createdBy:   operatorId,
    members: [{
      operatorId,
      name:      operatorName,
      role:      'owner',
      joinedAt:  new Date(),
      invitedBy: operatorId,
    }],
  });

  ctx.status = 201;
  ctx.body = { team };
});

// ─── GET /api/teams — My teams ────────────────────────────────────────────────

teamRoutes.get('/', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const teams = await Team.find({ 'members.operatorId': operatorId }).lean();
  ctx.body = { teams };
});

// ─── GET /api/teams/:teamId — Team details ────────────────────────────────────

teamRoutes.get('/:teamId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const team = await Team.findOne({ teamId: ctx.params.teamId }).lean();

  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  // Must be a member to see team details
  if (!getTeamRole(team as Parameters<typeof getTeamRole>[0], operatorId)) {
    ctx.status = 403; ctx.body = { error: 'Access denied' }; return;
  }

  ctx.body = { team };
});

// ─── PATCH /api/teams/:teamId — Update team ───────────────────────────────────

teamRoutes.patch('/:teamId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const team = await Team.findOne({ teamId: ctx.params.teamId });
  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  requireTeamRole(team, operatorId, 'admin');

  const body = z.object({
    name:        z.string().min(1).max(80).optional(),
    description: z.string().max(500).optional(),
    avatarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  }).parse(ctx.request.body);

  if (body.name) team.name = body.name;
  if (body.description !== undefined) team.description = body.description;
  if (body.avatarColor) team.avatarColor = body.avatarColor;
  await team.save();

  ctx.body = { team };
});

// ─── DELETE /api/teams/:teamId — Archive team ─────────────────────────────────

teamRoutes.delete('/:teamId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const team = await Team.findOne({ teamId: ctx.params.teamId });
  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  requireTeamRole(team, operatorId, 'owner');

  // Archive all team workspaces instead of hard-deleting
  await WorkspaceMetadata.updateMany(
    { teamId: team.teamId },
    { $set: { archivedAt: new Date() } },
  );

  await team.deleteOne();
  ctx.body = { deleted: true };
});

// ─── POST /api/teams/:teamId/members — Invite ────────────────────────────────

teamRoutes.post('/:teamId/members', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const team = await Team.findOne({ teamId: ctx.params.teamId });
  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  requireTeamRole(team, operatorId, 'admin');

  const body = z.object({
    operatorId:   z.string(),
    role:         z.enum(['admin', 'editor', 'viewer']).default('editor'),
  }).parse(ctx.request.body);

  const alreadyMember = team.members.find(m => m.operatorId === body.operatorId);
  if (alreadyMember) {
    ctx.status = 409; ctx.body = { error: 'Operator is already a member' }; return;
  }

  // Admins cannot invite other admins (only owners can)
  const inviterRole = getTeamRole(team, operatorId)!;
  if (body.role === 'admin' && inviterRole !== 'owner') {
    ctx.status = 403; ctx.body = { error: 'Only owners can invite admins' }; return;
  }

  const invitee = await User.findOne({ githubId: body.operatorId }).lean();
  const inviteeName = invitee?.name ?? invitee?.login ?? body.operatorId;

  team.members.push({
    operatorId: body.operatorId,
    name:       inviteeName,
    role:       body.role,
    joinedAt:   new Date(),
    invitedBy:  operatorId,
  });

  await team.save();

  // Invalidate access cache for the new member across all team workspaces
  const workspaces = await WorkspaceMetadata.find({ teamId: team.teamId }).lean();
  await Promise.all(workspaces.map(ws => AccessService.invalidate(ws.workspaceId, body.operatorId)));

  ctx.status = 201;
  ctx.body = { member: team.members.at(-1) };
});

// ─── PATCH /api/teams/:teamId/members/:memberId — Change role ─────────────────

teamRoutes.patch('/:teamId/members/:memberId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const team = await Team.findOne({ teamId: ctx.params.teamId });
  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  requireTeamRole(team, operatorId, 'admin');

  const { role } = z.object({
    role: z.enum(['admin', 'editor', 'viewer']),
  }).parse(ctx.request.body);

  const inviterRole = getTeamRole(team, operatorId)!;

  // Cannot change an owner's role
  const target = team.members.find(m => m.operatorId === ctx.params.memberId);
  if (!target) { ctx.status = 404; ctx.body = { error: 'Member not found' }; return; }
  if (target.role === 'owner') {
    ctx.status = 403; ctx.body = { error: 'Cannot change owner role' }; return;
  }

  // Admins cannot promote to admin
  if (role === 'admin' && inviterRole !== 'owner') {
    ctx.status = 403; ctx.body = { error: 'Only owners can grant admin role' }; return;
  }

  target.role = role;
  await team.save();

  // Invalidate cache
  const workspaces = await WorkspaceMetadata.find({ teamId: team.teamId }).lean();
  await Promise.all(workspaces.map(ws => AccessService.invalidate(ws.workspaceId, ctx.params.memberId)));

  ctx.body = { member: target };
});

// ─── DELETE /api/teams/:teamId/members/:memberId — Remove ─────────────────────

teamRoutes.delete('/:teamId/members/:memberId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const targetId   = ctx.params.memberId;
  const team = await Team.findOne({ teamId: ctx.params.teamId });
  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  const actorRole  = getTeamRole(team, operatorId);
  const targetRole = getTeamRole(team, targetId);

  if (!actorRole) { ctx.status = 403; ctx.body = { error: 'Access denied' }; return; }
  if (!targetRole) { ctx.status = 404; ctx.body = { error: 'Member not found' }; return; }

  // Can always remove yourself, unless you are the sole owner
  const isSelf = operatorId === targetId;
  const isOwner = actorRole === 'owner';
  const isAdmin = actorRole === 'admin';

  if (!isSelf && !isOwner && !isAdmin) {
    ctx.status = 403; ctx.body = { error: 'Insufficient role to remove members' }; return;
  }
  if (targetRole === 'owner' && !isSelf) {
    ctx.status = 403; ctx.body = { error: 'Cannot remove another owner' }; return;
  }
  if (isSelf && targetRole === 'owner') {
    const ownerCount = team.members.filter(m => m.role === 'owner').length;
    if (ownerCount <= 1) {
      ctx.status = 409; ctx.body = { error: 'Cannot leave — you are the sole owner. Transfer ownership first.' }; return;
    }
  }

  team.members = team.members.filter(m => m.operatorId !== targetId);
  await team.save();

  // Invalidate cache
  const workspaces = await WorkspaceMetadata.find({ teamId: team.teamId }).lean();
  await Promise.all(workspaces.map(ws => AccessService.invalidate(ws.workspaceId, targetId)));

  ctx.body = { removed: true };
});

// ─── GET /api/teams/:teamId/workspaces — Team workspaces ──────────────────────

teamRoutes.get('/:teamId/workspaces', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const team = await Team.findOne({ teamId: ctx.params.teamId }).lean();
  if (!team) { ctx.status = 404; ctx.body = { error: 'Team not found' }; return; }

  if (!getTeamRole(team as Parameters<typeof getTeamRole>[0], operatorId)) {
    ctx.status = 403; ctx.body = { error: 'Access denied' }; return;
  }

  const workspaces = await WorkspaceMetadata.find({
    teamId: team.teamId,
    archivedAt: null,
  }).lean();

  ctx.body = { workspaces };
});

export default teamRoutes;
