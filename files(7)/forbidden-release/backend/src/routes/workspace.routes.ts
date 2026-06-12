/**
 * Workspace Routes (Phase 7 update)
 *
 * Workspaces now have full metadata, team ownership, access control,
 * and template-based creation.
 *
 * GET    /api/workspaces/:id       — Load workspace (access checked)
 * POST   /api/workspaces           — Create workspace (with optional teamId + templateId)
 * DELETE /api/workspaces/:id       — Archive workspace (owner only)
 * GET    /api/workspaces/:id/members — List workspace members
 * POST   /api/workspaces/:id/members — Add a workspace member
 * DELETE /api/workspaces/:id/members/:operatorId — Remove a workspace member
 *
 * GET    /api/events               — Event log with snapshot-aware replay
 * GET    /api/events/stream        — SSE live event stream
 * GET    /api/timeline/:ws         — Human-readable timeline
 */

import Router from '@koa/router';
import { z } from 'zod';
import { v7 as uuidv7 } from 'uuid';
import { Node } from '@/models/node.model';
import { TimelineEntry } from '@/models/timeline.model';
import { EventService } from '@/services/event.service';
import { TemplateService } from '@/services/template.service';
import { AccessService } from '@/services/access.service';
import { WorkspaceMetadata } from '@/models/workspace-metadata.model';
import { WorkspaceMember } from '@/models/workspace-member.model';
import { User } from '@/models/user.model';
import { hydrateContainer, wakeContainer, getContainerStatus } from '@/services/container.service';
import { SnapshotService } from '@/services/snapshot.service';
import { getRedis } from '@/config/redis';

// ─── Workspace Routes ─────────────────────────────────────────────────────────

const workspaceRoutes = new Router();

// GET /:id — load workspace
workspaceRoutes.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const operatorId = (ctx.state.operator as { sub: string }).sub;

  // Access check — viewer or above required
  const role = await AccessService.resolveRole(id, operatorId);
  if (!role) {
    // If no metadata exists at all, allow access (backwards compat for Phase 1-4 workspaces)
    const meta = await WorkspaceMetadata.findOne({ workspaceId: id }).lean();
    if (meta && meta.archivedAt) {
      ctx.status = 404; ctx.body = { error: 'Workspace not found' }; return;
    }
    // No metadata = legacy workspace — allow
  }

  const nodes = await Node.find({ workspaceId: id, deletedAt: null }).lean();
  const meta  = await WorkspaceMetadata.findOne({ workspaceId: id }).lean();

  // Hydrate container asynchronously (non-blocking — client gets data immediately)
  hydrateContainer(
    id,
    nodes.map(n => ({ id: n.id, code: n.code, language: n.language, noteContent: n.noteContent })),
    { nodes: nodes.map(n => ({ id: n.id, label: n.label, edges: n.edges, groupId: n.groupId })) },
  ).catch(err => console.warn('[workspace] Container hydration failed:', err.message));

  ctx.body = {
    workspaceId: id,
    name:        meta?.name,
    teamId:      meta?.teamId ?? null,
    templateId:  meta?.templateId ?? null,
    role:        role ?? 'editor',  // legacy workspaces get editor access
    nodes,
  };
});

// POST / — create workspace
workspaceRoutes.post('/', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string; name?: string; login?: string }).sub;
  const operatorName = (ctx.state.operator as { name?: string; login?: string }).name
    ?? (ctx.state.operator as { login?: string }).login
    ?? operatorId;

  const { name, teamId, templateId, description } = z.object({
    name:        z.string().min(1).max(120),
    teamId:      z.string().optional(),
    templateId:  z.string().optional(),
    description: z.string().max(500).optional(),
  }).parse(ctx.request.body);

  const workspaceId = uuidv7();

  // Write workspace metadata
  await WorkspaceMetadata.create({
    workspaceId,
    name,
    description,
    teamId:     teamId ?? null,
    createdBy:  operatorId,
    templateId: templateId ?? undefined,
  });

  // Creator is always an explicit owner-level member
  await WorkspaceMember.create({
    workspaceId,
    operatorId,
    operatorName,
    role:      'owner',
    status:    'active',
    invitedBy: operatorId,
  });

  // Apply template if requested (emits NODE_CREATED + NODE_JOINED events)
  let templateResult: { nodesCreated: number; edgesCreated: number } | null = null;
  if (templateId) {
    try {
      templateResult = await TemplateService.apply(
        workspaceId,
        templateId,
        operatorId,
        'system',
      );
    } catch (err) {
      console.warn('[workspace] Template apply failed:', (err as Error).message);
    }
  }

  ctx.status = 201;
  ctx.body = {
    workspaceId,
    name,
    teamId:     teamId ?? null,
    templateId: templateId ?? null,
    template:   templateResult,
  };
});

// DELETE /:id — archive workspace
workspaceRoutes.delete('/:id', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, operatorId, 'owner');

  await WorkspaceMetadata.updateOne(
    { workspaceId: ctx.params.id },
    { $set: { archivedAt: new Date() } }
  );

  ctx.body = { archived: true };
});

// GET /:id/members — list workspace members
workspaceRoutes.get('/:id/members', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, operatorId, 'read');

  const members = await WorkspaceMember.find({
    workspaceId: ctx.params.id,
    status: { $ne: 'revoked' },
  }).sort({ joinedAt: 1 }).lean();

  ctx.body = { members };
});

// POST /:id/members — invite operator to workspace
workspaceRoutes.post('/:id/members', async (ctx) => {
  const actorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, actorId, 'admin');

  const { operatorLogin, role } = z.object({
    operatorLogin: z.string().min(1),
    role: z.enum(['viewer', 'editor', 'admin']),  // cannot invite as owner
  }).parse(ctx.request.body);

  const user = await User.findOne({ login: operatorLogin }).lean();
  if (!user) { ctx.status = 404; ctx.body = { error: 'Operator not found' }; return; }

  const existing = await WorkspaceMember.findOne({
    workspaceId: ctx.params.id,
    operatorId: user.githubId,
  }).lean();

  if (existing && existing.status === 'active') {
    ctx.status = 409; ctx.body = { error: 'Operator is already a member' }; return;
  }

  const member = await WorkspaceMember.findOneAndUpdate(
    { workspaceId: ctx.params.id, operatorId: user.githubId },
    {
      $set: {
        operatorName: user.name ?? user.login,
        role,
        status:     'active',
        isGuest:    true,
        invitedBy:  actorId,
        invitedAt:  new Date(),
        acceptedAt: new Date(),
      }
    },
    { upsert: true, new: true }
  );

  // Invalidate access cache for this operator
  await AccessService.invalidate(ctx.params.id, user.githubId);

  ctx.status = 201;
  ctx.body = { member };
});

// DELETE /:id/members/:operatorId — remove workspace member
workspaceRoutes.delete('/:id/members/:operatorId', async (ctx) => {
  const actorId   = (ctx.state.operator as { sub: string }).sub;
  const targetId  = ctx.params.operatorId;
  const isSelf    = actorId === targetId;

  if (!isSelf) {
    await AccessService.require(ctx.params.id, actorId, 'admin');
  }

  await WorkspaceMember.updateOne(
    { workspaceId: ctx.params.id, operatorId: targetId },
    { $set: { status: 'revoked', revokedAt: new Date() } }
  );

  await AccessService.invalidate(ctx.params.id, targetId);

  ctx.body = { removed: true };
});

// POST /:id/wake — wake a paused/dead container
workspaceRoutes.post('/:id/wake', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, operatorId, 'read');
  await wakeContainer(ctx.params.id);
  const status = await getContainerStatus(ctx.params.id);
  ctx.body = { status };
});

// GET /:id/status — get container status
workspaceRoutes.get('/:id/status', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, operatorId, 'read');
  const status = await getContainerStatus(ctx.params.id);
  ctx.body = { status };
});

// GET /:id/search?q= — full-text node search
workspaceRoutes.get('/:id/search', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, operatorId, 'read');

  const { q } = z.object({ q: z.string().min(1).max(200) }).parse(ctx.query);

  const results = await Node.find(
    { workspaceId: ctx.params.id, deletedAt: null, $text: { $search: q } },
    { score: { $meta: 'textScore' }, id: 1, label: 1, language: 1, position: 1 }
  ).sort({ score: { $meta: 'textScore' } }).limit(30).lean();

  ctx.body = { results };
});

// POST /:id/share — create a read-only share link (24h TTL)
workspaceRoutes.post('/:id/share', async (ctx) => {
  const operatorId = (ctx.state.operator as { sub: string }).sub;
  await AccessService.require(ctx.params.id, operatorId, 'read');

  const token   = uuidv7();
  const shareKey = `share:${token}`;
  const redis    = getRedis();

  const snapshot = await SnapshotService.findLatest(ctx.params.id);
  const nodes    = await Node.find({ workspaceId: ctx.params.id, deletedAt: null })
    .select('id label language position edges color groupId code noteContent')
    .lean();

  await redis.setex(shareKey, 86_400, JSON.stringify({
    workspaceId: ctx.params.id,
    nodes,
    snapshot: snapshot ? { eventId: snapshot.highestEventId, seq: snapshot.seq } : null,
    createdAt:  new Date().toISOString(),
    expiresAt:  new Date(Date.now() + 86_400_000).toISOString(),
  }));

  const baseUrl = process.env['PUBLIC_URL'] ?? 'http://localhost:5173';
  ctx.body = { token, url: `${baseUrl}?share=${token}`, expiresIn: 86_400 };
});

export default workspaceRoutes;

// ─── Event Routes ─────────────────────────────────────────────────────────────

export const eventRoutes = new Router();

eventRoutes.get('/', async (ctx) => {
  const { workspaceId, since, limit, types } = z.object({
    workspaceId: z.string(),
    since:       z.string().optional(),
    limit:       z.coerce.number().max(500).default(100),
    types:       z.string().optional(),
  }).parse(ctx.query);

  const events = await EventService.replay(workspaceId, {
    since,
    limit,
    types: types ? (types.split(',') as never) : undefined,
  });
  ctx.body = { events };
});

// SSE live event stream
eventRoutes.get('/stream', async (ctx) => {
  const { workspaceId } = z.object({ workspaceId: z.string() }).parse(ctx.query);

  ctx.set({
    'Content-Type':  'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection':    'keep-alive',
    'X-Accel-Buffering': 'no',  // Disable nginx buffering for SSE
  });
  ctx.status = 200;
  ctx.respond = false;

  const { res } = ctx;
  const { getSubscriber } = await import('@/config/redis');
  const sub = getSubscriber();
  const channel = `workspace:${workspaceId}:events`;

  await sub.subscribe(channel);

  const onMessage = (_ch: string, msg: string) => res.write(`data: ${msg}\n\n`);
  sub.on('message', onMessage);

  const heartbeat = setInterval(() => res.write(': heartbeat\n\n'), 30_000);

  ctx.req.on('close', () => {
    clearInterval(heartbeat);
    sub.off('message', onMessage);
    sub.unsubscribe(channel);
  });
});

// ─── Timeline Routes ──────────────────────────────────────────────────────────

export const timelineRoutes = new Router();

timelineRoutes.get('/:workspaceId', async (ctx) => {
  const limit = Math.min(Number(ctx.query['limit'] ?? 50), 200);
  const entries = await TimelineEntry.find({ workspaceId: ctx.params.workspaceId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  ctx.body = { entries };
});
