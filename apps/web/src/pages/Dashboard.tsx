import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'

interface Workspace { id: string; name: string; theme: string; createdAt: string; updatedAt: string }
type S = 'loading'|'offline'|'no-db'|'ok'|'error'

export default function Dashboard() {
  const [ws,       setWs]       = useState<Workspace[]>([])
  const [state,    setState]    = useState<S>('loading')
  const [creating, setCreating] = useState(false)
  const [name,     setName]     = useState('')
  const [err,      setErr]      = useState('')
  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const h = await fetch('/api/health').then(r => r.json()).catch(() => null)
        if (!h)      return setState('offline')
        if (!h.db)   return setState('no-db')
        const data = await api.get<Workspace[]>('/api/workspaces')
        setWs(data); setState('ok')
      } catch (e: any) { setErr(e.message); setState('error') }
    })()
  }, [])

  async function create() {
    if (!name.trim()) return
    try {
      const w = await api.post<Workspace>('/api/workspaces', { name: name.trim() })
      setWs(p => [w, ...p]); setName(''); setCreating(false); nav(`/editor/${w.id}`)
    } catch (e: any) { setErr(e.message) }
  }

  const dot = state === 'ok' ? 'ok' : state === 'loading' ? 'pulse' : 'err'
  const txt = { loading:'CONNECTING...', ok:'SYSTEM ONLINE', offline:'API OFFLINE', 'no-db':'DB NOT CONFIGURED', error:`ERROR: ${err}` }[state]

  return (
    <div className="dash-shell">
      {/* Topbar */}
      <div className="topbar">
        <span className="topbar-brand">FOR<span className="g">BID</span>DEN</span>
        <span className="topbar-sep">/</span>
        <span className="topbar-crumb">GRAPH IDE</span>
        <div className="topbar-right">
          <span className={`tag ${state==='ok'?'green':state==='loading'?'gold':'red'}`}>
            {state.toUpperCase()}
          </span>
          {SUPABASE_CONFIGURED && (
            <button className="btn" style={{fontSize:9}} onClick={() => supabase.auth.signOut()}>SIGN OUT</button>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="dash-hero">
        <div className="dash-hero-bg" />
        <div className="dash-hero-glow" />
        <div className="dash-hero-inner">
          <div>
            <div className="dash-eyebrow">GRAPH-BASED CODE IDE // v1.0</div>
            <div className="dash-title">FOR<span className="g">BID</span>DEN</div>
            <div className="dash-sub">禁断のグラフIDE · CODE IN NODES · LINK FUNCTIONS · PUSH REAL GIT</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-n">{String(ws.length).padStart(2,'0')}</div>
            <div className="dash-stat-l">WORKSPACES</div>
          </div>
        </div>
      </div>

      {/* Status strip */}
      <div className="status-strip">
        <span className={`status-dot ${dot}`} />
        <span className="status-txt">{txt}</span>
        <span className="status-sep">·</span>
        <span className="status-txt">:3001</span>
      </div>

      {/* Content */}
      <div className="dash-content">
        {state === 'no-db' && (
          <div className="banner">
            <div>
              <div className="banner-title">DATABASE NOT CONFIGURED</div>
              <div className="banner-body">Go to your Supabase project → Settings → Database → copy the session pooler connection string → paste it as DATABASE_URL in .env</div>
            </div>
          </div>
        )}
        {state === 'offline' && (
          <div className="banner red">
            <div>
              <div className="banner-title">API OFFLINE</div>
              <div className="banner-body">Run <code>bun run dev</code> from the project root to start both servers.</div>
            </div>
          </div>
        )}

        <div className="sect-row">
          <span className="sect-label">WORKSPACES</span>
          {state === 'ok' && (
            <button className="btn btn-primary" style={{fontSize:9}} onClick={() => setCreating(v => !v)}>
              + NEW
            </button>
          )}
        </div>

        {creating && (
          <div style={{display:'flex',gap:8,marginBottom:16}}>
            <input className="input" placeholder="workspace name..." value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key==='Enter' && create()} autoFocus style={{maxWidth:260}} />
            <button className="btn btn-primary" onClick={create}>CREATE</button>
            <button className="btn" onClick={() => setCreating(false)}>✕</button>
          </div>
        )}

        <div className="ws-grid">
          {ws.map((w, i) => (
            <div key={w.id} className="ws-card" onClick={() => nav(`/editor/${w.id}`)}>
              <div className="ws-card-idx">{String(i+1).padStart(2,'0')}</div>
              <div className="ws-card-name">{w.name}</div>
              <div className="ws-card-meta">
                <span>{w.id.slice(0,10)}…</span>
                <span>{new Date(w.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="ws-card-arrow">→</div>
            </div>
          ))}
          {state === 'ok' && (
            <div className="ws-card-new" onClick={() => setCreating(true)}>
              <span style={{fontSize:20,fontWeight:300}}>+</span>
              <span>NEW WORKSPACE</span>
            </div>
          )}
        </div>

        {state === 'ok' && ws.length === 0 && (
          <div className="empty" style={{marginTop:32}}>
            <div className="empty-icon">⬡</div>
            <div className="empty-title">NO WORKSPACES</div>
            <div className="empty-sub">Create your first workspace to start coding in the graph.</div>
            <button className="btn btn-primary" style={{marginTop:16}} onClick={() => setCreating(true)}>+ CREATE</button>
          </div>
        )}
      </div>
    </div>
  )
}
