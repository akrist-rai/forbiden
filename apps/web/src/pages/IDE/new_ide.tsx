// @ts-nocheck
import './manga-ide.css'
import { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react'
import {
  detectAutoEdges, pruneStaleAutoEdges, applyEdgeToCode, runNode, refreshSymbols,
  autoLayout, persistGraph, hydrateGraph, NODE_COLORS, MANGA_IMAGES,
  type GNode, type GEdge, type ExecState,
} from '../../engine/graphEngine'
import { detectLang } from '../../lib/engine'

// ── Types ──────────────────────────────────────────────────────────────────────
type Tool      = 'select' | 'pan' | 'connect'
type RightTab  = 'code' | 'inspector'
type LeftPanel = 'files' | 'outline' | null
type TermLine  = { type: 'log'|'error'|'warn'|'info'|'return'|'system'; val: string; ts: number }
type Toast     = { id: number; msg: string; kind: 'info'|'success'|'error' }

// ── Constants ──────────────────────────────────────────────────────────────────
const CARD_W  = 220
const CARD_H  = 160
const BASE    = (import.meta as any).env.BASE_URL as string
const ENC     = (f: string) => encodeURIComponent(f)

const DEMO_NODES: GNode[] = [
  { id:'n1', type:'entry',    label:'core_sys.py',     x:0,    y:0,    themeIdx:0, isMain:true,  code:'import torch\nimport sys\nfrom config import CONFIG\nfrom load_network import load_network\n\nprint("Central Architecture Booted")\n\ndef init_sequence():\n    net = load_network(CONFIG)\n    print(f"Network ready: {net}")\n\nif __name__ == "__main__":\n    init_sequence()', modified:false, execState:'idle', lastOutput:'', lastError:'', symbols:['init_sequence'] },
  { id:'n2', type:'function', label:'load_network.py', x:320,  y:-180, themeIdx:1, isMain:false, code:'def load_network(config=None):\n    print(f"Loading with config: {config}")\n    return {"status": "loaded", "lr": config.get("lr", 0.01) if config else 0.01}\n\nDEFAULT_LR = 0.001', modified:false, execState:'idle', lastOutput:'', lastError:'', symbols:['load_network', 'DEFAULT_LR'] },
  { id:'n3', type:'class',    label:'DataMatrix.py',   x:-240, y:220,  themeIdx:2, isMain:false, code:'class DataMatrix:\n    def __init__(self, size=128):\n        self.active = True\n        self.buffer = []\n        self.size = size\n\n    def push(self, data):\n        if len(self.buffer) < self.size:\n            self.buffer.append(data)\n            return True\n        return False\n\n    def flush(self):\n        out = self.buffer[:]\n        self.buffer.clear()\n        return out', modified:false, execState:'idle', lastOutput:'', lastError:'', symbols:['DataMatrix'] },
  { id:'n4', type:'function', label:'preprocess.py',   x:220,  y:300,  themeIdx:3, isMain:false, code:'import numpy as np\n\ndef preprocess(data):\n    """Normalize and clean input data."""\n    if not data:\n        return []\n    arr = np.array(data, dtype=float)\n    return (arr - arr.mean()) / (arr.std() + 1e-8)', modified:false, execState:'idle', lastOutput:'', lastError:'', symbols:['preprocess'] },
  { id:'n5', type:'module',   label:'config.py',       x:-300, y:-150, themeIdx:4, isMain:false, code:'CONFIG = {\n    "lr": 0.001,\n    "batch": 32,\n    "epochs": 100,\n    "device": "cuda",\n}\n\nDEBUG = False', modified:false, execState:'idle', lastOutput:'', lastError:'', symbols:['CONFIG', 'DEBUG'] },
]

const DEMO_EDGES: GEdge[] = [
  { id:'e1', source:'n1', target:'n2', kind:'import' },
  { id:'e1b', source:'n1', target:'n5', kind:'import' },
  { id:'e2', source:'n1', target:'n3', kind:'manual'  },
  { id:'e3', source:'n2', target:'n4', kind:'manual'  },
]

// ── Graph Reducer ──────────────────────────────────────────────────────────────
type GraphAction =
  | { type: 'LOAD';           nodes: GNode[]; edges: GEdge[] }
  | { type: 'SET_NODES';      nodes: GNode[] }
  | { type: 'PATCH_NODE';     id: string; patch: Partial<GNode> }
  | { type: 'ADD_NODE';       node: GNode }
  | { type: 'DELETE_NODE';    id: string }
  | { type: 'ADD_EDGE';       edge: GEdge }
  | { type: 'ADD_EDGES';      edges: GEdge[] }
  | { type: 'SET_EDGES';      edges: GEdge[] }
  | { type: 'DELETE_EDGE';    id: string }
  | { type: 'UPDATE_CODE';    id: string; code: string }
  | { type: 'SAVE_NODE';      id: string }
  | { type: 'AUTO_LAYOUT' }
  | { type: 'SET_EXEC_STATE'; id: string; execState: ExecState; lastOutput?: string; lastError?: string }

interface GraphState { nodes: GNode[]; edges: GEdge[] }

function graphReducer(state: GraphState, action: GraphAction): GraphState {
  switch (action.type) {
    case 'LOAD':
      return { nodes: action.nodes, edges: action.edges }

    case 'SET_NODES':
      return { ...state, nodes: action.nodes }

    case 'PATCH_NODE':
      return { ...state, nodes: state.nodes.map(n => n.id === action.id ? { ...n, ...action.patch } : n) }

    case 'ADD_NODE':
      return { ...state, nodes: [...state.nodes, action.node] }

    case 'DELETE_NODE': {
      const nodes = state.nodes.filter(n => n.id !== action.id)
      const edges = state.edges.filter(e => e.source !== action.id && e.target !== action.id)
      return { nodes, edges }
    }

    case 'ADD_EDGE':
      if (state.edges.some(e => e.source === action.edge.source && e.target === action.edge.target))
        return state
      return { ...state, edges: [...state.edges, action.edge] }

    case 'ADD_EDGES': {
      const existing = new Set(state.edges.map(e => `${e.source}→${e.target}`))
      const fresh    = action.edges.filter(e => !existing.has(`${e.source}→${e.target}`))
      return fresh.length ? { ...state, edges: [...state.edges, ...fresh] } : state
    }

    case 'SET_EDGES':
      return { ...state, edges: action.edges }

    case 'DELETE_EDGE':
      return { ...state, edges: state.edges.filter(e => e.id !== action.id) }

    case 'UPDATE_CODE': {
      const orig = state.nodes.find(n => n.id === action.id)
      if (!orig) return state
      const updated = refreshSymbols({ ...orig, code: action.code, modified: true })
      const nodes   = state.nodes.map(n => n.id === action.id ? updated : n)
      // Only prune stale auto-edges here; new ones are added by the component's debounce
      const edges   = pruneStaleAutoEdges(nodes, updated, state.edges)
      return { nodes, edges }
    }

    case 'SAVE_NODE':
      return { ...state, nodes: state.nodes.map(n => n.id === action.id ? { ...n, modified: false } : n) }

    case 'AUTO_LAYOUT':
      return { ...state, nodes: autoLayout(state.nodes, state.edges) }

    case 'SET_EXEC_STATE':
      return {
        ...state,
        nodes: state.nodes.map(n =>
          n.id === action.id
            ? { ...n, execState: action.execState, lastOutput: action.lastOutput ?? n.lastOutput, lastError: action.lastError ?? n.lastError }
            : n
        ),
      }

    default:
      return state
  }
}

// ── NodeCard ───────────────────────────────────────────────────────────────────
function NodeCard({ node, selected, hovered, tool, onRunNode, onStartConnect }) {
  const color = NODE_COLORS[node.type] || '#00e5ff'
  const img   = MANGA_IMAGES[node.themeIdx % MANGA_IMAGES.length]
  const lines = (node.code || '').split('\n').length

  const execRing = node.execState === 'running' ? 'running'
                 : node.execState === 'success'  ? 'success'
                 : node.execState === 'error'     ? 'error'
                 : ''

  return (
    <div className={`ngo-node-card ${selected ? 'selected' : ''} ${hovered ? 'hovered' : ''} ${node.isMain ? 'is-main' : ''} ${execRing}`}>
      {/* Art Banner */}
      <div className="ngo-node-art">
        <img src={`${BASE}manga/${ENC(img)}`} alt="" draggable={false} />
        <div className="ngo-node-art-overlay" />
        <div className="ngo-node-art-scanlines" />
        <div className="ngo-node-type-badge" style={{ color, borderColor: color }}>{node.type.toUpperCase()}</div>
        {node.isMain && <div className="ngo-node-main-badge">MAIN</div>}

        {/* Hover actions */}
        <div className="ngo-node-actions">
          <button
            className="ngo-node-run-btn"
            title="Run this node"
            onMouseDown={e => { e.stopPropagation(); onRunNode(node.id) }}
          >▶</button>
        </div>
      </div>

      {/* Accent */}
      <div className="ngo-node-accent" style={{ background: color }} />

      {/* Info */}
      <div className="ngo-node-info">
        <div className="ngo-node-name">{node.label}</div>
        <div className="ngo-node-meta">
          <span>{lines}L</span>
          {node.symbols.length > 0 && <span className="ngo-node-syms">{node.symbols.slice(0,2).join(', ')}</span>}
          {node.modified && <span className="ngo-node-unsaved">● UNSAVED</span>}
        </div>
        {node.lastOutput && node.execState !== 'idle' && (
          <div className={`ngo-node-output-preview ${node.execState}`}>
            {node.lastOutput.split('\n').slice(-1)[0]}
          </div>
        )}
      </div>

      {/* Connection port handles — visible in connect mode */}
      <div
        className={`ngo-port ngo-port-out ${tool === 'connect' ? 'visible' : ''}`}
        style={{ background: color }}
        onMouseDown={e => { e.stopPropagation(); onStartConnect(node.id, e) }}
        title="Drag to connect"
      />
      <div
        className={`ngo-port ngo-port-in ${tool === 'connect' || hovered ? 'visible' : ''}`}
        style={{ background: color }}
      />
    </div>
  )
}

// ── Edge Layer ─────────────────────────────────────────────────────────────────
function EdgeLayer({ nodes, edges, selectedEdgeId, onSelectEdge, connecting, scale }) {
  const byId = useMemo(() => {
    const m = new Map<string, GNode>()
    for (const n of nodes) m.set(n.id, n)
    return m
  }, [nodes])

  // Compute center of each node once
  const cx = (n: GNode) => n.x + CARD_W / 2
  const cy = (n: GNode) => n.y + CARD_H / 2

  return (
    <svg className="ngo-edge-svg" style={{ overflow: 'visible' }}>
      <defs>
        <marker id="arr-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L0,8 L8,4 z" fill="rgba(0,229,255,0.6)" />
        </marker>
        <marker id="arr-gold" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L0,8 L8,4 z" fill="rgba(255,214,0,0.7)" />
        </marker>
        <marker id="arr-preview" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L0,8 L8,4 z" fill="rgba(187,154,247,0.8)" />
        </marker>
        <filter id="glow-edge">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Real edges */}
      {edges.map(e => {
        const src = byId.get(e.source)
        const tgt = byId.get(e.target)
        if (!src || !tgt) return null

        const sx = cx(src), sy = cy(src)
        const tx = cx(tgt), ty = cy(tgt)
        const my = (sy + ty) / 2
        const color  = NODE_COLORS[src.type] || '#00e5ff'
        const isSelE = selectedEdgeId === e.id
        const marker = e.kind === 'import' ? 'url(#arr-gold)' : 'url(#arr-cyan)'

        return (
          <g key={e.id} onClick={ev => { ev.stopPropagation(); onSelectEdge(isSelE ? null : e.id) }}>
            {/* Invisible thick hit area */}
            <path
              d={`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`}
              fill="none" stroke="transparent" strokeWidth={12 / scale}
              style={{ cursor: 'pointer' }}
            />
            <path
              d={`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`}
              fill="none"
              stroke={isSelE ? '#fff' : e.kind === 'import' ? 'rgba(255,214,0,0.55)' : color}
              strokeWidth={isSelE ? 2 / scale : 1.5 / scale}
              strokeDasharray={e.kind === 'import' ? 'none' : `${6/scale},${4/scale}`}
              markerEnd={isSelE ? 'url(#arr-cyan)' : marker}
              opacity={isSelE ? 1 : 0.5}
              filter={isSelE ? 'url(#glow-edge)' : undefined}
              className="ngo-edge-path"
            />
          </g>
        )
      })}

      {/* Temporary edge while connecting */}
      {connecting && (() => {
        const src = byId.get(connecting.sourceId)
        if (!src) return null
        const sx = cx(src), sy = cy(src)
        const tx = connecting.wx, ty = connecting.wy
        const my = (sy + ty) / 2
        return (
          <path
            d={`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`}
            fill="none"
            stroke="rgba(187,154,247,0.85)"
            strokeWidth={2 / scale}
            strokeDasharray={`${8/scale},${4/scale}`}
            markerEnd="url(#arr-preview)"
            style={{ pointerEvents: 'none' }}
          />
        )
      })()}
    </svg>
  )
}

// ── Code Panel ─────────────────────────────────────────────────────────────────
function CodePanel({ node, onChange, onSave, onExpand }) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const code    = node?.code ?? ''
  const lines   = code.split('\n')
  const lang    = node ? detectLang(node.label) : 'unknown'

  const syncScroll = () => {
    if (lineRef.current && textRef.current)
      lineRef.current.scrollTop = textRef.current.scrollTop
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab → insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta   = e.currentTarget
      const s    = ta.selectionStart
      const end  = ta.selectionEnd
      const next = code.slice(0, s) + '    ' + code.slice(end)
      onChange(next)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 4 })
      return
    }
    // Enter → maintain indentation
    if (e.key === 'Enter') {
      e.preventDefault()
      const ta       = e.currentTarget
      const pos      = ta.selectionStart
      const lineStart = code.lastIndexOf('\n', pos - 1) + 1
      const indent    = code.slice(lineStart).match(/^(\s*)/)?.[1] ?? ''
      const extra     = code.slice(lineStart, pos).trimEnd().endsWith(':') ? '    ' : ''
      const next      = code.slice(0, pos) + '\n' + indent + extra + code.slice(ta.selectionEnd)
      onChange(next)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = pos + 1 + indent.length + extra.length })
      return
    }
    // Ctrl/Cmd+S → save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      onSave()
    }
  }

  if (!node) return (
    <div className="ngo-empty">
      <div className="ngo-empty-art">
        <img src={`${BASE}manga/${ENC(MANGA_IMAGES[Math.floor(Date.now() / 60000) % MANGA_IMAGES.length])}`} alt="" />
        <div className="ngo-empty-art-overlay" />
        <div className="ngo-empty-scanlines" />
        <div className="ngo-empty-text">
          <div className="ngo-empty-title">NO FILE OPEN</div>
          <div className="ngo-empty-sub">click a node · double-click to focus</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="ngo-code-panel">
      <div className="ngo-code-header">
        <div className="ngo-code-lang-dot" style={{ background: NODE_COLORS[node.type] || '#00e5ff' }} />
        <div className="ngo-code-fname">{node.label}</div>
        <div className="ngo-code-lang-label">{lang.toUpperCase()}</div>
        {node.modified && <div className="ngo-code-unsaved">● unsaved</div>}
        <button className="ngo-code-expand-btn" onClick={onExpand} title="Expand (Ctrl+E)">⤢</button>
      </div>
      <div className="ngo-editor-wrap">
        <div className="ngo-editor-inner">
          <div className="ngo-line-nums" ref={lineRef}>
            {lines.map((_, i) => <div key={i} className="ngo-line-num">{i + 1}</div>)}
          </div>
          <textarea
            ref={textRef}
            className="ngo-textarea"
            value={code}
            onChange={e => onChange(e.target.value)}
            onScroll={syncScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>
      <div className="ngo-code-footer">
        <span>{lines.length}L · {code.length}ch</span>
        <span className="ngo-code-hint">Tab=indent · Ctrl+S=save · Ctrl+Enter=run</span>
      </div>
    </div>
  )
}

// ── Inspector ──────────────────────────────────────────────────────────────────
function Inspector({ node }) {
  if (!node) return (
    <div className="ngo-insp-empty">
      <div className="ngo-insp-empty-title">SELECT A NODE</div>
      <div className="ngo-insp-empty-sub">click a block on the canvas</div>
    </div>
  )
  const color = NODE_COLORS[node.type] || '#00e5ff'
  const img   = MANGA_IMAGES[node.themeIdx % MANGA_IMAGES.length]
  const rows  = [
    ['TYPE',     node.type.toUpperCase()],
    ['FILE',     node.label],
    ['LANG',     detectLang(node.label).toUpperCase()],
    ['LINES',    (node.code || '').split('\n').length],
    ['STATUS',   node.modified ? 'UNSAVED' : 'CLEAN'],
    ['EXEC',     node.execState.toUpperCase()],
    ['SYMBOLS',  node.symbols.join(', ') || '—'],
    ['ID',       node.id],
  ]
  return (
    <div className="ngo-inspector">
      <div className="ngo-insp-art">
        <img src={`${BASE}manga/${ENC(img)}`} alt="" />
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
          {rows.map(([k, v]) => (
            <div key={k} className="ngo-insp-row">
              <span className="ngo-insp-key">{k}</span>
              <span className="ngo-insp-val" style={
                k === 'STATUS'  ? { color: node.modified ? 'var(--gold)' : 'var(--green)' }
              : k === 'TYPE'    ? { color }
              : k === 'EXEC'    ? { color: node.execState === 'error' ? 'var(--red)' : node.execState === 'success' ? 'var(--green)' : 'var(--text-dim)' }
              : {}
              }>{String(v)}</span>
            </div>
          ))}
        </div>
        {node.symbols.length > 0 && (
          <div className="ngo-insp-section">
            <div className="ngo-insp-section-head">EXPORTS</div>
            {node.symbols.map(s => (
              <div key={s} className="ngo-insp-row">
                <span className="ngo-insp-val" style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Terminal Drawer ────────────────────────────────────────────────────────────
function TerminalDrawer({ open, lines, running, nodeLabel, onClose, onClear }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (open && bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, open])

  const typeColor: Record<string, string> = {
    log:    'rgba(200,210,240,0.85)',
    error:  '#ff5566',
    warn:   '#ffd600',
    info:   '#82aaff',
    return: '#00e676',
    system: '#bb9af7',
  }

  return (
    <div className={`ngo-terminal-drawer ${open ? 'open' : ''}`}>
      <div className="ngo-term-header">
        <div className="ngo-term-dot" style={{ background: running ? 'var(--green)' : 'var(--red)' }} />
        <span className="ngo-term-title">
          {running ? `Running ${nodeLabel}…` : nodeLabel ? `Output: ${nodeLabel}` : 'Terminal'}
        </span>
        <div style={{ flex: 1 }} />
        <button className="ngo-term-btn" onClick={onClear} title="Clear">⊘</button>
        <button className="ngo-term-btn" onClick={onClose} title="Close (Ctrl+`)">✕</button>
      </div>
      <div className="ngo-term-body" ref={bodyRef}>
        {lines.length === 0 && !running && (
          <div className="ngo-term-empty">Press ▶ Run or Ctrl+Enter to execute the selected node</div>
        )}
        {lines.map((l, i) => (
          <div key={i} className="ngo-term-line">
            <span className="ngo-term-ts">{new Date(l.ts).toLocaleTimeString('en', { hour12: false })}</span>
            <span className="ngo-term-type" style={{ color: typeColor[l.type] || typeColor.log }}>
              {l.type === 'error' ? '✗' : l.type === 'warn' ? '⚠' : l.type === 'return' ? '→' : l.type === 'system' ? '⬡' : '›'}
            </span>
            <span className="ngo-term-val" style={{ color: typeColor[l.type] || typeColor.log }}>{l.val}</span>
          </div>
        ))}
        {running && <div className="ngo-term-spinner">▪▪▪ executing…</div>}
      </div>
    </div>
  )
}

// ── Code Modal (full-screen editor) ───────────────────────────────────────────
function CodeModal({ node, onChange, onSave, onClose, onRun }) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const code    = node?.code ?? ''
  const lines   = code.split('\n')

  useEffect(() => { textRef.current?.focus() }, [node])

  const syncScroll = () => {
    if (lineRef.current && textRef.current)
      lineRef.current.scrollTop = textRef.current.scrollTop
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); onSave(); return }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); onRun(); return }
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta  = e.currentTarget
      const s   = ta.selectionStart, end = ta.selectionEnd
      const next = code.slice(0, s) + '    ' + code.slice(end)
      onChange(next)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 4 })
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const ta        = e.currentTarget
      const pos       = ta.selectionStart
      const lineStart = code.lastIndexOf('\n', pos - 1) + 1
      const indent    = code.slice(lineStart).match(/^(\s*)/)?.[1] ?? ''
      const extra     = code.slice(lineStart, pos).trimEnd().endsWith(':') ? '    ' : ''
      const next      = code.slice(0, pos) + '\n' + indent + extra + code.slice(ta.selectionEnd)
      onChange(next)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = pos + 1 + indent.length + extra.length })
    }
  }

  if (!node) return null

  const color = NODE_COLORS[node.type] || '#00e5ff'

  return (
    <div className="ngo-code-modal">
      <div className="ngo-code-modal-header">
        <div className="ngo-code-lang-dot" style={{ background: color, width: 10, height: 10 }} />
        <span className="ngo-code-modal-title">{node.label}</span>
        {node.modified && <span style={{ color: 'var(--gold)', fontSize: '0.7rem', fontFamily: 'var(--mono)' }}>● unsaved</span>}
        <div style={{ flex: 1 }} />
        <span className="ngo-code-hint" style={{ marginRight: 12 }}>Ctrl+S save · Ctrl+Enter run · Esc close</span>
        <button className="ngo-btn" onClick={onRun}>▶ Run</button>
        <button className="ngo-btn" onClick={onSave}>Save</button>
        <button className="ngo-btn" onClick={onClose}>✕</button>
      </div>
      <div className="ngo-code-modal-body">
        <div className="ngo-line-nums" ref={lineRef} style={{ minWidth: 52 }}>
          {lines.map((_, i) => <div key={i} className="ngo-line-num">{i + 1}</div>)}
        </div>
        <textarea
          ref={textRef}
          className="ngo-textarea ngo-modal-textarea"
          value={code}
          onChange={e => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  )
}

// ── Minimap ────────────────────────────────────────────────────────────────────
function Minimap({ nodes, edges, selectedId, transform, onClickPoint }) {
  const W = 120, H = 80

  if (nodes.length === 0) return null

  // Compute bounds once (fix O(n²) bug)
  const xs    = nodes.map(n => n.x)
  const ys    = nodes.map(n => n.y)
  const minX  = Math.min(...xs) - 80
  const maxX  = Math.max(...xs) + CARD_W + 80
  const minY  = Math.min(...ys) - 80
  const maxY  = Math.max(...ys) + CARD_H + 80
  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1

  const PAD = 8
  const toMX = (x: number) => PAD + ((x - minX) / rangeX) * (W - PAD * 2)
  const toMY = (y: number) => PAD + ((y - minY) / rangeY) * (H - PAD * 2)

  return (
    <div className="ngo-minimap" onClick={e => {
      const rect = e.currentTarget.getBoundingClientRect()
      const mx   = (e.clientX - rect.left - PAD) / (W - PAD * 2)
      const my   = (e.clientY - rect.top  - PAD) / (H - PAD * 2)
      onClickPoint(minX + mx * rangeX, minY + my * rangeY)
    }}>
      <div className="ngo-minimap-title">OVERVIEW · {nodes.length}N</div>
      <svg width={W} height={H} style={{ display: 'block', cursor: 'crosshair' }}>
        {edges.map(e => {
          const s = nodes.find(n => n.id === e.source)
          const t = nodes.find(n => n.id === e.target)
          if (!s || !t) return null
          return (
            <line key={e.id}
              x1={toMX(s.x + CARD_W / 2)} y1={toMY(s.y + CARD_H / 2)}
              x2={toMX(t.x + CARD_W / 2)} y2={toMY(t.y + CARD_H / 2)}
              stroke="rgba(255,255,255,0.12)" strokeWidth={0.8}
            />
          )
        })}
        {nodes.map(n => {
          const color = NODE_COLORS[n.type] || '#00e5ff'
          const isSel = n.id === selectedId
          return (
            <rect key={n.id}
              x={toMX(n.x)} y={toMY(n.y)}
              width={Math.max(4, (CARD_W / rangeX) * (W - PAD * 2))}
              height={Math.max(3, (CARD_H / rangeY) * (H - PAD * 2))}
              rx={1}
              fill={isSel ? color : 'rgba(255,255,255,0.12)'}
              stroke={color}
              strokeWidth={isSel ? 1.5 : 0.5}
              opacity={isSel ? 1 : 0.65}
            />
          )
        })}
      </svg>
    </div>
  )
}

// ── Search Modal ───────────────────────────────────────────────────────────────
function SearchModal({ nodes, onSelect, onClose }) {
  const [q, setQ] = useState('')
  const inputRef  = useRef<HTMLInputElement>(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const results = useMemo(() =>
    q.trim()
      ? nodes.filter(n => n.label.toLowerCase().includes(q.toLowerCase()) || n.symbols.some(s => s.toLowerCase().includes(q.toLowerCase())))
      : nodes,
    [nodes, q]
  )

  return (
    <div className="ngo-modal-overlay" onClick={onClose}>
      <div className="ngo-search-modal" onClick={e => e.stopPropagation()}>
        <div className="ngo-search-header">
          <span className="ngo-search-icon">⬡</span>
          <input
            ref={inputRef}
            className="ngo-search-input"
            placeholder="Search nodes, symbols…"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') onClose() }}
          />
          <span className="ngo-search-hint">ESC</span>
        </div>
        <div className="ngo-search-results">
          {results.map(n => {
            const color = NODE_COLORS[n.type] || '#00e5ff'
            return (
              <div key={n.id} className="ngo-search-item" onClick={() => { onSelect(n.id); onClose() }}>
                <div className="ngo-search-pip" style={{ background: color }} />
                <div className="ngo-search-item-info">
                  <div className="ngo-search-item-name">{n.label}</div>
                  {n.symbols.length > 0 && (
                    <div className="ngo-search-item-syms">{n.symbols.slice(0, 3).join(' · ')}</div>
                  )}
                </div>
                <div className="ngo-search-item-type" style={{ color }}>{n.type}</div>
              </div>
            )
          })}
          {results.length === 0 && <div className="ngo-search-empty">No nodes match "{q}"</div>}
        </div>
      </div>
    </div>
  )
}

// ── Toast System ───────────────────────────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div className="ngo-toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`ngo-toast ngo-toast-${t.kind}`}>{t.msg}</div>
      ))}
    </div>
  )
}

// ── Main IDE Component ─────────────────────────────────────────────────────────
export default function IDEPage() {
  // Graph state (reducer)
  const [graph, dispatch] = useReducer(graphReducer, { nodes: [], edges: [] })

  // UI state
  const [selectedId,     setSelectedId]    = useState<string | null>(null)
  const [selectedEdgeId, setSelectedEdgeId]= useState<string | null>(null)
  const [hoveredId,      setHoveredId]     = useState<string | null>(null)
  const [tool,           setTool]          = useState<Tool>('select')
  const [transform,      setTransform]     = useState({ x: 420, y: 260, scale: 1 })
  const [leftPanel,      setLeftPanel]     = useState<LeftPanel>('files')
  const [rightTab,       setRightTab]      = useState<RightTab>('code')
  const [termOpen,       setTermOpen]      = useState(false)
  const [termLines,      setTermLines]     = useState<TermLine[]>([])
  const [termRunning,    setTermRunning]   = useState(false)
  const [termLabel,      setTermLabel]     = useState('')
  const [codeModalOpen,  setCodeModalOpen] = useState(false)
  const [searchOpen,     setSearchOpen]    = useState(false)
  const [showCreate,     setShowCreate]    = useState(false)
  const [newLabel,       setNewLabel]      = useState('')
  const [newType,        setNewType]       = useState<GNode['type']>('function')
  const [ctxMenu,        setCtxMenu]       = useState<{ x: number; y: number; nodeId: string } | null>(null)
  const [toasts,         setToasts]        = useState<Toast[]>([])

  // Canvas interaction refs
  const canvasRef   = useRef<HTMLDivElement>(null)
  const isPanRef    = useRef(false)
  const panStartRef = useRef({ mx: 0, my: 0, ox: 0, oy: 0 })
  const dragRef     = useRef<{ nodeId: string; ox: number; oy: number; mx: number; my: number } | null>(null)
  const connectRef  = useRef<{ sourceId: string; wx: number; wy: number } | null>(null)
  const [connectingState, setConnectingState] = useState<{ sourceId: string; wx: number; wy: number } | null>(null)
  const autoConnectTimer = useRef<ReturnType<typeof setTimeout>>(null)

  // ── Bootstrap: load from localStorage or use demo ──────────────────────────
  useEffect(() => {
    const saved = hydrateGraph()
    if (saved && saved.nodes.length > 0) {
      dispatch({ type: 'LOAD', nodes: saved.nodes, edges: saved.edges })
    } else {
      dispatch({ type: 'LOAD', nodes: DEMO_NODES, edges: DEMO_EDGES })
    }
  }, [])

  // ── Auto-persist on graph changes ──────────────────────────────────────────
  useEffect(() => {
    if (graph.nodes.length > 0)
      persistGraph(graph.nodes, graph.edges)
  }, [graph.nodes, graph.edges])

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore if focus is in a textarea/input
      const tag = (document.activeElement as HTMLElement)?.tagName
      const inInput = tag === 'TEXTAREA' || tag === 'INPUT'

      // Ctrl/Cmd+K — search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); setSearchOpen(true); return
      }
      // Ctrl/Cmd+` — toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault(); setTermOpen(o => !o); return
      }
      // Ctrl/Cmd+N — new node
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault(); setShowCreate(true); return
      }
      // Ctrl/Cmd+E — expand code modal
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault(); if (selectedId) setCodeModalOpen(o => !o); return
      }
      // Ctrl/Cmd+Enter — run selected node
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !inInput) {
        e.preventDefault(); if (selectedId) runSelectedNode(selectedId); return
      }
      // Escape — close modals, deselect
      if (e.key === 'Escape') {
        if (codeModalOpen)    { setCodeModalOpen(false); return }
        if (searchOpen)       { setSearchOpen(false); return }
        if (showCreate)       { setShowCreate(false); return }
        if (ctxMenu)          { setCtxMenu(null); return }
        if (connectingState)  { connectRef.current = null; setConnectingState(null); return }
        setSelectedId(null); setSelectedEdgeId(null)
        return
      }
      // Delete / Backspace — delete selected node or edge (not in input)
      if ((e.key === 'Delete' || e.key === 'Backspace') && !inInput) {
        if (selectedEdgeId)   { dispatch({ type: 'DELETE_EDGE', id: selectedEdgeId }); setSelectedEdgeId(null); return }
        if (selectedId)       { dispatch({ type: 'DELETE_NODE', id: selectedId }); setSelectedId(null); return }
      }
      // S — select tool, P — pan tool, C — connect tool (not in input)
      if (!inInput) {
        if (e.key === 's' || e.key === 'S') setTool('select')
        if (e.key === 'p' || e.key === 'P') setTool('pan')
        if (e.key === 'c' || e.key === 'C') setTool('connect')
        if (e.key === 'L' && (e.shiftKey))  dispatch({ type: 'AUTO_LAYOUT' })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedId, selectedEdgeId, codeModalOpen, searchOpen, showCreate, ctxMenu, connectingState])

  // ── Canvas event helpers ───────────────────────────────────────────────────
  const clientToWorld = useCallback((cx: number, cy: number) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return { wx: 0, wy: 0 }
    return {
      wx: (cx - rect.left - transform.x) / transform.scale,
      wy: (cy - rect.top  - transform.y) / transform.scale,
    }
  }, [transform])

  const onCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Pan: middle mouse or alt+left
    if (e.button === 1 || (e.button === 0 && e.altKey) || tool === 'pan') {
      e.preventDefault()
      isPanRef.current   = true
      panStartRef.current = { mx: e.clientX, my: e.clientY, ox: transform.x, oy: transform.y }
      return
    }
    // Click on empty canvas: deselect
    if (e.button === 0) {
      setSelectedId(null); setSelectedEdgeId(null); setCtxMenu(null)
      // Cancel any connect in progress
      if (connectRef.current) { connectRef.current = null; setConnectingState(null) }
    }
  }, [tool, transform])

  const onCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanRef.current) {
      const dx = e.clientX - panStartRef.current.mx
      const dy = e.clientY - panStartRef.current.my
      setTransform(t => ({ ...t, x: panStartRef.current.ox + dx, y: panStartRef.current.oy + dy }))
      return
    }
    if (dragRef.current) {
      const { nodeId, ox, oy, mx, my } = dragRef.current
      const newX = ox + (e.clientX - mx) / transform.scale
      const newY = oy + (e.clientY - my) / transform.scale
      dispatch({ type: 'PATCH_NODE', id: nodeId, patch: { x: newX, y: newY } })
      return
    }
    if (connectRef.current) {
      const { wx, wy } = clientToWorld(e.clientX, e.clientY)
      connectRef.current = { ...connectRef.current, wx, wy }
      setConnectingState({ ...connectRef.current, wx, wy })
    }
  }, [transform, clientToWorld])

  const onCanvasMouseUp = useCallback(() => {
    isPanRef.current = false
    dragRef.current  = null
  }, [])

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.08 : 0.93
    const rect   = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left, py = e.clientY - rect.top
    setTransform(t => {
      const ns = Math.min(2.5, Math.max(0.15, t.scale * factor))
      return { x: px - (px - t.x) * (ns / t.scale), y: py - (py - t.y) * (ns / t.scale), scale: ns }
    })
  }, [])

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  // ── Node interaction ───────────────────────────────────────────────────────
  const onNodeMouseDown = useCallback((e: React.MouseEvent, node: GNode) => {
    if (e.button !== 0) return
    e.stopPropagation()
    setCtxMenu(null)

    if (tool === 'connect') {
      const { wx, wy } = clientToWorld(e.clientX, e.clientY)
      connectRef.current = { sourceId: node.id, wx, wy }
      setConnectingState({ sourceId: node.id, wx, wy })
      return
    }

    setSelectedId(node.id)
    dragRef.current = { nodeId: node.id, ox: node.x, oy: node.y, mx: e.clientX, my: e.clientY }
  }, [tool, clientToWorld])

  const onNodeMouseUp = useCallback((e: React.MouseEvent, node: GNode) => {
    if (connectRef.current && tool === 'connect' && connectRef.current.sourceId !== node.id) {
      const { sourceId } = connectRef.current
      const sourceNode   = graph.nodes.find(n => n.id === sourceId)!

      // Create the edge
      const newEdge: GEdge = {
        id:     `e_man_${Date.now()}`,
        source: sourceId,
        target: node.id,
        kind:   'manual',
      }
      dispatch({ type: 'ADD_EDGE', edge: newEdge })

      // Inject import into source code
      const updatedCode = applyEdgeToCode(sourceNode, node)
      if (updatedCode !== sourceNode.code) {
        dispatch({ type: 'UPDATE_CODE', id: sourceId, code: updatedCode })
        showToast(`Import injected into ${sourceNode.label}`, 'success')
      } else {
        showToast(`Connected ${sourceNode.label} → ${node.label}`, 'success')
      }

      connectRef.current = null
      setConnectingState(null)
      e.stopPropagation()
    }
  }, [tool, graph.nodes])

  const onNodeDoubleClick = useCallback((node: GNode) => {
    setSelectedId(node.id)
    setRightTab('code')
    if (codeModalOpen) return  // already open
    // On double-click just ensure code panel is visible
  }, [codeModalOpen])

  // ── Start connect from port handle ────────────────────────────────────────
  const onStartConnect = useCallback((nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const { wx, wy } = clientToWorld(e.clientX, e.clientY)
    connectRef.current = { sourceId: nodeId, wx, wy }
    setConnectingState({ sourceId: nodeId, wx, wy })
    setTool('connect')
  }, [clientToWorld])

  // ── Code changes with debounced auto-connect ───────────────────────────────
  const onCodeChange = useCallback((code: string) => {
    if (!selectedId) return
    dispatch({ type: 'UPDATE_CODE', id: selectedId, code })

    // Debounce auto-connect notification
    if (autoConnectTimer.current) clearTimeout(autoConnectTimer.current)
    autoConnectTimer.current = setTimeout(() => {
      const node     = graph.nodes.find(n => n.id === selectedId)
      if (!node) return
      const newEdges = detectAutoEdges(graph.nodes, { ...node, code }, graph.edges)
      if (newEdges.length > 0) {
        dispatch({ type: 'ADD_EDGES', edges: newEdges })
        showToast(`${newEdges.length} connection${newEdges.length > 1 ? 's' : ''} detected`, 'info')
      }
    }, 600)
  }, [selectedId, graph.nodes, graph.edges])

  const onCodeSave = useCallback(() => {
    if (selectedId) dispatch({ type: 'SAVE_NODE', id: selectedId })
    showToast('Saved', 'success')
  }, [selectedId])

  // ── Run a node ─────────────────────────────────────────────────────────────
  const runSelectedNode = useCallback(async (nodeId: string) => {
    const node = graph.nodes.find(n => n.id === nodeId)
    if (!node) return

    setTermOpen(true)
    setTermLabel(node.label)
    setTermRunning(true)
    setTermLines(prev => [
      ...prev,
      { type: 'system', val: `─── Running ${node.label} ───`, ts: Date.now() },
    ])
    dispatch({ type: 'SET_EXEC_STATE', id: nodeId, execState: 'running' })

    try {
      const result = await runNode(node)
      setTermLines(prev => [
        ...prev,
        ...result.logs,
        { type: 'system', val: `─── Completed in ${result.ms}ms ───`, ts: Date.now() },
      ])

      const output   = result.logs.filter(l => l.type === 'log' || l.type === 'return').map(l => l.val).join('\n')
      const errOut   = result.logs.filter(l => l.type === 'error').map(l => l.val).join('\n')
      const success  = result.error === null

      dispatch({ type: 'SET_EXEC_STATE', id: nodeId, execState: success ? 'success' : 'error', lastOutput: output, lastError: errOut })

      // Reset exec state after 4s
      setTimeout(() => dispatch({ type: 'SET_EXEC_STATE', id: nodeId, execState: 'idle' }), 4000)
    } catch (err: any) {
      setTermLines(prev => [...prev, { type: 'error', val: String(err?.message ?? err), ts: Date.now() }])
      dispatch({ type: 'SET_EXEC_STATE', id: nodeId, execState: 'error', lastError: String(err?.message ?? err) })
    } finally {
      setTermRunning(false)
    }
  }, [graph.nodes])

  // ── Toast helpers ─────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string, kind: Toast['kind'] = 'info') => {
    const id = Date.now()
    setToasts(ts => [...ts, { id, msg, kind }])
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3000)
  }, [])

  // ── Create node ───────────────────────────────────────────────────────────
  const createNode = () => {
    if (!newLabel.trim()) return
    const id  = `n${Date.now()}`
    const ext = newLabel.includes('.') ? '' : newType === 'entry' ? '.py' : '.py'
    const lbl = newLabel.trim() + ext
    dispatch({
      type: 'ADD_NODE',
      node: {
        id, type: newType, label: lbl,
        x: -transform.x / transform.scale + 200,
        y: -transform.y / transform.scale + 200,
        themeIdx: graph.nodes.length % MANGA_IMAGES.length,
        isMain: false, code: `# ${lbl}\n`,
        modified: false, execState: 'idle',
        lastOutput: '', lastError: '', symbols: [],
      },
    })
    setSelectedId(id)
    setNewLabel(''); setShowCreate(false)
    showToast(`Created ${lbl}`, 'success')
  }

  const deleteNode = (id: string) => {
    dispatch({ type: 'DELETE_NODE', id })
    if (selectedId === id) setSelectedId(null)
    setCtxMenu(null)
    showToast('Node deleted', 'info')
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const selectedNode = useMemo(() => graph.nodes.find(n => n.id === selectedId) ?? null, [graph.nodes, selectedId])
  const unsavedCount = graph.nodes.filter(n => n.modified).length

  const canvasCursor = tool === 'pan' ? 'grab'
    : tool === 'connect'   ? 'crosshair'
    : connectingState      ? 'crosshair'
    : dragRef.current      ? 'grabbing'
    : isPanRef.current     ? 'grabbing'
    : 'default'

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ngo-shell" onClick={() => setCtxMenu(null)} onContextMenu={e => e.preventDefault()}>

      {/* ── TOPBAR ─────────────────────────────────────────────────────── */}
      <div className="ngo-topbar">
        <div className="ngo-logo">FOR<em>BID</em>EN</div>
        <div className="ngo-divider" />
        <div className="ngo-breadcrumb">
          <span>graph-ide</span>
          <span className="sep">/</span>
          <span className="active">{selectedNode ? selectedNode.label : 'canvas'}</span>
        </div>
        <div className="ngo-topbar-right">
          <div className="ngo-stat">{graph.nodes.length}N · {graph.edges.length}E{unsavedCount > 0 ? ` · ${unsavedCount}⬡` : ''}</div>
          <button className="ngo-btn" onClick={() => setSearchOpen(true)} title="Search (Ctrl+K)">⌕ Search</button>
          <button className="ngo-btn" onClick={() => setShowCreate(true)} title="New node (Ctrl+N)">+ Node</button>
          <button
            className="ngo-btn primary"
            onClick={() => { if (selectedId) runSelectedNode(selectedId); else showToast('Select a node to run', 'info') }}
            title="Run selected node (Ctrl+Enter)"
          >▶ Run</button>
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────────────── */}
      <div className="ngo-body">

        {/* ACTIVITY BAR */}
        <div className="ngo-activity">
          {[
            { id: 'files',   icon: '⬡', title: 'Files' },
            { id: 'outline', icon: '≡', title: 'Outline' },
          ].map(b => (
            <button key={b.id}
              className={`ngo-act-btn ${leftPanel === b.id ? 'active' : ''}`}
              title={b.title}
              onClick={() => setLeftPanel(p => p === b.id ? null : b.id as LeftPanel)}
            >{b.icon}</button>
          ))}
          <div style={{ flex: 1 }} />
          <button className="ngo-act-btn" title="Auto-layout (Shift+L)" onClick={() => dispatch({ type: 'AUTO_LAYOUT' })}>⊞</button>
          <button className="ngo-act-btn" title="Reset graph" onClick={() => { if (confirm('Reset to demo graph?')) { dispatch({ type: 'LOAD', nodes: DEMO_NODES, edges: DEMO_EDGES }); setSelectedId(null) } }}>⟳</button>
        </div>

        {/* LEFT PANEL */}
        {leftPanel && (
          <div className="ngo-left">
            <div className="ngo-panel-header">
              <div className="dot" />
              {leftPanel === 'files' ? 'FILES' : 'OUTLINE'}
            </div>

            {leftPanel === 'files' && (
              <div className="ngo-file-list">
                {graph.nodes.map(node => {
                  const color = NODE_COLORS[node.type] || '#00e5ff'
                  return (
                    <div key={node.id}
                      className={`ngo-file-item ${selectedId === node.id ? 'active' : ''}`}
                      onClick={() => { setSelectedId(node.id); setRightTab('code') }}
                      onDoubleClick={() => { setSelectedId(node.id); setCodeModalOpen(true) }}
                    >
                      <div className="ngo-file-pip" style={{ background: color }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.label}</span>
                      {node.modified && <div className="ngo-file-unsaved" />}
                      {node.execState !== 'idle' && (
                        <div className={`ngo-file-exec ${node.execState}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {leftPanel === 'outline' && (
              <div className="ngo-file-list">
                {graph.nodes.flatMap(node =>
                  node.symbols.map(sym => {
                    const color = NODE_COLORS[node.type] || '#00e5ff'
                    return (
                      <div key={`${node.id}_${sym}`}
                        className={`ngo-file-item ${selectedId === node.id ? 'active' : ''}`}
                        onClick={() => { setSelectedId(node.id); setRightTab('code') }}
                        style={{ paddingLeft: 22 }}
                      >
                        <span style={{ color, fontFamily: 'var(--mono)', fontSize: '0.68rem', flex: 1 }}>{sym}</span>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.6rem' }}>{node.label}</span>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>
        )}

        {/* CANVAS */}
        <div className="ngo-canvas-wrap"
          ref={canvasRef}
          style={{ cursor: canvasCursor, position: 'relative' }}
          onMouseDown={onCanvasMouseDown}
          onMouseMove={onCanvasMouseMove}
          onMouseUp={onCanvasMouseUp}
          onMouseLeave={onCanvasMouseUp}
        >
          {/* Toolbar */}
          <div className="ngo-canvas-toolbar">
            {(['select', 'pan', 'connect'] as Tool[]).map(t => (
              <button key={t}
                className={`ngo-tool-btn ${tool === t ? 'active' : ''}`}
                onClick={() => setTool(t)}
                title={t === 'select' ? 'Select (S)' : t === 'pan' ? 'Pan (P) or Alt+drag' : 'Connect (C) — draw edges'}
              >
                {t === 'select' ? '↖ SELECT' : t === 'pan' ? '✥ PAN' : '⇢ CONNECT'}
              </button>
            ))}
            <div className="ngo-tool-sep" />
            <button className="ngo-tool-btn" onClick={() => setTransform({ x: 420, y: 260, scale: 1 })} title="Reset view">⊙ RESET</button>
            <button className="ngo-tool-btn" onClick={() => dispatch({ type: 'AUTO_LAYOUT' })} title="Auto-layout (Shift+L)">⊞ LAYOUT</button>
          </div>

          {/* Connect mode hint */}
          {tool === 'connect' && !connectingState && (
            <div className="ngo-connect-hint">Click a node to start drawing an edge · ESC to cancel</div>
          )}

          {/* Canvas inner (transformed) */}
          <div className="ngo-canvas-inner"
            style={{ transform: `translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`, transformOrigin: '0 0' }}
          >
            <EdgeLayer
              nodes={graph.nodes}
              edges={graph.edges}
              selectedEdgeId={selectedEdgeId}
              onSelectEdge={setSelectedEdgeId}
              connecting={connectingState}
              scale={transform.scale}
            />

            {graph.nodes.map(node => (
              <div key={node.id}
                className="ngo-node"
                style={{ left: node.x, top: node.y, zIndex: selectedId === node.id ? 10 : 5 }}
                onMouseDown={e => onNodeMouseDown(e, node)}
                onMouseUp={e => onNodeMouseUp(e, node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onDoubleClick={() => onNodeDoubleClick(node)}
                onContextMenu={e => {
                  e.preventDefault(); e.stopPropagation()
                  setCtxMenu({ x: e.clientX, y: e.clientY, nodeId: node.id })
                }}
              >
                <NodeCard
                  node={node}
                  selected={selectedId === node.id}
                  hovered={hoveredId === node.id}
                  tool={tool}
                  onRunNode={runSelectedNode}
                  onStartConnect={onStartConnect}
                />
              </div>
            ))}
          </div>

          {/* Minimap */}
          <Minimap
            nodes={graph.nodes}
            edges={graph.edges}
            selectedId={selectedId}
            transform={transform}
            onClickPoint={(wx, wy) => {
              const rect = canvasRef.current?.getBoundingClientRect()
              if (!rect) return
              setTransform(t => ({
                ...t,
                x: rect.width  / 2 - wx * t.scale,
                y: rect.height / 2 - wy * t.scale,
              }))
            }}
          />

          {/* Terminal Drawer */}
          <TerminalDrawer
            open={termOpen}
            lines={termLines}
            running={termRunning}
            nodeLabel={termLabel}
            onClose={() => setTermOpen(false)}
            onClear={() => setTermLines([])}
          />
        </div>

        {/* RIGHT DOCK */}
        <div className="ngo-right">
          <div className="ngo-dock-tabs">
            {(['code', 'inspector'] as RightTab[]).map(tab => (
              <div key={tab}
                className={`ngo-dock-tab ${rightTab === tab ? 'active' : ''}`}
                onClick={() => setRightTab(tab)}
              >
                {tab === 'code' ? '‹/› CODE' : '⊟ INSPECTOR'}
              </div>
            ))}
          </div>
          <div className="ngo-dock-body">
            {rightTab === 'code' && (
              <CodePanel
                node={selectedNode}
                onChange={onCodeChange}
                onSave={onCodeSave}
                onExpand={() => selectedNode && setCodeModalOpen(true)}
              />
            )}
            {rightTab === 'inspector' && <Inspector node={selectedNode} />}
          </div>
        </div>

      </div>

      {/* STATUS BAR */}
      <div className="ngo-statusbar">
        <span className="ngo-status-item bright">FORBIDEN</span>
        <span className="ngo-status-item">GRAPH IDE</span>
        <span className="ngo-status-item" style={{ color: 'rgba(255,255,255,0.55)' }}>
          S=select · P=pan · C=connect · Ctrl+K=search · Ctrl+`=terminal
        </span>
        <span className="ngo-status-item" style={{ marginLeft: 'auto' }}>
          {selectedNode ? selectedNode.label : `${graph.nodes.length} nodes`}
        </span>
        {connectingState && (
          <span className="ngo-status-item" style={{ color: 'var(--gold)' }}>⇢ connecting…</span>
        )}
        {unsavedCount > 0 && (
          <span className="ngo-status-item" style={{ color: 'var(--gold)' }}>● {unsavedCount} unsaved</span>
        )}
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
                <div className="ngo-input-label">FILE NAME</div>
                <input className="ngo-input" value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createNode()}
                  placeholder="my_module.py"
                  autoFocus
                />
              </div>
              <div>
                <div className="ngo-input-label">NODE TYPE</div>
                <div className="ngo-type-grid">
                  {(Object.keys(NODE_COLORS) as GNode['type'][]).map(type => {
                    const color = NODE_COLORS[type]
                    return (
                      <button key={type}
                        className={`ngo-type-btn ${newType === type ? 'active' : ''}`}
                        style={newType === type ? { borderColor: color, color } : {}}
                        onClick={() => setNewType(type)}
                      >
                        {type.toUpperCase()}
                      </button>
                    )
                  })}
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
        <div className="ngo-ctx"
          style={{ left: ctxMenu.x, top: ctxMenu.y }}
          onClick={e => e.stopPropagation()}
        >
          <div className="ngo-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setCtxMenu(null) }}>Select</div>
          <div className="ngo-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setRightTab('code'); setCtxMenu(null) }}>Open in Editor</div>
          <div className="ngo-ctx-item" onClick={() => { setSelectedId(ctxMenu.nodeId); setCodeModalOpen(true); setCtxMenu(null) }}>Expand Editor ⤢</div>
          <div className="ngo-ctx-item" onClick={() => { runSelectedNode(ctxMenu.nodeId); setCtxMenu(null) }}>▶ Run Node</div>
          <div className="ngo-ctx-item" onClick={() => {
            const n = graph.nodes.find(x => x.id === ctxMenu.nodeId)
            if (n) { setTool('connect'); onStartConnect(n.id, { clientX: ctxMenu.x, clientY: ctxMenu.y, stopPropagation: () => {} } as any) }
            setCtxMenu(null)
          }}>⇢ Connect From Here</div>
          <div className="ngo-ctx-sep" />
          <div className="ngo-ctx-item danger" onClick={() => deleteNode(ctxMenu.nodeId)}>Delete Node</div>
        </div>
      )}

      {/* CODE MODAL (fullscreen) */}
      {codeModalOpen && selectedNode && (
        <CodeModal
          node={selectedNode}
          onChange={onCodeChange}
          onSave={onCodeSave}
          onClose={() => setCodeModalOpen(false)}
          onRun={() => runSelectedNode(selectedNode.id)}
        />
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <SearchModal
          nodes={graph.nodes}
          onSelect={(id) => { setSelectedId(id); setRightTab('code') }}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {/* TOASTS */}
      <ToastContainer toasts={toasts} />

    </div>
  )
}
