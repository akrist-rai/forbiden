import { useState, useEffect, useCallback } from 'react'
import TitleBar    from './components/TitleBar'
import ActivityBar from './components/ActivityBar'
import Sidebar     from './components/Sidebar'
import Canvas      from './components/Canvas'
import CodeEditor  from './components/CodeEditor'
import Inspector   from './components/Inspector'
import StatusBar   from './components/StatusBar'
import Welcome     from './components/Welcome'
import './styles/app.css'

const api = (window as any).forbiden

export type GraphNode = {
  id: string; type: string; label: string; filePath: string
  x: number; y: number; isMain: boolean; modified: boolean
  lineCount: number; symbols: {kind:string;name:string;line:number}[]; imports: string[]
}
export type GraphEdge = { id: string; source: string; target: string; kind: string }
export type Graph     = { nodes: GraphNode[]; edges: GraphEdge[] }

export default function App() {
  const [graph,       setGraph]       = useState<Graph>({ nodes: [], edges: [] })
  const [selectedId,  setSelectedId]  = useState<string | null>(null)
  const [rightTab,    setRightTab]    = useState<'code' | 'inspector'>('code')
  const [sidePanel,   setSidePanel]   = useState<'nodes' | 'files' | null>('nodes')
  const [workspace,   setWorkspace]   = useState('')
  const [fileContent, setFileContent] = useState('')
  const [scanning,    setScanning]    = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const selectedNode = graph.nodes.find(n => n.id === selectedId) ?? null

  // ── Load graph on mount ────────────────────────────────────────────────────
  useEffect(() => {
    api.getState().then((g: Graph) => {
      if (g.nodes.length > 0) { setGraph(g); setShowWelcome(false) }
    })
  }, [])

  // ── Main → Renderer events ─────────────────────────────────────────────────
  useEffect(() => {
    const unsubs = [
      api.on('workspace:opened', ({ folder, graph }: { folder: string; graph: Graph }) => {
        setWorkspace(folder); setGraph(graph); setShowWelcome(false)
      }),
      api.on('graph:update',  (g: Graph)  => setGraph(g)),
      api.on('menu:scan',     ()          => handleScan()),
      api.on('menu:addNode',  ()          => handleAddNode()),
      api.on('menu:canvas',   ()          => setSidePanel(p => p === 'nodes' ? null : 'nodes')),
      api.on('menu:resetLayout', ()       => {}),
    ]
    return () => unsubs.forEach(u => u?.())
  }, [workspace])

  // ── When a node is selected, load its file ─────────────────────────────────
  useEffect(() => {
    if (!selectedNode?.filePath) { setFileContent(''); return }
    api.readFile(selectedNode.filePath).then((c: string) => setFileContent(c ?? ''))
  }, [selectedNode?.filePath])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOpenFolder = async () => {
    const res = await api.openFolder()
    if (res?.folder) { setWorkspace(res.folder); setGraph(res.graph); setShowWelcome(false) }
  }

  const handleScan = useCallback(async () => {
    setScanning(true)
    const res = await api.scan()
    if (res?.graph) setGraph(res.graph)
    setScanning(false)
  }, [])

  const handleAddNode = async () => {
    const label = prompt('Node label (e.g. utils.ts):')?.trim()
    if (!label) return
    const type  = prompt('Type: entry / function / class / module / test / util', 'function')?.trim() ?? 'function'
    const g = await api.addNode(label, type)
    if (g) setGraph(g)
  }

  const handleDeleteNode = async (id: string) => {
    const g = await api.deleteNode(id)
    if (g) { setGraph(g); if (selectedId === id) setSelectedId(null) }
  }

  const handleAddEdge = async (source: string, target: string) => {
    const g = await api.addEdge(source, target)
    if (g) setGraph(g)
  }

  const handleMoveNode = (id: string, x: number, y: number) => {
    api.moveNode(id, x, y)
    setGraph(g => ({ ...g, nodes: g.nodes.map(n => n.id === id ? { ...n, x, y } : n) }))
  }

  const handleSaveFile = async (content: string) => {
    if (!selectedNode?.filePath) return
    const res = await api.writeFile(selectedNode.filePath, content)
    if (res?.graph) setGraph(res.graph)
  }

  const handleNodeDoubleClick = (id: string) => {
    setSelectedId(id); setRightTab('code')
  }

  return (
    <div className="app-shell">
      <TitleBar workspace={workspace} onOpenFolder={handleOpenFolder} />

      <div className="app-body">
        <ActivityBar sidePanel={sidePanel} setSidePanel={setSidePanel} />

        {sidePanel && (
          <Sidebar
            panel={sidePanel}
            nodes={graph.nodes}
            edges={graph.edges}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={handleDeleteNode}
            onAdd={handleAddNode}
            onScan={handleScan}
            scanning={scanning}
          />
        )}

        <div className="app-center">
          {showWelcome ? (
            <Welcome onOpenFolder={handleOpenFolder} onScan={handleScan} />
          ) : (
            <Canvas
              nodes={graph.nodes}
              edges={graph.edges}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDoubleClick={handleNodeDoubleClick}
              onMove={handleMoveNode}
              onDelete={handleDeleteNode}
              onAddEdge={handleAddEdge}
              onAddNode={handleAddNode}
            />
          )}
        </div>

        <div className="app-right">
          <div className="right-tabs">
            {(['code', 'inspector'] as const).map(t => (
              <button key={t} className={`right-tab${rightTab === t ? ' active' : ''}`}
                onClick={() => setRightTab(t)}>
                {t === 'code' ? '⌨ CODE' : '🔍 INSPECTOR'}
              </button>
            ))}
          </div>
          <div className="right-body">
            {rightTab === 'code' ? (
              <CodeEditor
                node={selectedNode}
                content={fileContent}
                onChange={setFileContent}
                onSave={handleSaveFile}
              />
            ) : (
              <Inspector node={selectedNode} edges={graph.edges} />
            )}
          </div>
        </div>
      </div>

      <StatusBar
        nodes={graph.nodes}
        edges={graph.edges}
        workspace={workspace}
        selectedNode={selectedNode}
        scanning={scanning}
      />
    </div>
  )
}
