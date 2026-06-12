/**
 * TemplateService
 *
 * Workspace templates are curated starter graphs that operators can choose
 * when creating a new workspace. A template defines:
 *   - A set of pre-created nodes with labels, languages, and starter code
 *   - Edges between those nodes showing data/dependency flow
 *   - A group structure (if applicable)
 *
 * AVAILABLE TEMPLATES:
 *
 *   blank            — Empty workspace (the default when no template is chosen)
 *   fastapi-service  — FastAPI microservice: router, schema, db, main
 *   react-component  — React component with styles and tests
 *   data-pipeline    — Source → Transform → Sink pipeline
 *   cli-tool         — Python CLI with argparse, commands, utils
 *   rest-client      — HTTP client explorer with base config and endpoints
 *
 * HOW TEMPLATES ARE APPLIED:
 *   POST /api/workspaces { name, templateId? }
 *   → Creates WorkspaceMetadata
 *   → If templateId: calls TemplateService.apply(workspaceId, templateId, operatorId)
 *     → Emits NODE_CREATED events for each node (goes through normal event pipeline)
 *     → Emits NODE_JOINED events for each edge
 *
 * WHY EVENTS AND NOT DIRECT INSERTS:
 *   Templates use EventService.emit() rather than Node.create() directly.
 *   This means template nodes appear in the timeline, are tracked in snapshots,
 *   and are synced to the container — exactly like nodes created by operators.
 *   No special-casing needed anywhere in the system.
 */

import { v7 as uuidv7 } from 'uuid';
import { EventService } from '@/services/event.service';

export interface TemplateNode {
  id:       string;
  label:    string;
  language: string;
  color:    string;
  code:     string;
  position: { x: number; y: number };
  groupId?: string;
}

export interface TemplateEdge {
  sourceId: string;
  targetId: string;
  edgeType: 'dependency' | 'data' | 'reference';
}

export interface TemplateGroup {
  groupId: string;
  name:    string;
  color:   string;
}

export interface WorkspaceTemplate {
  id:          string;
  name:        string;
  description: string;
  language:    string;    // Primary language (displayed in template picker)
  tags:        string[];
  nodes:       TemplateNode[];
  edges:       TemplateEdge[];
  groups:      TemplateGroup[];
}

// ─── Template definitions ─────────────────────────────────────────────────────

const TEMPLATES: WorkspaceTemplate[] = [

  // ── 1. FastAPI Microservice ──────────────────────────────────────────────────
  {
    id: 'fastapi-service',
    name: 'FastAPI Microservice',
    description: 'A production-ready FastAPI service with routing, Pydantic schemas, and a database layer.',
    language: 'python',
    tags: ['python', 'fastapi', 'rest', 'api'],
    nodes: [
      {
        id: 'tpl-main', label: 'main.py', language: 'python', color: 'green',
        position: { x: 400, y: 200 },
        code: `from fastapi import FastAPI
from .router import router
from .db import engine, Base

app = FastAPI(title="My Service", version="0.1.0")
app.include_router(router, prefix="/api")

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
`,
      },
      {
        id: 'tpl-router', label: 'router.py', language: 'python', color: 'blue',
        position: { x: 200, y: 400 },
        code: `from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .db import get_session
from .schema import ItemCreate, ItemRead
from .crud import create_item, get_item

router = APIRouter()

@router.post("/items", response_model=ItemRead, status_code=201)
async def create(body: ItemCreate, db: AsyncSession = Depends(get_session)):
    return await create_item(db, body)

@router.get("/items/{item_id}", response_model=ItemRead)
async def read(item_id: int, db: AsyncSession = Depends(get_session)):
    item = await get_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    return item
`,
      },
      {
        id: 'tpl-schema', label: 'schema.py', language: 'python', color: 'purple',
        position: { x: 600, y: 400 },
        code: `from pydantic import BaseModel, ConfigDict
from datetime import datetime

class ItemBase(BaseModel):
    name: str
    description: str | None = None

class ItemCreate(ItemBase):
    pass

class ItemRead(ItemBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
`,
      },
      {
        id: 'tpl-db', label: 'db.py', language: 'python', color: 'yellow',
        position: { x: 400, y: 600 },
        code: `from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/mydb"

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def get_session():
    async with async_session() as session:
        yield session
`,
      },
    ],
    edges: [
      { sourceId: 'tpl-main',   targetId: 'tpl-router', edgeType: 'dependency' },
      { sourceId: 'tpl-router', targetId: 'tpl-schema', edgeType: 'dependency' },
      { sourceId: 'tpl-router', targetId: 'tpl-db',     edgeType: 'dependency' },
    ],
    groups: [],
  },

  // ── 2. React Component ───────────────────────────────────────────────────────
  {
    id: 'react-component',
    name: 'React Component',
    description: 'A typed React component with a custom hook, CSS module, and test.',
    language: 'typescript',
    tags: ['typescript', 'react', 'component', 'frontend'],
    nodes: [
      {
        id: 'tpl-component', label: 'Button.tsx', language: 'typescript', color: 'blue',
        position: { x: 400, y: 200 },
        code: `import React from 'react';
import { useButton } from './useButton';
import styles from './Button.module.css';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onClick, disabled }) => {
  const { handleClick, isLoading } = useButton(onClick);

  return (
    <button
      className={\`\${styles.button} \${styles[variant]}\`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label={label}
    >
      {isLoading ? 'Loading…' : label}
    </button>
  );
};
`,
      },
      {
        id: 'tpl-hook', label: 'useButton.ts', language: 'typescript', color: 'purple',
        position: { x: 200, y: 400 },
        code: `import { useState, useCallback } from 'react';

export function useButton(onClick?: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (!onClick) return;
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  }, [onClick]);

  return { handleClick, isLoading };
}
`,
      },
      {
        id: 'tpl-styles', label: 'Button.module.css', language: 'css', color: 'green',
        position: { x: 600, y: 400 },
        code: `.button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}
.button:disabled { opacity: 0.5; cursor: not-allowed; }
.primary   { background: #10b981; color: #fff; }
.secondary { background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
.ghost     { background: transparent; color: #10b981; }
`,
      },
      {
        id: 'tpl-test', label: 'Button.test.tsx', language: 'typescript', color: 'red',
        position: { x: 400, y: 600 },
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn().mockResolvedValue(undefined);
    render(<Button label="Go" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables when disabled prop is true', () => {
    render(<Button label="Off" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
`,
      },
    ],
    edges: [
      { sourceId: 'tpl-component', targetId: 'tpl-hook',   edgeType: 'dependency' },
      { sourceId: 'tpl-component', targetId: 'tpl-styles',  edgeType: 'reference' },
      { sourceId: 'tpl-test',      targetId: 'tpl-component', edgeType: 'reference' },
    ],
    groups: [],
  },

  // ── 3. Data Pipeline ─────────────────────────────────────────────────────────
  {
    id: 'data-pipeline',
    name: 'Data Pipeline',
    description: 'A source → transform → sink pipeline with config and runner.',
    language: 'python',
    tags: ['python', 'etl', 'pipeline', 'data'],
    nodes: [
      {
        id: 'tpl-config', label: 'config.py', language: 'python', color: 'yellow',
        position: { x: 400, y: 100 },
        code: `from dataclasses import dataclass

@dataclass
class PipelineConfig:
    source_url:   str = "postgresql://localhost/source"
    sink_url:     str = "postgresql://localhost/sink"
    batch_size:   int = 1000
    max_retries:  int = 3
    dry_run:      bool = False
`,
      },
      {
        id: 'tpl-source', label: 'source.py', language: 'python', color: 'blue',
        position: { x: 200, y: 350 },
        code: `from typing import Iterator
from .config import PipelineConfig
import psycopg2

def read_records(cfg: PipelineConfig) -> Iterator[dict]:
    """Stream records from source in batches."""
    conn = psycopg2.connect(cfg.source_url)
    cur = conn.cursor()
    cur.execute("SELECT * FROM records WHERE processed = FALSE ORDER BY id")
    while batch := cur.fetchmany(cfg.batch_size):
        for row in batch:
            yield {"id": row[0], "data": row[1], "ts": row[2]}
    cur.close()
    conn.close()
`,
      },
      {
        id: 'tpl-transform', label: 'transform.py', language: 'python', color: 'purple',
        position: { x: 400, y: 350 },
        code: `from datetime import datetime, timezone

def transform(record: dict) -> dict | None:
    """Clean, validate, and enrich a single record.
    Returns None to drop the record."""
    if not record.get("data"):
        return None

    return {
        "id":           record["id"],
        "data":         record["data"].strip().lower(),
        "source_ts":    record["ts"],
        "processed_at": datetime.now(timezone.utc),
        "version":      1,
    }
`,
      },
      {
        id: 'tpl-sink', label: 'sink.py', language: 'python', color: 'green',
        position: { x: 600, y: 350 },
        code: `from .config import PipelineConfig
import psycopg2
from psycopg2.extras import execute_values

def write_records(cfg: PipelineConfig, records: list[dict]) -> int:
    """Upsert transformed records into the sink. Returns count written."""
    if cfg.dry_run:
        print(f"[dry-run] Would write {len(records)} records")
        return 0

    conn = psycopg2.connect(cfg.sink_url)
    cur = conn.cursor()
    execute_values(cur,
        "INSERT INTO records (id, data, source_ts, processed_at) VALUES %s "
        "ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data, processed_at=EXCLUDED.processed_at",
        [(r["id"], r["data"], r["source_ts"], r["processed_at"]) for r in records],
    )
    conn.commit()
    written = cur.rowcount
    cur.close()
    conn.close()
    return written
`,
      },
      {
        id: 'tpl-runner', label: 'runner.py', language: 'python', color: 'red',
        position: { x: 400, y: 600 },
        code: `from .config import PipelineConfig
from .source import read_records
from .transform import transform
from .sink import write_records

def run(cfg: PipelineConfig | None = None) -> dict:
    cfg = cfg or PipelineConfig()
    total = errors = written = 0

    batch: list[dict] = []
    for record in read_records(cfg):
        total += 1
        transformed = transform(record)
        if transformed is None:
            errors += 1
            continue
        batch.append(transformed)
        if len(batch) >= cfg.batch_size:
            written += write_records(cfg, batch)
            batch.clear()

    if batch:
        written += write_records(cfg, batch)

    print(f"Pipeline complete: {total} in, {written} written, {errors} dropped")
    return {"total": total, "written": written, "errors": errors}

if __name__ == "__main__":
    run()
`,
      },
    ],
    edges: [
      { sourceId: 'tpl-source',    targetId: 'tpl-config',    edgeType: 'dependency' },
      { sourceId: 'tpl-sink',      targetId: 'tpl-config',    edgeType: 'dependency' },
      { sourceId: 'tpl-runner',    targetId: 'tpl-source',    edgeType: 'data' },
      { sourceId: 'tpl-transform', targetId: 'tpl-runner',    edgeType: 'data' },
      { sourceId: 'tpl-sink',      targetId: 'tpl-transform', edgeType: 'data' },
    ],
    groups: [],
  },

  // ── 4. Python CLI Tool ───────────────────────────────────────────────────────
  {
    id: 'cli-tool',
    name: 'Python CLI Tool',
    description: 'A structured CLI tool with argparse, subcommands, and utilities.',
    language: 'python',
    tags: ['python', 'cli', 'tool'],
    nodes: [
      {
        id: 'tpl-cli', label: '__main__.py', language: 'python', color: 'blue',
        position: { x: 400, y: 200 },
        code: `import argparse, sys
from .commands import cmd_run, cmd_list, cmd_init
from .utils import setup_logging

def main():
    parser = argparse.ArgumentParser(prog="mytool", description="My CLI Tool")
    parser.add_argument("-v", "--verbose", action="store_true")
    sub = parser.add_subparsers(dest="command", required=True)

    p_run = sub.add_parser("run",  help="Execute the main task")
    p_run.add_argument("target", help="What to run")

    sub.add_parser("list",  help="List available targets")
    sub.add_parser("init",  help="Initialise configuration")

    args = parser.parse_args()
    setup_logging(verbose=args.verbose)

    match args.command:
        case "run":  sys.exit(cmd_run(args.target))
        case "list": sys.exit(cmd_list())
        case "init": sys.exit(cmd_init())

if __name__ == "__main__":
    main()
`,
      },
      {
        id: 'tpl-cmds', label: 'commands.py', language: 'python', color: 'purple',
        position: { x: 200, y: 400 },
        code: `from .utils import log

def cmd_run(target: str) -> int:
    log.info(f"Running: {target}")
    # TODO: implement
    return 0

def cmd_list() -> int:
    targets = ["alpha", "beta", "gamma"]
    for t in targets:
        print(f"  {t}")
    return 0

def cmd_init() -> int:
    log.info("Initialising configuration…")
    # TODO: write default config to ~/.mytool/config.toml
    return 0
`,
      },
      {
        id: 'tpl-utils', label: 'utils.py', language: 'python', color: 'green',
        position: { x: 600, y: 400 },
        code: `import logging

log = logging.getLogger("mytool")

def setup_logging(verbose: bool = False):
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(levelname)s  %(message)s",
    )
`,
      },
    ],
    edges: [
      { sourceId: 'tpl-cli',  targetId: 'tpl-cmds',  edgeType: 'dependency' },
      { sourceId: 'tpl-cli',  targetId: 'tpl-utils',  edgeType: 'dependency' },
      { sourceId: 'tpl-cmds', targetId: 'tpl-utils',  edgeType: 'dependency' },
    ],
    groups: [],
  },

  // ── 5. REST Client Explorer ──────────────────────────────────────────────────
  {
    id: 'rest-client',
    name: 'REST Client Explorer',
    description: 'An HTTP client workspace for exploring and testing APIs.',
    language: 'javascript',
    tags: ['javascript', 'http', 'api', 'client'],
    nodes: [
      {
        id: 'tpl-base', label: 'client.js', language: 'javascript', color: 'blue',
        position: { x: 400, y: 200 },
        code: `// Base HTTP client with auth + error handling
const BASE_URL = process.env.API_URL ?? 'http://localhost:8000';
const TOKEN    = process.env.API_TOKEN ?? '';

export async function request(method, path, body) {
  const res = await fetch(\`\${BASE_URL}\${path}\`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(TOKEN ? { 'Authorization': \`Bearer \${TOKEN}\` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) throw new Error(\`\${method} \${path} → \${res.status}\`);
  return res.json();
}

export const get  = (path)       => request('GET',    path);
export const post = (path, body) => request('POST',   path, body);
export const put  = (path, body) => request('PUT',    path, body);
export const del  = (path)       => request('DELETE', path);
`,
      },
      {
        id: 'tpl-endpoints', label: 'endpoints.js', language: 'javascript', color: 'purple',
        position: { x: 200, y: 400 },
        code: `import { get, post, put, del } from './client.js';

// Users
export const getUsers       = ()       => get('/users');
export const getUser        = (id)     => get(\`/users/\${id}\`);
export const createUser     = (body)   => post('/users', body);
export const updateUser     = (id, b)  => put(\`/users/\${id}\`, b);
export const deleteUser     = (id)     => del(\`/users/\${id}\`);

// Items
export const getItems       = ()       => get('/items');
export const getItem        = (id)     => get(\`/items/\${id}\`);
export const createItem     = (body)   => post('/items', body);
`,
      },
      {
        id: 'tpl-run', label: 'run.js', language: 'javascript', color: 'green',
        position: { x: 600, y: 400 },
        code: `import { getUsers, createUser, getItems } from './endpoints.js';

async function main() {
  // List users
  const users = await getUsers();
  console.log('Users:', users);

  // Create a test user
  const newUser = await createUser({ name: 'Atlas', email: 'atlas@example.com' });
  console.log('Created:', newUser);

  // List items
  const items = await getItems();
  console.log('Items:', items);
}

main().catch(console.error);
`,
      },
    ],
    edges: [
      { sourceId: 'tpl-endpoints', targetId: 'tpl-base', edgeType: 'dependency' },
      { sourceId: 'tpl-run',       targetId: 'tpl-endpoints', edgeType: 'dependency' },
    ],
    groups: [],
  },
];

const TEMPLATE_MAP = new Map(TEMPLATES.map(t => [t.id, t]));

// ─── Service ──────────────────────────────────────────────────────────────────

export class TemplateService {
  /** Return all available templates (summary — no node code for listing) */
  static list(): Array<Omit<WorkspaceTemplate, 'nodes'> & { nodeCount: number }> {
    return TEMPLATES.map(({ nodes, ...rest }) => ({
      ...rest,
      nodeCount: nodes.length,
    }));
  }

  /** Get a single template by ID */
  static get(templateId: string): WorkspaceTemplate | null {
    return TEMPLATE_MAP.get(templateId) ?? null;
  }

  /**
   * Apply a template to a workspace by emitting NODE_CREATED and NODE_JOINED events.
   *
   * Nodes are given new IDs (uuidv7) when applied so the same template can be
   * applied to multiple workspaces without ID collisions.
   *
   * Template node IDs are remapped internally to maintain edge relationships.
   */
  static async apply(
    workspaceId: string,
    templateId: string,
    operatorId: string,
    sessionId: string,
  ): Promise<{ nodesCreated: number; edgesCreated: number }> {
    const template = TEMPLATE_MAP.get(templateId);
    if (!template) throw Object.assign(new Error(`Unknown template: ${templateId}`), { status: 400 });

    // Map template node IDs → real uuidv7s
    const idMap = new Map<string, string>();
    for (const n of template.nodes) {
      idMap.set(n.id, uuidv7());
    }

    // Emit NODE_CREATED for each node
    const baseX = 200;
    const baseY = 150;

    for (const node of template.nodes) {
      const nodeId = idMap.get(node.id)!;
      await EventService.emit({
        workspaceId,
        type: 'NODE_CREATED',
        payload: {
          nodeId,
          label:    node.label,
          language: node.language,
          color:    node.color,
          code:     node.code,
          position: {
            x: baseX + node.position.x,
            y: baseY + node.position.y,
          },
          fromTemplate: templateId,
        },
        operatorId,
        sessionId,
      });

      // Also emit NODE_EDITED to populate node.code (NODE_CREATED sets the node, NODE_EDITED sets the code)
      await EventService.emit({
        workspaceId,
        type: 'NODE_EDITED',
        payload: {
          nodeId,
          code:     node.code,
          language: node.language,
        },
        operatorId,
        sessionId,
      });
    }

    // Emit NODE_JOINED for each edge
    for (const edge of template.edges) {
      const sourceId = idMap.get(edge.sourceId);
      const targetId = idMap.get(edge.targetId);
      if (!sourceId || !targetId) continue;

      await EventService.emit({
        workspaceId,
        type: 'NODE_JOINED',
        payload: { sourceId, targetId, edgeType: edge.edgeType },
        operatorId,
        sessionId,
      });
    }

    return {
      nodesCreated: template.nodes.length,
      edgesCreated: template.edges.length,
    };
  }
}
