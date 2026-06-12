// src/middleware/auth.ts — Supabase JWT verification middleware for Koa
import type Koa from 'koa';
import * as jose from 'jose';

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
if (!SUPABASE_JWT_SECRET) {
  console.warn('[auth] SUPABASE_JWT_SECRET not set — all routes will be unprotected (dev mode)');
}

export interface AuthState {
  userId: string;
  email: string;
}

/** Attach user to ctx.state.auth. Respond 401 if token missing/invalid. */
export async function requireAuth(ctx: Koa.Context, next: Koa.Next) {
  if (!SUPABASE_JWT_SECRET) {
    // Dev bypass: inject a fake user
    ctx.state.auth = { userId: 'dev-user-00000000', email: 'dev@forbinden.local' };
    return next();
  }

  const header = ctx.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Missing Authorization header' };
    return;
  }

  const token = header.slice(7);
  try {
    const secret = new TextEncoder().encode(SUPABASE_JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    ctx.state.auth = {
      userId: payload.sub as string,
      email:  (payload.email as string) || '',
    };
    return next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
  }
}
