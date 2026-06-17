import { useState, useRef, useEffect } from 'react'
import { GraphNode, GraphEdge } from '../App'

const COLORS: Record<string, string> = {
  entry:'#ffd600', function:'#00e676', class:'#82aaff',
  module:'#bb9af7', test:'#ff1744', util:'#00e5ff'
}
const ICONS: Record<string, string> = {
  entry:'🏠', function:'⚡', class:'🧩', module:'📦', test:'🧪', util:'🔧'
}
const CARD_W = 200, CARD_H = 136

interface Props {
  nodes: GraphNode[]; edges: GraphEdge[]
  selectedId: string | null
  onSelect: (id: string) => void
  onDoubleClick: (id: string) => void
  onMove: (id: string, x: number, y: number) => void
  onDelete: (id: string) => void
  onAddEdge: (src: string, tgt: string) => void
  onAddNode: () => void
}

export default function Canvas({
  nodes, edges, selectedId, onSelect, onDoubleClick, onMove, onDelete, onAddEdge, onAddNode
}: Props) {
  const [transform, setTransform] = useState({ x: 300, y: 200, scale: 1 })
  const [currentTool, setCurrentTool] = useState<'select'|'pan'|'connect'>('select')
  const [connectFrom, setConnectFrom] = useState<string | null>(null)
  
  const wrapRef = useRef<HTMLDivElement>(null)
  const isPanning = useRef(false)
  const panStart  = useRef({ mx: 0, my: 0, ox: 0, oy: 0 })
  const dragging  = useRef<{ id: string, mx: number, my: number, ox: number, oy: number } | null>(null)

  // ── Zoom ──
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const f = e.deltaY < 0 ? 1.08 : 0.93
      const r = wrap.getBoundingClientRect()
      const px = e.clientX - r.left, py = e.clientY - r.top
      setTransform(t => {
        const ns = Math.min(2.5, Math.max(0.2, t.scale * f))
        return { x: px - (px - t.x) * (ns / t.scale), y: py - (py - t.y) * (ns / t.scale), scale: ns }
      })
    }
    wrap.addEventListener('wheel', onWheel, { passive: false })
    return () => wrap.removeEventListener('wheel', onWheel)
  }, [])

  // ── Pan / Drag ──
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === wrapRef.current || (e.target as HTMLElement).id === 'canvas-inner') {
      if (e.button === 1 || (e.button === 0 && (e.altKey || currentTool === 'pan'))) {
        e.preventDefault(); isPanning.current = true
        panStart.current = { mx: e.clientX, my: e.clientY, ox: transform.x, oy: transform.y }
      } else {
        onSelect('')
      }
    }
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isPanning.current) {
        setTransform(t => ({
          ...t,
          x: panStart.current.ox + (e.clientX - panStart.current.mx),
          y: panStart.current.oy + (e.clientY - panStart.current.my)
        }))
      }
      if (dragging.current) {
        const { id, mx, my, ox, oy } = dragging.current
        setTransform(t => {
          onMove(id, ox + (e.clientX - mx) / t.scale, oy + (e.clientY - my) / t.scale)
          return t
        })
      }
    }
    const onMouseUp = () => { isPanning.current = false; dragging.current = null }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp) }
  }, [onMove])

  // ── Node interactions ──
  const handleNodeMouseDown = (e: React.MouseEvent, node: GraphNode) => {
    if (e.button !== 0) return; e.stopPropagation()
    if (currentTool === 'connect') {
      if (!connectFrom) setConnectFrom(node.id)
      else { onAddEdge(connectFrom, node.id); setConnectFrom(null) }
      return
    }
    dragging.current = { id: node.id, mx: e.clientX, my: e.clientY, ox: node.x, oy: node.y }
    onSelect(node.id)
  }

  // ── Minimap ──
  const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y)
  const minX = Math.min(...xs) - 80, maxX = Math.max(...xs) + 80
  const minY = Math.min(...ys) - 80, maxY = Math.max(...ys) + 80
  const rX = maxX - minX || 1, rY = maxY - minY || 1

  return (
    <div ref={wrapRef} onMouseDown={handleMouseDown} style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--void)',
      backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
      backgroundSize: '40px 40px',
      cursor: isPanning.current ? 'grabbing' : currentTool === 'pan' ? 'grab' : currentTool === 'connect' ? 'crosshair' : 'default'
    }}>
      
      {/* Toolbar */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
        display: 'flex', gap: 2, background: 'rgba(13,13,28,.92)', border: '1px solid var(--border2)',
        borderRadius: 6, padding: 3, backdropFilter: 'blur(12px)'
      }}>
        {(['select','pan','connect'] as const).map(t => (
          <button key={t} onClick={() => { setCurrentTool(t); setConnectFrom(null) }} style={{
            padding: '5px 11px', background: currentTool === t ? 'var(--cyan-dim)' : 'transparent',
            border: 'none', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '.65rem',
            letterSpacing: '.1em', color: currentTool === t ? 'var(--cyan)' : 'var(--text-dim)',
          }}>{t.toUpperCase()}</button>
        ))}
        <div style={{ width: 1, height: 14, background: 'var(--border2)', margin: '0 4px', alignSelf: 'center' }} />
        <button onClick={() => setTransform({ x: 300, y: 200, scale: 1 })} style={{
          padding: '5px 11px', background: 'transparent', border: 'none', color: 'var(--text-dim)',
          fontFamily: 'var(--mono)', fontSize: '.65rem', letterSpacing: '.1em'
        }}>RESET</button>
      </div>

      {/* Canvas */}
      <div id="canvas-inner" style={{
        position: 'absolute', inset: 0, transformOrigin: '0 0',
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
      }}>
        <svg style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 2 }}>
          <defs>
            <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="rgba(0,229,255,0.5)" />
            </marker>
            <marker id="arr-manual" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="rgba(255,214,0,0.5)" />
            </marker>
          </defs>
          {edges.map(e => {
            const src = nodes.find(n => n.id === e.source), tgt = nodes.find(n => n.id === e.target)
            if (!src || !tgt) return null
            const sx = src.x + CARD_W/2, sy = src.y + CARD_H/2
            const tx = tgt.x + CARD_W/2, ty = tgt.y + CARD_H/2
            const my = (sy + ty) / 2
            const color = e.kind === 'manual' ? 'var(--gold)' : (COLORS[src.type] || 'var(--cyan)')
            return (
              <path key={e.id} d={`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`}
                fill="none" stroke={color} strokeWidth={e.kind === 'manual' ? 2 : 1.5}
                opacity={e.kind === 'manual' ? 0.7 : 0.45} strokeDasharray={e.kind === 'manual' ? '4 4' : 'none'}
                markerEnd={`url(#arr${e.kind === 'manual' ? '-manual' : ''})`} />
            )
          })}
        </svg>

        {nodes.map(node => {
          const color = COLORS[node.type] || '#00e5ff'
          const icon  = ICONS[node.type] || '📄'
          const sel   = selectedId === node.id || connectFrom === node.id
          return (
            <div key={node.id} onMouseDown={e => handleNodeMouseDown(e, node)} onDoubleClick={() => onDoubleClick(node.id)}
              style={{
                position: 'absolute', left: node.x, top: node.y, width: CARD_W, zIndex: sel ? 10 : 5,
                background: 'rgba(13,13,28,.97)', border: `1.5px solid ${sel ? color : 'var(--border2)'}`,
                borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                boxShadow: sel ? `0 0 20px ${color}44, 0 0 40px ${color}22` : 'none',
                outline: connectFrom === node.id ? `2px dashed ${color}` : 'none'
              }}>
              <div style={{ height: 64, background: `linear-gradient(135deg, ${color}11, ${color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ fontSize: '1.8rem', opacity: 0.5 }}>{icon}</div>
                <div style={{ position: 'absolute', bottom: 5, left: 7, fontSize: '.52rem', letterSpacing: '.14em', fontWeight: 700, border: '1px solid', padding: '2px 5px', borderRadius: 2, background: 'rgba(6,6,15,.85)', color, borderColor: color }}>
                  {node.type.toUpperCase()}
                </div>
                {!node.filePath && (
                  <div style={{ position: 'absolute', top: 5, right: 7, fontSize: 14, color: 'var(--gold)' }} title="Not linked to file">⚠️</div>
                )}
              </div>
              <div style={{ height: 2, background: color }} />
              <div style={{ padding: '7px 9px 9px' }}>
                <div style={{ fontSize: '.7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>{node.label}</div>
                <div style={{ fontSize: '.58rem', color: 'var(--text-dim)', display: 'flex', gap: 6 }}>
                  <span>{node.lineCount}L</span>
                  {node.modified && <span style={{ color: 'var(--gold)' }}>● UNSAVED</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Minimap */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12, zIndex: 50,
        background: 'rgba(13,13,28,.92)', border: '1px solid var(--border2)',
        borderRadius: 6, padding: 8, backdropFilter: 'blur(12px)'
      }}>
        <div style={{ fontSize: '.58rem', letterSpacing: '.14em', color: 'var(--text-dim)', marginBottom: 5 }}>OVERVIEW</div>
        <svg width="110" height="70">
          {nodes.map(n => (
            <circle key={n.id} cx={8 + (n.x - minX)/rX*94} cy={8 + (n.y - minY)/rY*54}
              r={n.isMain ? 5 : 3} fill={COLORS[n.type] || '#00e5ff'} opacity={0.75} />
          ))}
        </svg>
      </div>
    </div>
  )
}
