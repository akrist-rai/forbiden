import { useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mode, setMode]     = useState<'login'|'register'>('login')
  const [email, setEmail]   = useState('')
  const [pw, setPw]         = useState('')
  const [err, setErr]       = useState('')
  const [msg, setMsg]       = useState('')
  const [busy, setBusy]     = useState(false)
  const nav = useNavigate()

  if (!SUPABASE_CONFIGURED) { nav('/'); return null }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setMsg(''); setBusy(true)
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
        if (error) throw error
        nav('/')
      } else {
        const { error } = await supabase.auth.signUp({ email, password: pw })
        if (error) throw error
        setMsg('Account created — sign in now.')
        setMode('login')
      }
    } catch (e: any) { setErr(e.message ?? 'Error') }
    finally { setBusy(false) }
  }

  return (
    <div className="auth-shell">
      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="auth-left-glow" />
        <div className="auth-left-content">
          <div className="auth-eyebrow">GRAPH-BASED CODE IDE // OPERATOR PORTAL</div>
          <div className="auth-bigtext">
            FOR<span className="g">BID</span><br/>DEN
          </div>
          <div className="auth-features">
            {['Node-based code graph', 'Real Git integration', 'Live WebSocket sync', 'Kanban task board'].map(f => (
              <div key={f} className="auth-feat">{f}</div>
            ))}
          </div>
        </div>
        <div className="auth-left-foot">
          FORBINDEN // v1.0 ALPHA // GRAPH IDE 2026
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-form">
          <div>
            <div className="auth-form-title">OPERATOR AUTH</div>
            <div className="auth-form-head">
              {mode === 'login' ? <>SIGN <span style={{color:'var(--green)'}}>IN</span></> : <>JOIN <span style={{color:'var(--green)'}}>US</span></>}
            </div>
          </div>

          <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}>
            <div>
              <label className="label">EMAIL</label>
              <input className="input" type="email" placeholder="operator@domain.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">PASSWORD</label>
              <input className="input" type="password" placeholder="••••••••"
                value={pw} onChange={e => setPw(e.target.value)} required />
            </div>
            {err && <div className="auth-msg err">{err}</div>}
            {msg && <div className="auth-msg ok">{msg}</div>}
            <button className="btn btn-primary" type="submit" disabled={busy} style={{marginTop:4}}>
              {busy ? 'AUTHENTICATING...' : mode === 'login' ? 'ENTER SYSTEM' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="divider" />

          <button className="btn" style={{fontSize:9}} onClick={() => { setMode(m => m==='login'?'register':'login'); setErr(''); setMsg('') }}>
            {mode === 'login' ? '→ Create an account' : '← Back to sign in'}
          </button>

          <div style={{fontSize:9,color:'var(--text3)',textAlign:'center'}}>
            FORBINDEN // GRAPH IDE
          </div>
        </div>
      </div>
    </div>
  )
}
