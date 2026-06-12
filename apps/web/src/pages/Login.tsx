// src/pages/Login.tsx — Manga-themed auth page
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

const MANGA_IMAGES = [
  '/assets/guts.jpeg',
  '/assets/whitebeard.jpeg',
  '/assets/zoro.jpeg',
  '/assets/pantheon.jpeg',
]
const heroImg = MANGA_IMAGES[Math.floor(Math.random() * MANGA_IMAGES.length)]

export default function Login() {
  const [mode,     setMode]     = useState<'login'|'register'>('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const nav = useNavigate()

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
      {/* Left — manga artwork */}
      <div className="auth-image-col">
        <img src={heroImg} alt="manga art" />
        <div className="auth-image-overlay" />
        <div className="auth-image-caption">FOR<span style={{color:'var(--red)'}}>BIN</span>DEN</div>
      </div>

      {/* Right — form */}
      <div className="auth-form-col">
        <div className="auth-form">
          <div>
            <div className="auth-title">
              {mode === 'login' ? <>SIGN <span className="red">IN</span></> : <>JOIN <span className="red">US</span></>}
            </div>
            <div className="auth-subtitle">グラフ・コードエディタ — Graph Code IDE</div>
          </div>

          <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}>
            <input
              className="input"
              type="email"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && (
              <div style={{fontSize:11,color:'var(--red)',fontFamily:'var(--font-mono)'}}>
                {error}
              </div>
            )}
            <button className="btn btn-primary" type="submit" disabled={loading} style={{marginTop:4}}>
              {loading ? '...' : mode === 'login' ? 'ENTER' : 'CREATE'}
            </button>
          </form>

          <button
            className="btn btn-ghost"
            style={{fontSize:11}}
            onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'No account? Register' : 'Have account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
