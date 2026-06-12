import type { Context, Next } from 'koa';
import { getRedis } from '@/config/redis';

const WINDOW_SECONDS = 60;
const MAX_REQUESTS   = 100;

export async function rateLimitMiddleware(ctx: Context, next: Next): Promise<void> {
  const redis = getRedis();
  const key = `rl:${ctx.ip}:${Math.floor(Date.now() / (WINDOW_SECONDS * 1000))}`;

  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, WINDOW_SECONDS);

  ctx.set('X-RateLimit-Limit', String(MAX_REQUESTS));
  ctx.set('X-RateLimit-Remaining', String(Math.max(0, MAX_REQUESTS - count)));

  if (count > MAX_REQUESTS) {
    ctx.status = 429;
    ctx.body = { error: 'Too many requests' };
    return;
  }

  await next();
}
