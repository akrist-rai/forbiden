// src/db/schema.ts — FORBINDEN Drizzle schema (Supabase Postgres)
import {
  pgTable,
  text,
  integer,
  boolean,
  real,
  jsonb,
  timestamp,
  uuid,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const id   = () => text('id').primaryKey();
const wsId = () => text('workspace_id').notNull();
const ts   = (name: string) => timestamp(name, { withTimezone: true, mode: 'string' })
                                 .default(sql`now()`).notNull();

// ─── WORKSPACES ───────────────────────────────────────────────────────────────
export const workspaces = pgTable(
  'workspaces',
  {
    id:         id(),
    userId:     uuid('user_id').notNull(), // references auth.users(id)
    name:       text('name').notNull(),
    theme:      text('theme').default('cyber').notNull(),
    avatar:     integer('avatar').default(0).notNull(),
    remoteUrl:  text('remote_url'),
    gitUser:    text('git_user').default('FORBINDEN Operator'),
    gitEmail:   text('git_email').default('operator@forbinden.local'),
    createdAt:  ts('created_at'),
    updatedAt:  ts('updated_at'),
  },
  (t) => [index('workspaces_user_idx').on(t.userId)],
);

// ─── NODES ────────────────────────────────────────────────────────────────────
export const nodes = pgTable(
  'nodes',
  {
    id:          id(),
    workspaceId: wsId(),
    label:       text('label').notNull(),
    filepath:    text('filepath').notNull(),
    type:        text('type').default('function').notNull(), // entry | function | class | note
    isMain:      boolean('is_main').default(false).notNull(),
    x:           real('x').default(0).notNull(),
    y:           real('y').default(0).notNull(),
    themeIdx:    integer('theme_idx').default(0).notNull(),
    classId:     text('class_id'),
    modified:    boolean('modified').default(false).notNull(),
    createdAt:   ts('created_at'),
    updatedAt:   ts('updated_at'),
  },
  (t) => [
    index('nodes_ws_idx').on(t.workspaceId),
    uniqueIndex('nodes_ws_filepath_uniq').on(t.workspaceId, t.filepath),
  ],
);

// ─── EDGES ────────────────────────────────────────────────────────────────────
export const edges = pgTable(
  'edges',
  {
    id:          id(),
    workspaceId: wsId(),
    source:      text('source').notNull(),
    target:      text('target').notNull(),
    createdAt:   ts('created_at'),
  },
  (t) => [index('edges_ws_idx').on(t.workspaceId)],
);

// ─── GROUPS ───────────────────────────────────────────────────────────────────
export const groups = pgTable(
  'groups',
  {
    id:          id(),
    workspaceId: wsId(),
    name:        text('name').notNull(),
    color:       text('color').default('#10b981').notNull(),
    nodeIds:     jsonb('node_ids').$type<string[]>().default([]).notNull(),
    createdAt:   ts('created_at'),
  },
  (t) => [index('groups_ws_idx').on(t.workspaceId)],
);

// ─── BOARD COLUMNS ────────────────────────────────────────────────────────────
export const boardColumns = pgTable(
  'board_columns',
  {
    id:          id(),
    workspaceId: wsId(),
    title:       text('title').notNull(),
    color:       text('color').default('#4a4a6a').notNull(),
    position:    integer('position').default(0).notNull(),
  },
  (t) => [index('board_cols_ws_idx').on(t.workspaceId)],
);

// ─── BOARD CARDS ──────────────────────────────────────────────────────────────
export const boardCards = pgTable(
  'board_cards',
  {
    id:          id(),
    workspaceId: wsId(),
    colId:       text('col_id').notNull(),
    title:       text('title').notNull(),
    priority:    text('priority').default('MED').notNull(), // LOW | MED | HIGH | DONE
    tags:        jsonb('tags').$type<string[]>().default([]).notNull(),
    progress:    integer('progress').default(0).notNull(),
    due:         text('due'),
    assigneeIdx: integer('assignee_idx'),
    position:    integer('position').default(0).notNull(),
    createdAt:   ts('created_at'),
    updatedAt:   ts('updated_at'),
  },
  (t) => [index('board_cards_ws_idx').on(t.workspaceId)],
);

// ─── OPERATOR NOTES ───────────────────────────────────────────────────────────
export const operatorNotes = pgTable(
  'operator_notes',
  {
    workspaceId: wsId().primaryKey(),
    content:     text('content').default('').notNull(),
    updatedAt:   ts('updated_at'),
  },
);

// ─── TERMINAL HISTORY ─────────────────────────────────────────────────────────
export const terminalHistory = pgTable(
  'terminal_history',
  {
    id:          id(),
    workspaceId: wsId(),
    command:     text('command').notNull(),
    output:      text('output').default('').notNull(),
    exitCode:    integer('exit_code').default(0).notNull(),
    createdAt:   ts('created_at'),
  },
  (t) => [index('terminal_ws_idx').on(t.workspaceId, t.createdAt)],
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type Workspace      = typeof workspaces.$inferSelect;
export type NewWorkspace   = typeof workspaces.$inferInsert;
export type Node           = typeof nodes.$inferSelect;
export type NewNode        = typeof nodes.$inferInsert;
export type Edge           = typeof edges.$inferSelect;
export type NewEdge        = typeof edges.$inferInsert;
export type Group          = typeof groups.$inferSelect;
export type NewGroup       = typeof groups.$inferInsert;
export type BoardColumn    = typeof boardColumns.$inferSelect;
export type NewBoardColumn = typeof boardColumns.$inferInsert;
export type BoardCard      = typeof boardCards.$inferSelect;
export type NewBoardCard   = typeof boardCards.$inferInsert;
export type OperatorNote   = typeof operatorNotes.$inferSelect;
export type TerminalEntry  = typeof terminalHistory.$inferSelect;
