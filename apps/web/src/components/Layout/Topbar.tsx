// src/components/Layout/Topbar.tsx — global topbar
import { supabase, SUPABASE_CONFIGURED } from '@/lib/supabase'
import { Tag } from '@/components/ui'

interface Props {
  crumb?: string
  status?: 'ok' | 'loading' | 'error' | 'offline' | 'no-db'
}

const STATUS_VARIANT = {
  ok:      'green',
  loading: 'gold',
  error:   'red',
  offline: 'red',
  'no-db': 'red',
} as const

export default function Topbar({ crumb, status }: Props) {
  return (
    <div className="topbar">
      <span className="topbar-brand">FOR<span className="g">BID</span>DEN</span>
      {crumb && (
        <>
          <span className="topbar-sep">/</span>
          <span className="topbar-crumb">{crumb}</span>
        </>
      )}
      <div className="topbar-right">
        {status && (
          <Tag variant={STATUS_VARIANT[status]}>
            {status.toUpperCase()}
          </Tag>
        )}
        {SUPABASE_CONFIGURED && (
          <button className="btn" style={{ fontSize: 9 }} onClick={() => supabase.auth.signOut()}>
            SIGN OUT
          </button>
        )}
      </div>
    </div>
  )
}
