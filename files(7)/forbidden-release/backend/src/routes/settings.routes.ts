/**
 * Settings & Theme Routes
 *
 * GET    /settings/:workspaceId         — Get workspace settings (or defaults)
 * PATCH  /settings/:workspaceId         — Update workspace settings
 * GET    /themes/:workspaceId           — List themes for a workspace
 * GET    /themes/:workspaceId/:themeId  — Get single theme
 * POST   /themes/:workspaceId           — Create custom theme
 * POST   /themes/:workspaceId/fork      — Fork a theme
 * PATCH  /themes/:workspaceId/:themeId  — Update custom theme
 * DELETE /themes/:workspaceId/:themeId  — Delete custom theme
 * GET    /pty-audit/:workspaceId        — Query PTY audit log (paginated)
 * GET    /lsp/health                    — Active LSP sessions
 */

import Router from '@koa/router';
import { z } from 'zod';
import { WorkspaceSettings, DEFAULT_SETTINGS } from '@/models/workspace-settings.model';
import { PtyAuditEntry } from '@/models/pty-audit.model';
import { ThemeService } from '@/services/theme.service';
import { listLspSessions } from '@/services/lsp.service';
import { getSocketIOInstance } from '@/services/socket-io.service';

// ─── Workspace Settings Routes ────────────────────────────────────────────────

export const settingsRoutes = new Router();

settingsRoutes.get('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;
  const settings = await WorkspaceSettings.findOne({ workspaceId }).lean()
    ?? { ...DEFAULT_SETTINGS, workspaceId };
  ctx.body = { settings };
});

const SettingsPatchSchema = z.object({
  defaultLanguage:        z.string().optional(),
  autoDetectLanguage:     z.boolean().optional(),
  enabledLSPs:            z.array(z.string()).optional(),
  tabSize:                z.number().min(1).max(16).optional(),
  indentStyle:            z.enum(['spaces', 'tabs']).optional(),
  insertFinalNewline:     z.boolean().optional(),
  trimTrailingWhitespace: z.boolean().optional(),
  wordWrap:               z.enum(['off', 'on', 'wordWrapColumn', 'bounded']).optional(),
  wordWrapColumn:         z.number().optional(),
  editorThemeId:          z.string().optional(),
  lineNumbers:            z.enum(['on', 'off', 'relative', 'interval']).optional(),
  minimap:                z.boolean().optional(),
  renderWhitespace:       z.enum(['none', 'boundary', 'selection', 'trailing', 'all']).optional(),
  fontSize:               z.number().min(8).max(32).optional(),
  fontFamily:             z.string().optional(),
  lineHeight:             z.number().min(1).max(4).optional(),
  letterSpacing:          z.number().min(-2).max(4).optional(),
  showCursors:            z.boolean().optional(),
  showSelections:         z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, { message: 'No fields to update' });

settingsRoutes.patch('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;
  const patch = SettingsPatchSchema.parse(ctx.request.body);
  const operatorId = (ctx.state.operator as { sub: string }).sub;

  const settings = await WorkspaceSettings.findOneAndUpdate(
    { workspaceId },
    { $set: { ...patch, updatedBy: operatorId } },
    { upsert: true, new: true }
  ).lean();

  // Broadcast settings change to all operators in the workspace
  getSocketIOInstance()?.to(`workspace:${workspaceId}`).emit('settings:updated', { settings });

  ctx.body = { settings };
});

// ─── Theme Routes ─────────────────────────────────────────────────────────────

export const themeRoutes = new Router();

themeRoutes.get('/:workspaceId', async (ctx) => {
  const themes = await ThemeService.listForWorkspace(ctx.params.workspaceId);
  ctx.body = { themes, count: themes.length };
});

themeRoutes.get('/:workspaceId/:themeId', async (ctx) => {
  const theme = await ThemeService.get(ctx.params.themeId, ctx.params.workspaceId);
  if (!theme) { ctx.status = 404; ctx.body = { error: 'Theme not found' }; return; }
  ctx.body = { theme };
});

const CreateThemeSchema = z.object({
  name:        z.string().min(1).max(80),
  base:        z.enum(['vs', 'vs-dark', 'hc-black', 'hc-light']),
  rules:       z.array(z.object({
    token:      z.string(),
    foreground: z.string().optional(),
    background: z.string().optional(),
    fontStyle:  z.string().optional(),
  })).default([]),
  colors:      z.record(z.string()).default({}),
  description: z.string().optional(),
});

themeRoutes.post('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;
  const body = CreateThemeSchema.parse(ctx.request.body);
  const operatorId = (ctx.state.operator as { sub: string }).sub;

  const theme = await ThemeService.create({ ...body, workspaceId, operatorId });
  ctx.status = 201;
  ctx.body = { theme };
});

themeRoutes.post('/:workspaceId/fork', async (ctx) => {
  const { workspaceId } = ctx.params;
  const { sourceThemeId, name } = z.object({
    sourceThemeId: z.string(),
    name: z.string().min(1).max(80),
  }).parse(ctx.request.body);
  const operatorId = (ctx.state.operator as { sub: string }).sub;

  const theme = await ThemeService.fork(sourceThemeId, workspaceId, name, operatorId);
  ctx.status = 201;
  ctx.body = { theme };
});

themeRoutes.patch('/:workspaceId/:themeId', async (ctx) => {
  const { workspaceId, themeId } = ctx.params;
  const patch = z.object({
    name:        z.string().min(1).max(80).optional(),
    rules:       z.array(z.object({
      token:      z.string(),
      foreground: z.string().optional(),
      background: z.string().optional(),
      fontStyle:  z.string().optional(),
    })).optional(),
    colors:      z.record(z.string()).optional(),
    description: z.string().optional(),
  }).parse(ctx.request.body);

  const theme = await ThemeService.update(themeId, workspaceId, patch);
  ctx.body = { theme };
});

themeRoutes.delete('/:workspaceId/:themeId', async (ctx) => {
  const { workspaceId, themeId } = ctx.params;
  await ThemeService.delete(themeId, workspaceId);
  ctx.body = { deleted: true };
});

// ─── PTY Audit Log Routes ─────────────────────────────────────────────────────

export const ptyAuditRoutes = new Router();

const AuditQuerySchema = z.object({
  operatorId: z.string().optional(),
  sessionId:  z.string().optional(),
  category:   z.enum(['command', 'partial', 'ctrl', 'paste']).optional(),
  since:      z.string().datetime().optional(),
  until:      z.string().datetime().optional(),
  limit:      z.coerce.number().max(500).default(100),
  skip:       z.coerce.number().default(0),
});

ptyAuditRoutes.get('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;
  const q = AuditQuerySchema.parse(ctx.query);

  const filter: Record<string, unknown> = { workspaceId };
  if (q.operatorId) filter['operatorId'] = q.operatorId;
  if (q.sessionId)  filter['sessionId']  = q.sessionId;
  if (q.category)   filter['category']   = q.category;
  if (q.since || q.until) {
    filter['createdAt'] = {
      ...(q.since ? { $gte: new Date(q.since) } : {}),
      ...(q.until ? { $lte: new Date(q.until) } : {}),
    };
  }

  const [entries, total] = await Promise.all([
    PtyAuditEntry.find(filter)
      .sort({ createdAt: -1 })
      .skip(q.skip)
      .limit(q.limit)
      .lean(),
    PtyAuditEntry.countDocuments(filter),
  ]);

  ctx.body = { entries, total, limit: q.limit, skip: q.skip };
});

// Commands-only view (most common audit use case)
ptyAuditRoutes.get('/:workspaceId/commands', async (ctx) => {
  const { workspaceId } = ctx.params;
  const { limit, skip } = z.object({
    limit: z.coerce.number().max(200).default(50),
    skip:  z.coerce.number().default(0),
  }).parse(ctx.query);

  const entries = await PtyAuditEntry.find({ workspaceId, category: 'command', command: { $ne: null } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('workspaceId operatorId sessionId command createdAt -_id')
    .lean();

  ctx.body = { commands: entries };
});

// ─── LSP Health Route ─────────────────────────────────────────────────────────

export const lspRoutes = new Router();

lspRoutes.get('/health', async (ctx) => {
  ctx.body = {
    sessions: listLspSessions(),
    count: listLspSessions().length,
  };
});

// ─── PTY Output (session replay) Routes — Phase 5 ────────────────────────────

export const ptyOutputRoutes = new Router();

/**
 * GET /api/pty-output/:workspaceId
 * Returns PTY output chunks for a workspace, optionally filtered by session.
 * Used for debugging ("what did the terminal show when X happened?")
 */
ptyOutputRoutes.get('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;
  const { sessionId, limit, skip, since, until } = z.object({
    sessionId: z.string().optional(),
    limit:     z.coerce.number().min(1).max(500).default(100),
    skip:      z.coerce.number().min(0).default(0),
    since:     z.string().datetime().optional(),
    until:     z.string().datetime().optional(),
  }).parse(ctx.query);

  const { PtyOutput } = await import('@/models/pty-output.model');

  const query: Record<string, unknown> = { workspaceId };
  if (sessionId) query['sessionId'] = sessionId;
  if (since || until) {
    query['createdAt'] = {
      ...(since ? { $gte: new Date(since) } : {}),
      ...(until ? { $lte: new Date(until) } : {}),
    };
  }

  const [chunks, total] = await Promise.all([
    PtyOutput.find(query).sort({ sessionId: 1, seq: 1 }).skip(skip).limit(limit).lean(),
    PtyOutput.countDocuments(query),
  ]);

  ctx.body = { chunks, total, limit, skip };
});

/**
 * GET /api/pty-output/:workspaceId/sessions
 * Returns distinct session IDs with first/last timestamps.
 * Used to list browsable terminal sessions.
 */
ptyOutputRoutes.get('/:workspaceId/sessions', async (ctx) => {
  const { workspaceId } = ctx.params;
  const { PtyOutput } = await import('@/models/pty-output.model');

  const sessions = await PtyOutput.aggregate([
    { $match: { workspaceId } },
    { $group: {
      _id:        '$sessionId',
      operatorId: { $first: '$operatorId' },
      chunkCount: { $sum: 1 },
      totalBytes: { $sum: '$length' },
      startedAt:  { $min: '$createdAt' },
      endedAt:    { $max: '$createdAt' },
    }},
    { $sort: { startedAt: -1 } },
    { $limit: 100 },
  ]);

  ctx.body = { sessions };
});
