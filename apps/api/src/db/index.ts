// src/db/index.ts — Drizzle client (Supabase Postgres via postgres.js)
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Copy .env.example to .env and fill in your Supabase URL.');
}

// Use a single connection pool for the process lifetime.
// max: 10 is fine for a single-server Bun process.
const queryClient = postgres(connectionString, { max: 10, ssl: 'require' });

export const db = drizzle(queryClient, { schema });

export type Db = typeof db;
