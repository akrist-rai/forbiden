// src/pages/Dashboard/index.tsx — workspace listing
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '@/components/Layout/Topbar'
import { Banner, Button, Empty } from '@/components/ui'
import { api } from '@/lib/api'

interface Workspace {
  id:        string
  name:      string
  theme:     string
  createdAt: string
  updatedAt: string
}

type Status = 'loading' | 'offline' | 'no-db' | 'ok' | 'error'

const STATUS_TEXT: Record<Status, string> = {
  loading: 'CONNECTING...',
  ok:      'SYSTEM ONLINE',
  offline: 'API OFFLINE',
  'no-db': 'DB NOT CONFIGURED',
  error:   'ERROR',
}

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [status,     setStatus]     = useState<Status>('loading')
  const [creating,   setCreating]   = useState(false)
  const [name,       setName]       = useState('')
  const [err,        setErr]        = useState('')
  const nav = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const health = await fetch('/api/health').then(r => r.json()).catch(() => null)
        if (!health)    return setStatus('offline')
        if (!health.db) return setStatus('no-db')
        const data = await api.get<Workspace[]>('/api/workspaces')
        setWorkspaces(data)
        setStatus('ok')
      } catch (e: any) {
        setErr(e.message)
        setStatus('error')
      }
    })()
  }, [])

  async function createWorkspace() {
    if (!name.trim()) return
    try {
      const ws = await api.post<Workspace>('/api/workspaces', { name: name.trim() })
      setWorkspaces(prev => [ws, ...prev])
      setName('')
      setCreating(false)
      nav(`/editor/${ws.id}`)
    } catch (e: any) {
      setErr(e.message)
    }
  }

  const statusVariant = status === 'ok' ? 'ok' as const : status === 'loading' ? 'loading' as const : 'error' as const

  return (
    <div className="dash-shell">
      <Topbar crumb="GRAPH IDE" status={statusVariant} />

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
            <div className="dash-stat-n">{String(workspaces.length).padStart(2, '0')}</div>
            <div className="dash-stat-l">WORKSPACES</div>
          </div>
        </div>
      </div>

      {/* Status strip */}
      <div className="status-strip">
        <span className={`status-dot ${status === 'ok' ? 'ok' : status === 'loading' ? 'pulse' : 'err'}`} />
        <span className="status-txt">{STATUS_TEXT[status]}{status === 'error' && err ? `: ${err}` : ''}</span>
        <span className="status-sep">·</span>
        <span className="status-txt">API :3001</span>
      </div>

      {/* Content */}
      <div className="dash-content">
        {/* Banners */}
        {status === 'no-db' && (
          <Banner title="DATABASE NOT CONFIGURED">
            Go to your Supabase project → Settings → Database → Connection pooling → copy the Session mode URL → set it as <code>DATABASE_URL</code> in <code>.env</code>, then restart.
          </Banner>
        )}
        {status === 'offline' && (
          <Banner title="API OFFLINE" variant="red">
            Run <code>bun run dev</code> from the project root to start both servers.
          </Banner>
        )}

        {/* Section header */}
        <div className="sect-row">
          <span className="sect-label">WORKSPACES</span>
          {status === 'ok' && (
            <Button variant="primary" onClick={() => setCreating(v => !v)} style={{ fontSize: 9 }}>
              {creating ? '✕ CANCEL' : '+ NEW'}
            </Button>
          )}
        </div>

        {/* New workspace inline form */}
        {creating && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input
              className="input"
              placeholder="workspace name..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createWorkspace()}
              autoFocus
              style={{ maxWidth: 260 }}
            />
            <Button variant="primary" onClick={createWorkspace}>CREATE</Button>
          </div>
        )}

        {/* Grid */}
        {status === 'loading' && (
          <div style={{ height: 2, background: 'var(--green)', animation: 'load .8s ease-in-out infinite alternate', maxWidth: 200 }} />
        )}

        {(status === 'ok' || workspaces.length > 0) && (
          <div className="ws-grid">
            {workspaces.map((ws, i) => (
              <div key={ws.id} className="ws-card" onClick={() => nav(`/editor/${ws.id}`)}>
                <div className="ws-card-idx">{String(i + 1).padStart(2, '0')}</div>
                <div className="ws-card-name">{ws.name}</div>
                <div className="ws-card-meta">
                  <span>{ws.id.slice(0, 8)}…</span>
                  <span>{new Date(ws.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="ws-card-arrow">→</div>
              </div>
            ))}
            {status === 'ok' && (
              <div className="ws-card-new" onClick={() => setCreating(true)}>
                <span style={{ fontSize: 20, fontWeight: 300 }}>+</span>
                <span>NEW WORKSPACE</span>
              </div>
            )}
          </div>
        )}

        {status === 'ok' && workspaces.length === 0 && (
          <Empty
            title="NO WORKSPACES YET"
            sub="Create your first workspace to start coding in the graph."
            action={<Button variant="primary" style={{ marginTop: 8 }} onClick={() => setCreating(true)}>+ CREATE WORKSPACE</Button>}
          />
        )}
      </div>
    </div>
  )
}
