// src/pages/Login.tsx — Terminal-style auth, no external image deps
import { useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mode,     setMode]     = useState<'login'|'register'>('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const nav = useNavigate()

  // If Supabase not configured, just pass through to dashboard
  if (!SUPABASE_CONFIGURED) {
    nav('/')
    return null
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      if (mode === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        nav('/')
      } else {
        const { error: err } = await supabase.auth.signUp({ email, password })
        if (err) throw err
        setMode('login')
        setError('Account created — sign in now.')
      }
    } catch (err: any) {
      setError(err.message ?? 'Auth error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      {/* Left panel — branding */}
      <div className="auth-brand-col">
        <div className="auth-brand-grid" />
        <div className="auth-brand-content">
          <div className="auth-brand-logo">FOR<span className="accent">BIN</span>DEN</div>
          <div className="auth-brand-tagline">Graph-based<br/>Code IDE</div>
          <div className="auth-brand-features">
            {['Node-based code structure', 'Real Git integration', 'Live collaboration', 'Kanban board'].map(f => (
              <div key={f} className="auth-feature-row">
                <span className="auth-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-brand-version">v1.0 // ALPHA</div>
      </div>

      {/* Right panel — form */}
      <div className="auth-form-col">
        <div className="auth-form">
          <div>
            <div className="auth-title">
              {mode === 'login' ? <>SIGN <span className="accent">IN</span></> : <>JOIN <span className="accent">US</span></>}
            </div>
            <div className="auth-subtitle">FORBINDEN Operator Portal</div>
          </div>

          <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}>
            <div className="input-group">
              <label className="input-label">EMAIL</label>
              <input
                className="input"
                type="email"
                placeholder="operator@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">PASSWORD</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className={`auth-message ${error.includes('created') ? 'success' : 'error'}`}>
                {error}
              </div>
            )}
            <button className="btn btn-primary" type="submit" disabled={loading} style={{marginTop:4}}>
              {loading ? 'AUTHENTICATING...' : mode === 'login' ? 'ENTER SYSTEM' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <button
            className="btn btn-ghost"
            style={{fontSize:11}}
            onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
          >
            {mode === 'login' ? 'No account? Register →' : '← Back to sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
