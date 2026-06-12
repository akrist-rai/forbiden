// src/components/ui/index.tsx — shared primitive UI components
import React from 'react'

// ── Tag ──────────────────────────────────────────────────────────────
type TagVariant = 'default' | 'green' | 'red' | 'gold'
export function Tag({ children, variant = 'default' }: { children: React.ReactNode; variant?: TagVariant }) {
  return <span className={`tag ${variant !== 'default' ? variant : ''}`}>{children}</span>
}

// ── Button ───────────────────────────────────────────────────────────
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger'
  size?: 'sm' | 'md'
}
export function Button({ variant = 'default', size = 'md', className = '', ...props }: BtnProps) {
  const cls = ['btn', variant !== 'default' ? `btn-${variant}` : '', size === 'sm' ? 'btn-sm' : '', className].filter(Boolean).join(' ')
  return <button className={cls} {...props} />
}

// ── Input ────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input className={`input ${className}`} {...props} />
    </div>
  )
}

// ── Banner ───────────────────────────────────────────────────────────
export function Banner({ title, children, variant = 'gold' }: { title: string; children: React.ReactNode; variant?: 'gold' | 'red' }) {
  return (
    <div className={`banner ${variant === 'red' ? 'red' : ''}`}>
      <div>
        <div className="banner-title">{title}</div>
        <div className="banner-body">{children}</div>
      </div>
    </div>
  )
}

// ── Spinner / LoadingBar ─────────────────────────────────────────────
export function LoadingBar() {
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <div className="loading-bar" style={{ width: '120px', height: '2px' }} />
    </div>
  )
}

// ── Empty ────────────────────────────────────────────────────────────
export function Empty({ icon = '⬡', title, sub, action }: { icon?: string; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <div className="empty-title">{title}</div>
      {sub && <div className="empty-sub">{sub}</div>}
      {action}
    </div>
  )
}
