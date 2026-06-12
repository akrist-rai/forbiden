/**
 * FORBIDDEN API Server
 *
 * Bootstrap order matters:
 *   1. initTelemetry()  — must be first so auto-instrumentation patches Koa, Mongo, Redis, BullMQ
 *   2. connectMongo()
 *   3. connectRedis()   — all four clients ready
 *   4. createAdapter()  — Socket.IO Redis adapter (enables horizontal scaling)
 *   5. Seed themes and templates
 *   6. startChangeStream()
 *   7. startWorkers()
 *   8. httpServer.listen()
 *
 * SOCKET.IO REDIS ADAPTER (Phase 5):
 *   Without the adapter, io.to('room').emit() only reaches clients connected
 *   to THIS server instance. Behind a load balancer with N instances, N-1 of
 *   those clients never get the message.
 *
 *   The @socket.io/redis-adapter turns all emit() calls into Redis pub/sub
 *   broadcasts that every instance receives and re-emits locally. Requires
 *   two dedicated Redis connections (pub + sub).
 *
 * PERSONAL FEED ROOMS (Phase 5):
 *   On every Socket.IO connection, the operator is joined to their personal
 *   room 'feed:{operatorId}'. The activity-feed worker emits 'feed:new' to
 *   this room when a significant workspace event occurs. This gives operators
 *   real-time cross-workspace notifications without polling.
 */

// ⚠ Telemetry MUST be the first import — auto-instrumentation patches libraries at load time
import { initTelemetry } from '@/config/telemetry';
initTelemetry();

import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from '@koa/bodyparser';
import { createServer } from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

import { connectMongo } from '@/config/db';
import { connectRedis, getAdapterPub, getAdapterSub } from '@/config/redis';
import { errorMiddleware } from '@/middleware/error';
import { authMiddleware, verifyJWT } from '@/middleware/auth';
import { rateLimitMiddleware } from '@/middleware/rateLimit';

import workspaceRoutes, { eventRoutes, timelineRoutes } from '@/routes/workspace.routes';
import nodeRoutes     from '@/routes/node.routes';
import messageRoutes  from '@/routes/message.routes';
import authRoutes     from '@/routes/auth.routes';
import crdtRoutes     from '@/routes/crdt.routes';
import taskRoutes     from '@/routes/task.routes';
import teamRoutes     from '@/routes/team.routes';
import feedRoutes from '@/routes/feed.routes';
import aiRoutes   from '@/routes/ai.routes';
import { settingsRoutes, themeRoutes, ptyAuditRoutes, lspRoutes, ptyOutputRoutes } from '@/routes/settings.routes';

import { registerNodeHandlers, registerRunHandlers } from '@/socket/node.handlers';
import { registerTerminalHandlers } from '@/socket/terminal.handlers';
import { registerPresenceHandlers } from '@/socket/presence.handlers';
import { registerCrdtHandlers }     from '@/socket/crdt.handlers';
import { registerLspHandlers }      from '@/socket/lsp.handlers';
import { setSocketIO }              from '@/services/container.service';

import { startWorkers }        from '@/workers';
import { startChangeStream }   from '@/services/changestream.service';
import { ThemeService }        from '@/services/theme.service';
import { TemplateService }     from '@/services/template.service';

// ─── App ──────────────────────────────────────────────────────────────────────

const app = new Koa();
app.proxy = true;

app.use(cors({ origin: process.env['CLIENT_ORIGIN'] ?? '*', credentials: true }));
app.use(bodyParser());
app.use(errorMiddleware);
app.use(rateLimitMiddleware);

// ─── Health check (no auth — used by Docker, load balancers, uptime monitors) ─

const healthRouter = new Router();

healthRouter.get('/health', async (ctx) => {
  const { connectMongo: _, ...__ } = await import('@/config/db');
  // Quick liveness check — if the server responds, it's alive
  ctx.body = {
    status:  'ok',
    version: process.env['npm_package_version'] ?? '0.5.0',
    uptime:  Math.floor(process.uptime()),
    ts:      new Date().toISOString(),
  };
});

app.use(healthRouter.routes());

// ─── Public routes (no auth) ──────────────────────────────────────────────────

const publicRouter = new Router();
publicRouter.use('/auth', authRoutes.routes());

// ─── Protected API routes ─────────────────────────────────────────────────────

const apiRouter = new Router({ prefix: '/api' });
apiRouter.use(authMiddleware);

apiRouter.use('/workspaces',  workspaceRoutes.routes());
apiRouter.use('/nodes',       nodeRoutes.routes());
apiRouter.use('/events',      eventRoutes.routes());
apiRouter.use('/timeline',    timelineRoutes.routes());
apiRouter.use('/messages',    messageRoutes.routes());
apiRouter.use('/crdt',        crdtRoutes.routes());
apiRouter.use('/tasks',       taskRoutes.routes());
apiRouter.use('/teams',       teamRoutes.routes());
apiRouter.use('/feed',        feedRoutes.routes());
apiRouter.use('/ai',          aiRoutes.routes());
apiRouter.use('/settings',    settingsRoutes.routes());
apiRouter.use('/themes',      themeRoutes.routes());
apiRouter.use('/pty-audit',   ptyAuditRoutes.routes());
apiRouter.use('/pty-output',  ptyOutputRoutes.routes());  // Phase 5
apiRouter.use('/lsp',         lspRoutes.routes());

// Templates — public listing (no auth needed to see available templates)
apiRouter.get('/templates',           async (ctx) => {
  ctx.body = { templates: TemplateService.list() };
});
apiRouter.get('/templates/:id',       async (ctx) => {
  const tpl = TemplateService.get(ctx.params.id);
  if (!tpl) { ctx.status = 404; ctx.body = { error: 'Template not found' }; return; }
  ctx.body = { template: tpl };
});

// ─── Public share route (no auth — read-only snapshot) ───────────────────────

const shareRouter = new Router();
shareRouter.get('/share/:token', async (ctx) => {
  const { getRedis } = await import('@/config/redis');
  const redis = getRedis();
  const data  = await redis.get(`share:${ctx.params.token}`);
  if (!data) { ctx.status = 404; ctx.body = { error: 'Share link not found or expired' }; return; }
  ctx.body = JSON.parse(data);
});

app.use(shareRouter.routes());

app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

// ─── HTTP + Socket.IO ─────────────────────────────────────────────────────────

const httpServer = createServer(app.callback());

export const io = new SocketIOServer(httpServer, {
  cors:       { origin: process.env['CLIENT_ORIGIN'] ?? '*', credentials: true },
  transports: ['websocket', 'polling'],
});

// ─── Socket.IO auth middleware ────────────────────────────────────────────────

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token as string | undefined;
  if (!token) return next(new Error('UNAUTHORIZED'));
  try {
    const payload = await verifyJWT(token);
    socket.data.operator = payload;
    next();
  } catch {
    next(new Error('UNAUTHORIZED'));
  }
});

// ─── Socket.IO connection handler ─────────────────────────────────────────────

io.on('connection', (socket) => {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };
  const operatorId = (socket.data.operator as { sub: string }).sub;

  // Workspace room — all workspace events, timeline, settings
  socket.join(`workspace:${workspaceId}`);

  // Personal feed room — cross-workspace activity notifications (Phase 5)
  socket.join(`feed:${operatorId}`);

  registerNodeHandlers(socket, io);
  registerRunHandlers(socket, io);
  registerTerminalHandlers(socket, io);
  registerPresenceHandlers(socket, io);
  registerCrdtHandlers(socket, io);
  registerLspHandlers(socket, io);

  socket.on('disconnect', () => {
    import('@/socket/presence.handlers')
      .then(m => m.clearPresence(operatorId, workspaceId))
      .catch(() => {});
  });
});

// ─── Bootstrap ────────────────────────────────────────────────────────────────

const PORT = Number(process.env['PORT'] ?? 3001);

async function bootstrap(): Promise<void> {
  await connectMongo();
  await connectRedis();

  // Wire Socket.IO Redis adapter for horizontal scaling (Phase 5)
  // All io.to(room).emit() calls are now propagated to every server instance
  io.adapter(createAdapter(getAdapterPub(), getAdapterSub()));
  console.log('[socket.io] Redis adapter attached');

  // Give container service access to io for status broadcasts
  setSocketIO(io);

  await ThemeService.seedBuiltins();
  await startChangeStream();
  await startWorkers();

  httpServer.listen(PORT, () => {
    console.log(`[forbidden] Bun + Koa running on :${PORT}`);
    console.log(`[forbidden] Health: http://localhost:${PORT}/health`);
  });
}

bootstrap().catch(err => {
  console.error('[forbidden] Fatal startup error:', err);
  process.exit(1);
});
