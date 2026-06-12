import type { Context, Next } from 'koa';
import { jwtVerify, SignJWT } from 'jose';
import { ZodError } from 'zod';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-secret-change-in-prod');

// ─── Error Middleware ─────────────────────────────────────────────────────────

export async function errorMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      ctx.status = 422;
      ctx.body = { error: 'Validation failed', issues: err.issues };
      return;
    }

    const e = err as { status?: number; message?: string };
    ctx.status = e.status ?? 500;
    ctx.body = { error: e.message ?? 'Internal server error' };

    if (ctx.status >= 500) {
      console.error('[error]', err);
    }
  }
}

// ─── Auth Middleware ──────────────────────────────────────────────────────────

export async function authMiddleware(ctx: Context, next: Next): Promise<void> {
  const header = ctx.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Missing or invalid Authorization header' };
    return;
  }

  try {
    const token = header.slice(7);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    ctx.state.operator = payload;
    await next();
  } catch {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
  }
}

/** Utility: verify a JWT string and return payload (used by Socket.IO middleware) */
export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload;
}

/** Utility: sign a new JWT (used by auth callback) */
export async function signJWT(payload: Record<string, unknown>, expiresIn = '7d') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}
