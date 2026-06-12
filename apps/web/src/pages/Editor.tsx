// src/pages/Editor.tsx — Main graph IDE
import { useState, useCallback, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ReactFlow, Background, Controls, MiniMap,
  addEdge, applyNodeChanges, applyEdgeChanges,
  type Node, type Edge, type Connection, type NodeChange, type EdgeChange,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import MonacoEditor from '@monaco-editor/react'
import { api } from '@/lib/api'
import { useWS } from '@/hooks/useWS'
import NodeCard from '@/components/GraphCanvas/NodeCard'

const nodeTypes = { default: NodeCard }

interface DbNode { id: string; label: string; filepath: string; type: string; isMain: boolean; x: number; y: number; modified: boolean }
interface DbEdge { id: string; source: string; target: string }
interface GitStatus { branch?: string; staged?: string[]; modified?: string[]; untracked?: string[]; clean?: boolean }
interface Commit { hash: string; short: string; message: string; authorName: string; date: string; lane: number; refs: string[] }

const MANGA_SIDEBAR = ['/assets/killua.jpeg', '/assets/reze.jpeg', '/assets/inumaki.jpeg', '/assets/monster.jpeg']

export default function Editor() {
  const { wsId } = useParams<{ wsId: string }>()
  const nav = useNavigate()

  // Graph state
  const [nodes,    setNodes]    = useState<Node[]>([])
  const [edges,    setEdges]    = useState<Edge[]>([])

  // Active panel
  const [activePanel, setActivePanel] = useState<'code' | 'git' | 'board'>('code')

  // Selected node + code
  const [selectedNode, setSelectedNode] = useState<DbNode | null>(null)
  const [code,         setCode]         = useState('')

  // Git state
  const [gitStatus,  setGitStatus]  = useState<GitStatus>({})
  const [commits,    setCommits]    = useState<Commit[]>([])
  const [commitMsg,  setCommitMsg]  = useState('')

  // Board
  const [columns, setColumns] = useState<any[]>([])
  const [cards,   setCards]   = useState<any[]>([])

  // WS send ref
  const { send } = useWS(wsId ?? null, {
    'workspace:state': (p: any) => {
      hydrateState(p)
    },
    'node:created':  (p: any) => addDbNode(p),
    'node:updated':  (p: any) => updateDbNode(p),
    'node:deleted':  (p: any) => setNodes(ns => ns.filter(n => n.id !== (p as any).id)),
    'node:code':     (p: any) => { if ((p as any).id === selectedNode?.id) setCode((p as any).code) },
    'node:position': (p: any) => setNodes(ns => ns.map(n => n.id === (p as any).id ? { ...n, position: { x: (p as any).x, y: (p as any).y } } : n)),
    'edge:created':  (p: any) => setEdges(es => [...es, { id: (p as any).id, source: (p as any).source, target: (p as any).target }]),
    'edge:deleted':  (p: any) => setEdges(es => es.filter(e => e.id !== (p as any).id)),
    'git:status':    (p: any) => setGitStatus(p as GitStatus),
    'git:graph':     (p: any) => setCommits((p as any).commits ?? []),
    'git:committed': ()       => { loadGit() },
    'card:created':  (p: any) => setCards(cs => [...cs, p]),
    'card:updated':  (p: any) => setCards(cs => cs.map(c => c.id === (p as any).id ? p : c)),
    'card:deleted':  (p: any) => setCards(cs => cs.filter(c => c.id !== (p as any).id)),
  })

  function hydrateState(state: any) {
    setNodes(state.nodes?.map((n: DbNode) => dbNodeToFlow(n, () => openNode(n))) ?? [])
    setEdges(state.edges?.map((e: DbEdge) => ({ id: e.id, source: e.source, target: e.target })) ?? [])
    setGitStatus(state.git?.status ?? {})
    setCommits(state.git?.graph?.commits ?? [])
    setColumns(state.columns ?? [])
    setCards(state.cards ?? [])
  }

  function dbNodeToFlow(n: DbNode, onOpen: () => void): Node {
    return {
      id: n.id,
      type: 'default',
      position: { x: n.x, y: n.y },
      data: { label: n.label, type: n.type, modified: n.modified, isMain: n.isMain, onOpen },
    }
  }

  function addDbNode(n: DbNode) {
    setNodes(ns => [...ns, dbNodeToFlow(n, () => openNode(n))])
  }
  function updateDbNode(n: DbNode) {
    setNodes(ns => ns.map(x => x.id === n.id ? dbNodeToFlow(n, () => openNode(n)) : x))
  }

  async function openNode(n: DbNode) {
    setSelectedNode(n)
    setActivePanel('code')
    const content = await api.get<string>(`/api/workspaces/${wsId}/nodes/${n.id}/code`)
    setCode(content as unknown as string)
  }

  async function loadGit() {
    const [status, graph] = await Promise.all([
      api.get<GitStatus>(`/api/workspaces/${wsId}/git/status`),
      api.get<{ commits: Commit[] }>(`/api/workspaces/${wsId}/git/graph`),
    ])
    setGitStatus(status)
    setCommits(graph.commits ?? [])
  }

  // Autosave code on change (debounced via WS)
  const saveTimer = useRef<ReturnType<typeof setTimeout>>()
  function onCodeChange(val: string | undefined) {
    if (!val || !selectedNode) return
    setCode(val)
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      send('node:code', { id: selectedNode.id, code: val })
    }, 800)
  }

  // Node position drag
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(ns => applyNodeChanges(changes, ns))
    changes.forEach(c => {
      if (c.type === 'position' && c.dragging === false) {
        send('node:position', { id: c.id, x: c.position?.x, y: c.position?.y })
      }
    })
  }, [send])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges(es => applyEdgeChanges(changes, es))
  }, [])

  const onConnect = useCallback((conn: Connection) => {
    send('edge:create', { source: conn.source, target: conn.target })
    setEdges(es => addEdge(conn, es))
  }, [send])

  async function gitCommit() {
    if (!commitMsg.trim()) return
    await api.post(`/api/workspaces/${wsId}/git/commit`, { message: commitMsg })
    setCommitMsg('')
    loadGit()
  }

  const sidebarImg = MANGA_SIDEBAR[Math.floor(Date.now() / 1000) % MANGA_SIDEBAR.length]

  return (
    <div className="app-layout">
      {/* Speed line bg */}
      <div className="speed-lines" />
      <div className="halftone" />

      {/* ── TOP BAR ── */}
      <div className="topbar">
        <div className="topbar-logo">FOR<span className="accent">BIN</span>DEN</div>
        <div className="topbar-ws" onClick={() => nav('/')}>
          {wsId?.slice(0, 14)}…
        </div>
        {gitStatus.branch && (
          <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--gold)',border:'1px solid var(--gold)',padding:'2px 8px'}}>
            ⎇ {gitStatus.branch}
          </span>
        )}
        {!gitStatus.clean && (
          <span style={{fontSize:10,color:'var(--red)',fontFamily:'var(--font-mono)'}}>
            ● {(gitStatus.modified?.length ?? 0) + (gitStatus.untracked?.length ?? 0)} changed
          </span>
        )}
        <div className="topbar-actions">
          <button className="btn btn-ghost" style={{fontSize:10}} onClick={() => nav('/')}>← DASH</button>
        </div>
      </div>

      {/* ── LEFT SIDEBAR ── */}
      <div className="sidebar">
        {/* Manga image strip */}
        <div className="manga-splash" style={{height:180}}>
          <img src={sidebarImg} alt="manga" />
          <div className="manga-splash-overlay" />
          <div className="manga-splash-text">GRAPH<br/>IDE</div>
        </div>

        <div className="section-label">PANELS</div>
        {(['code','git','board'] as const).map(p => (
          <div
            key={p}
            className={`sidebar-item ${activePanel === p ? 'active' : ''}`}
            onClick={() => setActivePanel(p)}
          >
            <span>{p === 'code' ? '⌨' : p === 'git' ? '⎇' : '▦'}</span>
            {p.toUpperCase()}
          </div>
        ))}

        <div className="manga-divider" style={{margin:'12px 0'}} />
        <div className="section-label">FILES</div>
        <div className="scroll">
          {nodes.map(n => (
            <div
              key={n.id}
              className={`sidebar-item ${selectedNode?.id === n.id ? 'active' : ''}`}
              onClick={() => openNode({ id: n.id, ...(n.data as any) })}
            >
              <span style={{color:`var(--${(n.data as any).type === 'entry' ? 'gold' : (n.data as any).type === 'class' ? 'purple' : 'green'})`}}>◆</span>
              <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {(n.data as any).label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CANVAS ── */}
      <div className="canvas-area">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          style={{background:'transparent'}}
          defaultEdgeOptions={{ style: { stroke: 'var(--red)', strokeWidth: 2 }, markerEnd: { type: 'arrow' as any } }}
        >
          <Background variant={BackgroundVariant.Dots} color="var(--border)" gap={24} size={1} />
          <Controls style={{background:'var(--panel)',border:'1px solid var(--border)'}} />
          <MiniMap
            style={{background:'var(--panel)',border:'1px solid var(--border)'}}
            nodeColor={() => 'var(--red)'}
          />
        </ReactFlow>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="right-panel">
        <div className="tabs">
          {(['code','git','board'] as const).map(p => (
            <div key={p} className={`tab ${activePanel === p ? 'active' : ''}`} onClick={() => setActivePanel(p)}>
              {p.toUpperCase()}
            </div>
          ))}
        </div>

        {/* CODE PANEL */}
        {activePanel === 'code' && (
          <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
            {selectedNode ? (
              <>
                <div style={{padding:'6px 12px',borderBottom:'1px solid var(--border)',display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--gold)',flex:1}}>
                    {selectedNode.label}
                  </span>
                  <button
                    className="btn btn-ghost"
                    style={{fontSize:9,padding:'3px 8px'}}
                    onClick={() => send('node:code', { id: selectedNode.id, code })}
                  >
                    SAVE
                  </button>
                </div>
                <MonacoEditor
                  height="100%"
                  value={code}
                  onChange={onCodeChange}
                  theme="vs-dark"
                  options={{
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 12 },
                    lineNumbers: 'on',
                  }}
                />
              </>
            ) : (
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
                <img src="/assets/badges.png" alt="badges" style={{width:180,opacity:0.5,filter:'grayscale(1)'}} />
                <div style={{fontFamily:'var(--font-title)',fontSize:14,letterSpacing:3,color:'var(--text-3)'}}>
                  DOUBLE-CLICK A NODE
                </div>
              </div>
            )}
          </div>
        )}

        {/* GIT PANEL */}
        {activePanel === 'git' && (
          <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{padding:12,borderBottom:'1px solid var(--border)',display:'flex',gap:8}}>
              <input
                className="input"
                placeholder="commit message"
                value={commitMsg}
                onChange={e => setCommitMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && gitCommit()}
              />
              <button className="btn btn-primary" style={{flexShrink:0}} onClick={gitCommit}>GIT</button>
            </div>
            <div className="scroll">
              {commits.map(c => (
                <div key={c.hash} className="git-commit">
                  <div>
                    <div className="commit-hash">{c.short}</div>
                  </div>
                  <div style={{flex:1,overflow:'hidden'}}>
                    {c.refs.map(r => (
                      <span key={r} className="commit-branch">{r.replace('HEAD -> ','')}</span>
                    ))}
                    <div className="commit-msg">{c.message}</div>
                    <div className="commit-meta">{c.authorName} · {c.date?.slice(0,10)}</div>
                  </div>
                </div>
              ))}
              {commits.length === 0 && (
                <div style={{padding:24,textAlign:'center',color:'var(--text-3)',fontFamily:'var(--font-title)',letterSpacing:2,fontSize:12}}>
                  NO COMMITS YET
                </div>
              )}
            </div>
          </div>
        )}

        {/* BOARD PANEL */}
        {activePanel === 'board' && (
          <div className="board-container">
            {columns.map(col => (
              <div key={col.id} className="board-col">
                <div className="board-col-header">
                  <span className="board-col-dot" style={{background:col.color}} />
                  {col.title}
                  <span style={{marginLeft:'auto',fontSize:10,color:'var(--text-3)'}}>
                    {cards.filter(c => c.colId === col.id).length}
                  </span>
                </div>
                <div className="board-col-cards">
                  {cards.filter(c => c.colId === col.id).map(card => (
                    <div key={card.id} className="card">
                      <div className="card-title">{card.title}</div>
                      <div className="card-meta">
                        <span className={`card-priority priority-${card.priority}`}>{card.priority}</span>
                        {(card.tags as string[]).map(t => (
                          <span key={t} className="card-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
