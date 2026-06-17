import Editor from '@monaco-editor/react'
import { GraphNode } from '../App'

const api = (window as any).forbiden

interface Props {
  node: GraphNode | null
  content: string
  onChange: (c: string) => void
  onSave: (c: string) => void
}

export default function CodeEditor({ node, content, onChange, onSave }: Props) {
  if (!node) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
        No node selected
      </div>
    )
  }

  const language = node.label.endsWith('.py') ? 'python'
                 : node.label.endsWith('.rs') ? 'rust'
                 : node.label.endsWith('.go') ? 'go'
                 : (node.label.endsWith('.ts') || node.label.endsWith('.tsx')) ? 'typescript'
                 : 'javascript'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--void)' }}>
      {/* Editor Header */}
      <div style={{
        height: 36, flexShrink: 0, padding: '0 12px',
        borderBottom: '1px solid var(--border)', background: 'var(--surface2)',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <span style={{ fontSize: '.75rem', fontFamily: 'var(--mono)', color: 'var(--cyan)' }}>
          {node.label}
        </span>
        <div style={{ flex: 1 }} />
        {!node.filePath && (
          <button className="btn" onClick={() => api.linkFile(node.id)}>Link File</button>
        )}
        <button className="btn primary" onClick={() => onSave(content)}>Save</button>
      </div>
      
      {/* Monaco Editor */}
      <div style={{ flex: 1, paddingTop: 4 }}>
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={content}
          onChange={v => onChange(v || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'var(--mono)',
            padding: { top: 12 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
        />
      </div>
    </div>
  )
}
