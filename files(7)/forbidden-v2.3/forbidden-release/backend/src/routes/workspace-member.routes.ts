/**
 * Workspace Member Routes (Phase 7)
 *
 * Per-workspace access management. Handles both team-external guests
 * and per-workspace role overrides for team members.
 *
 * GET    /api/workspaces/:wsId/members          — List all members
 * POST   /api/workspaces/:wsId/members          — Invite an operator (admin+)
 * POST   /api/workspaces/:wsId/members/accept   — Accept a pending invitation (invitee)
 * PATCH  /api/workspaces/:wsId/members/:opId    — Change role (admin+)
 * DELETE /api/workspaces/:wsId/members/:opId    — Remove member (admin+ / self)
 */

import Router from '@koa/router';
import { z } from 'zod';
import { WorkspaceMember } from '@/models/workspace-member.model';
import { AccessService } from '@/services/access.service';
import { User } from '@/models/user.model';

export const workspaceMemberRoutes = new Router({ prefix: '/:wsId/members' });

// ─── GET — list members ───────────────────────────────────────────────────────

workspaceMemberRoutes.get('/', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const { wsId } = ctx.params;

  await AccessService.require(wsId, operatorId, 'read');

  const members = await WorkspaceMember.find({ workspaceId: wsId })
    .sort({ role: 1, createdAt: 1 })
    .lean();

  ctx.body = { members };
});

// ─── POST — invite member ─────────────────────────────────────────────────────

workspaceMemberRoutes.post('/', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const { wsId } = ctx.params;

  await AccessService.require(wsId, operatorId, 'admin');

  const body = z.object({
    operatorId: z.string(),
    role: z.enum(['admin', 'editor', 'viewer']).default('editor'),
    isGuest: z.boolean().default(false),
  }).parse(ctx.request.body);

  const existing = await WorkspaceMember.findOne({ workspaceId: wsId, operatorId: body.operatorId });
  if (existing && existing.status !== 'revoked') {
    ctx.status = 409;
    ctx.body = { error: 'Operator already has workspace access' };
    return;
  }

  const invitee = await User.findOne({ githubId: body.operatorId }).lean();
  const inviteeName = invitee?.name ?? invitee?.login ?? body.operatorId;

  const member = await WorkspaceMember.findOneAndUpdate(
    { workspaceId: wsId, operatorId: body.operatorId },
    {
      $set: {
        workspaceId:  wsId,
        operatorId:   body.operatorId,
        operatorName: inviteeName,
        role:         body.role,
        status:       'pending',
        isGuest:      body.isGuest,
        invitedBy:    operatorId,
        invitedAt:    new Date(),
        revokedAt:    undefined,
        acceptedAt:   undefined,
      },
    },
    { upsert: true, new: true },
  );

  await AccessService.invalidate(wsId, body.operatorId);

  ctx.status = 201;
  ctx.body = { member };
});

// ─── POST /accept — accept invitation ────────────────────────────────────────

workspaceMemberRoutes.post('/accept', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const { wsId } = ctx.params;

  const member = await WorkspaceMember.findOneAndUpdate(
    { workspaceId: wsId, operatorId, status: 'pending' },
    { $set: { status: 'active', acceptedAt: new Date() } },
    { new: true },
  );

  if (!member) {
    ctx.status = 404;
    ctx.body = { error: 'No pending invitation found for this workspace' };
    return;
  }

  await AccessService.invalidate(wsId, operatorId);
  ctx.body = { member };
});

// ─── PATCH /:opId — change role ───────────────────────────────────────────────

workspaceMemberRoutes.patch('/:opId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const { wsId, opId } = ctx.params;

  await AccessService.require(wsId, operatorId, 'admin');

  const { role } = z.object({ role: z.enum(['admin', 'editor', 'viewer']) }).parse(ctx.request.body);

  const member = await WorkspaceMember.findOneAndUpdate(
    { workspaceId: wsId, operatorId: opId },
    { $set: { role } },
    { new: true },
  );

  if (!member) { ctx.status = 404; ctx.body = { error: 'Member not found' }; return; }
  if (member.role === 'owner') { ctx.status = 403; ctx.body = { error: 'Cannot change owner role' }; return; }

  await AccessService.invalidate(wsId, opId);
  ctx.body = { member };
});

// ─── DELETE /:opId — remove member ───────────────────────────────────────────

workspaceMemberRoutes.delete('/:opId', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  const { wsId, opId } = ctx.params;
  const isSelf = operatorId === opId;

  if (!isSelf) {
    await AccessService.require(wsId, operatorId, 'admin');
  }

  const member = await WorkspaceMember.findOneAndUpdate(
    { workspaceId: wsId, operatorId: opId },
    { $set: { status: 'revoked', revokedAt: new Date() } },
    { new: true },
  );

  if (!member) { ctx.status = 404; ctx.body = { error: 'Member not found' }; return; }
  if (member.role === 'owner' && !isSelf) {
    ctx.status = 403; ctx.body = { error: 'Cannot remove the workspace owner' }; return;
  }

  await AccessService.invalidate(wsId, opId);
  ctx.body = { removed: true };
});

export default workspaceMemberRoutes;
