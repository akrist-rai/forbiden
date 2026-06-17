interface Props {
  onOpenFolder: () => void
  onScan: () => void
}

export default function Welcome({ onOpenFolder, onScan }: Props) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'var(--void)',
      backgroundImage: 'radial-gradient(circle at center, rgba(0,229,255,0.05) 0%, transparent 50%)'
    }}>
      <div style={{
        fontFamily: 'var(--display)', fontSize: '4rem', letterSpacing: '.15em',
        color: 'var(--text)', marginBottom: 8, textShadow: 'var(--glow-cyan)'
      }}>
        FOR<em style={{ color: 'var(--red)', fontStyle: 'normal' }}>BID</em>EN
      </div>
      <div style={{ fontSize: '.85rem', color: 'var(--text-mid)', letterSpacing: '.05em', marginBottom: 40 }}>
        Visual Code Intelligence Engine
      </div>
      
      <div style={{ display: 'flex', gap: 16 }}>
        <button onClick={onOpenFolder} style={{
          padding: '12px 24px', background: 'var(--surface2)', border: '1px solid var(--border2)',
          borderRadius: 6, color: 'var(--text)', fontSize: '.85rem', cursor: 'pointer',
          transition: 'all .2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <span style={{ fontSize: '1.5rem', color: 'var(--cyan)' }}>📂</span>
          <span>Open Folder</span>
        </button>

        <button onClick={onScan} style={{
          padding: '12px 24px', background: 'var(--surface2)', border: '1px solid var(--border2)',
          borderRadius: 6, color: 'var(--text)', fontSize: '.85rem', cursor: 'pointer',
          transition: 'all .2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.boxShadow = 'var(--glow-red)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <span style={{ fontSize: '1.5rem', color: 'var(--red)' }}>⚡</span>
          <span>Scan Workspace</span>
        </button>
      </div>

      <div style={{ marginTop: 60, fontSize: '.7rem', color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>
        Tip: You can use Cmd/Ctrl + Shift + S to quickly scan the workspace.
      </div>
    </div>
  )
}
