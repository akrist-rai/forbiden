// src/App.tsx — router + auth guard
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'
import Login     from '@/pages/Login/index'
import Dashboard from '@/pages/Dashboard/index'
import Editor    from '@/pages/Editor/index'

const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [authed,   setAuthed]   = useState(false)

  useEffect(() => {
    if (DEV_BYPASS || !SUPABASE_CONFIGURED) {
      setAuthed(true); setChecking(false); return
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session); setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthed(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (checking) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: '#080810' }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 20, letterSpacing: 8, color: '#e8e8f8', fontWeight: 800 }}>
        FOR<span style={{ color: '#10b981' }}>BID</span>DEN
      </div>
      <div style={{ width: 80, height: 2, background: '#10b981', animation: 'ld 0.8s ease-in-out infinite alternate' }} />
      <style>{`@keyframes ld { from { opacity: 0.3 } to { opacity: 1 } }`}</style>
    </div>
  )

  if (!authed) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"         element={<Login />} />
        <Route path="/"              element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/editor/:wsId"  element={<AuthGuard><Editor /></AuthGuard>} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
