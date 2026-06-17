// src/App.tsx — Router root with lazy-loaded pages
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Main IDE — the rewritten graph IDE with auto-connect + terminal
const IDEPage      = lazy(() => import('@/pages/IDE/new_ide'))
// Legacy IDE (React Flow version) — kept for reference
const LegacyIDE    = lazy(() => import('@/pages/IDE/index'))

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#06060f', color: '#00e5ff',
      fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
      letterSpacing: '3px', gap: '10px',
    }}>
      <span>⬡</span>
      FORBIDEN
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Primary graph IDE */}
          <Route path="/ide"        element={<IDEPage />} />
          <Route path="/manga-ide"  element={<IDEPage />} />
          {/* Legacy — kept for comparison */}
          <Route path="/legacy-ide" element={<LegacyIDE />} />
          {/* Default → new IDE */}
          <Route path="*" element={<Navigate to="/ide" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
