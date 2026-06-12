// src/db/seed.ts — Seed a default workspace for a given userId on first boot
import { db } from './index.ts';
import { workspaces, nodes, edges, groups, boardColumns, boardCards, operatorNotes } from './schema.ts';
import { eq } from 'drizzle-orm';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT } from '../git/manager.ts';

const DEFAULT_WS = 'ws_default';
const now = () => new Date().toISOString();

export async function seedDefaultWorkspace(userId: string) {
  const existing = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, DEFAULT_WS),
  });
  if (existing) return;

  const createdAt = now();

  await db.insert(workspaces).values({
    id: DEFAULT_WS,
    userId,
    name: 'Default Workspace',
    theme: 'cyber',
    avatar: 0,
    gitUser: 'FORBINDEN Operator',
    gitEmail: 'operator@forbinden.local',
    createdAt,
    updatedAt: createdAt,
  });

  const nodeData = [
    {
      id: 'n1', label: 'core_sys.py', filepath: 'core_sys.py',
      type: 'entry', isMain: true, x: 0, y: 0, themeIdx: 0,
      code: 'import sys\n\nprint("Central Architecture Booted")\n\ndef init_sequence():\n    # Core logic entry\n    pass\n\nif __name__ == "__main__":\n    init_sequence()\n',
    },
    {
      id: 'n2', label: 'load_network.py', filepath: 'load_network.py',
      type: 'function', isMain: false, x: 140, y: -130, themeIdx: 5,
      code: 'def load_network(config=None):\n    """Load the neural network from disk."""\n    loader = DataLoader(config)\n    loader.init()\n    return loader\n',
    },
    {
      id: 'n3', label: 'DataMatrix.py', filepath: 'DataMatrix.py',
      type: 'class', isMain: false, x: -100, y: 150, themeIdx: 6,
      code: 'class DataMatrix:\n    """Core data matrix handler."""\n\n    def __init__(self, size=128):\n        self.active = True\n        self.buffer = []\n        self.size = size\n',
    },
    {
      id: 'n4', label: 'preprocess.py', filepath: 'preprocess.py',
      type: 'function', isMain: false, x: 60, y: 180, themeIdx: 4,
      code: 'def preprocess(data):\n    return data\n',
    },
  ];

  await db.insert(nodes).values(
    nodeData.map(n => ({
      id: n.id,
      workspaceId: DEFAULT_WS,
      label: n.label,
      filepath: n.filepath,
      type: n.type,
      isMain: n.isMain,
      x: n.x,
      y: n.y,
      themeIdx: n.themeIdx,
      classId: (n.id === 'n2' || n.id === 'n3') ? 'g1' : null,
      modified: false,
      createdAt,
      updatedAt: createdAt,
    }))
  );

  await db.insert(edges).values([
    { id: 'e1', workspaceId: DEFAULT_WS, source: 'n1', target: 'n2', createdAt },
    { id: 'e2', workspaceId: DEFAULT_WS, source: 'n1', target: 'n3', createdAt },
    { id: 'e3', workspaceId: DEFAULT_WS, source: 'n2', target: 'n4', createdAt },
  ]);

  await db.insert(groups).values({
    id: 'g1', workspaceId: DEFAULT_WS,
    name: 'NetworkLayer', color: '#10b981',
    nodeIds: ['n2', 'n3'], createdAt,
  });

  await db.insert(boardColumns).values([
    { id: 'c1', workspaceId: DEFAULT_WS, title: 'BACKLOG',      color: '#4a4a6a', position: 0 },
    { id: 'c2', workspaceId: DEFAULT_WS, title: 'TO DO',        color: '#4285f4', position: 1 },
    { id: 'c3', workspaceId: DEFAULT_WS, title: 'IN PROGRESS',  color: '#ffc410', position: 2 },
    { id: 'c4', workspaceId: DEFAULT_WS, title: 'REVIEW',       color: '#ff435a', position: 3 },
    { id: 'c5', workspaceId: DEFAULT_WS, title: 'DONE',         color: '#10b981', position: 4 },
  ]);

  await db.insert(boardCards).values([
    { id: 'k1', workspaceId: DEFAULT_WS, colId: 'c3', title: 'Build graph force simulation', priority: 'HIGH', tags: ['core', 'physics'], progress: 70, due: 'Mar 12', assigneeIdx: 0, position: 0, createdAt, updatedAt: createdAt },
    { id: 'k2', workspaceId: DEFAULT_WS, colId: 'c2', title: 'WebSocket sync protocol',      priority: 'HIGH', tags: ['backend', 'net'],   progress: 0,  due: 'Mar 18', assigneeIdx: 1, position: 0, createdAt, updatedAt: createdAt },
    { id: 'k3', workspaceId: DEFAULT_WS, colId: 'c5', title: 'Babel JSX setup',              priority: 'DONE', tags: ['infra'],             progress: 100, due: 'Feb 28', assigneeIdx: 1, position: 0, createdAt, updatedAt: createdAt },
  ]);

  await db.insert(operatorNotes).values({ workspaceId: DEFAULT_WS, content: '', updatedAt: createdAt });

  // Write seed files to disk
  const repoDir = join(REPO_ROOT, DEFAULT_WS);
  mkdirSync(repoDir, { recursive: true });
  for (const n of nodeData) writeFileSync(join(repoDir, n.filepath), n.code, 'utf8');

  console.log('[db] Seeded default workspace');
}
