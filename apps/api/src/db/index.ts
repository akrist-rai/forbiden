// src/db/index.ts — Drizzle client (Supabase Postgres via postgres.js)
// Force IPv4 before any network calls — Supabase resolves to IPv6 on some hosts
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

type Schema = typeof schema;

let _db: PostgresJsDatabase<Schema> | null = null;

function initDb(): PostgresJsDatabase<Schema> | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  const queryClient = postgres(connectionString, { max: 10, ssl: 'require' });
  return drizzle(queryClient, { schema });
}

function getDb(): PostgresJsDatabase<Schema> {
  if (!_db) _db = initDb();
  if (!_db) throw Object.assign(
    new Error('DATABASE_URL is not configured. Set it in apps/api/.env'),
    { status: 503 }
  );
  return _db;
}

// Proxy: every property access goes through getDb(), so existing code
// (db.query.X, db.insert(...), etc.) works without changes.
export const db = new Proxy({} as PostgresJsDatabase<Schema>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});

export const isDbConfigured = () => !!(process.env.DATABASE_URL);
export type Db = typeof db;
