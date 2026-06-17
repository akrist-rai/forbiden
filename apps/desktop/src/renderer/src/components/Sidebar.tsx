import { GraphNode, GraphEdge } from '../App'

const TYPE_COLORS: Record<string, string> = {
  entry:'#ffd600', function:'#00e676', class:'#82aaff',
  module:'#bb9af7', test:'#ff1744', util:'#00e5ff',
}
const TYPE_ICONS:  Record<string, string> = {
  entry:'🏠', function:'⚡', class:'🧩', module:'📦', test:'🧪', util:'🔧',
}

interface Props {
  panel: 'nodes' | 'files'
  nodes: GraphNode[]; edges: GraphEdge[]
  selectedId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onAdd: () => void
  onScan: () => void
  scanning: boolean
}

export default function Sidebar({
  panel, nodes, edges, selectedId, onSelect, onDelete, onAdd, onScan, scanning,
}: Props) {
  const autoEdges = edges.filter(e => e.kind === 'import').length

  return (
    <div style={{
      width: 240, flexShrink: 0,
      background: 'rgba(13,13,28,0.92)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Header */}
      <div style={{
        height: 36, flexShrink: 0, display: 'flex', alignItems: 'center',
        padding: '0 12px', gap: 6, borderBottom: '1px solid var(--border)',
        fontSize: '.62rem', letterSpacing: '.18em', fontWeight: 600,
        color: 'var(--text-dim)', textTransform: 'uppercase',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
        {panel === 'nodes' ? 'Graph Nodes' : 'Files'}
        <div style={{ flex: 1 }} />
        <button onClick={onAdd} style={{ background: 'transparent', border: 'none', color: 'var(--cyan)', fontSize: 14, lineHeight: 1 }} title="Add node">+</button>
        <button onClick={onScan} title="Scan workspace" style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: 12 }}>
          {scanning ? '⟳' : '↺'}
        </button>
      </div>

      {/* Stats bar */}
      <div style={{
        padding: '6px 12px', borderBottom: '1px solid var(--border)',
        fontSize: '.6rem', color: 'var(--text-dim)', fontFamily: 'var(--mono)',
        display: 'flex', gap: 10,
      }}>
        <span>{nodes.length} nodes</span>
        <span style={{ color: 'var(--cyan)' }}>{autoEdges} auto-edges</span>
        <span>{edges.length - autoEdges} manual</span>
      </div>

      {/* Node list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
        {nodes.length === 0 ? (
          <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '.7rem', fontFamily: 'var(--mono)' }}>
            No nodes yet.<br/>Click ↺ to scan workspace.
          </div>
        ) : (
          [...nodes]
            .sort((a, b) => {
              const O: Record<string, number> = { entry:0, class:1, module:2, function:3, util:4, test:5 }
              return (O[a.type]??9) - (O[b.type]??9) || a.label.localeCompare(b.label)
            })
            .map(node => {
              const color   = TYPE_COLORS[node.type] ?? '#00e5ff'
              const icon    = TYPE_ICONS[node.type]  ?? '📄'
              const active  = selectedId === node.id
              const outEdges = edges.filter(e => e.source === node.id && e.kind === 'import').length
              return (
                <div key={node.id}
                  onClick={() => onSelect(node.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '7px 12px', cursor: 'pointer',
                    borderLeft: `2px solid ${active ? color : 'transparent'}`,
                    background: active ? `${color}0a` : 'transparent',
                    transition: 'all .12s',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '.7rem', fontFamily: 'var(--mono)',
                      color: active ? 'var(--text)' : 'var(--text-mid)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {node.label}{node.modified ? ' ●' : ''}
                    </div>
                    <div style={{ fontSize: '.57rem', color: 'var(--text-dim)', marginTop: 1, display: 'flex', gap: 6 }}>
                      <span style={{ color }}>{node.type}</span>
                      <span>{node.lineCount}L</span>
                      {outEdges > 0 && <span style={{ color: 'var(--cyan)' }}>→{outEdges}</span>}
                      {!node.filePath && <span style={{ color: 'var(--gold)' }}>○</span>}
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); onDelete(node.id) }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: 12, opacity: 0, transition: 'opacity .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                  >✕</button>
                </div>
              )
            })
        )}
      </div>
    </div>
  )
}
