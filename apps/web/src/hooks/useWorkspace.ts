// src/hooks/useWorkspace.ts — loads workspace state from API and provides CRUD helpers
import { useEffect, useRef, useState, useCallback } from 'react'

const BASE = import.meta.env.VITE_API_URL ?? ''

async function apiFetch(method: string, path: string, body?: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  if (res.status === 204) return null
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error ?? 'API error')
  return data
}

export type WsNode = {
  id: string; workspace_id: string; label: string; filepath: string; type: string;
  is_main: boolean; x: number; y: number; theme_idx: number; class_id: string | null;
  modified: boolean; created_at: string; updated_at: string;
}
export type WsEdge   = { id: string; workspace_id: string; source: string; target: string; created_at: string }
export type WsGroup  = { id: string; workspace_id: string; name: string; color: string; node_ids: string[]; created_at: string }
export type Workspace = {
  id: string; user_id: string; name: string; theme: string; avatar: number;
  remote_url: string | null; git_user: string; git_email: string;
}

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [nodes, setNodes] = useState<WsNode[]>([])
  const [edges, setEdges] = useState<WsEdge[]>([])
  const [groups, setGroups] = useState<WsGroup[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [gitGraph, setGitGraph] = useState<any>({ commits: [], lanes: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const wsIdRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function boot() {
      try {
        // Get or create workspace
        let workspaces: Workspace[] = await apiFetch('GET', '/api/workspaces')
        let ws: Workspace
        if (!workspaces.length) {
          ws = await apiFetch('POST', '/api/workspaces', {
            name: 'Default Workspace', theme: 'cyber', avatar: 0
          })
        } else {
          ws = workspaces[0]
        }
        if (cancelled) return
        wsIdRef.current = ws.id
        setWorkspace(ws)

        // Load full state
        const state = await apiFetch('GET', `/api/workspaces/${ws.id}/state`)
        if (cancelled) return
        setNodes(state.nodes || [])
        setEdges(state.edges || [])
        setGroups(state.groups || [])
        setColumns(state.columns || [])
        setCards(state.cards || [])
        setGitGraph(state.git?.graph || { commits: [], lanes: 0 })
      } catch (e: any) {
        if (!cancelled) setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    boot()
    return () => { cancelled = true }
  }, [])

  const wsId = () => wsIdRef.current!

  // ── Node ops ─────────────────────────────────────────────────────────────────
  const createNode = useCallback(async (label: string, opts: any = {}) => {
    const n = await apiFetch('POST', `/api/workspaces/${wsId()}/nodes`, { label, ...opts })
    setNodes(prev => [...prev, n])
    return n
  }, [])

  const updateNode = useCallback(async (id: string, patch: Partial<WsNode>) => {
    const n = await apiFetch('PATCH', `/api/workspaces/${wsId()}/nodes/${id}`, patch)
    setNodes(prev => prev.map(x => x.id === id ? { ...x, ...n } : x))
    return n
  }, [])

  const deleteNode = useCallback(async (id: string) => {
    await apiFetch('DELETE', `/api/workspaces/${wsId()}/nodes/${id}`)
    setNodes(prev => prev.filter(x => x.id !== id))
    setEdges(prev => prev.filter(e => e.source !== id && e.target !== id))
  }, [])

  const savePositions = useCallback(async (positions: { id: string; x: number; y: number }[]) => {
    if (!positions.length) return
    await apiFetch('PUT', `/api/workspaces/${wsId()}/nodes/positions`, { positions })
    setNodes(prev => prev.map(n => {
      const p = positions.find(pp => pp.id === n.id)
      return p ? { ...n, x: p.x, y: p.y } : n
    }))
  }, [])

  const getCode = useCallback(async (nodeId: string) => {
    const res = await fetch(`${BASE}/api/workspaces/${wsId()}/nodes/${nodeId}/code`)
    if (!res.ok) return ''
    return res.text()
  }, [])

  const saveCode = useCallback(async (nodeId: string, code: string) => {
    await apiFetch('PUT', `/api/workspaces/${wsId()}/nodes/${nodeId}/code`, { code })
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, modified: true } : n))
  }, [])

  // ── Group ops ────────────────────────────────────────────────────────────────
  const createGroup = useCallback(async (name: string, color: string, node_ids: string[]) => {
    const g = await apiFetch('POST', `/api/workspaces/${wsId()}/groups`, { name, color, node_ids })
    setGroups(prev => [...prev, g])
    return g
  }, [])

  const updateGroup = useCallback(async (id: string, patch: { name?: string; color?: string; node_ids?: string[] }) => {
    const g = await apiFetch('PATCH', `/api/workspaces/${wsId()}/groups/${id}`, patch)
    setGroups(prev => prev.map(x => x.id === id ? { ...x, ...g } : x))
    return g
  }, [])

  const deleteGroup = useCallback(async (id: string) => {
    await apiFetch('DELETE', `/api/workspaces/${wsId()}/groups/${id}`)
    setGroups(prev => prev.filter(g => g.id !== id))
  }, [])

  // ── Edge ops ─────────────────────────────────────────────────────────────────
  const createEdge = useCallback(async (source: string, target: string) => {
    const e = await apiFetch('POST', `/api/workspaces/${wsId()}/edges`, { source, target })
    setEdges(prev => [...prev, e])
    return e
  }, [])

  const deleteEdge = useCallback(async (id: string) => {
    await apiFetch('DELETE', `/api/workspaces/${wsId()}/edges/${id}`)
    setEdges(prev => prev.filter(e => e.id !== id))
  }, [])

  // ── Board ops ────────────────────────────────────────────────────────────────
  const createColumn = useCallback(async (title: string, color?: string) => {
    const col = await apiFetch('POST', `/api/workspaces/${wsId()}/board/columns`, { title, color })
    setColumns(prev => [...prev, col])
    return col
  }, [])

  const updateColumn = useCallback(async (id: string, patch: any) => {
    const col = await apiFetch('PATCH', `/api/workspaces/${wsId()}/board/columns/${id}`, patch)
    setColumns(prev => prev.map(c => c.id === id ? { ...c, ...col } : c))
  }, [])

  const deleteColumn = useCallback(async (id: string) => {
    await apiFetch('DELETE', `/api/workspaces/${wsId()}/board/columns/${id}`)
    setColumns(prev => prev.filter(c => c.id !== id))
    setCards(prev => prev.filter(k => k.col_id !== id))
  }, [])

  const createCard = useCallback(async (col_id: string, title: string, opts: any = {}) => {
    const card = await apiFetch('POST', `/api/workspaces/${wsId()}/board/cards`, { col_id, title, ...opts })
    setCards(prev => [...prev, card])
    return card
  }, [])

  const updateCard = useCallback(async (id: string, patch: any) => {
    const card = await apiFetch('PATCH', `/api/workspaces/${wsId()}/board/cards/${id}`, patch)
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...card } : c))
  }, [])

  const deleteCard = useCallback(async (id: string) => {
    await apiFetch('DELETE', `/api/workspaces/${wsId()}/board/cards/${id}`)
    setCards(prev => prev.filter(c => c.id !== id))
  }, [])

  return {
    workspace, nodes, edges, groups, columns, cards, gitGraph,
    loading, error,
    setNodes, setEdges, setGroups,
    createNode, updateNode, deleteNode, savePositions, getCode, saveCode,
    createEdge, deleteEdge,
    createGroup, updateGroup, deleteGroup,
    createColumn, updateColumn, deleteColumn,
    createCard, updateCard, deleteCard,
  }
}
