import { GraphNode, GraphEdge } from '../App'

interface Props {
  nodes: GraphNode[]
  edges: GraphEdge[]
  workspace: string
  selectedNode: GraphNode | null
  scanning: boolean
}

export default function StatusBar({ nodes, edges, workspace, selectedNode, scanning }: Props) {
  const autoEdges = edges.filter(e => e.kind === 'import').length
  const manualEdges = edges.length - autoEdges

  return (
    <div style={{
      height: 24, flexShrink: 0,
      background: 'var(--red)',
      display: 'flex', alignItems: 'center', padding: '0 12px', gap: 16,
      fontSize: '.62rem', letterSpacing: '.08em', fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.8)'
    }}>
      <span style={{ color: '#fff', fontWeight: 600 }}>FORBIDEN // ENGINE</span>
      
      <span>{nodes.length} NODES</span>
      <span>{edges.length} EDGES ({autoEdges} AUTO / {manualEdges} MAN)</span>
      
      {scanning && <span style={{ color: 'var(--gold)' }}>SCANNING WORKSPACE...</span>}
      
      <div style={{ flex: 1 }} />
      
      {workspace && <span>WS: {workspace.split('/').pop()}</span>}
      {selectedNode ? <span>SEL: {selectedNode.label}</span> : <span>NO SELECTION</span>}
    </div>
  )
}
