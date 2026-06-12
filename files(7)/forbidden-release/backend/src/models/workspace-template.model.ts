/**
 * Workspace Template Model
 *
 * Curated starter graphs that operators can choose when creating a new workspace.
 * A template defines a complete set of nodes, their code content, and the edges
 * between them — everything needed to give a new workspace a meaningful starting point.
 *
 * BUILT-IN TEMPLATES:
 *   Seeded on server startup (idempotent, like built-in themes).
 *   templateId prefix: 'builtin-*'
 *
 * CUSTOM TEMPLATES:
 *   Teams can save their own workspace structure as a template.
 *   templateId prefix: 'team-*'
 *   Scoped to a teamId — only visible to team members.
 *
 * APPLYING A TEMPLATE:
 *   POST /api/workspaces with body { templateId } creates the workspace AND
 *   runs through the template's nodes, creating each one via EventService.emit().
 *   This means the full event history is correct from the start — the workspace
 *   was built through events, not injected directly into the nodes collection.
 *
 * TEMPLATE NODE STRUCTURE:
 *   Each template node has placeholder content — the language, label, and code
 *   that make sense for that pattern (e.g. a FastAPI route file with basic CRUD).
 *   Position is encoded as a grid layout hint: { col, row } where each unit is
 *   200px. Edges reference nodes by their templateNodeId (local ID within the
 *   template), which is resolved to actual nodeIds on apply.
 */

import { Schema, model, type Document } from 'mongoose';

export interface ITemplateNode {
  templateNodeId: string;   // Local ID within template (e.g. "route", "schema", "db")
  label:          string;
  code:           string;
  language:       string;
  noteContent:    string;
  color:          string;
  position:       { x: number; y: number };
  edges: Array<{
    targetTemplateNodeId: string;
    edgeType: 'default' | 'dependency' | 'data' | 'reference';
  }>;
}

export interface IWorkspaceTemplate extends Document {
  templateId:  string;
  name:        string;
  description: string;
  /** Brief one-liner shown in the "New workspace" dialog */
  tagline:     string;
  /** Emoji or icon name for display */
  icon:        string;
  /** Tags for filtering: "python", "fastapi", "react", "data", etc. */
  tags:        string[];
  nodes:       ITemplateNode[];
  builtIn:     boolean;
  teamId:      string | null;  // null for built-ins
  createdBy?:  string;
  createdAt:   Date;
  updatedAt:   Date;
}

const TemplateNodeSchema = new Schema<ITemplateNode>(
  {
    templateNodeId: { type: String, required: true },
    label:          { type: String, required: true },
    code:           { type: String, default: '' },
    language:       { type: String, default: 'python' },
    noteContent:    { type: String, default: '' },
    color:          { type: String, default: 'default' },
    position:       { x: Number, y: Number },
    edges: [{
      targetTemplateNodeId: String,
      edgeType: { type: String, enum: ['default', 'dependency', 'data', 'reference'] },
      _id: false,
    }],
  },
  { _id: false }
);

const WorkspaceTemplateSchema = new Schema<IWorkspaceTemplate>(
  {
    templateId:  { type: String, required: true, unique: true },
    name:        { type: String, required: true },
    description: { type: String, required: true },
    tagline:     { type: String, required: true },
    icon:        { type: String, default: '⊕' },
    tags:        { type: [String], default: [] },
    nodes:       { type: [TemplateNodeSchema], default: [] },
    builtIn:     { type: Boolean, default: false },
    teamId:      { type: String, default: null, index: true },
    createdBy:   String,
  },
  { timestamps: true }
);

WorkspaceTemplateSchema.index({ builtIn: 1 });
WorkspaceTemplateSchema.index({ tags: 1 });

export const WorkspaceTemplate = model<IWorkspaceTemplate>('WorkspaceTemplate', WorkspaceTemplateSchema);

// ─── Built-in template definitions ───────────────────────────────────────────

export const BUILTIN_TEMPLATES: Array<Omit<IWorkspaceTemplate, keyof Document | 'createdAt' | 'updatedAt'>> = [
  {
    templateId:  'builtin-blank',
    name:        'Blank Workspace',
    description: 'An empty canvas. Start from scratch with no predefined structure.',
    tagline:     'Start from scratch',
    icon:        '◻',
    tags:        [],
    builtIn:     true,
    teamId:      null,
    nodes:       [],
  },
  {
    templateId:  'builtin-fastapi',
    name:        'FastAPI Service',
    description: 'A Python FastAPI microservice with separate nodes for routes, schemas, database, and configuration.',
    tagline:     'Python API with Pydantic and SQLAlchemy',
    icon:        '⚡',
    tags:        ['python', 'fastapi', 'api', 'backend'],
    builtIn:     true,
    teamId:      null,
    nodes: [
      {
        templateNodeId: 'main',
        label: 'main.py',
        language: 'python',
        color: 'emerald',
        position: { x: 400, y: 100 },
        noteContent: 'FastAPI application entry point. Mounts all routers and configures middleware.',
        code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(title="Service", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`,
        edges: [
          { targetTemplateNodeId: 'routes', edgeType: 'dependency' },
        ],
      },
      {
        templateNodeId: 'routes',
        label: 'routes.py',
        language: 'python',
        color: 'blue',
        position: { x: 200, y: 300 },
        noteContent: 'Route handlers. Each endpoint validates input via Pydantic schemas and delegates to service functions.',
        code: `from fastapi import APIRouter, HTTPException, Depends
from schemas import ItemCreate, ItemResponse
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/items", response_model=list[ItemResponse])
async def list_items(db: Session = Depends(get_db)):
    return db.query(Item).all()

@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
`,
        edges: [
          { targetTemplateNodeId: 'schemas', edgeType: 'dependency' },
          { targetTemplateNodeId: 'database', edgeType: 'dependency' },
        ],
      },
      {
        templateNodeId: 'schemas',
        label: 'schemas.py',
        language: 'python',
        color: 'purple',
        position: { x: 0, y: 300 },
        noteContent: 'Pydantic models for request validation and response serialization.',
        code: `from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ItemBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    price: float = Field(..., gt=0)

class ItemCreate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
`,
        edges: [],
      },
      {
        templateNodeId: 'database',
        label: 'database.py',
        language: 'python',
        color: 'amber',
        position: { x: 400, y: 500 },
        noteContent: 'SQLAlchemy session factory and ORM models. Uses SQLite for local development.',
        code: `from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
`,
        edges: [],
      },
      {
        templateNodeId: 'config',
        label: 'config.py',
        language: 'python',
        color: 'default',
        position: { x: 600, y: 300 },
        noteContent: 'Environment-based configuration using pydantic-settings.',
        code: `from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Service"
    database_url: str = "sqlite:///./dev.db"
    secret_key: str = "change-me-in-production"
    debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
`,
        edges: [],
      },
    ],
  },
  {
    templateId:  'builtin-react-component',
    name:        'React Component',
    description: 'A React functional component with its TypeScript types, CSS module, custom hook, and unit test pre-wired.',
    tagline:     'TypeScript component with hook, styles, and test',
    icon:        '⚛',
    tags:        ['react', 'typescript', 'frontend', 'component'],
    builtIn:     true,
    teamId:      null,
    nodes: [
      {
        templateNodeId: 'component',
        label: 'Component.tsx',
        language: 'typescript',
        color: 'blue',
        position: { x: 400, y: 100 },
        noteContent: 'Main component file. Import types from types.ts and the hook from useComponent.ts.',
        code: `import React from 'react';
import type { ComponentProps } from './types';
import { useComponent } from './useComponent';
import styles from './Component.module.css';

export function Component({ title, onAction }: ComponentProps) {
  const { state, handleClick } = useComponent({ onAction });

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.status}>
        Count: {state.count}
      </p>
      <button
        className={styles.button}
        onClick={handleClick}
        aria-label="Increment counter"
      >
        Click me
      </button>
    </div>
  );
}

export default Component;
`,
        edges: [
          { targetTemplateNodeId: 'types', edgeType: 'dependency' },
          { targetTemplateNodeId: 'hook', edgeType: 'dependency' },
          { targetTemplateNodeId: 'styles', edgeType: 'dependency' },
        ],
      },
      {
        templateNodeId: 'types',
        label: 'types.ts',
        language: 'typescript',
        color: 'purple',
        position: { x: 100, y: 300 },
        noteContent: 'TypeScript interfaces and types for the component.',
        code: `export interface ComponentProps {
  /** Display title shown in the component header */
  title: string;
  /** Called when the user performs the primary action */
  onAction?: (count: number) => void;
}

export interface ComponentState {
  count: number;
  isLoading: boolean;
  error: string | null;
}
`,
        edges: [],
      },
      {
        templateNodeId: 'hook',
        label: 'useComponent.ts',
        language: 'typescript',
        color: 'emerald',
        position: { x: 400, y: 300 },
        noteContent: 'Custom hook that encapsulates all component logic and state. The component itself stays presentational.',
        code: `import { useState, useCallback } from 'react';
import type { ComponentState, ComponentProps } from './types';

interface UseComponentOptions {
  onAction?: ComponentProps['onAction'];
}

interface UseComponentResult {
  state: ComponentState;
  handleClick: () => void;
}

export function useComponent({ onAction }: UseComponentOptions): UseComponentResult {
  const [state, setState] = useState<ComponentState>({
    count: 0,
    isLoading: false,
    error: null,
  });

  const handleClick = useCallback(() => {
    setState(prev => {
      const next = { ...prev, count: prev.count + 1 };
      onAction?.(next.count);
      return next;
    });
  }, [onAction]);

  return { state, handleClick };
}
`,
        edges: [
          { targetTemplateNodeId: 'types', edgeType: 'dependency' },
        ],
      },
      {
        templateNodeId: 'styles',
        label: 'Component.module.css',
        language: 'css',
        color: 'amber',
        position: { x: 700, y: 300 },
        noteContent: 'CSS module. All class names are locally scoped.',
        code: `.root {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
}

.title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.status {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: var(--accent);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 150ms;
}

.button:hover { opacity: 0.85; }
.button:active { opacity: 0.70; }
`,
        edges: [],
      },
      {
        templateNodeId: 'test',
        label: 'Component.test.tsx',
        language: 'typescript',
        color: 'red',
        position: { x: 400, y: 500 },
        noteContent: 'Unit tests using Vitest and React Testing Library.',
        code: `import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders the title', () => {
    render(<Component title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('starts with count zero', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments count on click', () => {
    render(<Component title="Test" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('calls onAction with the new count', () => {
    const onAction = vi.fn();
    render(<Component title="Test" onAction={onAction} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalledWith(1);
  });
});
`,
        edges: [
          { targetTemplateNodeId: 'component', edgeType: 'dependency' },
        ],
      },
    ],
  },
  {
    templateId:  'builtin-data-pipeline',
    name:        'Data Pipeline',
    description: 'A Python data processing pipeline with source ingestion, transformation, validation, and sink output nodes.',
    tagline:     'Extract → Transform → Validate → Load',
    icon:        '⇢',
    tags:        ['python', 'data', 'etl', 'pipeline'],
    builtIn:     true,
    teamId:      null,
    nodes: [
      {
        templateNodeId: 'source',
        label: 'source.py',
        language: 'python',
        color: 'blue',
        position: { x: 100, y: 200 },
        noteContent: 'Data ingestion. Reads from CSV, API, database, or file system. Yields raw records.',
        code: `import csv
import httpx
from typing import Generator, Any

def from_csv(path: str) -> Generator[dict, None, None]:
    """Read records from a CSV file."""
    with open(path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield dict(row)

def from_api(url: str, params: dict | None = None) -> Generator[dict, None, None]:
    """Fetch records from a paginated REST API."""
    page = 1
    while True:
        response = httpx.get(url, params={**(params or {}), 'page': page})
        response.raise_for_status()
        data = response.json()
        records = data.get('results', data if isinstance(data, list) else [])
        if not records:
            break
        yield from records
        if not data.get('next'):
            break
        page += 1
`,
        edges: [
          { targetTemplateNodeId: 'transform', edgeType: 'data' },
        ],
      },
      {
        templateNodeId: 'transform',
        label: 'transform.py',
        language: 'python',
        color: 'emerald',
        position: { x: 300, y: 200 },
        noteContent: 'Pure transformation functions. Each function takes a raw record and returns a transformed record.',
        code: `from datetime import datetime
from typing import Any

def normalize_record(raw: dict) -> dict:
    """Normalize field names and types."""
    return {
        'id':         str(raw.get('id', '')),
        'name':       str(raw.get('name', '')).strip(),
        'value':      float(raw.get('value', 0) or 0),
        'created_at': parse_date(raw.get('created_at') or raw.get('date')),
        'source':     raw.get('_source', 'unknown'),
    }

def parse_date(value: Any) -> datetime | None:
    if not value:
        return None
    if isinstance(value, datetime):
        return value
    for fmt in ('%Y-%m-%dT%H:%M:%S', '%Y-%m-%d', '%d/%m/%Y'):
        try:
            return datetime.strptime(str(value), fmt)
        except ValueError:
            continue
    return None

def enrich(record: dict, lookup: dict) -> dict:
    """Add derived fields from a lookup table."""
    return { **record, 'category': lookup.get(record['id'], 'uncategorised') }
`,
        edges: [
          { targetTemplateNodeId: 'validate', edgeType: 'data' },
        ],
      },
      {
        templateNodeId: 'validate',
        label: 'validate.py',
        language: 'python',
        color: 'amber',
        position: { x: 500, y: 200 },
        noteContent: 'Schema validation. Invalid records are routed to a dead-letter queue rather than stopping the pipeline.',
        code: `from dataclasses import dataclass
from typing import Any

@dataclass
class ValidationResult:
    valid: bool
    record: dict
    errors: list[str]

def validate_record(record: dict) -> ValidationResult:
    errors = []

    if not record.get('id'):
        errors.append('Missing required field: id')
    if not record.get('name'):
        errors.append('Missing required field: name')
    if record.get('value') is not None and record['value'] < 0:
        errors.append(f"Invalid value: {record['value']} (must be >= 0)")

    return ValidationResult(
        valid=len(errors) == 0,
        record=record,
        errors=errors,
    )

def run_validation(records):
    """Split records into valid and invalid streams."""
    valid, invalid = [], []
    for record in records:
        result = validate_record(record)
        (valid if result.valid else invalid).append(result)
    return valid, invalid
`,
        edges: [
          { targetTemplateNodeId: 'sink', edgeType: 'data' },
        ],
      },
      {
        templateNodeId: 'sink',
        label: 'sink.py',
        language: 'python',
        color: 'purple',
        position: { x: 700, y: 200 },
        noteContent: 'Output writers. Writes valid records to the destination (database, file, API).',
        code: `import json
import csv
from pathlib import Path

def to_jsonl(records: list[dict], path: str) -> int:
    """Write records as newline-delimited JSON. Returns count written."""
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w') as f:
        for record in records:
            f.write(json.dumps(record, default=str) + '\\n')
    return len(records)

def to_csv(records: list[dict], path: str) -> int:
    """Write records as CSV. Returns count written."""
    if not records:
        return 0
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=records[0].keys())
        writer.writeheader()
        writer.writerows(records)
    return len(records)
`,
        edges: [],
      },
      {
        templateNodeId: 'runner',
        label: 'run_pipeline.py',
        language: 'python',
        color: 'red',
        position: { x: 400, y: 400 },
        noteContent: 'Pipeline orchestrator. Wires source → transform → validate → sink with logging.',
        code: `import logging
from source import from_csv
from transform import normalize_record, enrich
from validate import run_validation
from sink import to_jsonl

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
log = logging.getLogger(__name__)

def run(input_path: str, output_path: str, dead_letter_path: str) -> dict:
    log.info(f'Starting pipeline: {input_path} → {output_path}')

    # Extract
    raw_records = list(from_csv(input_path))
    log.info(f'Read {len(raw_records)} raw records')

    # Transform
    transformed = [normalize_record(r) for r in raw_records]

    # Validate
    valid_results, invalid_results = run_validation(transformed)
    log.info(f'Validation: {len(valid_results)} valid, {len(invalid_results)} invalid')

    # Load
    valid_records = [r.record for r in valid_results]
    invalid_records = [{'errors': r.errors, **r.record} for r in invalid_results]

    written = to_jsonl(valid_records, output_path)
    dead = to_jsonl(invalid_records, dead_letter_path) if invalid_records else 0

    summary = { 'read': len(raw_records), 'written': written, 'dead_letter': dead }
    log.info(f'Pipeline complete: {summary}')
    return summary

if __name__ == '__main__':
    run('data/input.csv', 'data/output.jsonl', 'data/dead_letter.jsonl')
`,
        edges: [
          { targetTemplateNodeId: 'source', edgeType: 'dependency' },
          { targetTemplateNodeId: 'transform', edgeType: 'dependency' },
          { targetTemplateNodeId: 'validate', edgeType: 'dependency' },
          { targetTemplateNodeId: 'sink', edgeType: 'dependency' },
        ],
      },
    ],
  },
];
