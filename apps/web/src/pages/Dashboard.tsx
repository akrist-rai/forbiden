// src/pages/Dashboard.tsx — Workspace picker with manga hero banner
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { supabase } from '@/lib/supabase'

interface Workspace { id: string; name: string; theme: string; createdAt: string; updatedAt: string }

const BANNER_IMGS = ['/assets/onepiece.jpeg', '/assets/csm.jpeg', '/assets/choujinx.jpeg', '/assets/ddd.jpeg']
const banner = BANNER_IMGS[Math.floor(Math.random() * BANNER_IMGS.length)]

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [creating,   setCreating]   = useState(false)
  const [newName,    setNewName]     = useState('')
  const nav = useNavigate()

  useEffect(() => {
    api.get<Workspace[]>('/api/workspaces').then(setWorkspaces).catch(console.error)
  }, [])

  async function createWs() {
    if (!newName.trim()) return
    const ws = await api.post<Workspace>('/api/workspaces', { name: newName.trim() })
    setWorkspaces(prev => [ws, ...prev])
    setNewName(''); setCreating(false)
    nav(`/editor/${ws.id}`)
  }

  async function signOut() {
    await supabase.auth.signOut()
    nav('/login')
  }

  return (
    <div className="dashboard-layout">
      {/* Manga hero */}
      <div className="dashboard-hero">
        <img src={banner} alt="manga banner" />
        <div className="dashboard-hero-overlay" />
        <div className="dashboard-hero-content">
          <div className="dashboard-hero-title">FORBINDEN</div>
          <div className="dashboard-hero-subtitle">禁断のグラフIDE — Forbidden Graph IDE</div>
        </div>
        <button
          className="btn btn-ghost"
          onClick={signOut}
          style={{position:'absolute',top:16,right:20,fontSize:10,letterSpacing:2}}
        >
          SIGN OUT
        </button>
      </div>

      <div className="dashboard-content">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{fontFamily:'var(--font-title)',fontSize:18,letterSpacing:4,color:'var(--text-2)'}}>
            WORKSPACES
          </div>
          <button className="btn btn-primary" onClick={() => setCreating(v => !v)}>
            + NEW
          </button>
        </div>

        {creating && (
          <div style={{display:'flex',gap:8,marginTop:16}}>
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
              <div className="ws-card-name">{ws.name}</div>
              <div className="ws-card-meta">
                {ws.id.slice(0, 14)}…<br />
                {new Date(ws.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}

          <div className="ws-card-new" onClick={() => setCreating(true)}>
            <span style={{fontSize:24,color:'var(--red)'}}>+</span>
            NEW WORKSPACE
          </div>
        </div>
      </div>
    </div>
  )
}
