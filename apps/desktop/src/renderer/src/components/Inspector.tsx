import { GraphNode, GraphEdge } from '../App'

interface Props {
  node: GraphNode | null
  edges: GraphEdge[]
}

export default function Inspector({ node, edges }: Props) {
  if (!node) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
        Select a node to inspect
      </div>
    )
  }

  const incoming = edges.filter(e => e.target === node.id)
  const outgoing = edges.filter(e => e.source === node.id)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '.7rem', letterSpacing: '.14em', color: 'var(--cyan)', fontWeight: 600, marginBottom: 4 }}>{node.type.toUpperCase()}</div>
        <div style={{ fontSize: '1.2rem', fontFamily: 'var(--display)', letterSpacing: '.05em', color: 'var(--text)' }}>{node.label}</div>
        {node.filePath && <div style={{ fontSize: '.6rem', fontFamily: 'var(--mono)', color: 'var(--text-dim)', marginTop: 4, wordBreak: 'break-all' }}>{node.filePath}</div>}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Properties */}
        <div>
          <div style={{ fontSize: '.65rem', letterSpacing: '.12em', color: 'var(--text-mid)', marginBottom: 8, fontWeight: 600 }}>PROPERTIES</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: 'var(--surface2)', padding: '8px 12px', borderRadius: 4, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '.55rem', color: 'var(--text-dim)', marginBottom: 2 }}>LINES</div>
              <div style={{ fontSize: '.8rem', fontFamily: 'var(--mono)', color: 'var(--text)' }}>{node.lineCount}</div>
            </div>
            <div style={{ background: 'var(--surface2)', padding: '8px 12px', borderRadius: 4, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '.55rem', color: 'var(--text-dim)', marginBottom: 2 }}>MODIFIED</div>
              <div style={{ fontSize: '.8rem', fontFamily: 'var(--mono)', color: node.modified ? 'var(--gold)' : 'var(--text)' }}>{node.modified ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>

        {/* Symbols */}
        {node.symbols.length > 0 && (
          <div>
            <div style={{ fontSize: '.65rem', letterSpacing: '.12em', color: 'var(--text-mid)', marginBottom: 8, fontWeight: 600 }}>SYMBOLS ({node.symbols.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {node.symbols.slice(0, 10).map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--void)', borderRadius: 4, border: '1px solid var(--border2)', fontSize: '.65rem', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: 'var(--cyan)' }}>{s.kind}</span>
                  <span style={{ color: 'var(--text)', flex: 1, marginLeft: 10 }}>{s.name}</span>
                  <span style={{ color: 'var(--text-dim)' }}>L{s.line}</span>
                </div>
              ))}
              {node.symbols.length > 10 && <div style={{ fontSize: '.6rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: 4 }}>+ {node.symbols.length - 10} more</div>}
            </div>
          </div>
        )}

        {/* Connections */}
        <div>
          <div style={{ fontSize: '.65rem', letterSpacing: '.12em', color: 'var(--text-mid)', marginBottom: 8, fontWeight: 600 }}>CONNECTIONS</div>
          
          {outgoing.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '.55rem', color: 'var(--text-dim)', marginBottom: 4 }}>IMPORTS ({outgoing.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {outgoing.map(e => <div key={e.id} style={{ fontSize: '.6rem', fontFamily: 'var(--mono)', padding: '3px 6px', background: 'var(--surface2)', borderRadius: 3, border: `1px solid ${e.kind === 'manual' ? 'var(--gold)' : 'var(--border2)'}`, color: 'var(--text-mid)' }}>{e.target.substring(0, 8)}...</div>)}
              </div>
            </div>
          )}
          
          {incoming.length > 0 && (
            <div>
              <div style={{ fontSize: '.55rem', color: 'var(--text-dim)', marginBottom: 4 }}>IMPORTED BY ({incoming.length})</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {incoming.map(e => <div key={e.id} style={{ fontSize: '.6rem', fontFamily: 'var(--mono)', padding: '3px 6px', background: 'var(--surface2)', borderRadius: 3, border: `1px solid ${e.kind === 'manual' ? 'var(--gold)' : 'var(--border2)'}`, color: 'var(--text-mid)' }}>{e.source.substring(0, 8)}...</div>)}
              </div>
            </div>
          )}
          
          {outgoing.length === 0 && incoming.length === 0 && (
            <div style={{ fontSize: '.65rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>No connections</div>
          )}
        </div>

      </div>
    </div>
  )
}
