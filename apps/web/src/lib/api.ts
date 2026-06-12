// src/lib/api.ts — typed fetch wrapper
const BASE = import.meta.env.VITE_API_URL ?? ''

async function getToken(): Promise<string | null> {
  const { supabase } = await import('./supabase')
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = await getToken()
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? 'Request failed')
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  get:    <T>(path: string)              => req<T>('GET',    path),
  post:   <T>(path: string, body: unknown) => req<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown) => req<T>('PUT',    path, body),
  patch:  <T>(path: string, body: unknown) => req<T>('PATCH',  path, body),
  delete: <T>(path: string)              => req<T>('DELETE', path),
}
