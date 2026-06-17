// @ts-nocheck
import './manga-ide.css'
import { useState, useEffect, useRef, useCallback } from 'react'

const MANGA = [
  'Guts.jpeg','Killua.jpeg','Inumaki.jpeg','Monster.jpeg','Whitebeard.jpeg',
  'Roronoa Zoro.jpeg','Reze.jpeg','Fire Punch.jpeg','PANTHEON.jpeg','CHAOS SMILE.jpeg',
  'Choujin X.jpeg','Denj - Chainsaw Man_.jpeg','Kagurabachi X Bleach.jpeg',
  'Nelliel Brutalism.jpeg','God Valley.jpeg','Guts And Zodd, DON.jpeg',
]
const ENC = (f) => encodeURIComponent(f)

const TYPE_COLORS = {
  entry: '#f5c518', function: '#10b981', class: '#4285f4',
  module: '#bb9af7', test: '#ff435a', util: '#28f1c3',
}

const INITIAL_NODES = [
  { id:'n1', type:'entry',    label:'core_sys.py',      x:0,    y:0,   themeIdx:0, isMain:true,  code:'import torch\nimport sys\n\nprint("Central Architecture Booted")\n\ndef init_sequence():\n    pass\n\nif __name__ == "__main__":\n    init_sequence()', modified:false },
  { id:'n2', type:'function', label:'load_network.py',  x:260,  y:-160, themeIdx:1, isMain:false, code:'def load_network(config=None):\n    loader = DataLoader(config)\n    loader.init()\n    return loader\n\nDEFAULT_LR = 0.001', modified:true },
  { id:'n3', type:'class',    label:'DataMatrix.py',    x:-180, y:200,  themeIdx:2, isMain:false, code:'class DataMatrix:\n    def __init__(self, size=128):\n        self.active = True\n        self.buffer = []\n        self.size = size\n\n    def push(self, data):\n        if len(self.buffer) < self.size:\n            self.buffer.append(data)\n            return True\n        return False', modified:false },
  { id:'n4', type:'function', label:'preprocess.py',    x:200,  y:240,  themeIdx:3, isMain:false, code:'def preprocess(data):\n    return data', modified:false },
  { id:'n5', type:'module',   label:'config.py',        x:-260, y:-120, themeIdx:4, isMain:false, code:'CONFIG = {\n    "lr": 0.001,\n    "batch": 32,\n    "epochs": 100,\n}', modified:false },
]
const INITIAL_EDGES = [
  { id:'e1', source:'n1', target:'n2' },
  { id:'e2', source:'n1', target:'n3' },
  { id:'e3', source:'n2', target:'n4' },
  { id:'e4', source:'n5', target:'n1' },
]

function highlight(code) {
  const KW = /\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|pass|break|continue|try|except|finally|with|as|yield|lambda|self|print|async|await|const|let|var|function|export|default|new|this)\b/g
  const STR = /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`]*`)/g
  const CMT = /(#.*$|\/\/.*$)/gm
  const NUM = /\b(\d+\.?\d*)\b/g
  const FN  = /\b([a-zA-Z_]\w*)\s*(?=\()/g
  let h = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const s = []; const P='ⓟ', E='ⓔ'
  h = h.replace(CMT, m => { s.push(`<span class="syn-comment">${m}</span>`); return P+(s.length-1)+E })
  h = h.replace(STR, m => { s.push(`<span class="syn-string">${m}</span>`); return P+(s.length-1)+E })
  h = h.replace(FN,  (m,f) => { s.push(`<span class="syn-function">${f}</span>`); return P+(s.length-1)+E+'(' })
  h = h.replace(KW,  '<span class="syn-keyword">$&</span>')
  h = h.replace(NUM, '<span class="syn-number">$&</span>')
  h = h.replace(/ⓟ(\d+)ⓔ/g, (_,i) => s[+i])
  return h
}

function NodeCard({ node, selected, hovered, panelIdx, onClick, onDoubleClick }) {
  const color = TYPE_COLORS[node.type] || '#10b981'
  const img = MANGA[node.themeIdx % MANGA.length]
  return (
    <div
      className={`manga-node-card${selected ? ' selected' : ''}${hovered ? ' hovered' : ''}${node.isMain ? ' main-node' : ''}`}
      style={{ minWidth: 170 }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="manga-node-panel-num" style={node.isMain ? { background: '#d0021b', color: '#fff' } : {}}>
        {String(panelIdx + 1).padStart(2, '0')}
      </div>
      <div className="manga-node-accent-bar" style={{ background: color }} />
      <div className="manga-node-thumb">
        <img src={`/manga/${ENC(img)}`} alt="" />
        <div className="manga-node-thumb-overlay" />
      </div>
      <div className="manga-node-body">
        <div className="manga-node-type-tag">{node.type.toUpperCase()}</div>
        <div className="manga-node-label">{node.label}</div>
        <div className="manga-node-stats">
          <div className="manga-node-stat"><span>{(node.code||'').split('\n').length}</span> LINES</div>
          {node.modified && <div className="manga-node-stat" style={{ color:'#f5c518' }}>● UNSAVED</div>}
        </div>
      </div>
    </div>
  )
}

function EdgeLayer({ nodes, edges, transform }) {
  return (
    <svg className="manga-edge-svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible', zIndex:2, pointerEvents:'none' }}>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="rgba(208,2,27,0.6)" />
        </marker>
      </defs>
      {edges.map(e => {
        const src = nodes.find(n => n.id === e.source)
        const tgt = nodes.find(n => n.id === e.target)
        if (!src || !tgt) return null
        const sx = src.x + 85, sy = src.y + 80
        const tx = tgt.x + 85, ty = tgt.y + 20
        const mx = (sx + tx) / 2, my = (sy + ty) / 2
        const color = TYPE_COLORS[src.type] || '#10b981'
        return (
          <path
            key={e.id}
            d={`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`}
            className="manga-edge-line"
            stroke={color}
            markerEnd="url(#arrowhead)"
          />
        )
      })}
    </svg>
  )
}

function CodePanel({ node, onChange }) {
  const textRef = useRef(null)
  const lineRef = useRef(null)
  const code = node?.code || ''
  const lines = code.split('\n')

  const onScroll = () => {
    if (lineRef.current && textRef.current) {
      lineRef.current.scrollTop = textRef.current.scrollTop
    }
  }

  if (!node) return (
    <div className="manga-empty-state">
      <div className="manga-empty-panel-grid">
        {[0,1,2,3].map(i => (
          <div key={i} className="manga-empty-panel-cell">
            <img src={`/manga/${ENC(MANGA[i])}`} alt="" />
          </div>
        ))}
      </div>
      <div className="manga-empty-title">NO PANEL SELECTED</div>
      <div className="manga-empty-sub">DOUBLE-CLICK A NODE ON THE CANVAS</div>
    </div>
  )

  return (
    <div className="manga-code-panel">
      <div className="manga-code-file-header">
        <div style={{ width:8, height:8, borderRadius:'50%', background: TYPE_COLORS[node.type]||'#10b981', flexShrink:0 }} />
        <div className="manga-code-filename">{node.label}</div>
        {node.modified && <div style={{ marginLeft:'auto', fontSize:'0.3rem', color:'#f5c518', letterSpacing:'0.12em' }}>● UNSAVED</div>}
      </div>
      <div className="manga-code-editor-wrap">
        <div className="manga-code-textarea-wrap">
          <div className="manga-line-nums" ref={lineRef}>
            {lines.map((_,i) => <div key={i} className="manga-line-num">{i+1}</div>)}
          </div>
          <textarea
            ref={textRef}
            className="manga-textarea"
            value={code}
            onChange={e => onChange(e.target.value)}
            onScroll={onScroll}
            spellCheck={false}
          />
        </div>
      </div>
      <div className="manga-status-bar" style={{ height:20, fontSize:'0.3rem', background:'#111', borderTop:'1px solid #222', padding:'0 12px', display:'flex', gap:12, alignItems:'center' }}>
        <span style={{ color:'rgba(255,255,255,0.3)', letterSpacing:'0.12em' }}>Ln — · Col —</span>
        <span style={{ color:'rgba(255,255,255,0.3)', letterSpacing:'0.12em' }}>{lines.length} LINES</span>
        <span style={{ marginLeft:'auto', color: TYPE_COLORS[node.type]||'#10b981', letterSpacing:'0.12em' }}>{node.type.toUpperCase()}</span>
      </div>
    </div>
  )
}

export default function IDEPage() {
  const [nodes, setNodes] = useState(INITIAL_NODES)
  const [edges] = useState(INITIAL_EDGES)
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [sidePanel, setSidePanel] = useState('timeline') // timeline | files
  const [rightTab, setRightTab] = useState('code') // code | inspector
  const [transform, setTransform] = useState({ x: 480, y: 300, scale: 1 })
  const [dragging, setDragging] = useState(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ mx:0, my:0, ox:0, oy:0 })
  const [showCreateNode, setShowCreateNode] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newType, setNewType] = useState('function')
  const [ctxMenu, setCtxMenu] = useState(null)
  const canvasRef = useRef(null)

  const selectedNode = nodes.find(n => n.id === selectedId) || null

  // Canvas pan
  const onCanvasMouseDown = useCallback((e) => {
    if (e.button !== 1 && !(e.button === 0 && e.altKey)) return
    e.preventDefault()
    setIsPanning(true)
    setPanStart({ mx: e.clientX, my: e.clientY, ox: transform.x, oy: transform.y })
  }, [transform])

  const onCanvasMouseMove = useCallback((e) => {
    if (isPanning) {
      setTransform(t => ({ ...t, x: panStart.ox + (e.clientX - panStart.mx), y: panStart.oy + (e.clientY - panStart.my) }))
    }
    if (dragging) {
      setNodes(ns => ns.map(n => n.id === dragging.id
        ? { ...n, x: dragging.ox + (e.clientX - dragging.mx) / transform.scale, y: dragging.oy + (e.clientY - dragging.my) / transform.scale }
        : n
      ))
    }
  }, [isPanning, panStart, dragging, transform.scale])

  const onCanvasMouseUp = useCallback(() => {
    setIsPanning(false)
    setDragging(null)
  }, [])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.08 : 0.93
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left, py = e.clientY - rect.top
    setTransform(t => {
      const ns = Math.min(2.5, Math.max(0.2, t.scale * factor))
      return { x: px - (px - t.x) * (ns / t.scale), y: py - (py - t.y) * (ns / t.scale), scale: ns }
    })
  }, [])

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  const onNodeMouseDown = (e, node) => {
    if (e.button !== 0) return
    e.stopPropagation()
    setDragging({ id: node.id, mx: e.clientX, my: e.clientY, ox: node.x, oy: node.y })
    setSelectedId(node.id)
  }

  const createNode = () => {
    if (!newLabel.trim()) return
    const id = 'n' + Date.now()
    setNodes(ns => [...ns, {
      id, type: newType, label: newLabel.trim(),
      x: -transform.x / transform.scale + 200,
      y: -transform.y / transform.scale + 200,
      themeIdx: ns.length, isMain: false,
      code: `# ${newLabel.trim()}\n`, modified: false,
    }])
    setNewLabel(''); setShowCreateNode(false)
  }

  const onNodeCtxMenu = (e, node) => {
    e.preventDefault(); e.stopPropagation()
    setCtxMenu({ x: e.clientX, y: e.clientY, nodeId: node.id })
  }

  const deleteNode = (id) => {
    setNodes(ns => ns.filter(n => n.id !== id))
    if (selectedId === id) setSelectedId(null)
    setCtxMenu(null)
  }

  const updateCode = (val) => {
    setNodes(ns => ns.map(n => n.id === selectedId ? { ...n, code: val, modified: true } : n))
  }

  return (
    <div className="manga-ide-shell" onClick={() => setCtxMenu(null)}>
      {/* ── TOPBAR ── */}
      <div className="manga-topbar">
        <div className="manga-topbar-logo">FOR<span>BID</span>EN</div>
        <div className="manga-topbar-chapter">GRAPH IDE // VOL.1 CH.01</div>
        <div className="manga-topbar-actions">
          <button className="manga-btn" onClick={() => setShowCreateNode(true)}>+ NODE</button>
          <button className="manga-btn primary">⎋ RUN</button>
          <div style={{ width:1, height:20, background:'#2a2a2a' }} />
          <div style={{ fontSize:'0.32rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.1em' }}>
            {nodes.length} NODES · {edges.length} EDGES
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="manga-ide-body">

        {/* ICON SIDEBAR */}
        <div className="manga-sidebar">
          {[
            { id:'timeline', icon:'⏱', label:'TIMELINE' },
            { id:'files',    icon:'⬡', label:'FILES' },
          ].map(b => (
            <button key={b.id} className={`manga-sidebar-btn${sidePanel === b.id ? ' active' : ''}`}
              title={b.label} onClick={() => setSidePanel(p => p === b.id ? null : b.id)}>
              {b.icon}
            </button>
          ))}
          <div style={{ flex:1 }} />
          <button className="manga-sidebar-btn" title="Settings" style={{ fontSize:13 }}>⚙</button>
        </div>

        {/* LEFT PANEL */}
        {sidePanel && (
          <div className="manga-left-panel">
            <div className="manga-left-panel-header">
              <span className="accent">//</span>
              {sidePanel === 'timeline' ? 'CHAPTER INDEX' : 'FILE TREE'}
            </div>
            {sidePanel === 'timeline' && (
              <div className="manga-timeline">
                {nodes.map((node, i) => {
                  const color = TYPE_COLORS[node.type] || '#10b981'
                  return (
                    <div key={node.id} className={`manga-timeline-item${selectedId === node.id ? ' active' : ''}`}
                      onClick={() => setSelectedId(node.id)}>
                      <div className="manga-timeline-spine">
                        <div className="manga-timeline-dot" style={selectedId === node.id ? { background: color, borderColor: color } : {}} />
                        {i < nodes.length - 1 && <div className="manga-timeline-line" />}
                      </div>
                      <div className="manga-timeline-content">
                        <div className="manga-timeline-chapter" style={{ color }}>CH.{String(i+1).padStart(2,'0')} // {node.type.toUpperCase()}</div>
                        <div className="manga-timeline-node-label">{node.label}</div>
                        <div className="manga-timeline-node-meta">{(node.code||'').split('\n').length} LINES{node.modified?' · UNSAVED':''}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {sidePanel === 'files' && (
              <div className="manga-file-list">
                {nodes.map((node, i) => {
                  const color = TYPE_COLORS[node.type] || '#10b981'
                  return (
                    <div key={node.id} className={`manga-file-item${selectedId === node.id ? ' active' : ''}`}
                      onClick={() => setSelectedId(node.id)}>
                      <div className="manga-file-dot" style={{ background: color }} />
                      {node.label}
                      {node.modified && <div className="manga-file-modified" />}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* CANVAS */}
        <div className="manga-canvas-wrap"
          ref={canvasRef}
          onMouseDown={onCanvasMouseDown}
          onMouseMove={onCanvasMouseMove}
          onMouseUp={onCanvasMouseUp}
          onMouseLeave={onCanvasMouseUp}
          style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        >
          {/* Chapter watermarks */}
          <div className="manga-chapter-divider" style={{ top:'10%', left:'-2%', opacity:0.018 }}>GRAPH</div>
          <div className="manga-chapter-divider" style={{ bottom:'5%', right:'-5%', opacity:0.015 }}>NODE</div>

          {/* Canvas toolbar */}
          <div className="manga-canvas-toolbar">
            {['SELECT','PAN','CONNECT'].map(t => (
              <button key={t} className="manga-canvas-tool">{t}</button>
            ))}
            <div style={{ width:1, height:16, background:'#2a2a2a', margin:'0 2px' }} />
            <button className="manga-canvas-tool" onClick={() => setTransform({ x: 480, y: 300, scale: 1 })}>RESET</button>
          </div>

          {/* Graph */}
          <div className="manga-canvas-inner"
            style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}>
            <EdgeLayer nodes={nodes} edges={edges} transform={transform} />
            {nodes.map((node, i) => (
              <div key={node.id} className="manga-node"
                style={{ left: node.x, top: node.y, zIndex: selectedId === node.id ? 10 : 5 }}
                onMouseDown={e => onNodeMouseDown(e, node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onDoubleClick={() => setSelectedId(node.id)}
                onContextMenu={e => onNodeCtxMenu(e, node)}
              >
                <NodeCard
                  node={node}
                  selected={selectedId === node.id}
                  hovered={hoveredId === node.id}
                  panelIdx={i}
                />
              </div>
            ))}
          </div>

          {/* Minimap */}
          <div className="manga-minimap">
            <div className="manga-minimap-label">// OVERVIEW</div>
            <svg width="110" height="70" style={{ display:'block' }}>
              {nodes.map(n => {
                const color = TYPE_COLORS[n.type] || '#10b981'
                const xs = nodes.map(x => x.x), ys = nodes.map(x => x.y)
                const minX = Math.min(...xs)-80, maxX = Math.max(...xs)+80
                const minY = Math.min(...ys)-80, maxY = Math.max(...ys)+80
                const rX = maxX-minX||1, rY = maxY-minY||1
                const mx = 8 + (n.x-minX)/rX*94
                const my = 8 + (n.y-minY)/rY*54
                return <circle key={n.id} cx={mx} cy={my} r={n.isMain?5:3} fill={color} opacity={0.7} />
              })}
            </svg>
          </div>
        </div>

        {/* RIGHT DOCK */}
        <div className="manga-right-dock">
          <div className="manga-dock-tabs">
            {[['code','CODE'],['inspector','INSPECTOR']].map(([id,label]) => (
              <div key={id} className={`manga-dock-tab${rightTab===id?' active':''}`} onClick={() => setRightTab(id)}>
                {label}
              </div>
            ))}
          </div>
          <div className="manga-dock-body">
            {rightTab === 'code' && (
              <CodePanel node={selectedNode} onChange={updateCode} />
            )}
            {rightTab === 'inspector' && selectedNode && (
              <div style={{ padding:16, display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ borderLeft:'3px solid '+(TYPE_COLORS[selectedNode.type]||'#10b981'), paddingLeft:10 }}>
                  <div style={{ fontSize:'0.3rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.15em', fontFamily:'Oswald, sans-serif', fontWeight:700 }}>NODE</div>
                  <div style={{ fontSize:'0.55rem', color:'#f4f0e8', fontFamily:'Share Tech Mono, monospace' }}>{selectedNode.label}</div>
                </div>
                {[
                  ['TYPE', selectedNode.type.toUpperCase()],
                  ['LINES', (selectedNode.code||'').split('\n').length],
                  ['STATUS', selectedNode.modified ? 'UNSAVED' : 'CLEAN'],
                  ['POSITION', `${Math.round(selectedNode.x)}, ${Math.round(selectedNode.y)}`],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1a1a1a', paddingBottom:8 }}>
                    <span style={{ fontSize:'0.32rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.14em' }}>{k}</span>
                    <span style={{ fontSize:'0.38rem', color: k==='STATUS' ? (selectedNode.modified?'#f5c518':'#10b981') : '#f4f0e8', fontFamily:'Share Tech Mono, monospace' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            {rightTab === 'inspector' && !selectedNode && (
              <div className="manga-empty-state">
                <div className="manga-empty-title">SELECT A NODE</div>
                <div className="manga-empty-sub">CLICK ON THE CANVAS</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STATUS BAR */}
      <div className="manga-status-bar">
        <span className="manga-status-item bright">FORBIDEN // GRAPH IDE</span>
        <span className="manga-status-item">VOL.1 CH.01</span>
        <span className="manga-status-item">{nodes.length} NODES · {edges.length} EDGES</span>
        <span className="manga-status-item" style={{ marginLeft:'auto' }}>
          {selectedNode ? `PANEL: ${selectedNode.label}` : 'NO SELECTION'}
        </span>
      </div>

      {/* CREATE NODE MODAL */}
      {showCreateNode && (
        <div className="manga-modal-overlay" onClick={() => setShowCreateNode(false)}>
          <div className="manga-modal" onClick={e => e.stopPropagation()}>
            <div className="manga-modal-header">
              <div className="manga-modal-title">+ NEW NODE</div>
              <button className="manga-btn" onClick={() => setShowCreateNode(false)}>✕</button>
            </div>
            <div className="manga-modal-body">
              <div>
                <div className="manga-input-label">NODE LABEL</div>
                <input className="manga-input" value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createNode()}
                  placeholder="my_module.py" autoFocus />
              </div>
              <div>
                <div className="manga-input-label">TYPE</div>
                <div className="manga-type-grid">
                  {Object.entries(TYPE_COLORS).map(([type, color]) => (
                    <button key={type} className={`manga-type-btn${newType===type?' active':''}`}
                      style={newType===type ? { borderColor: color, color } : {}}
                      onClick={() => setNewType(type)}>
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="manga-modal-footer">
              <button className="manga-btn" onClick={() => setShowCreateNode(false)}>CANCEL</button>
              <button className="manga-btn primary" onClick={createNode}>CREATE PANEL</button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEXT MENU */}
      {ctxMenu && (
        <div className="manga-ctx-menu" style={{ left: ctxMenu.x, top: ctxMenu.y }} onClick={e => e.stopPropagation()}>
          <div className="manga-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setCtxMenu(null) }}>SELECT</div>
          <div className="manga-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setRightTab('code'); setCtxMenu(null) }}>OPEN IN EDITOR</div>
          <div className="manga-ctx-sep" />
          <div className="manga-ctx-item danger" onClick={() => deleteNode(ctxMenu.nodeId)}>DELETE NODE</div>
        </div>
      )}
    </div>
  )
}
