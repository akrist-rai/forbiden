// Custom frameless titlebar with drag region + window controls
const api = (window as any).forbiden

interface Props { workspace: string; onOpenFolder: () => void }

export default function TitleBar({ workspace, onOpenFolder }: Props) {
  return (
    <div style={{
      height: 'var(--titlebar)', flexShrink: 0,
      background: 'rgba(6,6,15,0.98)',
      borderBottom: '1px solid var(--border2)',
      display: 'flex', alignItems: 'center',
      WebkitAppRegion: 'drag' as any,
      zIndex: 1000, paddingLeft: 14,
    }}>
      {/* Logo */}
      <span style={{ fontFamily: 'var(--display)', fontSize: '1rem', letterSpacing: '.14em', marginRight: 12 }}>
        FOR<em style={{ color: 'var(--red)', fontStyle: 'normal' }}>BID</em>EN
      </span>
      <div style={{ width: 1, height: 14, background: 'var(--border2)', marginRight: 10 }} />

      {/* Workspace path */}
      <span style={{ fontSize: '.65rem', fontFamily: 'var(--mono)', color: 'var(--text-dim)', flex: 1 }}>
        {workspace
          ? workspace.split('/').slice(-2).join('/')
          : 'No folder open — File → Open Folder'}
      </span>

      {/* Window controls */}
      <div style={{ display: 'flex', WebkitAppRegion: 'no-drag' as any }}>
        {[
          { label: '─', action: () => api.minimize(), color: '#ffd600' },
          { label: '□', action: () => api.maximize(), color: '#00e676' },
          { label: '✕', action: () => api.close(),    color: '#ff1744' },
        ].map(({ label, action, color }) => (
          <button key={label} onClick={action} style={{
            width: 36, height: 'var(--titlebar)', background: 'transparent', border: 'none',
            color: 'var(--text-dim)', fontSize: label === '✕' ? '.7rem' : '.8rem',
            transition: 'background .15s, color .15s',
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = `${color}22`; (e.target as HTMLElement).style.color = color }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = 'var(--text-dim)' }}
          >{label}</button>
        ))}
      </div>
    </div>
  )
}
