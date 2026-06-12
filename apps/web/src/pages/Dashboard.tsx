// src/pages/Dashboard.tsx — Editorial masthead + workspace grid
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
      try {
        const health = await fetch('/api/health').then(r => r.json()).catch(() => null)
        if (!health) { setApiState('offline'); return }
        if (!health.db) { setApiState('no-db'); return }
      } catch { setApiState('offline'); return }
      try {
        const data = await api.get<Workspace[]>('/api/workspaces')
        setWorkspaces(data); setApiState('ok')
      } catch (e: any) { setApiMsg(e.message ?? 'Failed'); setApiState('error') }
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
    } catch (e: any) { setApiMsg(e.message) }
  }

  async function signOut() {
    if (SUPABASE_CONFIGURED) await supabase.auth.signOut()
    nav('/login')
  }

  const statusDot = apiState === 'ok' ? 'green' : (apiState === 'loading' ? 'yellow' : 'red')
  const statusText = {
    loading: 'CONNECTING TO API...',
    ok:      'SYSTEM ONLINE',
    offline: 'API OFFLINE — run npm run dev',
    'no-db': 'DB NOT CONFIGURED — set DATABASE_URL in apps/api/.env',
    error:   `ERROR: ${apiMsg}`,
  }[apiState]

  return (
    <div className="dashboard-layout">
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-logo">FOR<span className="accent">BIN</span>DEN</div>
        <div className="topbar-badge">GRAPH IDE</div>
        <div className="topbar-actions">
          {SUPABASE_CONFIGURED && (
            <button className="btn btn-ghost" style={{fontSize:9}} onClick={signOut}>SIGN OUT</button>
          )}
        </div>
      </div>

      {/* Masthead — editorial poster style */}
      <div className="dashboard-masthead">
        <div className="masthead-left">
          <div className="masthead-issue">ISSUE №001 // GRAPH IDE // 2026</div>
          <div className="masthead-title">FOR<span className="accent">BIN</span>DEN</div>
          <div className="masthead-sub">禁断のグラフIDE · CODE IN NODES · LINK FUNCTIONS · PUSH REAL GIT</div>
        </div>
        <div className="masthead-right">
          <div className="masthead-stat">
            <div className="masthead-stat-num">{workspaces.length.toString().padStart(2,'0')}</div>
            <div className="masthead-stat-label">WORKSPACES</div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <span className={`status-dot ${statusDot}`} />
        <span className="status-label">{statusText}</span>
        <span className="status-sep">·</span>
        <span>API localhost:3001</span>
        <span className="status-sep">·</span>
        <span>WS localhost:3001/ws</span>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {(apiState === 'offline' || apiState === 'no-db') && (
          <div className="setup-banner" style={{marginBottom:20}}>
            <div className="setup-banner-icon">{apiState === 'offline' ? '⚡' : '🗄️'}</div>
            <div>
              <div className="setup-banner-title">
                {apiState === 'offline' ? 'BACKEND NOT RUNNING' : 'DATABASE NOT CONFIGURED'}
              </div>
              <div className="setup-banner-body">
                {apiState === 'offline'
                  ? 'Run `npm run dev` from project root to start API + web servers.'
                  : 'Copy `.env.example` → `apps/api/.env`, fill in your Supabase DATABASE_URL, then restart.'}
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-section-row">
          <div className="dashboard-section-title">WORKSPACES</div>
          {apiState === 'ok' && (
            <button className="btn btn-primary" style={{fontSize:10}} onClick={() => setCreating(v => !v)}>
              + NEW WORKSPACE
            </button>
          )}
        </div>

        {creating && (
          <div style={{display:'flex',gap:8,marginBottom:16}}>
            <input className="input" placeholder="workspace name" value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createWs()} autoFocus style={{maxWidth:280}} />
            <button className="btn btn-primary" onClick={createWs}>CREATE</button>
            <button className="btn btn-ghost" onClick={() => setCreating(false)}>✕</button>
          </div>
        )}

        <div className="dashboard-grid">
          {workspaces.map((ws, i) => (
            <div key={ws.id} className="ws-card" onClick={() => nav(`/editor/${ws.id}`)}>
              <div className="ws-card-num">{String(i+1).padStart(2,'0')}</div>
              <div className="ws-card-name">{ws.name}</div>
              <div className="ws-card-meta">
                <span style={{fontFamily:'var(--font-mono)',fontSize:9}}>{ws.id.slice(0,12)}…</span>
                <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="ws-card-arrow">→</div>
            </div>
          ))}
          {apiState === 'ok' && (
            <div className="ws-card-new" onClick={() => setCreating(true)}>
              <div className="ws-card-new-icon">+</div>
              <div>NEW WORKSPACE</div>
            </div>
          )}
        </div>

        {apiState === 'ok' && workspaces.length === 0 && (
          <div className="empty-state" style={{marginTop:32}}>
            <div className="empty-state-icon">⬡</div>
            <div className="empty-state-title">NO WORKSPACES YET</div>
            <div className="empty-state-sub">Create your first workspace to start coding in the graph.</div>
            <button className="btn btn-primary" style={{marginTop:16}} onClick={() => setCreating(true)}>
              + CREATE WORKSPACE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
