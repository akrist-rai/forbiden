/**
 * Theme Model
 *
 * Stores Monaco editor themes — both the 6 built-in FORBIDDEN themes and
 * any custom themes saved by operators.
 *
 * BUILT-IN THEMES:
 *   Seeded on server startup via ThemeService.seedBuiltins().
 *   id prefix: 'forbidden-*'
 *   Cannot be deleted (builtIn: true guard).
 *
 * CUSTOM THEMES:
 *   Operators can fork a built-in and modify token colors through the editor UI.
 *   Stored per-workspace so teams can share custom themes.
 *   id is a uuid, prefix: 'custom-*'
 *
 * MONACO THEME FORMAT:
 *   `rules` and `colors` follow the Monaco IStandaloneThemeData shape exactly,
 *   so they can be passed directly to monaco.editor.defineTheme().
 *
 *   See: https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneThemeData.html
 */

import { Schema, model, type Document } from 'mongoose';

export interface IThemeTokenRule {
  token: string;
  foreground?: string;
  background?: string;
  fontStyle?: string;
}

export interface ITheme extends Document {
  themeId: string;
  name: string;
  /** Monaco base: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light' */
  base: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light';
  /** Token color rules (Monaco ITokenThemeRule[]) */
  rules: IThemeTokenRule[];
  /** Editor color overrides (Monaco IColors) */
  colors: Record<string, string>;
  /** True for the 6 built-in themes — cannot be deleted */
  builtIn: boolean;
  /** Null for built-ins, workspaceId for custom themes */
  workspaceId: string | null;
  /** Display description */
  description?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ThemeSchema = new Schema<ITheme>(
  {
    themeId:     { type: String, required: true, unique: true },
    name:        { type: String, required: true },
    base:        { type: String, enum: ['vs', 'vs-dark', 'hc-black', 'hc-light'], required: true },
    rules:       [{
      token:      String,
      foreground: String,
      background: String,
      fontStyle:  String,
      _id: false,
    }],
    colors:      { type: Schema.Types.Mixed, default: {} },
    builtIn:     { type: Boolean, default: false },
    workspaceId: { type: String, default: null, index: true },
    description: String,
    createdBy:   String,
  },
  { timestamps: true }
);

ThemeSchema.index({ workspaceId: 1, builtIn: 1 });

export const Theme = model<ITheme>('Theme', ThemeSchema);

// ─── Built-in theme definitions ───────────────────────────────────────────────
// These follow Monaco IStandaloneThemeData format exactly.

export const BUILTIN_THEMES: Array<Omit<ITheme, keyof Document | 'createdAt' | 'updatedAt'>> = [
  {
    themeId:     'forbidden-dark',
    name:        'FORBIDDEN Dark',
    base:        'vs-dark',
    builtIn:     true,
    workspaceId: null,
    description: 'The default FORBIDDEN dark theme',
    colors: {
      'editor.background':           '#05050d',
      'editor.foreground':           '#c8d0e8',
      'editor.lineHighlightBackground': '#0a0a18',
      'editor.selectionBackground':  '#10b98133',
      'editorCursor.foreground':     '#10b981',
      'editorLineNumber.foreground': '#2a2a4a',
      'editorLineNumber.activeForeground': '#10b981',
      'editor.findMatchBackground':  '#ffc41033',
      'editor.findMatchHighlightBackground': '#ffc41018',
      'editorWidget.background':     '#0a0a18',
      'editorWidget.border':         '#1a1a2e',
      'input.background':            '#0a0a18',
      'input.border':                '#1a1a2e',
    },
    rules: [
      { token: 'keyword',          foreground: 'bb9af7', fontStyle: 'bold' },
      { token: 'keyword.control',  foreground: 'ff435a' },
      { token: 'string',           foreground: '9ece6a' },
      { token: 'string.escape',    foreground: 'e0af68' },
      { token: 'comment',          foreground: '565f89', fontStyle: 'italic' },
      { token: 'number',           foreground: 'ff9e64' },
      { token: 'type',             foreground: '2ac3de' },
      { token: 'class',            foreground: '0db9d7', fontStyle: 'bold' },
      { token: 'function',         foreground: '7aa2f7' },
      { token: 'variable',         foreground: 'c8d0e8' },
      { token: 'variable.predefined', foreground: 'bb9af7' },
      { token: 'constant',         foreground: 'ff9e64' },
      { token: 'operator',         foreground: '89ddff' },
      { token: 'delimiter',        foreground: 'a9b1d6' },
      { token: 'tag',              foreground: 'f7768e' },
      { token: 'attribute.name',   foreground: '0db9d7' },
      { token: 'attribute.value',  foreground: '9ece6a' },
    ],
  },
  {
    themeId:     'forbidden-cyber',
    name:        'FORBIDDEN Cyber',
    base:        'vs-dark',
    builtIn:     true,
    workspaceId: null,
    description: 'High-contrast neon cyber variant',
    colors: {
      'editor.background':           '#010d07',
      'editor.foreground':           '#e0f0e8',
      'editor.lineHighlightBackground': '#0a1f10',
      'editor.selectionBackground':  '#10b98144',
      'editorCursor.foreground':     '#10b981',
      'editorLineNumber.foreground': '#0d3305',
      'editorLineNumber.activeForeground': '#10b981',
    },
    rules: [
      { token: 'keyword',  foreground: '10b981', fontStyle: 'bold' },
      { token: 'string',   foreground: '72f1b8' },
      { token: 'comment',  foreground: '1a5c09', fontStyle: 'italic' },
      { token: 'number',   foreground: 'ffbd5e' },
      { token: 'function', foreground: '28f1c3' },
      { token: 'type',     foreground: '5ccfe6' },
      { token: 'operator', foreground: '10b981' },
    ],
  },
  {
    themeId:     'forbidden-brutal',
    name:        'FORBIDDEN Brutal',
    base:        'vs',
    builtIn:     true,
    workspaceId: null,
    description: 'High-contrast brutalist light theme',
    colors: {
      'editor.background':           '#f0f0f0',
      'editor.foreground':           '#000000',
      'editor.lineHighlightBackground': '#e0e0e0',
      'editor.selectionBackground':  '#00000020',
      'editorCursor.foreground':     '#000000',
      'editorLineNumber.foreground': '#888888',
      'editorLineNumber.activeForeground': '#000000',
    },
    rules: [
      { token: 'keyword',  foreground: '000000', fontStyle: 'bold' },
      { token: 'string',   foreground: '333333' },
      { token: 'comment',  foreground: '888888', fontStyle: 'italic' },
      { token: 'number',   foreground: '111111', fontStyle: 'bold' },
      { token: 'function', foreground: '000000', fontStyle: 'bold' },
    ],
  },
  {
    themeId:     'forbidden-dracula',
    name:        'FORBIDDEN Dracula',
    base:        'vs-dark',
    builtIn:     true,
    workspaceId: null,
    description: 'Dracula-inspired palette',
    colors: {
      'editor.background':           '#282a36',
      'editor.foreground':           '#f8f8f2',
      'editor.lineHighlightBackground': '#44475a',
      'editor.selectionBackground':  '#44475a99',
      'editorCursor.foreground':     '#f8f8f0',
      'editorLineNumber.foreground': '#6272a4',
    },
    rules: [
      { token: 'keyword',  foreground: 'ff79c6', fontStyle: 'bold' },
      { token: 'string',   foreground: 'f1fa8c' },
      { token: 'comment',  foreground: '6272a4', fontStyle: 'italic' },
      { token: 'number',   foreground: 'bd93f9' },
      { token: 'function', foreground: '50fa7b' },
      { token: 'type',     foreground: '8be9fd' },
      { token: 'operator', foreground: 'ff79c6' },
      { token: 'variable', foreground: 'f8f8f2' },
    ],
  },
  {
    themeId:     'forbidden-tokyo',
    name:        'FORBIDDEN Tokyo Night',
    base:        'vs-dark',
    builtIn:     true,
    workspaceId: null,
    description: 'Tokyo Night inspired dark theme',
    colors: {
      'editor.background':           '#1a1b26',
      'editor.foreground':           '#a9b1d6',
      'editor.lineHighlightBackground': '#1f2335',
      'editor.selectionBackground':  '#364a5e99',
      'editorCursor.foreground':     '#c0caf5',
      'editorLineNumber.foreground': '#3b4261',
      'editorLineNumber.activeForeground': '#737aa2',
    },
    rules: [
      { token: 'keyword',  foreground: 'bb9af7', fontStyle: 'bold' },
      { token: 'string',   foreground: '9ece6a' },
      { token: 'comment',  foreground: '565f89', fontStyle: 'italic' },
      { token: 'number',   foreground: 'ff9e64' },
      { token: 'function', foreground: '7aa2f7' },
      { token: 'type',     foreground: '2ac3de', fontStyle: 'italic' },
      { token: 'class',    foreground: '0db9d7' },
      { token: 'operator', foreground: '89ddff' },
    ],
  },
  {
    themeId:     'forbidden-nord',
    name:        'FORBIDDEN Nord',
    base:        'vs-dark',
    builtIn:     true,
    workspaceId: null,
    description: 'Nord arctic palette',
    colors: {
      'editor.background':           '#2e3440',
      'editor.foreground':           '#d8dee9',
      'editor.lineHighlightBackground': '#3b4252',
      'editor.selectionBackground':  '#434c5e99',
      'editorCursor.foreground':     '#d8dee9',
      'editorLineNumber.foreground': '#4c566a',
      'editorLineNumber.activeForeground': '#81a1c1',
    },
    rules: [
      { token: 'keyword',  foreground: '81a1c1', fontStyle: 'bold' },
      { token: 'string',   foreground: 'a3be8c' },
      { token: 'comment',  foreground: '4c566a', fontStyle: 'italic' },
      { token: 'number',   foreground: 'b48ead' },
      { token: 'function', foreground: '88c0d0' },
      { token: 'type',     foreground: '8fbcbb' },
      { token: 'operator', foreground: '81a1c1' },
      { token: 'variable', foreground: 'd8dee9' },
    ],
  },
];
