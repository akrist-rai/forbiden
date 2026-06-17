// ══════════════════════════════════════════════════════════════
//  FORBIDEN ENGINE  — core language-aware processing
//  Supports: js, ts, py, c, cpp, go
//  Compiled languages (c/cpp/go) execute via Wandbox API
// ══════════════════════════════════════════════════════════════

export type Lang = 'js' | 'ts' | 'py' | 'c' | 'cpp' | 'go' | 'md' | 'unknown'

export interface RunResult {
  logs: Array<{ type: string; val: string; ts: number }>
  error: Error | null
  ms: number
}

export interface ClassInfo {
  name: string
  methods: string[]
  fields: string[]
  extends?: string
  lang: Lang
}

// ── Language Detection ─────────────────────────────────────────
export function detectLang(filename: string): Lang {
  const ext = (filename.split('.').pop() ?? '').toLowerCase()
  const map: Record<string, Lang> = {
    js: 'js', mjs: 'js', cjs: 'js', jsx: 'js',
    ts: 'ts', tsx: 'ts',
    py: 'py', pyw: 'py',
    c: 'c', h: 'c',
    cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp', hxx: 'cpp',
    go: 'go',
    md: 'md', mdx: 'md',
  }
  return map[ext] ?? 'unknown'
}

export function langLabel(lang: Lang): string {
  const m: Record<Lang, string> = {
    js: 'JavaScript', ts: 'TypeScript', py: 'Python',
    c: 'C', cpp: 'C++', go: 'Go', md: 'Markdown', unknown: 'Text',
  }
  return m[lang]
}

export function isCompiled(lang: Lang): boolean {
  return lang === 'c' || lang === 'cpp' || lang === 'go'
}

export function isInterpreted(lang: Lang): boolean {
  return lang === 'js' || lang === 'ts' || lang === 'py'
}

// ── Symbol Extraction ──────────────────────────────────────────
export function extractSymbols(code: string, lang: Lang): string[] {
  const syms: string[] = []

  if (lang === 'js' || lang === 'ts') {
    for (const m of code.matchAll(/^(?:export\s+)?(?:async\s+)?function\s+(\w+)/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^(?:export\s+)?(?:const|let|var)\s+(\w+)\s*[=:]/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^(?:export\s+)?class\s+(\w+)/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^(?:export\s+)?(?:interface|type)\s+(\w+)/gm)) syms.push(m[1])
  }

  if (lang === 'py') {
    for (const m of code.matchAll(/^(?:async\s+)?def\s+([a-zA-Z_]\w*)/gm))
      if (!m[1].startsWith('_')) syms.push(m[1])
    for (const m of code.matchAll(/^class\s+([A-Za-z_]\w*)/gm)) syms.push(m[1])
    // Module-level assignments
    for (const m of code.matchAll(/^([A-Z_][A-Z0-9_]{2,})\s*=/gm)) syms.push(m[1])
  }

  if (lang === 'c' || lang === 'cpp') {
    // Named functions at top level (not static local)
    for (const m of code.matchAll(/^[\w\s\*]+\s+(\w+)\s*\([^;]*\)\s*\{/gm)) {
      const name = m[1]
      if (!['main', 'if', 'for', 'while', 'switch', 'else'].includes(name)) syms.push(name)
    }
    for (const m of code.matchAll(/^(?:struct|class|enum)\s+(\w+)/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^typedef\s+(?:struct|enum)\s*\{[^}]*\}\s*(\w+)/gms)) syms.push(m[1])
  }

  if (lang === 'go') {
    for (const m of code.matchAll(/^func\s+(?:\(\w+\s+\*?\w+\)\s+)?([A-Z]\w*)/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^type\s+([A-Z]\w*)/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^var\s+([A-Z]\w*)/gm)) syms.push(m[1])
    for (const m of code.matchAll(/^const\s+([A-Z]\w*)/gm)) syms.push(m[1])
  }

  return [...new Set(syms)].slice(0, 12)
}

// ── Class Analysis ─────────────────────────────────────────────
export function analyzeClass(code: string, lang: Lang): ClassInfo | null {
  let name = ''
  const methods: string[] = []
  const fields: string[] = []
  let ext: string | undefined

  if (lang === 'js' || lang === 'ts') {
    const cls = /class\s+(\w+)(?:\s+extends\s+(\w+))?/.exec(code)
    if (!cls) return null
    name = cls[1]; ext = cls[2]
    for (const m of code.matchAll(/(?:^\s+(?:async\s+)?(\w+)\s*\(|^\s+(?:get|set)\s+(\w+)\s*\()/gm)) {
      const mn = m[1] || m[2]
      if (mn && !['constructor', 'if', 'for', 'while'].includes(mn)) methods.push(mn)
    }
    for (const m of code.matchAll(/^\s+(?:this\.|#)?(\w+)\s*[=:]/gm)) {
      if (!methods.includes(m[1]) && m[1] !== 'this') fields.push(m[1])
    }
  }

  if (lang === 'py') {
    const cls = /class\s+(\w+)(?:\(([^)]+)\))?/.exec(code)
    if (!cls) return null
    name = cls[1]; ext = cls[2]?.split(',')[0].trim()
    for (const m of code.matchAll(/^\s{4}def\s+(\w+)/gm)) {
      if (!m[1].startsWith('__') || m[1] === '__init__') methods.push(m[1])
    }
    for (const m of code.matchAll(/^\s+self\.(\w+)\s*=/gm)) {
      if (!fields.includes(m[1])) fields.push(m[1])
    }
  }

  if (lang === 'cpp') {
    const cls = /(?:class|struct)\s+(\w+)(?:\s*:\s*(?:public|protected|private)?\s*(\w+))?/.exec(code)
    if (!cls) return null
    name = cls[1]; ext = cls[2]
    for (const m of code.matchAll(/^\s+(?:virtual\s+|static\s+|inline\s+)?[\w\s\*&]+\s+(\w+)\s*\(/gm)) {
      if (!['if', 'for', 'while', 'switch'].includes(m[1])) methods.push(m[1])
    }
    for (const m of code.matchAll(/^\s+(?:int|float|double|bool|char\*?|std::string|auto)\s+(\w+)\s*[=;]/gm)) {
      fields.push(m[1])
    }
  }

  if (lang === 'go') {
    const strct = /type\s+(\w+)\s+struct/.exec(code)
    if (!strct) return null
    name = strct[1]
    for (const m of code.matchAll(/^func\s+\(\w+\s+\*?\w+\)\s+(\w+)/gm)) methods.push(m[1])
    for (const m of code.matchAll(/^\s+(\w+)\s+[\w\[\]]+/gm)) fields.push(m[1])
  }

  if (!name) return null
  return { name, methods: [...new Set(methods)], fields: [...new Set(fields)], extends: ext, lang }
}

// ── Import Generation ──────────────────────────────────────────
export function generateImport(sourceFile: string, targetLang: Lang, symbols: string[]): string | null {
  const base = sourceFile.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9_]/g, '_')
  const originalBase = sourceFile.replace(/\.\w+$/, '')
  const topSyms = symbols.slice(0, 5)

  switch (targetLang) {
    case 'js': case 'ts':
      return topSyms.length
        ? `import { ${topSyms.join(', ')} } from './${sourceFile}'`
        : `import './${sourceFile}'`
    case 'py':
      return topSyms.length
        ? `from ${base} import ${topSyms.join(', ')}`
        : `import ${base}`
    case 'c':
      return `#include "${originalBase}.h"`
    case 'cpp':
      return `#include "${originalBase}.hpp"`
    case 'go':
      return `// import "./${originalBase}"  // add to import block`
    default:
      return `// depends on: ${sourceFile}`
  }
}

// ── Import Injection ───────────────────────────────────────────
export function injectImport(code: string, importLine: string, lang: Lang): string {
  if (code.includes(importLine.replace(/\/\/ /g, ''))) return code
  if (code.includes(importLine)) return code

  const lines = code.split('\n')

  if (lang === 'js' || lang === 'ts') {
    let last = -1
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim()
      if (t.startsWith('import ') || t.startsWith('// import') || t.includes("require(")) last = i
    }
    lines.splice(last + 1, 0, importLine)
  } else if (lang === 'py') {
    let last = -1
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim()
      if (t.startsWith('import ') || t.startsWith('from ')) last = i
    }
    lines.splice(last + 1, 0, importLine)
  } else if (lang === 'c' || lang === 'cpp') {
    let last = -1
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim()
      if (t.startsWith('#include') || t.startsWith('#ifndef') || t.startsWith('#pragma')) last = i
    }
    lines.splice(last + 1, 0, importLine)
  } else {
    lines.unshift(importLine)
  }

  return lines.join('\n')
}

// ── Header Generation (C/C++) ──────────────────────────────────
export function generateHeader(filename: string, code: string, lang: 'c' | 'cpp'): string {
  const base = filename.replace(/\.\w+$/, '')
  const guard = (base.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()) + (lang === 'c' ? '_H' : '_HPP')
  const syms = extractSymbols(code, lang)

  const decls = syms.map(s => {
    const re = new RegExp(`[\\w\\s\\*&]+\\s+${s}\\s*\\([^{;]*\\)`, 'g')
    const m = re.exec(code)
    return m ? m[0].trim().replace(/\{.*/, '') + ';' : `// ${s} (add declaration)`
  }).join('\n')

  return [
    `#ifndef ${guard}`,
    `#define ${guard}`,
    '',
    '#ifdef __cplusplus',
    'extern "C" {',
    '#endif',
    '',
    decls || '// add function declarations here',
    '',
    '#ifdef __cplusplus',
    '}',
    '#endif',
    '',
    `#endif /* ${guard} */`,
    '',
  ].join('\n')
}

// ── Default Code Templates ─────────────────────────────────────
export function getDefaultCode(lang: Lang, label: string, nodeType = 'function'): string {
  const name = label.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9_]/g, '_') || 'module'

  if (lang === 'c') {
    if (nodeType === 'class') {
      return [
        `#include <stdio.h>`,
        `#include <stdlib.h>`,
        ``,
        `typedef struct ${name} {`,
        `    int id;`,
        `    char name[64];`,
        `} ${name};`,
        ``,
        `${name}* ${name}_create(int id, const char* n) {`,
        `    ${name}* self = malloc(sizeof(${name}));`,
        `    self->id = id;`,
        `    snprintf(self->name, 64, "%s", n);`,
        `    return self;`,
        `}`,
        ``,
        `void ${name}_print(const ${name}* self) {`,
        `    printf("${name}[%d]: %s\\n", self->id, self->name);`,
        `}`,
        ``,
        `void ${name}_free(${name}* self) { free(self); }`,
        ``,
        `int main(void) {`,
        `    ${name}* obj = ${name}_create(1, "test");`,
        `    ${name}_print(obj);`,
        `    ${name}_free(obj);`,
        `    return 0;`,
        `}`,
      ].join('\n')
    }
    return [
      `#include <stdio.h>`,
      `#include <stdlib.h>`,
      ``,
      `/* ${name} — functions */`,
      ``,
      `void ${name}_run(void) {`,
      `    printf("${name}: running\\n");`,
      `}`,
      ``,
      `int main(void) {`,
      `    ${name}_run();`,
      `    return 0;`,
      `}`,
    ].join('\n')
  }

  if (lang === 'cpp') {
    if (nodeType === 'class') {
      return [
        `#include <iostream>`,
        `#include <string>`,
        ``,
        `class ${name} {`,
        `public:`,
        `    ${name}(int id, const std::string& name)`,
        `        : id_(id), name_(name) {}`,
        ``,
        `    void print() const {`,
        `        std::cout << "${name}[" << id_ << "]: " << name_ << std::endl;`,
        `    }`,
        ``,
        `    int id() const { return id_; }`,
        `    const std::string& name() const { return name_; }`,
        ``,
        `private:`,
        `    int id_;`,
        `    std::string name_;`,
        `};`,
        ``,
        `int main() {`,
        `    ${name} obj(1, "test");`,
        `    obj.print();`,
        `    return 0;`,
        `}`,
      ].join('\n')
    }
    return [
      `#include <iostream>`,
      `#include <string>`,
      ``,
      `// ${name}`,
      ``,
      `void ${name}_run() {`,
      `    std::cout << "${name}: running" << std::endl;`,
      `}`,
      ``,
      `int main() {`,
      `    ${name}_run();`,
      `    return 0;`,
      `}`,
    ].join('\n')
  }

  if (lang === 'go') {
    if (nodeType === 'class') {
      const cap = name.charAt(0).toUpperCase() + name.slice(1)
      return [
        `package main`,
        ``,
        `import "fmt"`,
        ``,
        `// ${cap} — struct with methods`,
        `type ${cap} struct {`,
        `\tID   int`,
        `\tName string`,
        `}`,
        ``,
        `func New${cap}(id int, name string) *${cap} {`,
        `\treturn &${cap}{ID: id, Name: name}`,
        `}`,
        ``,
        `func (s *${cap}) Print() {`,
        `\tfmt.Printf("${cap}[%d]: %s\\n", s.ID, s.Name)`,
        `}`,
        ``,
        `func (s *${cap}) String() string {`,
        `\treturn fmt.Sprintf("${cap}(%d, %s)", s.ID, s.Name)`,
        `}`,
        ``,
        `func main() {`,
        `\tobj := New${cap}(1, "test")`,
        `\tobj.Print()`,
        `}`,
      ].join('\n')
    }
    return [
      `package main`,
      ``,
      `import "fmt"`,
      ``,
      `func ${name}Run() {`,
      `\tfmt.Println("${name}: running")`,
      `}`,
      ``,
      `func main() {`,
      `\t${name}Run()`,
      `}`,
    ].join('\n')
  }

  return ''
}

// ── Highlight: extra keywords for C/Go ────────────────────────
export const GO_KW = /\b(func|package|import|return|if|else|for|range|switch|case|default|break|continue|var|const|type|struct|interface|map|chan|go|defer|select|fallthrough|nil|true|false|make|new|len|cap|append|copy|delete|close|panic|recover|error|string|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float32|float64|complex64|complex128|bool|byte|rune|any)\b/g

// ── Compiled Language Execution (Wandbox) ─────────────────────
async function wandbox(compiler: string, code: string, options: string): Promise<RunResult> {
  const t0 = performance.now()
  const logs: RunResult['logs'] = []

  try {
    const resp = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compiler, code, options, stdin: '', save: false }),
    })

    if (!resp.ok) throw new Error(`Wandbox HTTP ${resp.status}: ${resp.statusText}`)

    const data: any = await resp.json()
    const compErr: string = data.compiler_error || ''
    const compOut: string = data.compiler_output || ''
    const progOut: string = data.program_output || ''
    const progErr: string = data.program_error || ''

    if (compOut) {
      compOut.split('\n').forEach(l => { if (l.trim()) logs.push({ type: 'info', val: '// ' + l, ts: Date.now() }) })
    }
    if (compErr) {
      compErr.split('\n').forEach(l => { if (l.trim()) logs.push({ type: 'error', val: l, ts: Date.now() }) })
      return { logs, error: new Error(compErr.split('\n')[0]), ms: Math.round(performance.now() - t0) }
    }
    const output = progOut + (progErr ? '\n' + progErr : '')
    output.split('\n').forEach(l => {
      if (l.trim()) logs.push({ type: progErr.includes(l) ? 'warn' : 'log', val: l, ts: Date.now() })
    })
    if (data.status !== undefined) {
      logs.push({ type: 'return', val: `exit code: ${data.status}`, ts: Date.now() })
    }
    return { logs, error: null, ms: Math.round(performance.now() - t0) }
  } catch (e: any) {
    const msg = String(e?.message || e)
    logs.push({ type: 'error', val: `🌐 ${msg}`, ts: Date.now() })
    logs.push({ type: 'info', val: '(Wandbox requires internet — compile.forbiden.io)', ts: Date.now() })
    return { logs, error: e instanceof Error ? e : new Error(msg), ms: Math.round(performance.now() - t0) }
  }
}

export function runC(code: string): Promise<RunResult> {
  return wandbox('gcc-head', code, '-O0 -std=c11 -lm -Wall')
}

export function runCpp(code: string): Promise<RunResult> {
  return wandbox('gcc-head', code, '-O0 -std=c++17 -Wall')
}

export function runGo(code: string): Promise<RunResult> {
  return wandbox('go-head', code, '')
}
