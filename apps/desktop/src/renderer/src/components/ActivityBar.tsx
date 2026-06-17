interface Props {
  sidePanel: string | null
  setSidePanel: (p: 'nodes' | 'files' | null) => void
}

const BUTTONS = [
  { id: 'nodes', icon: '⬡', title: 'Graph Nodes' },
  { id: 'files', icon: '⊞', title: 'File Explorer' },
]

export default function ActivityBar({ sidePanel, setSidePanel }: Props) {
  return (
    <div style={{
      width: 48, flexShrink: 0,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '8px 0', gap: 2, zIndex: 100,
    }}>
      {BUTTONS.map(b => (
        <button key={b.id} title={b.title}
          onClick={() => setSidePanel(sidePanel === b.id ? null : b.id as any)}
          style={{
            width: 36, height: 36, borderRadius: 4, background: 'transparent', border: 'none',
            fontSize: 15, color: sidePanel === b.id ? 'var(--cyan)' : 'var(--text-dim)',
            transition: 'all .15s', position: 'relative',
          }}>
          {b.icon}
          {sidePanel === b.id && (
            <span style={{
              position: 'absolute', left: 0, top: '20%', bottom: '20%',
              width: 2, background: 'var(--cyan)', borderRadius: '0 2px 2px 0',
            }} />
          )}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button title="Settings" style={{
        width: 36, height: 36, borderRadius: 4, background: 'transparent', border: 'none',
        fontSize: 15, color: 'var(--text-dim)',
      }}>⚙</button>
    </div>
  )
}
