"use strict";
const electron = require("electron");
const path = require("path");
const fs = require("fs");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const IMPORT_RES = [
  /import\s+.*?\s+from\s+['"](.+?)['"]/g,
  /require\s*\(\s*['"](.+?)['"]\s*\)/g,
  /from\s+['"](.+?)['"]/g
];
const SYMBOL_RES = [
  { re: /^(?:export\s+)?(?:async\s+)?function\s+(\w+)/, kind: "function" },
  { re: /^(?:export\s+)?class\s+(\w+)/, kind: "class" },
  { re: /^(?:export\s+)?(?:const|let|var)\s+(\w+)/, kind: "const" },
  { re: /^(?:export\s+)?type\s+(\w+)/, kind: "type" },
  { re: /^def\s+(\w+)/, kind: "function" },
  { re: /^class\s+(\w+)/, kind: "class" }
];
function parseFile(content) {
  const imports = [];
  const symbols = [];
  for (const pattern of IMPORT_RES) {
    const re = new RegExp(pattern.source, pattern.flags);
    let m;
    while ((m = re.exec(content)) !== null)
      if (m[1] && !imports.includes(m[1])) imports.push(m[1]);
  }
  content.split("\n").forEach((line, i) => {
    for (const { re, kind } of SYMBOL_RES) {
      const m = line.trim().match(re);
      if (m?.[1]) {
        symbols.push({ kind, name: m[1], line: i + 1 });
        break;
      }
    }
  });
  return { imports, symbols };
}
function inferType(rel, symbols) {
  const l = rel.toLowerCase();
  if (l.includes("test") || l.includes("spec")) return "test";
  if (l.includes("index") || l.includes("main") || l.includes("app.")) return "entry";
  if (l.includes("util") || l.includes("helper")) return "util";
  if (symbols.some((s) => s.kind === "class")) return "class";
  if (l.includes("config") || l.includes("env")) return "module";
  if (symbols.some((s) => s.kind === "function")) return "function";
  return "module";
}
class Engine {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.stateFile = "";
  }
  setWorkspace(root) {
    this.stateFile = path__namespace.join(root, ".forbiden", "graph.json");
    const loaded = this.loadState();
    if (loaded) {
      this.nodes = loaded.nodes;
      this.edges = loaded.edges;
      this.resyncAll();
    }
  }
  // ── Workspace scan ──────────────────────────────────────────────────────────
  scanDir(root, pattern = /\.(ts|tsx|js|jsx|py|rs|go)$/) {
    const files = this.walkDir(root, pattern).slice(0, 500);
    let col = 0, row = 0;
    for (const fp of files) {
      if (this.nodes.find((n) => n.filePath === fp)) continue;
      const rel = path__namespace.relative(root, fp);
      const content = this.readSafe(fp);
      const { imports, symbols } = parseFile(content);
      this.nodes.push({
        id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
        type: inferType(rel, symbols),
        label: rel,
        filePath: fp,
        x: col % 6 * 270 - 650,
        y: row * 210 - 300,
        isMain: this.nodes.length === 0,
        modified: false,
        lineCount: content.split("\n").length,
        symbols,
        imports
      });
      col++;
      if (col % 6 === 0) row++;
    }
    this.rebuildEdges();
    this.saveState();
    return files.length;
  }
  syncFile(fp, root) {
    const content = this.readSafe(fp);
    if (!content) return;
    const { imports, symbols } = parseFile(content);
    const existing = this.nodes.find((n) => n.filePath === fp);
    if (existing) {
      existing.imports = imports;
      existing.symbols = symbols;
      existing.lineCount = content.split("\n").length;
      existing.type = inferType(existing.label, symbols);
    }
    this.rebuildEdges();
    this.saveState();
  }
  // ── CRUD ─────────────────────────────────────────────────────────────────────
  addNode(label, type) {
    const n = {
      id: `n_${Date.now()}`,
      type,
      label,
      filePath: "",
      x: this.nodes.length % 6 * 270 - 650,
      y: Math.floor(this.nodes.length / 6) * 210 - 300,
      isMain: this.nodes.length === 0,
      modified: false,
      lineCount: 0,
      symbols: [],
      imports: []
    };
    this.nodes.push(n);
    this.saveState();
    return n;
  }
  deleteNode(id) {
    this.nodes = this.nodes.filter((n) => n.id !== id);
    this.edges = this.edges.filter((e) => e.source !== id && e.target !== id);
    this.saveState();
  }
  moveNode(id, x, y) {
    const n = this.nodes.find((n2) => n2.id === id);
    if (n) {
      n.x = x;
      n.y = y;
    }
    this.saveState();
  }
  addEdge(source, target) {
    if (source === target) return;
    if (this.edges.find((e) => e.source === source && e.target === target)) return;
    this.edges.push({ id: `e_${Date.now()}`, source, target, kind: "manual" });
    this.saveState();
  }
  removeEdge(id) {
    this.edges = this.edges.filter((e) => e.id !== id);
    this.saveState();
  }
  linkFile(id, fp, root) {
    const n = this.nodes.find((n2) => n2.id === id);
    if (!n) return;
    n.filePath = fp;
    n.label = path__namespace.relative(root, fp);
    const content = this.readSafe(fp);
    const { imports, symbols } = parseFile(content);
    n.imports = imports;
    n.symbols = symbols;
    n.lineCount = content.split("\n").length;
    n.type = inferType(n.label, symbols);
    this.rebuildEdges();
    this.saveState();
  }
  markSaved(id) {
    const n = this.nodes.find((n2) => n2.id === id);
    if (n) {
      n.modified = false;
      this.saveState();
    }
  }
  // ── Queries ──────────────────────────────────────────────────────────────────
  getState() {
    return { nodes: this.nodes, edges: this.edges };
  }
  getFileContent(fp) {
    return this.readSafe(fp);
  }
  writeFileContent(fp, content) {
    try {
      fs__namespace.writeFileSync(fp, content, "utf8");
      return true;
    } catch {
      return false;
    }
  }
  // ── Edge auto-build from imports ──────────────────────────────────────────────
  rebuildEdges() {
    const manual = this.edges.filter((e) => e.kind === "manual");
    const auto = [];
    for (const src of this.nodes) {
      if (!src.filePath) continue;
      for (const imp of src.imports) {
        const resolved = this.resolveImport(src.filePath, imp);
        if (!resolved) continue;
        const tgt = this.nodes.find((n) => n.filePath === resolved);
        if (!tgt || tgt.id === src.id) continue;
        if (auto.find((e) => e.source === src.id && e.target === tgt.id)) continue;
        if (manual.find((e) => e.source === src.id && e.target === tgt.id)) continue;
        auto.push({ id: `auto_${src.id}_${tgt.id}`, source: src.id, target: tgt.id, kind: "import" });
      }
    }
    this.edges = [...manual, ...auto];
  }
  resolveImport(fromFile, spec) {
    if (!spec.startsWith(".")) return null;
    const dir = path__namespace.dirname(fromFile);
    const base = path__namespace.resolve(dir, spec);
    for (const ext of [".ts", ".tsx", ".js", ".jsx", ".py", ""]) {
      if (fs__namespace.existsSync(base + ext)) return base + ext;
    }
    for (const ext of [".ts", ".js", ".tsx", ".jsx"]) {
      const idx = path__namespace.join(base, `index${ext}`);
      if (fs__namespace.existsSync(idx)) return idx;
    }
    return null;
  }
  resyncAll() {
    for (const n of this.nodes) {
      if (!n.filePath || !fs__namespace.existsSync(n.filePath)) continue;
      const content = this.readSafe(n.filePath);
      const { imports, symbols } = parseFile(content);
      n.imports = imports;
      n.symbols = symbols;
      n.lineCount = content.split("\n").length;
    }
    this.rebuildEdges();
  }
  walkDir(dir, re, results = []) {
    const SKIP = /* @__PURE__ */ new Set(["node_modules", ".git", "dist", "build", "__pycache__", ".next", "out"]);
    try {
      for (const entry of fs__namespace.readdirSync(dir, { withFileTypes: true })) {
        if (SKIP.has(entry.name)) continue;
        const full = path__namespace.join(dir, entry.name);
        if (entry.isDirectory()) this.walkDir(full, re, results);
        else if (re.test(entry.name)) results.push(full);
      }
    } catch {
    }
    return results;
  }
  readSafe(fp) {
    try {
      return fs__namespace.readFileSync(fp, "utf8");
    } catch {
      return "";
    }
  }
  loadState() {
    try {
      if (fs__namespace.existsSync(this.stateFile))
        return JSON.parse(fs__namespace.readFileSync(this.stateFile, "utf8"));
    } catch {
    }
    return null;
  }
  saveState() {
    if (!this.stateFile) return;
    try {
      const dir = path__namespace.dirname(this.stateFile);
      if (!fs__namespace.existsSync(dir)) fs__namespace.mkdirSync(dir, { recursive: true });
      fs__namespace.writeFileSync(this.stateFile, JSON.stringify(this.getState(), null, 2), "utf8");
    } catch {
    }
  }
}
const engine = new Engine();
let workspace = "";
let win = null;
function createWindow() {
  win = new electron.BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    // custom titlebar
    titleBarStyle: "hidden",
    backgroundColor: "#06060f",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, "../../resources/icon.png"),
    show: false
  });
  win.once("ready-to-show", () => win.show());
  if (process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  createWindow();
  buildMenu();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
function buildMenu() {
  const menu = electron.Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        { label: "Open Folder…", accelerator: "CmdOrCtrl+O", click: () => ipcOpenFolder() },
        { type: "separator" },
        { label: "Scan Workspace", accelerator: "CmdOrCtrl+Shift+S", click: () => win?.webContents.send("menu:scan") },
        { label: "Export Graph JSON", click: () => win?.webContents.send("menu:export") },
        { type: "separator" },
        { label: "Quit", accelerator: "CmdOrCtrl+Q", role: "quit" }
      ]
    },
    {
      label: "View",
      submenu: [
        { label: "Toggle Canvas", accelerator: "CmdOrCtrl+Shift+G", click: () => win?.webContents.send("menu:canvas") },
        { type: "separator" },
        { label: "Reload", role: "reload" },
        { label: "Toggle DevTools", role: "toggleDevTools" },
        { type: "separator" },
        { label: "Zoom In", role: "zoomIn" },
        { label: "Zoom Out", role: "zoomOut" },
        { label: "Reset Zoom", role: "resetZoom" },
        { type: "separator" },
        { label: "Toggle Fullscreen", role: "togglefullscreen" }
      ]
    },
    {
      label: "Graph",
      submenu: [
        { label: "Add Node…", accelerator: "CmdOrCtrl+N", click: () => win?.webContents.send("menu:addNode") },
        { label: "Scan for Files", accelerator: "CmdOrCtrl+Shift+F", click: () => win?.webContents.send("menu:scan") },
        { label: "Reset Layout", click: () => win?.webContents.send("menu:resetLayout") }
      ]
    }
  ]);
  electron.Menu.setApplicationMenu(menu);
}
async function ipcOpenFolder() {
  if (!win) return;
  const result = await electron.dialog.showOpenDialog(win, { properties: ["openDirectory"] });
  if (result.canceled || !result.filePaths[0]) return;
  const folder = result.filePaths[0];
  workspace = folder;
  engine.setWorkspace(folder);
  win.setTitle(`FORBIDEN — ${folder}`);
  win.webContents.send("workspace:opened", { folder, graph: engine.getState() });
}
electron.ipcMain.handle("engine:getState", () => engine.getState());
electron.ipcMain.handle("engine:openFolder", async () => {
  await ipcOpenFolder();
  return { folder: workspace, graph: engine.getState() };
});
electron.ipcMain.handle("engine:scan", () => {
  if (!workspace) return { error: "No workspace open" };
  const count = engine.scanDir(workspace);
  return { count, graph: engine.getState() };
});
electron.ipcMain.handle("engine:addNode", (_e, label, type) => {
  engine.addNode(label, type);
  return engine.getState();
});
electron.ipcMain.handle("engine:deleteNode", (_e, id) => {
  engine.deleteNode(id);
  return engine.getState();
});
electron.ipcMain.handle("engine:moveNode", (_e, id, x, y) => {
  engine.moveNode(id, x, y);
});
electron.ipcMain.handle("engine:addEdge", (_e, source, target) => {
  engine.addEdge(source, target);
  return engine.getState();
});
electron.ipcMain.handle("engine:removeEdge", (_e, id) => {
  engine.removeEdge(id);
  return engine.getState();
});
electron.ipcMain.handle("engine:readFile", (_e, fp) => engine.getFileContent(fp));
electron.ipcMain.handle("engine:writeFile", (_e, fp, content) => {
  const ok = engine.writeFileContent(fp, content);
  if (ok) engine.syncFile(fp, workspace);
  return { ok, graph: engine.getState() };
});
electron.ipcMain.handle("engine:linkFile", (_e, id) => {
  if (!win) return;
  electron.dialog.showOpenDialog(win, { properties: ["openFile"] }).then((r) => {
    if (!r.canceled && r.filePaths[0]) {
      engine.linkFile(id, r.filePaths[0], workspace);
      win.webContents.send("graph:update", engine.getState());
    }
  });
});
electron.ipcMain.handle("engine:openInSystem", (_e, fp) => electron.shell.openPath(fp));
electron.ipcMain.on("win:minimize", () => win?.minimize());
electron.ipcMain.on("win:maximize", () => win?.isMaximized() ? win.unmaximize() : win?.maximize());
electron.ipcMain.on("win:close", () => win?.close());
