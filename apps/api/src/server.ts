// src/server.ts — FORBINDEN v1.0 entry point (Koa + Bun)
import Koa        from 'koa';
import cors       from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createServer }  from 'node:http';
import { attach }        from './ws/manager.ts';
import { isDbConfigured } from './db/index.ts';
import workspacesRouter  from './routes/workspaces.ts';
import nodesRouter       from './routes/nodes.ts';
import gitRouter         from './routes/git.ts';
import boardRouter       from './routes/board.ts';

const PORT = parseInt(process.env.PORT || '3001', 10);

// ─── KOA APP ─────────────────────────────────────────────────────────────────
const app = new Koa();
app.proxy = true;

// ── Global error handler ──────────────────────────────────────────────────────
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body   = { error: err.message || 'Internal server error' };
    console.error('[API Error]', err);
  }
});

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:5174').split(',');
app.use(cors({
  origin: (ctx) => {
    const origin = ctx.request.headers.origin || '';
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials:  true,
}));

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(bodyParser({ jsonLimit: '5mb', enableTypes: ['json', 'form', 'text'] }));

// ── Health check ─────────────────────────────────────────────────────────────
app.use(async (ctx, next) => {
  if (ctx.path === '/api/health') {
    ctx.body = { status: 'ok', ts: Date.now(), version: '1.0.0', db: isDbConfigured() };
    return;
  }
  await next();
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use(workspacesRouter.routes()).use(workspacesRouter.allowedMethods());
app.use(nodesRouter.routes()).use(nodesRouter.allowedMethods());
app.use(gitRouter.routes()).use(gitRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());

// ── 404 catch-all ────────────────────────────────────────────────────────────
app.use(async ctx => {
  if (ctx.path.startsWith('/api/')) {
    ctx.status = 404;
    ctx.body   = { error: 'Not found' };
  }
});

// ─── HTTP + WEBSOCKET SERVER ──────────────────────────────────────────────────
const server = createServer(app.callback());
attach(server);

// ─── GRACEFUL SHUTDOWN ───────────────────────────────────────────────────────
process.on('uncaughtException',  e => console.error('[uncaughtException]', e));
process.on('unhandledRejection', e => console.error('[unhandledRejection]', e));

function shutdown(signal: string) {
  console.log(`\n[server] ${signal} — shutting down…`);
  server.close(() => { console.log('[server] closed'); process.exit(0); });
  setTimeout(() => process.exit(1), 5_000);
}
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// ─── LISTEN ──────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   FORBINDEN  //  v1.0  (Koa + Bun)      ║
  ╠══════════════════════════════════════════╣
  ║  HTTP  →  http://localhost:${PORT}           ║
  ║  WS    →  ws://localhost:${PORT}/ws          ║
  ║  DB    →  Supabase Postgres              ║
  ╚══════════════════════════════════════════╝
  `);
});
