// FORBIDEN — Engine
// Single source of truth. Replaces GraphModel + GraphStorage + Bun backend.
// Parses real workspace code to auto-build and sync the graph.
import * as vscode from 'vscode';
import * as path   from 'path';
import * as fs     from 'fs';

// ── Types ─────────────────────────────────────────────────────────────────────
export type NodeType = 'entry' | 'function' | 'class' | 'module' | 'test' | 'util';

export interface GraphNode {
  id:        string;
  type:      NodeType;
  label:     string;       // display name (relative path or custom)
  filePath:  string;       // absolute path ('' if not linked to disk)
  x:         number;
  y:         number;
  isMain:    boolean;
  modified:  boolean;
  symbols:   CodeSymbol[]; // parsed top-level symbols
  imports:   string[];     // raw import specifiers found in file
  lineCount: number;
}

export interface CodeSymbol {
  kind:  'function' | 'class' | 'const' | 'type' | 'export';
  name:  string;
  line:  number;
}

export interface GraphEdge {
  id:     string;
  source: string;
  target: string;
  kind:   'import' | 'manual';
}

export interface EngineState {
  nodes:   GraphNode[];
  edges:   GraphEdge[];
  version: number;
}

// ── Parsers ───────────────────────────────────────────────────────────────────
const IMPORT_PATTERNS = [
  /import\s+.*?\s+from\s+['"](.+?)['"]/g,           // ES/TS import
  /require\s*\(\s*['"](.+?)['"]\s*\)/g,              // CJS require
  /from\s+['"](.+?)['"]/g,                           // Python from x import
  /import\s+['"](.+?)['"]/g,                         // Python import x
];

const SYMBOL_PATTERNS: { re: RegExp; kind: CodeSymbol['kind'] }[] = [
  { re: /^(?:export\s+)?(?:async\s+)?function\s+(\w+)/,    kind: 'function' },
  { re: /^(?:export\s+)?class\s+(\w+)/,                    kind: 'class'    },
  { re: /^(?:export\s+)?(?:const|let|var)\s+(\w+)/,        kind: 'const'    },
  { re: /^(?:export\s+)?type\s+(\w+)/,                     kind: 'type'     },
  { re: /^def\s+(\w+)/,                                    kind: 'function' }, // Python
  { re: /^class\s+(\w+)/,                                  kind: 'class'    }, // Python
];

function parseFile(content: string): { symbols: CodeSymbol[]; imports: string[] } {
  const symbols: CodeSymbol[] = [];
  const imports: string[]     = [];

  // Extract imports
  for (const pattern of IMPORT_PATTERNS) {
    let m: RegExpExecArray | null;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((m = re.exec(content)) !== null) {
      const spec = m[1];
      if (spec && !imports.includes(spec)) imports.push(spec);
    }
  }

  // Extract symbols (line by line)
  content.split('\n').forEach((line, i) => {
    const trimmed = line.trim();
    for (const { re, kind } of SYMBOL_PATTERNS) {
      const m = trimmed.match(re);
      if (m?.[1]) {
        symbols.push({ kind, name: m[1], line: i + 1 });
        break;
      }
    }
  });

  return { symbols, imports };
}

function inferNodeType(relPath: string, symbols: CodeSymbol[]): NodeType {
  const lower = relPath.toLowerCase();
  if (lower.includes('test') || lower.includes('spec'))        return 'test';
  if (lower.includes('index') || lower.includes('main') || lower.includes('app.')) return 'entry';
  if (lower.includes('util') || lower.includes('helper') || lower.includes('lib')) return 'util';
  if (symbols.some(s => s.kind === 'class'))  return 'class';
  if (lower.includes('config') || lower.includes('env') || lower.includes('constant')) return 'module';
  if (symbols.some(s => s.kind === 'function')) return 'function';
  return 'module';
}

// ── Engine ────────────────────────────────────────────────────────────────────
export class Engine {
  private nodes: GraphNode[] = [];
  private edges: GraphEdge[] = [];
  private listeners: Array<() => void> = [];
  private stateFile: string | null = null;

  constructor(private readonly ctx: vscode.ExtensionContext) {}

  // ── Lifecycle ────────────────────────────────────────────────────────────────
  async init() {
    this.stateFile = this.resolveStateFile();
    const loaded   = this.loadState();
    if (loaded) {
      this.nodes = loaded.nodes;
      this.edges = loaded.edges;
      await this.resyncAll();   // re-parse files to refresh symbols
    }
    this.emit();
  }

  // ── Sync — parse a single file and update its node ──────────────────────────
  async syncFile(uri: vscode.Uri) {
    const fp  = uri.fsPath;
    const rel = vscode.workspace.asRelativePath(fp);
    let content = '';
    try { content = fs.readFileSync(fp, 'utf8'); } catch { return; }

    const { symbols, imports } = parseFile(content);
    const existing = this.nodes.find(n => n.filePath === fp);

    if (existing) {
      existing.symbols   = symbols;
      existing.imports   = imports;
      existing.lineCount = content.split('\n').length;
      existing.type      = inferNodeType(rel, symbols);
    } else {
      // New file appeared — only auto-add if it was already imported by an existing node
      const isReferenced = this.nodes.some(n =>
        n.imports.some(imp => this.resolveImport(n.filePath, imp) === fp),
      );
      if (!isReferenced) return;  // don't bloat graph with every file
      this.addNodeFromFile(rel, fp, content, symbols, imports);
    }

    this.rebuildEdges();
    this.emit();
    this.saveState();
  }

  onFileDeleted(uri: vscode.Uri) {
    const node = this.nodes.find(n => n.filePath === uri.fsPath);
    if (!node) return;
    node.filePath = '';   // unlink but keep node in graph
    this.rebuildEdges();
    this.emit();
    this.saveState();
  }

  // ── Full workspace scan ───────────────────────────────────────────────────────
  async scanWorkspace(globPattern = '**/*.{ts,tsx,js,jsx,py,rs,go}', limit = 300) {
    const files = await vscode.workspace.findFiles(
      globPattern,
      '{**/node_modules/**,**/.git/**,**/dist/**,**/build/**,**/__pycache__/**}',
      limit,
    );

    // Layout grid
    let col = 0, row = 0;
    const colMax = 5;

    for (const f of files) {
      if (this.nodes.find(n => n.filePath === f.fsPath)) continue;
      const rel = vscode.workspace.asRelativePath(f);
      let content = '';
      try { content = fs.readFileSync(f.fsPath, 'utf8'); } catch { continue; }
      const { symbols, imports } = parseFile(content);
      this.addNodeFromFile(rel, f.fsPath, content, symbols, imports, col++ * 260, row * 200);
      if (col >= colMax) { col = 0; row++; }
    }

    this.rebuildEdges();
    this.emit();
    this.saveState();
    return this.nodes.length;
  }

  // ── Re-parse all already-linked files ────────────────────────────────────────
  private async resyncAll() {
    for (const node of this.nodes) {
      if (!node.filePath || !fs.existsSync(node.filePath)) continue;
      try {
        const content = fs.readFileSync(node.filePath, 'utf8');
        const { symbols, imports } = parseFile(content);
        node.symbols   = symbols;
        node.imports   = imports;
        node.lineCount = content.split('\n').length;
        node.type      = inferNodeType(node.label, symbols);
      } catch {}
    }
    this.rebuildEdges();
  }

  // ── Edge rebuilding from import analysis ─────────────────────────────────────
  private rebuildEdges() {
    // Keep manual edges
    const manual = this.edges.filter(e => e.kind === 'manual');
    const auto:   GraphEdge[] = [];

    for (const srcNode of this.nodes) {
      if (!srcNode.filePath) continue;
      for (const imp of srcNode.imports) {
        const resolvedFp = this.resolveImport(srcNode.filePath, imp);
        if (!resolvedFp) continue;
        const tgtNode = this.nodes.find(n => n.filePath === resolvedFp);
        if (!tgtNode || tgtNode.id === srcNode.id) continue;
        const already = auto.find(e => e.source === srcNode.id && e.target === tgtNode.id)
          || manual.find(e => e.source === srcNode.id && e.target === tgtNode.id);
        if (already) continue;
        auto.push({ id: `auto_${srcNode.id}_${tgtNode.id}`, source: srcNode.id, target: tgtNode.id, kind: 'import' });
      }
    }
    this.edges = [...manual, ...auto];
  }

  // ── Import resolution ─────────────────────────────────────────────────────────
  private resolveImport(fromFile: string, importSpec: string): string | null {
    if (!importSpec.startsWith('.')) return null; // skip node_modules
    const dir  = path.dirname(fromFile);
    const base = path.resolve(dir, importSpec);
    const exts = ['.ts', '.tsx', '.js', '.jsx', '.py', ''];
    for (const ext of exts) {
      const full = base + ext;
      if (fs.existsSync(full)) return full;
    }
    // Try as directory index
    for (const ext of ['.ts', '.js', '.tsx', '.jsx']) {
      const idx = path.join(base, `index${ext}`);
      if (fs.existsSync(idx)) return idx;
    }
    return null;
  }

  // ── CRUD ─────────────────────────────────────────────────────────────────────
  addNodeFromFile(
    rel: string, fp: string, content = '', symbols: CodeSymbol[] = [], imports: string[] = [],
    x?: number, y?: number,
  ): GraphNode {
    const id = `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const existingCount = this.nodes.length;
    const node: GraphNode = {
      id,
      type:      inferNodeType(rel, symbols),
      label:     rel,
      filePath:  fp,
      x:         x ?? (existingCount % 5) * 260 - 520,
      y:         y ?? Math.floor(existingCount / 5) * 200 - 200,
      isMain:    existingCount === 0,
      modified:  false,
      symbols,
      imports,
      lineCount: content ? content.split('\n').length : 0,
    };
    this.nodes.push(node);
    return node;
  }

  addManualNode(label: string, type: NodeType): GraphNode {
    const id = `n_${Date.now()}`;
    const n  = this.nodes.length;
    const node: GraphNode = {
      id, type, label,
      filePath: '', modified: false, isMain: n === 0,
      x: (n % 5) * 260 - 520, y: Math.floor(n / 5) * 200 - 200,
      symbols: [], imports: [], lineCount: 0,
    };
    this.nodes.push(node);
    this.emit(); this.saveState();
    return node;
  }

  deleteNode(id: string) {
    this.nodes = this.nodes.filter(n => n.id !== id);
    this.edges = this.edges.filter(e => e.source !== id && e.target !== id);
    this.emit(); this.saveState();
  }

  addManualEdge(source: string, target: string) {
    if (source === target) return;
    if (this.edges.find(e => e.source === source && e.target === target)) return;
    this.edges.push({ id: `manual_${Date.now()}`, source, target, kind: 'manual' });
    this.emit(); this.saveState();
  }

  removeEdge(id: string) {
    this.edges = this.edges.filter(e => e.id !== id);
    this.emit(); this.saveState();
  }

  moveNode(id: string, x: number, y: number) {
    const n = this.nodes.find(n => n.id === id);
    if (n) { n.x = x; n.y = y; }
    this.saveState(); // no emit — canvas already shows position
  }

  markModified(id: string) {
    const n = this.nodes.find(n => n.id === id);
    if (n) { n.modified = true; this.emit(); }
  }

  markSaved(id: string) {
    const n = this.nodes.find(n => n.id === id);
    if (n) { n.modified = false; this.emit(); }
  }

  updateNodeFile(id: string, fp: string) {
    const n = this.nodes.find(n => n.id === id);
    if (!n) return;
    n.filePath = fp;
    n.label    = vscode.workspace.asRelativePath(fp);
    this.rebuildEdges(); this.emit(); this.saveState();
  }

  // ── Queries ──────────────────────────────────────────────────────────────────
  getNodes()                  { return [...this.nodes]; }
  getEdges()                  { return [...this.edges]; }
  getNode(id: string)         { return this.nodes.find(n => n.id === id); }
  findNodeByFile(fp: string)  { return this.nodes.find(n => n.filePath === fp); }
  getState(): EngineState     { return { nodes: this.nodes, edges: this.edges, version: 2 }; }

  // stats
  get nodeCount()    { return this.nodes.length; }
  get edgeCount()    { return this.edges.length; }
  get modifiedCount(){ return this.nodes.filter(n => n.modified).length; }
  get autoEdgeCount(){ return this.edges.filter(e => e.kind === 'import').length; }

  // ── Persistence ───────────────────────────────────────────────────────────────
  private resolveStateFile(): string | null {
    const cfg  = vscode.workspace.getConfiguration('forbiden');
    const rel  = cfg.get<string>('graphFile') ?? '.forbiden/graph.json';
    const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    return root ? path.join(root, rel) : null;
  }

  private loadState(): EngineState | null {
    // Try workspace file first
    if (this.stateFile && fs.existsSync(this.stateFile)) {
      try { return JSON.parse(fs.readFileSync(this.stateFile, 'utf8')); } catch {}
    }
    // Fall back to extension global state
    return this.ctx.globalState.get<EngineState>('forbiden.graph') ?? null;
  }

  saveState() {
    const state = this.getState();
    if (this.stateFile) {
      try {
        const dir = path.dirname(this.stateFile);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(this.stateFile, JSON.stringify(state, null, 2), 'utf8');
        return;
      } catch (e) { console.error('[Engine] save failed:', e); }
    }
    this.ctx.globalState.update('forbiden.graph', state);
  }

  // ── Events ────────────────────────────────────────────────────────────────────
  onDidChange(fn: () => void) { this.listeners.push(fn); }
  private emit()              { this.listeners.forEach(fn => fn()); }
}
