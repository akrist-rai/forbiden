// FORBIDEN Engine — runs in Electron main process
// Parses real code to auto-build the graph. No external server needed.
import * as fs   from 'fs'
import * as path from 'path'

export type NodeType = 'entry' | 'function' | 'class' | 'module' | 'test' | 'util'

export interface GraphNode {
  id:        string
  type:      NodeType
  label:     string
  filePath:  string
  x:         number
  y:         number
  isMain:    boolean
  modified:  boolean
  lineCount: number
  symbols:   { kind: string; name: string; line: number }[]
  imports:   string[]
}

export interface GraphEdge {
  id:     string
  source: string
  target: string
  kind:   'import' | 'manual'
}

// ── Parsers ───────────────────────────────────────────────────────────────────
const IMPORT_RES = [
  /import\s+.*?\s+from\s+['"](.+?)['"]/g,
  /require\s*\(\s*['"](.+?)['"]\s*\)/g,
  /from\s+['"](.+?)['"]/g,
]
const SYMBOL_RES = [
  { re: /^(?:export\s+)?(?:async\s+)?function\s+(\w+)/, kind: 'function' },
  { re: /^(?:export\s+)?class\s+(\w+)/,                 kind: 'class'    },
  { re: /^(?:export\s+)?(?:const|let|var)\s+(\w+)/,     kind: 'const'    },
  { re: /^(?:export\s+)?type\s+(\w+)/,                  kind: 'type'     },
  { re: /^def\s+(\w+)/,                                 kind: 'function' },
  { re: /^class\s+(\w+)/,                               kind: 'class'    },
]

function parseFile(content: string) {
  const imports: string[] = []
  const symbols: { kind: string; name: string; line: number }[] = []
  for (const pattern of IMPORT_RES) {
    const re = new RegExp(pattern.source, pattern.flags)
    let m: RegExpExecArray | null
    while ((m = re.exec(content)) !== null)
      if (m[1] && !imports.includes(m[1])) imports.push(m[1])
  }
  content.split('\n').forEach((line, i) => {
    for (const { re, kind } of SYMBOL_RES) {
      const m = line.trim().match(re)
      if (m?.[1]) { symbols.push({ kind, name: m[1], line: i + 1 }); break }
    }
  })
  return { imports, symbols }
}

function inferType(rel: string, symbols: { kind: string }[]): NodeType {
  const l = rel.toLowerCase()
  if (l.includes('test') || l.includes('spec'))                       return 'test'
  if (l.includes('index') || l.includes('main') || l.includes('app.')) return 'entry'
  if (l.includes('util') || l.includes('helper'))                     return 'util'
  if (symbols.some(s => s.kind === 'class'))                          return 'class'
  if (l.includes('config') || l.includes('env'))                      return 'module'
  if (symbols.some(s => s.kind === 'function'))                       return 'function'
  return 'module'
}

// ── Engine ────────────────────────────────────────────────────────────────────
export class Engine {
  private nodes: GraphNode[] = []
  private edges: GraphEdge[] = []
  private stateFile = ''

  setWorkspace(root: string) {
    this.stateFile = path.join(root, '.forbiden', 'graph.json')
    const loaded   = this.loadState()
    if (loaded) { this.nodes = loaded.nodes; this.edges = loaded.edges; this.resyncAll() }
  }

  // ── Workspace scan ──────────────────────────────────────────────────────────
  scanDir(root: string, pattern = /\.(ts|tsx|js|jsx|py|rs|go)$/): number {
    const files = this.walkDir(root, pattern).slice(0, 500)
    let col = 0, row = 0
    for (const fp of files) {
      if (this.nodes.find(n => n.filePath === fp)) continue
      const rel = path.relative(root, fp)
      const content = this.readSafe(fp)
      const { imports, symbols } = parseFile(content)
      this.nodes.push({
        id:        `n_${Date.now()}_${Math.random().toString(36).slice(2,5)}`,
        type:      inferType(rel, symbols),
        label:     rel,
        filePath:  fp,
        x:         (col % 6) * 270 - 650,
        y:         row * 210 - 300,
        isMain:    this.nodes.length === 0,
        modified:  false,
        lineCount: content.split('\n').length,
        symbols, imports,
      })
      col++; if (col % 6 === 0) row++
    }
    this.rebuildEdges()
    this.saveState()
    return files.length
  }

  syncFile(fp: string, root: string) {
    const content = this.readSafe(fp)
    if (!content) return
    const { imports, symbols } = parseFile(content)
    const existing = this.nodes.find(n => n.filePath === fp)
    if (existing) {
      existing.imports   = imports
      existing.symbols   = symbols
      existing.lineCount = content.split('\n').length
      existing.type      = inferType(existing.label, symbols)
    }
    this.rebuildEdges()
    this.saveState()
  }

  // ── CRUD ─────────────────────────────────────────────────────────────────────
  addNode(label: string, type: NodeType): GraphNode {
    const n: GraphNode = {
      id: `n_${Date.now()}`, type, label, filePath: '',
      x: (this.nodes.length % 6) * 270 - 650,
      y: Math.floor(this.nodes.length / 6) * 210 - 300,
      isMain: this.nodes.length === 0,
      modified: false, lineCount: 0, symbols: [], imports: [],
    }
    this.nodes.push(n); this.saveState(); return n
  }

  deleteNode(id: string) {
    this.nodes = this.nodes.filter(n => n.id !== id)
    this.edges = this.edges.filter(e => e.source !== id && e.target !== id)
    this.saveState()
  }

  moveNode(id: string, x: number, y: number) {
    const n = this.nodes.find(n => n.id === id)
    if (n) { n.x = x; n.y = y }
    this.saveState()
  }

  addEdge(source: string, target: string) {
    if (source === target) return
    if (this.edges.find(e => e.source === source && e.target === target)) return
    this.edges.push({ id: `e_${Date.now()}`, source, target, kind: 'manual' })
    this.saveState()
  }

  removeEdge(id: string) {
    this.edges = this.edges.filter(e => e.id !== id)
    this.saveState()
  }

  linkFile(id: string, fp: string, root: string) {
    const n = this.nodes.find(n => n.id === id)
    if (!n) return
    n.filePath = fp
    n.label    = path.relative(root, fp)
    const content = this.readSafe(fp)
    const { imports, symbols } = parseFile(content)
    n.imports   = imports; n.symbols = symbols
    n.lineCount = content.split('\n').length
    n.type      = inferType(n.label, symbols)
    this.rebuildEdges(); this.saveState()
  }

  markSaved(id: string) {
    const n = this.nodes.find(n => n.id === id)
    if (n) { n.modified = false; this.saveState() }
  }

  // ── Queries ──────────────────────────────────────────────────────────────────
  getState()           { return { nodes: this.nodes, edges: this.edges } }
  getFileContent(fp: string) { return this.readSafe(fp) }
  writeFileContent(fp: string, content: string) {
    try { fs.writeFileSync(fp, content, 'utf8'); return true } catch { return false }
  }

  // ── Edge auto-build from imports ──────────────────────────────────────────────
  private rebuildEdges() {
    const manual = this.edges.filter(e => e.kind === 'manual')
    const auto:   GraphEdge[] = []
    for (const src of this.nodes) {
      if (!src.filePath) continue
      for (const imp of src.imports) {
        const resolved = this.resolveImport(src.filePath, imp)
        if (!resolved) continue
        const tgt = this.nodes.find(n => n.filePath === resolved)
        if (!tgt || tgt.id === src.id) continue
        if (auto.find(e => e.source === src.id && e.target === tgt.id)) continue
        if (manual.find(e => e.source === src.id && e.target === tgt.id)) continue
        auto.push({ id: `auto_${src.id}_${tgt.id}`, source: src.id, target: tgt.id, kind: 'import' })
      }
    }
    this.edges = [...manual, ...auto]
  }

  private resolveImport(fromFile: string, spec: string): string | null {
    if (!spec.startsWith('.')) return null
    const dir  = path.dirname(fromFile)
    const base = path.resolve(dir, spec)
    for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.py', '']) {
      if (fs.existsSync(base + ext)) return base + ext
    }
    for (const ext of ['.ts', '.js', '.tsx', '.jsx']) {
      const idx = path.join(base, `index${ext}`)
      if (fs.existsSync(idx)) return idx
    }
    return null
  }

  private resyncAll() {
    for (const n of this.nodes) {
      if (!n.filePath || !fs.existsSync(n.filePath)) continue
      const content = this.readSafe(n.filePath)
      const { imports, symbols } = parseFile(content)
      n.imports = imports; n.symbols = symbols
      n.lineCount = content.split('\n').length
    }
    this.rebuildEdges()
  }

  private walkDir(dir: string, re: RegExp, results: string[] = []): string[] {
    const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '__pycache__', '.next', 'out'])
    try {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (SKIP.has(entry.name)) continue
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) this.walkDir(full, re, results)
        else if (re.test(entry.name)) results.push(full)
      }
    } catch {}
    return results
  }

  private readSafe(fp: string): string {
    try { return fs.readFileSync(fp, 'utf8') } catch { return '' }
  }

  private loadState(): { nodes: GraphNode[]; edges: GraphEdge[] } | null {
    try {
      if (fs.existsSync(this.stateFile))
        return JSON.parse(fs.readFileSync(this.stateFile, 'utf8'))
    } catch {}
    return null
  }

  saveState() {
    if (!this.stateFile) return
    try {
      const dir = path.dirname(this.stateFile)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(this.stateFile, JSON.stringify(this.getState(), null, 2), 'utf8')
    } catch {}
  }
}
