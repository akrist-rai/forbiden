const fs = require('fs');
const path = require('path');

const MAIN_FILE = path.resolve(__dirname, './server.js');

const state = {
  meta: {
    mainNodeId: 'file:src/server.js',
    updatedAt: new Date().toISOString()
  },
  users: new Map(),
  blocks: new Map(),
  classes: new Map(),
  links: new Map(),
  files: new Map()
};

function nowIso() {
  return new Date().toISOString();
}

function touch() {
  state.meta.updatedAt = nowIso();
}

function uid(prefix) {
  return `${prefix}:${Date.now().toString(36)}:${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeText(v, fallback = '') {
  return typeof v === 'string' ? v.trim() : fallback;
}

function readFileSafe(absPath) {
  try {
    return fs.readFileSync(absPath, 'utf8');
  } catch (_) {
    return '';
  }
}

function toProjectPath(absPath) {
  return path.relative(path.resolve(__dirname, '..'), absPath).replace(/\\/g, '/');
}

function resolveLocalImport(fromFile, requestPath) {
  if (!requestPath.startsWith('.')) return null;

  const base = path.resolve(path.dirname(fromFile), requestPath);
  const attempts = [
    base,
    `${base}.js`,
    path.join(base, 'index.js')
  ];

  for (const candidate of attempts) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function parseLocalDependencies(entryFileAbs) {
  const src = readFileSafe(entryFileAbs);
  if (!src) return [];

  const deps = new Set();
  const requireRe = /require\(\s*['\"]([^'\"]+)['\"]\s*\)/g;
  const importRe = /import\s+[^;]*?from\s+['\"]([^'\"]+)['\"]/g;

  let match;
  while ((match = requireRe.exec(src))) {
    deps.add(match[1]);
  }
  while ((match = importRe.exec(src))) {
    deps.add(match[1]);
  }

  return Array.from(deps)
    .map((dep) => resolveLocalImport(entryFileAbs, dep))
    .filter(Boolean);
}

function refreshMainFileGraph() {
  const mainNodeId = state.meta.mainNodeId;
  const mainFilePath = toProjectPath(MAIN_FILE);

  state.files.clear();
  // Keep only non-main structural links (block/class links are separate in state.links)
  for (const [linkId, link] of state.links.entries()) {
    if (link.kind === 'file-include') state.links.delete(linkId);
  }

  state.files.set(mainNodeId, {
    id: mainNodeId,
    kind: 'file',
    path: mainFilePath,
    label: 'server.js',
    central: true,
    updatedAt: nowIso()
  });

  const deps = parseLocalDependencies(MAIN_FILE);
  for (const depAbs of deps) {
    const depPath = toProjectPath(depAbs);
    const depNodeId = `file:${depPath}`;

    state.files.set(depNodeId, {
      id: depNodeId,
      kind: 'file',
      path: depPath,
      label: path.basename(depPath),
      central: false,
      updatedAt: nowIso()
    });

    const edgeId = `edge:${mainNodeId}->${depNodeId}`;
    state.links.set(edgeId, {
      id: edgeId,
      kind: 'file-include',
      from: mainNodeId,
      to: depNodeId,
      label: 'includes',
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
  }

  touch();
}

function upsertUser(socketId, username) {
  const safeName = normalizeText(username);
  if (!safeName) return null;

  const user = {
    socketId,
    username: safeName,
    updatedAt: nowIso()
  };

  state.users.set(socketId, user);
  touch();
  return user;
}

function removeUser(socketId) {
  const existed = state.users.delete(socketId);
  if (existed) touch();
}

function ensureClassThread(classThreadId, className) {
  const safeId = normalizeText(classThreadId) || uid('class');
  const safeName = normalizeText(className) || safeId;

  if (!state.classes.has(safeId)) {
    state.classes.set(safeId, {
      id: safeId,
      kind: 'class-thread',
      name: safeName,
      blockIds: [],
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
  }

  const entry = state.classes.get(safeId);
  entry.name = safeName;
  entry.updatedAt = nowIso();
  touch();
  return entry;
}

function upsertBlock(payload = {}, actor = 'anonymous') {
  const functionName = normalizeText(payload.functionName || payload.title);
  const filePath = normalizeText(payload.filePath, 'src/server.js');
  if (!functionName) return null;

  const id = normalizeText(payload.id) || uid('block');
  const existing = state.blocks.get(id);

  const next = {
    id,
    kind: 'function-block',
    functionName,
    label: functionName,
    filePath,
    code: typeof payload.code === 'string' ? payload.code : (existing?.code || ''),
    owner: normalizeText(payload.owner || actor, actor),
    classThreadId: normalizeText(payload.classThreadId || existing?.classThreadId),
    createdAt: existing?.createdAt || nowIso(),
    updatedAt: nowIso()
  };

  state.blocks.set(id, next);

  if (next.classThreadId) {
    const cls = ensureClassThread(next.classThreadId, payload.className || next.classThreadId);
    if (!cls.blockIds.includes(id)) cls.blockIds.push(id);
    cls.updatedAt = nowIso();
  }

  touch();
  return next;
}

function deleteBlock(blockId) {
  const id = normalizeText(blockId);
  if (!id || !state.blocks.has(id)) return false;

  state.blocks.delete(id);

  for (const cls of state.classes.values()) {
    cls.blockIds = cls.blockIds.filter((entry) => entry !== id);
    cls.updatedAt = nowIso();
  }

  for (const [linkId, link] of state.links.entries()) {
    if (link.kind === 'function-link' && (link.from === id || link.to === id)) {
      state.links.delete(linkId);
    }
  }

  touch();
  return true;
}

function bindBlocksToClass(payload = {}) {
  const cls = ensureClassThread(payload.classThreadId, payload.className);
  const blockIds = Array.isArray(payload.blockIds) ? payload.blockIds : [];

  for (const blockId of blockIds) {
    const block = state.blocks.get(blockId);
    if (!block) continue;
    block.classThreadId = cls.id;
    block.updatedAt = nowIso();
    if (!cls.blockIds.includes(blockId)) cls.blockIds.push(blockId);
  }

  cls.updatedAt = nowIso();
  touch();
  return cls;
}

function addFunctionLink(payload = {}) {
  const from = normalizeText(payload.from);
  const to = normalizeText(payload.to);
  if (!from || !to) return null;
  if (!state.blocks.has(from) || !state.blocks.has(to)) return null;

  const kind = normalizeText(payload.linkType, 'calls');
  const id = normalizeText(payload.id) || uid('edge');

  const edge = {
    id,
    kind: 'function-link',
    from,
    to,
    label: kind,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };

  state.links.set(id, edge);
  touch();
  return edge;
}

function removeLink(linkId) {
  const id = normalizeText(linkId);
  const link = state.links.get(id);
  if (!link || link.kind !== 'function-link') return false;
  state.links.delete(id);
  touch();
  return true;
}

function getStateSnapshot() {
  return {
    meta: { ...state.meta },
    users: Array.from(state.users.values()),
    files: Array.from(state.files.values()),
    blocks: Array.from(state.blocks.values()),
    classes: Array.from(state.classes.values()),
    links: Array.from(state.links.values())
  };
}

refreshMainFileGraph();

module.exports = {
  refreshMainFileGraph,
  getStateSnapshot,
  upsertUser,
  removeUser,
  upsertBlock,
  deleteBlock,
  addFunctionLink,
  removeLink,
  bindBlocksToClass
};
