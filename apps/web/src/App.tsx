// src/App.tsx — Router root with lazy-loaded pages
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy-load pages for proper code-splitting
const LoginPage    = lazy(() => import('@/pages/Login/index'))
const HomePage     = lazy(() => import('@/pages/Home/index'))
const IDEPage      = lazy(() => import('@/pages/IDE/index'))
const MangaIDEPage = lazy(() => import('@/pages/IDE/new_ide'))

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
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Graph IDE — the full workstation (default landing) */}
          <Route path="/ide" element={<IDEPage />} />

          {/* Manga Panel IDE — alternative editor */}
          <Route path="/manga-ide" element={<MangaIDEPage />} />

          {/* Everything else → IDE */}
          <Route path="*" element={<Navigate to="/ide" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
