// src/lib/supabase.ts — graceful no-op when env vars not set
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const SUPABASE_CONFIGURED = !!(url && key && !url.includes('PROJECT-REF'))

if (!SUPABASE_CONFIGURED) {
  console.warn('[supabase] Not configured — running in offline/demo mode')
}

export const supabase = createClient(
  url || 'http://localhost',
  key || 'anon-placeholder'
)
