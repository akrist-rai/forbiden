// src/db/index.ts — Supabase REST client (replaces postgres.js direct connection)
// Direct Postgres connection unavailable: direct host is IPv6-only, pooler has no tenant entry.
// Supabase REST API (via HTTPS / Cloudflare) works fine with the service-role key.
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Read .env values from file so bun --watch restarts pick up changes
function readEnvFile(): Record<string, string> {
  const candidates = [
    resolve(process.cwd(), '.env'),
    resolve(process.cwd(), 'apps/api/.env'),
    resolve(import.meta.dirname, '../../.env'),
  ];
  for (const p of candidates) {
    try {
      const content = readFileSync(p, 'utf8');
      const out: Record<string, string> = {};
      for (const line of content.split('\n')) {
        const m = line.match(/^([A-Z_]+)=(.+)$/);
        if (m) out[m[1]] = m[2].trim();
      }
      if (out.SUPABASE_URL) return out;
    } catch {}
  }
  return {};
}

const env = readEnvFile();
const SUPABASE_URL = env.SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw Object.assign(
        new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required'),
        { status: 503 }
      );
    }
    _client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

// Convenience wrapper with automatic error throwing
async function from<T = any>(table: string): Promise<{
  select: (columns?: string) => any;
  insert: (data: any) => any;
  update: (data: any) => any;
  delete: () => any;
  upsert: (data: any) => any;
}> {
  return getClient().from(table) as any;
}

// db.from() is the main entry point — routes call db.from('table').select()/insert()/etc.
export const db = {
  from: (table: string) => getClient().from(table),
  client: () => getClient(),
};

export const initDb = async () => {
  getClient(); // validate config eagerly
};

export const isDbConfigured = () => !!(
  (env.SUPABASE_URL || process.env.SUPABASE_URL) &&
  (env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
);

export type Db = typeof db;
