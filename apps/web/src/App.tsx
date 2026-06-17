// src/App.tsx — Router root with lazy-loaded pages
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy-load pages for proper code-splitting
const LoginPage  = lazy(() => import('@/pages/Login/index'))
const HomePage   = lazy(() => import('@/pages/Home/index'))
const IDEPage    = lazy(() => import('@/pages/IDE/index'))

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#030308', color: '#10b981',
      fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
      letterSpacing: '2px', gap: '8px',
    }}>
      <span style={{ animation: 'pulse 1s ease-in-out infinite' }}>⬡</span>
      LOADING...
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Login / Auth gate */}
          <Route path="/login" element={<LoginPage />} />

          {/* Home / boot screen / workspace picker */}
          <Route path="/" element={<HomePage />} />

          {/* Graph IDE — the full workstation */}
          <Route path="/ide" element={<IDEPage />} />

          {/* Catch-all: send back home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
