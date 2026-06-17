// FORBIDEN Graph Engine — pure, framework-agnostic
// Responsibilities: node/edge state, import auto-detection, code→edge + edge→code sync,
//                  execution, auto-layout, persistence

import { detectLang, extractSymbols, injectImport, runC, runCpp, runGo, type Lang } from '../lib/engine'

// ── Types ──────────────────────────────────────────────────────────────────────
export type NodeType = 'entry' | 'function' | 'class' | 'module' | 'test' | 'util'
export type EdgeKind  = 'import' | 'manual'
export type ExecState = 'idle' | 'running' | 'success' | 'error'

export interface GNode {
  id:         string
  type:       NodeType
  label:      string
  code:       string
  x:          number
  y:          number
  themeIdx:   number
  isMain:     boolean
  modified:   boolean
  execState:  ExecState
  lastOutput: string
  lastError:  string
  symbols:    string[]
}

export interface GEdge {
  id:     string
  source: string
  target: string
  kind:   EdgeKind
}

export interface RunResult {
  logs:  Array<{ type: string; val: string; ts: number }>
  error: Error | null
  ms:    number
}

// ── Constants ──────────────────────────────────────────────────────────────────
export const NODE_COLORS: Record<NodeType, string> = {
  entry:    '#ffd600',
  function: '#00e676',
  class:    '#82aaff',
  module:   '#bb9af7',
  test:     '#ff1744',
  util:     '#00e5ff',
}

export const MANGA_IMAGES = [
  'Guts.jpeg', 'Killua.jpeg', 'Inumaki.jpeg', 'Monster.jpeg', 'Whitebeard.jpeg',
  'Roronoa Zoro.jpeg', 'Reze.jpeg', 'Fire Punch.jpeg', 'PANTHEON.jpeg', 'CHAOS SMILE.jpeg',
  'Choujin X.jpeg', 'Denj - Chainsaw Man_.jpeg', 'Kagurabachi X Bleach.jpeg',
  'Nelliel Brutalism.jpeg', 'God Valley.jpeg', 'Guts And Zodd, DON.jpeg',
]

// ── Import Path Parsing ────────────────────────────────────────────────────────
// Returns a list of base names (no extension, no ./) that this code imports
function parseImportedBases(code: string, lang: Lang): string[] {
  const raw: string[] = []

  if (lang === 'js' || lang === 'ts') {
    // import X from './foo'  /  import { X } from './foo'  /  import './foo'
    for (const m of code.matchAll(/\bimport\b(?:\s+type\b)?(?:[^'"]*?from\s*)?['"]([^'"]+)['"]/gm))
      raw.push(m[1])
    // require('./foo')
    for (const m of code.matchAll(/require\s*\(\s*['"]([^'"]+)['"]\s*\)/gm))
      raw.push(m[1])
  }

  if (lang === 'py') {
    // from foo import X
    for (const m of code.matchAll(/^from\s+([\w.]+)\s+import/gm))
      raw.push(m[1].split('.')[0])
    // import foo
    for (const m of code.matchAll(/^import\s+([\w.]+)/gm))
      raw.push(m[1].split('.')[0])
  }

  if (lang === 'c' || lang === 'cpp') {
    // #include "foo.h"
    for (const m of code.matchAll(/#include\s+"([^"]+)"/gm))
      raw.push(m[1])
  }

  if (lang === 'go') {
    // import "pkg/foo"
    for (const m of code.matchAll(/import\s+"([^"]+)"/gm)) {
      const parts = m[1].split('/')
      raw.push(parts[parts.length - 1])
    }
    // import block
    for (const m of code.matchAll(/^\s+"([^"]+)"/gm)) {
      const parts = m[1].split('/')
      raw.push(parts[parts.length - 1])
    }
  }

  return raw.map(p =>
    p.replace(/^\.\.?\//, '')   // strip leading ./ or ../
     .replace(/\.\w+$/, '')     // strip extension
  ).filter(Boolean)
}

// ── Auto Edge Detection ────────────────────────────────────────────────────────
// Compares imports in `changed` node against all nodes, returns NEW edges to create
export function detectAutoEdges(
  nodes:    GNode[],
  changed:  GNode,
  existing: GEdge[],
): GEdge[] {
  const lang  = detectLang(changed.label)
  const bases = parseImportedBases(changed.code, lang)
  const result: GEdge[] = []

  for (const base of bases) {
    const target = nodes.find(n => {
      if (n.id === changed.id) return false
      const nBase = n.label.replace(/\.\w+$/, '')
      return nBase === base || n.label === base
    })
    if (!target) continue
    if (existing.some(e => e.source === changed.id && e.target === target.id)) continue

    result.push({
      id:     `auto_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      source: changed.id,
      target: target.id,
      kind:   'import',
    })
  }

  return result
}

// Remove auto-edges from a node that no longer match its imports
export function pruneStaleAutoEdges(
  nodes:    GNode[],
  changed:  GNode,
  existing: GEdge[],
): GEdge[] {
  const lang  = detectLang(changed.label)
  const bases = new Set(parseImportedBases(changed.code, lang))

  return existing.filter(e => {
    if (e.source !== changed.id || e.kind !== 'import') return true
    const target = nodes.find(n => n.id === e.target)
    if (!target) return false
    const tBase = target.label.replace(/\.\w+$/, '')
    return bases.has(tBase) || bases.has(target.label)
  })
}

// ── Edge → Import Injection ────────────────────────────────────────────────────
// When user manually draws an edge, generates + injects the import into source code
export function applyEdgeToCode(source: GNode, target: GNode): string {
  const lang    = detectLang(source.label)
  const tBase   = target.label.replace(/\.\w+$/, '')
  const safeB   = tBase.replace(/[^a-zA-Z0-9_]/g, '_')
  const syms    = target.symbols.slice(0, 4)

  let importLine: string | null = null

  if (lang === 'js' || lang === 'ts')
    importLine = syms.length
      ? `import { ${syms.join(', ')} } from './${target.label}'`
      : `import './${target.label}'`
  else if (lang === 'py')
    importLine = syms.length
      ? `from ${safeB} import ${syms.join(', ')}`
      : `import ${safeB}`
  else if (lang === 'c')
    importLine = `#include "${tBase}.h"`
  else if (lang === 'cpp')
    importLine = `#include "${tBase}.hpp"`

  if (!importLine) return source.code
  return injectImport(source.code, importLine, lang)
}

// ── JS Execution (browser eval) ────────────────────────────────────────────────
export async function runJS(code: string): Promise<RunResult> {
  const t0   = performance.now()
  const logs: RunResult['logs'] = []
  const orig = {
    log:   console.log,
    error: console.error,
    warn:  console.warn,
    info:  console.info,
  }

  try {
    console.log   = (...a) => logs.push({ type: 'log',   val: a.map(String).join(' '), ts: Date.now() })
    console.error = (...a) => logs.push({ type: 'error', val: a.map(String).join(' '), ts: Date.now() })
    console.warn  = (...a) => logs.push({ type: 'warn',  val: a.map(String).join(' '), ts: Date.now() })
    console.info  = (...a) => logs.push({ type: 'info',  val: a.map(String).join(' '), ts: Date.now() })

    // Light TS stripping: just enough for demo code
    const jsCode = code
      .replace(/^import\s+type\b.*$/gm, '')
      .replace(/^export\s+type\b.*$/gm, '')
      .replace(/^(?:export\s+)?interface\s+\w[\s\S]*?^}/gm, '')
      .replace(/:\s*\w[\w<>, |&[\]]*(?=\s*[=,;)\n{])/g, '')
      .replace(/^export\s+/gm, '')

    // eslint-disable-next-line no-new-func
    const ret = new Function(jsCode)()
    if (ret !== undefined)
      logs.push({ type: 'return', val: String(ret), ts: Date.now() })

    return { logs, error: null, ms: Math.round(performance.now() - t0) }
  } catch (e: any) {
    logs.push({ type: 'error', val: String(e?.message ?? e), ts: Date.now() })
    return { logs, error: e instanceof Error ? e : new Error(String(e)), ms: Math.round(performance.now() - t0) }
  } finally {
    Object.assign(console, orig)
  }
}

// ── Python Execution (Wandbox) ─────────────────────────────────────────────────
export async function runPy(code: string): Promise<RunResult> {
  const t0   = performance.now()
  const logs: RunResult['logs'] = []

  try {
    const resp = await fetch('https://wandbox.org/api/compile.json', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ compiler: 'cpython-3.12.0', code, options: '', stdin: '', save: false }),
    })
    if (!resp.ok) throw new Error(`Wandbox HTTP ${resp.status}`)

    const data: any = await resp.json()
    const out   = (data.program_output ?? '') + (data.program_error ? '\n' + data.program_error : '')
    const err   = data.compiler_error ?? ''

    if (err) {
      err.split('\n').filter(Boolean).forEach((l: string) =>
        logs.push({ type: 'error', val: l, ts: Date.now() })
      )
      return { logs, error: new Error(err.split('\n')[0]), ms: Math.round(performance.now() - t0) }
    }
    out.split('\n').filter(Boolean).forEach((l: string) =>
      logs.push({ type: 'log', val: l, ts: Date.now() })
    )
    if (data.status !== undefined)
      logs.push({ type: 'return', val: `exit ${data.status}`, ts: Date.now() })

    return { logs, error: null, ms: Math.round(performance.now() - t0) }
  } catch (e: any) {
    const msg = String(e?.message ?? e)
    logs.push({ type: 'error', val: `🌐 ${msg}`, ts: Date.now() })
    logs.push({ type: 'info',  val: '(requires internet — uses Wandbox API)', ts: Date.now() })
    return { logs, error: e instanceof Error ? e : new Error(msg), ms: Math.round(performance.now() - t0) }
  }
}

// ── Unified Runner ─────────────────────────────────────────────────────────────
export async function runNode(node: GNode): Promise<RunResult> {
  const lang = detectLang(node.label)
  switch (lang) {
    case 'js': case 'ts': return runJS(node.code)
    case 'py':             return runPy(node.code)
    case 'c':              return runC(node.code)
    case 'cpp':            return runCpp(node.code)
    case 'go':             return runGo(node.code)
    default:
      return {
        logs:  [{ type: 'info', val: `No runner for .${lang} files`, ts: Date.now() }],
        error: null,
        ms:    0,
      }
  }
}

// ── Sync symbols after code change ────────────────────────────────────────────
export function refreshSymbols(node: GNode): GNode {
  const lang = detectLang(node.label)
  return { ...node, symbols: extractSymbols(node.code, lang) }
}

// ── Auto-layout (hierarchical / Sugiyama-lite) ─────────────────────────────────
export function autoLayout(nodes: GNode[], edges: GEdge[]): GNode[] {
  if (nodes.length === 0) return nodes

  const CARD_W = 240, CARD_H = 165, GAP_X = 80, GAP_Y = 50

  // Topological levels via Kahn's
  const inDeg = new Map<string, number>()
  const adj   = new Map<string, string[]>()
  for (const n of nodes)  { inDeg.set(n.id, 0); adj.set(n.id, []) }
  for (const e of edges)  {
    adj.get(e.source)?.push(e.target)
    inDeg.set(e.target, (inDeg.get(e.target) ?? 0) + 1)
  }

  const level = new Map<string, number>()
  const queue = nodes.filter(n => (inDeg.get(n.id) ?? 0) === 0).map(n => n.id)
  for (const id of queue) level.set(id, 0)

  while (queue.length) {
    const id  = queue.shift()!
    const lvl = level.get(id) ?? 0
    for (const nxt of (adj.get(id) ?? [])) {
      level.set(nxt, Math.max(level.get(nxt) ?? 0, lvl + 1))
      inDeg.set(nxt, (inDeg.get(nxt) ?? 0) - 1)
      if ((inDeg.get(nxt) ?? 0) <= 0) queue.push(nxt)
    }
  }

  // Nodes not in DAG (cycles) get level 0
  for (const n of nodes) if (!level.has(n.id)) level.set(n.id, 0)

  // Group by column
  const cols = new Map<number, string[]>()
  for (const [id, lvl] of level)
    cols.set(lvl, [...(cols.get(lvl) ?? []), id])

  const pos = new Map<string, { x: number; y: number }>()
  for (const [col, ids] of cols) {
    const total = ids.length
    ids.forEach((id, i) => pos.set(id, {
      x: col * (CARD_W + GAP_X),
      y: (i - (total - 1) / 2) * (CARD_H + GAP_Y),
    }))
  }

  return nodes.map(n => ({ ...n, ...(pos.get(n.id) ?? {}) }))
}

// ── Persistence ────────────────────────────────────────────────────────────────
const STORE_KEY = 'forbiden_graph_v3'

export function persistGraph(nodes: GNode[], edges: GEdge[]): void {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ nodes, edges })) } catch {}
}

export function hydrateGraph(): { nodes: GNode[]; edges: GEdge[] } | null {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Migrate: add fields that may not exist in old data
    const nodes = (parsed.nodes ?? []).map((n: any) => ({
      execState: 'idle', lastOutput: '', lastError: '', symbols: [],
      ...n,
    }))
    return { nodes, edges: parsed.edges ?? [] }
  } catch { return null }
}

export function clearGraph(): void {
  try { localStorage.removeItem(STORE_KEY) } catch {}
}

// Re-export compiled runners so IDE can import everything from one place
export { runC, runCpp, runGo }
