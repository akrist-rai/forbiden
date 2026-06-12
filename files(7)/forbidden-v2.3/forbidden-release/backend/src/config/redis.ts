/**
 * Redis Configuration
 *
 * Exports three distinct Redis clients:
 *
 *   1. Publisher (getRedis)     — general purpose: INCR, ZADD, HSET, PUBLISH, etc.
 *   2. Subscriber (getSubscriber) — dedicated to SUBSCRIBE/PSUBSCRIBE
 *      (Redis protocol prevents mixed subscriber + command use on the same connection)
 *   3. Adapter client pair     — for the Socket.IO Redis adapter (Phase 5)
 *      The adapter needs its own pub+sub pair to avoid interference with
 *      application-level pub/sub channels.
 *
 * SOCKET.IO REDIS ADAPTER (Phase 5 addition):
 *   Enables horizontal scaling. Without the adapter:
 *     io.to('workspace:abc').emit(...)
 *     → Only reaches clients connected to THIS server instance
 *
 *   With the adapter:
 *     io.to('workspace:abc').emit(...)
 *     → Adapter publishes to Redis channel
 *     → All server instances subscribe and rebroadcast to their local clients
 *     → All clients across all instances receive the message
 *
 *   The adapter channels use the prefix "forbidden-io:" to avoid collisions
 *   with application channels (which use "workspace:", "awareness:", etc.)
 */

import Redis from 'ioredis';

let redis: Redis | null = null;
let subscriber: Redis | null = null;

// Separate pair for the Socket.IO Redis adapter
let adapterPub: Redis | null = null;
let adapterSub: Redis | null = null;

function createClient(url: string): Redis {
  return new Redis(url, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    enableReadyCheck: true,
  });
}

export async function connectRedis(): Promise<void> {
  const url = process.env.REDIS_URL ?? 'redis://localhost:6379';

  redis      = createClient(url);
  subscriber = new Redis(url, { maxRetriesPerRequest: null, lazyConnect: true });
  adapterPub = createClient(url);
  adapterSub = new Redis(url, { maxRetriesPerRequest: null, lazyConnect: true });

  await Promise.all([
    redis.connect(),
    subscriber.connect(),
    adapterPub.connect(),
    adapterSub.connect(),
  ]);

  console.log('[redis] Connected (4 clients: pub, sub, adapter-pub, adapter-sub)');
}

/** Publisher / general-purpose client */
export function getRedis(): Redis {
  if (!redis) throw new Error('Redis not initialised — call connectRedis() first');
  return redis;
}

/** Dedicated subscriber client (cannot share with publisher) */
export function getSubscriber(): Redis {
  if (!subscriber) throw new Error('Redis subscriber not initialised');
  return subscriber;
}

/** Returns the pub+sub pair for the Socket.IO Redis adapter */
export function getAdapterClients(): { pub: Redis; sub: Redis } {
  if (!adapterPub || !adapterSub) throw new Error('Redis adapter clients not initialised');
  return { pub: adapterPub, sub: adapterSub };
}
