// src/pages/Dashboard.tsx — Workspace picker, graceful API error state
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'

interface Workspace { id: string; name: string; theme: string; createdAt: string; updatedAt: string }

type ApiState = 'loading' | 'offline' | 'no-db' | 'ok' | 'error'

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [creating,   setCreating]   = useState(false)
  const [newName,    setNewName]     = useState('')
  const [apiState,   setApiState]   = useState<ApiState>('loading')
  const [apiMsg,     setApiMsg]     = useState('')
  const nav = useNavigate()

  useEffect(() => {
    async function boot() {
      // 1. Check API health
      try {
        const health = await fetch('/api/health').then(r => r.json()).catch(() => null)
        if (!health) { setApiState('offline'); return }
        if (!health.db) { setApiState('no-db'); return }
      } catch {
        setApiState('offline'); return
      }

      // 2. Load workspaces
      try {
        const data = await api.get<Workspace[]>('/api/workspaces')
        setWorkspaces(data)
        setApiState('ok')
      } catch (e: any) {
        setApiMsg(e.message ?? 'Failed to load workspaces')
        setApiState('error')
      }
    }
    boot()
  }, [])

  async function createWs() {
    if (!newName.trim()) return
    try {
      const ws = await api.post<Workspace>('/api/workspaces', { name: newName.trim() })
      setWorkspaces(prev => [ws, ...prev])
      setNewName(''); setCreating(false)
      nav(`/editor/${ws.id}`)
    } catch (e: any) {
      setApiMsg(e.message)
    }
  }

  async function signOut() {
    if (SUPABASE_CONFIGURED) await supabase.auth.signOut()
    nav('/login')
  }

  return (
    <div className="dashboard-layout">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-logo">FOR<span className="accent">BIN</span>DEN</div>
        <div className="topbar-badge">v1.0</div>
        <div className="topbar-actions">
          {SUPABASE_CONFIGURED && (
            <button className="btn btn-ghost" style={{fontSize:10}} onClick={signOut}>SIGN OUT</button>
          )}
        </div>
      </div>

      {/* HERO */}
      <div className="dashboard-hero">
        <div className="hero-grid-bg" />
        <div className="dashboard-hero-content">
          <div className="dashboard-hero-eyebrow">GRAPH-BASED CODE IDE</div>
          <div className="dashboard-hero-title">FOR<span className="accent">BIN</span>DEN</div>
          <div className="dashboard-hero-subtitle">Code in nodes. Link functions. Push real Git.</div>
        </div>
        <div className="hero-status-row">
          <span className={`status-dot ${apiState === 'ok' ? 'green' : apiState === 'offline' || apiState === 'no-db' ? 'red' : 'yellow'}`} />
          <span className="status-label">
            {apiState === 'loading' && 'CONNECTING...'}
            {apiState === 'ok'      && 'API ONLINE'}
            {apiState === 'offline' && 'API OFFLINE — start the backend'}
            {apiState === 'no-db'   && 'API UP · DB NOT CONFIGURED — set DATABASE_URL in apps/api/.env'}
            {apiState === 'error'   && `ERROR: ${apiMsg}`}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content">
        {/* Setup banner when no DB */}
        {(apiState === 'offline' || apiState === 'no-db') && (
          <div className="setup-banner">
            <div className="setup-banner-icon">{apiState === 'offline' ? '⚡' : '🗄️'}</div>
            <div>
              <div className="setup-banner-title">
                {apiState === 'offline' ? 'Backend not running' : 'Database not configured'}
              </div>
              <div className="setup-banner-body">
                {apiState === 'offline'
                  ? 'Run `npm run dev` from the project root to start both API and web.'
                  : 'Copy `.env.example` → `apps/api/.env` and fill in your Supabase `DATABASE_URL`, then restart the API.'}
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <div className="section-label" style={{padding:0}}>WORKSPACES</div>
          {apiState === 'ok' && (
            <button className="btn btn-primary" onClick={() => setCreating(v => !v)}>+ NEW</button>
          )}
        </div>

        {creating && (
          <div style={{display:'flex',gap:8,marginBottom:16}}>
            <input
              className="input"
              placeholder="workspace name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createWs()}
              autoFocus
              style={{maxWidth:320}}
            />
            <button className="btn btn-primary" onClick={createWs}>CREATE</button>
            <button className="btn btn-ghost" onClick={() => setCreating(false)}>✕</button>
          </div>
        )}

        <div className="dashboard-grid">
          {workspaces.map(ws => (
            <div key={ws.id} className="ws-card" onClick={() => nav(`/editor/${ws.id}`)}>
              <div className="ws-card-accent" />
              <div className="ws-card-name">{ws.name}</div>
              <div className="ws-card-meta">
                <span>{ws.id.slice(0, 14)}…</span>
                <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="ws-card-arrow">→</div>
            </div>
          ))}

          {apiState === 'ok' && (
            <div className="ws-card-new" onClick={() => setCreating(true)}>
              <span className="ws-card-new-icon">+</span>
              <span>NEW WORKSPACE</span>
            </div>
          )}
        </div>

        {apiState === 'ok' && workspaces.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">⬡</div>
            <div className="empty-state-title">NO WORKSPACES</div>
            <div className="empty-state-sub">Create your first workspace to start coding in the graph.</div>
            <button className="btn btn-primary" style={{marginTop:16}} onClick={() => setCreating(true)}>+ CREATE WORKSPACE</button>
          </div>
        )}
      </div>
    </div>
  )
}
