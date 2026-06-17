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
  entry:    '#ffd600',
  function: '#00e676',
  class:    '#82aaff',
  module:   '#bb9af7',
  test:     '#ff1744',
  util:     '#00e5ff',
}

const INITIAL_NODES = [
  { id:'n1', type:'entry',    label:'core_sys.py',     x:0,    y:0,    themeIdx:0, isMain:true,  code:'import torch\nimport sys\n\nprint("Central Architecture Booted")\n\ndef init_sequence():\n    pass\n\nif __name__ == "__main__":\n    init_sequence()', modified:false },
  { id:'n2', type:'function', label:'load_network.py', x:280,  y:-160, themeIdx:1, isMain:false, code:'def load_network(config=None):\n    loader = DataLoader(config)\n    loader.init()\n    return loader\n\nDEFAULT_LR = 0.001', modified:true },
  { id:'n3', type:'class',    label:'DataMatrix.py',   x:-220, y:220,  themeIdx:2, isMain:false, code:'class DataMatrix:\n    def __init__(self, size=128):\n        self.active = True\n        self.buffer = []\n        self.size = size\n\n    def push(self, data):\n        if len(self.buffer) < self.size:\n            self.buffer.append(data)\n            return True\n        return False', modified:false },
  { id:'n4', type:'function', label:'preprocess.py',   x:200,  y:290,  themeIdx:3, isMain:false, code:'def preprocess(data):\n    return data', modified:false },
  { id:'n5', type:'module',   label:'config.py',       x:-280, y:-130, themeIdx:4, isMain:false, code:'CONFIG = {\n    "lr": 0.001,\n    "batch": 32,\n    "epochs": 100,\n}', modified:false },
]
const INITIAL_EDGES = [
  { id:'e1', source:'n1', target:'n2' },
  { id:'e2', source:'n1', target:'n3' },
  { id:'e3', source:'n2', target:'n4' },
  { id:'e4', source:'n5', target:'n1' },
]

const CARD_W = 210
const CARD_H = 140  // art(78) + accent(2) + info(~60)

// ── Node card ───────────────────────────────────────────────────────────────
function NodeCard({ node, selected, hovered }) {
  const color = TYPE_COLORS[node.type] || '#00e5ff'
  const img   = MANGA[node.themeIdx % MANGA.length]
  const lines = (node.code || '').split('\n').length
  return (
    <div className={`ngo-node-card${selected?' selected':''}${hovered?' hovered':''}${node.isMain?' is-main':''}`}>
      <div className="ngo-node-art">
        <img src={`${import.meta.env.BASE_URL}manga/${ENC(img)}`} alt="" />
        <div className="ngo-node-art-overlay" />
        <div className="ngo-node-art-scanlines" />
        <div className="ngo-node-type-badge" style={{ color, borderColor: color }}>
          {node.type.toUpperCase()}
        </div>
        {node.isMain && <div className="ngo-node-main-badge">MAIN</div>}
      </div>
      <div className="ngo-node-accent" style={{ background: color }} />
      <div className="ngo-node-info">
        <div className="ngo-node-name">{node.label}</div>
        <div className="ngo-node-meta">
          <span>{lines}L</span>
          {node.modified && <span className="ngo-node-unsaved">● UNSAVED</span>}
        </div>
      </div>
    </div>
  )
}

// ── Edges ───────────────────────────────────────────────────────────────────
function EdgeLayer({ nodes, edges }) {
  return (
    <svg className="ngo-edge-svg">
      <defs>
        <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="rgba(0,229,255,0.5)" />
        </marker>
      </defs>
      {edges.map(e => {
        const src = nodes.find(n => n.id === e.source)
        const tgt = nodes.find(n => n.id === e.target)
        if (!src || !tgt) return null
        const sx = src.x + CARD_W / 2, sy = src.y + CARD_H / 2
        const tx = tgt.x + CARD_W / 2, ty = tgt.y + CARD_H / 2
        const my = (sy + ty) / 2
        const color = TYPE_COLORS[src.type] || '#00e5ff'
        return (
          <path
            key={e.id}
            d={`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`}
            className="ngo-edge-path"
            stroke={color}
            markerEnd="url(#arr)"
          />
        )
      })}
    </svg>
  )
}

// ── Code panel ──────────────────────────────────────────────────────────────
function CodePanel({ node, onChange }) {
  const textRef = useRef(null)
  const lineRef = useRef(null)
  const code  = node?.code || ''
  const lines = code.split('\n')
  const onScroll = () => { if (lineRef.current && textRef.current) lineRef.current.scrollTop = textRef.current.scrollTop }

  if (!node) {
    const emptyImg = MANGA[Math.floor(Date.now() / 60000) % MANGA.length]
    return (
      <div className="ngo-empty">
        <div className="ngo-empty-art">
          <img src={`${import.meta.env.BASE_URL}manga/${ENC(emptyImg)}`} alt="" />
          <div className="ngo-empty-art-overlay" />
          <div className="ngo-empty-scanlines" />
          <div className="ngo-empty-text">
            <div className="ngo-empty-title">NO FILE OPEN</div>
            <div className="ngo-empty-sub">double-click a node on the canvas</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ngo-code-panel">
      <div className="ngo-code-header">
        <div className="ngo-code-lang-dot" style={{ background: TYPE_COLORS[node.type] || '#00e5ff' }} />
        <div className="ngo-code-fname">{node.label}</div>
        {node.modified && <div className="ngo-code-unsaved">● unsaved</div>}
      </div>
      <div className="ngo-editor-wrap">
        <div className="ngo-editor-inner">
          <div className="ngo-line-nums" ref={lineRef}>
            {lines.map((_,i) => <div key={i} className="ngo-line-num">{i+1}</div>)}
          </div>
          <textarea
            ref={textRef}
            className="ngo-textarea"
            value={code}
            onChange={e => onChange(e.target.value)}
            onScroll={onScroll}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

// ── Inspector ────────────────────────────────────────────────────────────────
function Inspector({ node }) {
  if (!node) return (
    <div className="ngo-insp-empty">
      <div className="ngo-insp-empty-title">SELECT A NODE</div>
      <div className="ngo-insp-empty-sub">click on the canvas</div>
    </div>
  )
  const color = TYPE_COLORS[node.type] || '#00e5ff'
  const img   = MANGA[node.themeIdx % MANGA.length]
  const rows = [
    ['TYPE',     node.type.toUpperCase()],
    ['LINES',    (node.code||'').split('\n').length],
    ['STATUS',   node.modified ? 'UNSAVED' : 'CLEAN'],
    ['POSITION', `${Math.round(node.x)}, ${Math.round(node.y)}`],
    ['ID',       node.id],
  ]
  return (
    <div className="ngo-inspector">
      <div className="ngo-insp-art">
        <img src={`${import.meta.env.BASE_URL}manga/${ENC(img)}`} alt="" />
        <div className="ngo-insp-art-overlay" />
        <div className="ngo-insp-art-scanlines" />
        <div className="ngo-insp-art-info">
          <div className="ngo-insp-art-type" style={{ color }}>{node.type.toUpperCase()}</div>
          <div className="ngo-insp-art-name">{node.label}</div>
        </div>
      </div>
      <div className="ngo-insp-data">
        <div className="ngo-insp-section">
          <div className="ngo-insp-section-head">METADATA</div>
          {rows.map(([k,v]) => (
            <div key={k} className="ngo-insp-row">
              <span className="ngo-insp-key">{k}</span>
              <span className="ngo-insp-val" style={
                k==='STATUS' ? { color: node.modified ? 'var(--gold)' : 'var(--green)' }
                : k==='TYPE'  ? { color }
                : {}
              }>
                {String(v)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function IDEPage() {
  const [nodes, setNodes]             = useState(INITIAL_NODES)
  const [edges]                       = useState(INITIAL_EDGES)
  const [selectedId, setSelectedId]   = useState(null)
  const [hoveredId, setHoveredId]     = useState(null)
  const [sidePanel, setSidePanel]     = useState('timeline')
  const [rightTab, setRightTab]       = useState('code')
  const [transform, setTransform]     = useState({ x: 420, y: 260, scale: 1 })
  const [dragging, setDragging]       = useState(null)
  const [isPanning, setIsPanning]     = useState(false)
  const [panStart, setPanStart]       = useState({ mx:0, my:0, ox:0, oy:0 })
  const [showCreate, setShowCreate]   = useState(false)
  const [newLabel, setNewLabel]       = useState('')
  const [newType, setNewType]         = useState('function')
  const [ctxMenu, setCtxMenu]         = useState(null)
  const canvasRef = useRef(null)

  const selectedNode = nodes.find(n => n.id === selectedId) || null

  const onCanvasMouseDown = useCallback((e) => {
    if (e.button !== 1 && !(e.button === 0 && e.altKey)) return
    e.preventDefault()
    setIsPanning(true)
    setPanStart({ mx: e.clientX, my: e.clientY, ox: transform.x, oy: transform.y })
  }, [transform])

  const onCanvasMouseMove = useCallback((e) => {
    if (isPanning) setTransform(t => ({ ...t, x: panStart.ox + (e.clientX - panStart.mx), y: panStart.oy + (e.clientY - panStart.my) }))
    if (dragging)  setNodes(ns => ns.map(n => n.id === dragging.id
      ? { ...n, x: dragging.ox + (e.clientX - dragging.mx) / transform.scale, y: dragging.oy + (e.clientY - dragging.my) / transform.scale }
      : n
    ))
  }, [isPanning, panStart, dragging, transform.scale])

  const onCanvasMouseUp = useCallback(() => { setIsPanning(false); setDragging(null) }, [])

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
      themeIdx: ns.length % MANGA.length, isMain: false,
      code: `# ${newLabel.trim()}\n`, modified: false,
    }])
    setNewLabel(''); setShowCreate(false)
  }

  const deleteNode = (id) => {
    setNodes(ns => ns.filter(n => n.id !== id))
    if (selectedId === id) setSelectedId(null)
    setCtxMenu(null)
  }

  const updateCode = (val) => setNodes(ns => ns.map(n => n.id === selectedId ? { ...n, code: val, modified: true } : n))

  return (
    <div className="ngo-shell" onClick={() => setCtxMenu(null)}>

      {/* TOPBAR */}
      <div className="ngo-topbar">
        <div className="ngo-logo">FOR<em>BID</em>EN</div>
        <div className="ngo-divider" />
        <div className="ngo-breadcrumb">
          <span>graph-ide</span>
          <span className="sep">/</span>
          <span className="active">{selectedNode ? selectedNode.label : 'canvas'}</span>
        </div>
        <div className="ngo-topbar-right">
          <div className="ngo-stat">{nodes.length} nodes · {edges.length} edges</div>
          <button className="ngo-btn" onClick={() => setShowCreate(true)}>+ Node</button>
          <button className="ngo-btn primary">▶ Run</button>
        </div>
      </div>

      {/* BODY */}
      <div className="ngo-body">

        {/* ACTIVITY BAR */}
        <div className="ngo-activity">
          {[
            { id:'timeline', icon:'⏱' },
            { id:'files',    icon:'⬡' },
          ].map(b => (
            <button key={b.id} className={`ngo-act-btn${sidePanel===b.id?' active':''}`}
              title={b.id.toUpperCase()}
              onClick={() => setSidePanel(p => p === b.id ? null : b.id)}>
              {b.icon}
            </button>
          ))}
          <div style={{ flex:1 }} />
          <button className="ngo-act-btn" title="Settings">⚙</button>
        </div>

        {/* LEFT PANEL */}
        {sidePanel && (
          <div className="ngo-left">
            <div className="ngo-panel-header">
              <div className="dot" />
              {sidePanel === 'timeline' ? 'Chapter Index' : 'File Tree'}
            </div>

            {sidePanel === 'timeline' && (
              <div className="ngo-timeline">
                {nodes.map((node, i) => {
                  const color = TYPE_COLORS[node.type] || '#00e5ff'
                  const img   = MANGA[node.themeIdx % MANGA.length]
                  return (
                    <div key={node.id} className={`ngo-tl-item${selectedId===node.id?' active':''}`}
                      onClick={() => setSelectedId(node.id)}>
                      <div className="ngo-tl-thumb">
                        <img src={`${import.meta.env.BASE_URL}manga/${ENC(img)}`} alt="" />
                      </div>
                      <div className="ngo-tl-content">
                        <div className="ngo-tl-tag" style={{ color }}>
                          {String(i+1).padStart(2,'0')} · {node.type.toUpperCase()}
                        </div>
                        <div className="ngo-tl-name">{node.label}</div>
                        <div className="ngo-tl-meta">
                          {(node.code||'').split('\n').length}L{node.modified?' · unsaved':''}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {sidePanel === 'files' && (
              <div className="ngo-file-list">
                {nodes.map(node => {
                  const color = TYPE_COLORS[node.type] || '#00e5ff'
                  return (
                    <div key={node.id} className={`ngo-file-item${selectedId===node.id?' active':''}`}
                      onClick={() => setSelectedId(node.id)}>
                      <div className="ngo-file-pip" style={{ background: color }} />
                      {node.label}
                      {node.modified && <div className="ngo-file-unsaved" />}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* CANVAS */}
        <div className="ngo-canvas-wrap"
          ref={canvasRef}
          onMouseDown={onCanvasMouseDown}
          onMouseMove={onCanvasMouseMove}
          onMouseUp={onCanvasMouseUp}
          onMouseLeave={onCanvasMouseUp}
          style={{ cursor: isPanning ? 'grabbing' : dragging ? 'grabbing' : 'default' }}
        >
          <div className="ngo-canvas-toolbar">
            {['SELECT','PAN','CONNECT'].map(t => (
              <button key={t} className="ngo-tool-btn">{t}</button>
            ))}
            <div style={{ width:1, height:14, background:'var(--border)', margin:'0 2px' }} />
            <button className="ngo-tool-btn" onClick={() => setTransform({ x: 420, y: 260, scale: 1 })}>RESET</button>
          </div>

          <div className="ngo-canvas-inner"
            style={{ transform: `translate(${transform.x}px,${transform.y}px) scale(${transform.scale})` }}>
            <EdgeLayer nodes={nodes} edges={edges} />
            {nodes.map(node => (
              <div key={node.id} className="ngo-node"
                style={{ left: node.x, top: node.y, zIndex: selectedId===node.id ? 10 : 5 }}
                onMouseDown={e => onNodeMouseDown(e, node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onDoubleClick={() => { setSelectedId(node.id); setRightTab('code') }}
                onContextMenu={e => { e.preventDefault(); e.stopPropagation(); setCtxMenu({ x: e.clientX, y: e.clientY, nodeId: node.id }) }}
              >
                <NodeCard node={node} selected={selectedId===node.id} hovered={hoveredId===node.id} />
              </div>
            ))}
          </div>

          <div className="ngo-minimap">
            <div className="ngo-minimap-title">OVERVIEW</div>
            <svg width="110" height="70" style={{ display:'block' }}>
              {nodes.map(n => {
                const xs = nodes.map(x => x.x), ys = nodes.map(x => x.y)
                const minX = Math.min(...xs)-80, maxX = Math.max(...xs)+80
                const minY = Math.min(...ys)-80, maxY = Math.max(...ys)+80
                const rX = maxX-minX||1, rY = maxY-minY||1
                const mx = 8 + (n.x-minX)/rX*94
                const my = 8 + (n.y-minY)/rY*54
                const color = TYPE_COLORS[n.type] || '#00e5ff'
                return <circle key={n.id} cx={mx} cy={my} r={n.isMain?5:3} fill={color} opacity={0.75} />
              })}
            </svg>
          </div>
        </div>

        {/* RIGHT DOCK */}
        <div className="ngo-right">
          <div className="ngo-dock-tabs">
            {[['code','CODE'],['inspector','INSPECTOR']].map(([id,label]) => (
              <div key={id} className={`ngo-dock-tab${rightTab===id?' active':''}`} onClick={() => setRightTab(id)}>
                {label}
              </div>
            ))}
          </div>
          <div className="ngo-dock-body">
            {rightTab === 'code'      && <CodePanel node={selectedNode} onChange={updateCode} />}
            {rightTab === 'inspector' && <Inspector node={selectedNode} />}
          </div>
        </div>

      </div>

      {/* STATUS BAR */}
      <div className="ngo-statusbar">
        <span className="ngo-status-item bright">FORBIDEN // GRAPH IDE</span>
        <span className="ngo-status-item">{nodes.length} nodes · {edges.length} edges</span>
        <span className="ngo-status-item" style={{ marginLeft:'auto' }}>
          {selectedNode ? selectedNode.label : 'no selection'}
        </span>
      </div>

      {/* CREATE NODE MODAL */}
      {showCreate && (
        <div className="ngo-modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="ngo-modal" onClick={e => e.stopPropagation()}>
            <div className="ngo-modal-header">
              <div className="ngo-modal-title">NEW NODE</div>
              <button className="ngo-btn" onClick={() => setShowCreate(false)}>✕</button>
            </div>
            <div className="ngo-modal-body">
              <div>
                <div className="ngo-input-label">FILE LABEL</div>
                <input className="ngo-input" value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && createNode()}
                  placeholder="my_module.py" autoFocus />
              </div>
              <div>
                <div className="ngo-input-label">NODE TYPE</div>
                <div className="ngo-type-grid">
                  {Object.entries(TYPE_COLORS).map(([type, color]) => (
                    <button key={type}
                      className={`ngo-type-btn${newType===type?' active':''}`}
                      style={newType===type ? { borderColor: color, color } : {}}
                      onClick={() => setNewType(type)}>
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="ngo-modal-footer">
              <button className="ngo-btn" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="ngo-btn primary" onClick={createNode}>Create Node</button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEXT MENU */}
      {ctxMenu && (
        <div className="ngo-ctx" style={{ left: ctxMenu.x, top: ctxMenu.y }} onClick={e => e.stopPropagation()}>
          <div className="ngo-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setCtxMenu(null) }}>Select</div>
          <div className="ngo-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setRightTab('code'); setCtxMenu(null) }}>Open in Editor</div>
          <div className="ngo-ctx-sep" />
          <div className="ngo-ctx-item danger" onClick={() => deleteNode(ctxMenu.nodeId)}>Delete Node</div>
        </div>
      )}

    </div>
  )
}
