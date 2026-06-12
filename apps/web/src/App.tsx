// src/App.tsx — Router + auth guard with offline-mode support
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Editor from '@/pages/Editor'

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
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,background:'#0a0a0f'}}>
      <div style={{fontFamily:'\'Bebas Neue\', sans-serif',fontSize:32,letterSpacing:8,color:'#e8e8f0'}}>
        FOR<span style={{color:'#e8003a'}}>BIN</span>DEN
      </div>
      <div style={{width:40,height:2,background:'#e8003a',animation:'loading 1s ease-in-out infinite alternate'}} />
      <style>{`@keyframes loading { from { width:20px } to { width:80px } }`}</style>
    </div>
  )

  if (!authed) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/editor/:wsId" element={<AuthGuard><Editor /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
