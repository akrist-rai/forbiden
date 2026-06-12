// src/components/GraphCanvas/NodeCard.tsx — React Flow custom node
import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'

export interface NodeData {
  label: string
  type: 'entry' | 'function' | 'class' | 'note'
  modified: boolean
  isMain: boolean
  onOpen?: () => void
}

const TYPE_BADGE: Record<string, string> = {
  entry:    'MAIN',
  function: 'FN',
  class:    'CLS',
  note:     'DOC',
}

function NodeCard({ data, selected }: NodeProps) {
  const d = data as NodeData
  return (
    <div
      className={`node-card type-${d.type} ${selected ? 'selected' : ''}`}
      onDoubleClick={() => d.onOpen?.()}
      style={{ minWidth: 160 }}
    >
      <Handle type="target" position={Position.Top}    style={{background:'var(--red)',border:'none',width:6,height:6}} />
      <div className="node-header">
        <span className={`node-type-badge type-badge-${d.type}`}>{TYPE_BADGE[d.type]}</span>
        <span className="node-label" title={d.label}>{d.label}</span>
        {d.modified && <span className="node-modified-dot" title="unsaved changes" />}
        {d.isMain && <span style={{fontSize:9,color:'var(--gold)',fontFamily:'var(--font-title)',letterSpacing:1}}>★</span>}
      </div>
      <Handle type="source" position={Position.Bottom} style={{background:'var(--green)',border:'none',width:6,height:6}} />
    </div>
  )
}

export default memo(NodeCard)
