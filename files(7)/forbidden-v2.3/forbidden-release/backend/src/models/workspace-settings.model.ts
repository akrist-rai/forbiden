/**
 * WorkspaceSettings Model
 *
 * Stores editor preferences on a per-workspace basis. Settings are shared
 * across all operators in a workspace (e.g. "this workspace uses Python + 4-space
 * indent") while personal overrides (font size, minimap toggle) live client-side.
 *
 * These settings are broadcast to all operators in the workspace room when
 * changed, so everyone sees consistent defaults immediately.
 *
 * One document per workspace — upserted on first access.
 */

import { Schema, model, type Document } from 'mongoose';

export type IndentStyle  = 'spaces' | 'tabs';
export type WordWrapMode = 'off' | 'on' | 'wordWrapColumn' | 'bounded';

export interface IWorkspaceSettings extends Document {
  workspaceId: string;

  // ── Language defaults ──────────────────────────────────────────────────────
  /** Default language for new nodes (Monaco language identifier) */
  defaultLanguage: string;
  /** Whether to detect language from file extension on new nodes */
  autoDetectLanguage: boolean;

  // ── LSP ────────────────────────────────────────────────────────────────────
  /** Which language servers are active for this workspace */
  enabledLSPs: string[];

  // ── Formatting ─────────────────────────────────────────────────────────────
  tabSize: number;
  indentStyle: IndentStyle;
  /** Insert a newline at end of file on save */
  insertFinalNewline: boolean;
  /** Strip trailing whitespace on save */
  trimTrailingWhitespace: boolean;

  // ── Editor appearance ──────────────────────────────────────────────────────
  wordWrap: WordWrapMode;
  wordWrapColumn: number;
  /** Active Monaco theme ID (built-in or custom) */
  editorThemeId: string;
  /** Show line numbers */
  lineNumbers: 'on' | 'off' | 'relative' | 'interval';
  /** Show minimap */
  minimap: boolean;
  /** Render whitespace characters */
  renderWhitespace: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  /** Font size in px */
  fontSize: number;
  /** Font family */
  fontFamily: string;
  /** Line height multiplier */
  lineHeight: number;
  /** Letter spacing in px */
  letterSpacing: number;

  // ── Collaboration ──────────────────────────────────────────────────────────
  /** Show other operators' cursors */
  showCursors: boolean;
  /** Show other operators' selections */
  showSelections: boolean;

  updatedAt: Date;
  updatedBy?: string;
}

const WorkspaceSettingsSchema = new Schema<IWorkspaceSettings>(
  {
    workspaceId: { type: String, required: true, unique: true },

    defaultLanguage:    { type: String, default: 'python' },
    autoDetectLanguage: { type: Boolean, default: true },

    enabledLSPs: { type: [String], default: ['pyright'] },

    tabSize:                { type: Number, default: 4, min: 1, max: 16 },
    indentStyle:            { type: String, enum: ['spaces', 'tabs'], default: 'spaces' },
    insertFinalNewline:     { type: Boolean, default: true },
    trimTrailingWhitespace: { type: Boolean, default: true },

    wordWrap:       { type: String, enum: ['off', 'on', 'wordWrapColumn', 'bounded'], default: 'off' },
    wordWrapColumn: { type: Number, default: 120 },
    editorThemeId:  { type: String, default: 'forbidden-dark' },
    lineNumbers:    { type: String, enum: ['on', 'off', 'relative', 'interval'], default: 'on' },
    minimap:        { type: Boolean, default: true },
    renderWhitespace: { type: String, enum: ['none', 'boundary', 'selection', 'trailing', 'all'], default: 'selection' },
    fontSize:       { type: Number, default: 13, min: 8, max: 32 },
    fontFamily:     { type: String, default: "'JetBrains Mono', 'Fira Code', monospace" },
    lineHeight:     { type: Number, default: 1.65, min: 1, max: 4 },
    letterSpacing:  { type: Number, default: 0, min: -2, max: 4 },

    showCursors:    { type: Boolean, default: true },
    showSelections: { type: Boolean, default: true },

    updatedBy: String,
  },
  { timestamps: true }
);

export const WorkspaceSettings = model<IWorkspaceSettings>(
  'WorkspaceSettings',
  WorkspaceSettingsSchema
);

/** Default settings object — returned for workspaces that have no saved settings yet */
export const DEFAULT_SETTINGS: Omit<IWorkspaceSettings, keyof Document> = {
  workspaceId:            '',
  defaultLanguage:        'python',
  autoDetectLanguage:     true,
  enabledLSPs:            ['pyright'],
  tabSize:                4,
  indentStyle:            'spaces',
  insertFinalNewline:     true,
  trimTrailingWhitespace: true,
  wordWrap:               'off',
  wordWrapColumn:         120,
  editorThemeId:          'forbidden-dark',
  lineNumbers:            'on',
  minimap:                true,
  renderWhitespace:       'selection',
  fontSize:               13,
  fontFamily:             "'JetBrains Mono', 'Fira Code', monospace",
  lineHeight:             1.65,
  letterSpacing:          0,
  showCursors:            true,
  showSelections:         true,
  updatedAt:              new Date(),
};
