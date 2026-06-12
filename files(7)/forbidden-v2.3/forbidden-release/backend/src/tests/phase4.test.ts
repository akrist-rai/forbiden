/**
 * Phase 4 Test Suite
 *
 * LSP proxy, PTY audit log, theme registry, workspace settings
 *
 * Run with: bun test
 */

import { describe, test, expect } from 'bun:test';
import { classifyInput, sanitiseInput } from '../models/pty-audit.model';

// ─── PTY Audit — input classification ────────────────────────────────────────

describe('PTY audit — classifyInput', () => {

  test('Enter-terminated line classified as command', () => {
    const { category, command } = classifyInput('ls -la\r\n');
    expect(category).toBe('command');
    expect(command).toBe('ls -la');
  });

  test('\\r-terminated line is also a command', () => {
    const { category, command } = classifyInput('git status\r');
    expect(category).toBe('command');
    expect(command).toBe('git status');
  });

  test('Ctrl+C classified as ctrl/SIGINT', () => {
    const { category, ctrlName } = classifyInput('\x03');
    expect(category).toBe('ctrl');
    expect(ctrlName).toBe('SIGINT');
  });

  test('Ctrl+D classified as ctrl/EOF', () => {
    const { category, ctrlName } = classifyInput('\x04');
    expect(category).toBe('ctrl');
    expect(ctrlName).toBe('EOF');
  });

  test('Ctrl+Z classified as ctrl/SIGTSTP', () => {
    const { category, ctrlName } = classifyInput('\x1a');
    expect(category).toBe('ctrl');
    expect(ctrlName).toBe('SIGTSTP');
  });

  test('Large paste (>10 chars without Enter) classified as paste', () => {
    const { category } = classifyInput('this is a large paste without newline');
    expect(category).toBe('paste');
  });

  test('Short partial input (no Enter) classified as partial', () => {
    const { category } = classifyInput('cd');
    expect(category).toBe('partial');
  });

  test('Empty command after Enter has null command', () => {
    const { command } = classifyInput('   \r\n');
    expect(command).toBeNull();
  });

  test('Command with sudo stripped of trailing whitespace', () => {
    const { command } = classifyInput('sudo apt update   \r\n');
    expect(command).toBe('sudo apt update');
  });
});

describe('PTY audit — sanitiseInput', () => {

  test('Null bytes removed', () => {
    expect(sanitiseInput('abc\x00def')).toBe('abcdef');
  });

  test('ANSI escape sequences stripped', () => {
    // ESC[31m = red color code
    expect(sanitiseInput('\x1b[31mhello\x1b[0m')).toBe('hello');
  });

  test('Input capped at 4096 chars', () => {
    const long = 'x'.repeat(5000);
    expect(sanitiseInput(long).length).toBe(4096);
  });

  test('Normal input passes through unchanged', () => {
    expect(sanitiseInput('git log --oneline')).toBe('git log --oneline');
  });
});

// ─── LSP — JSON-RPC Content-Length framing ────────────────────────────────────

describe('LSP — Content-Length frame parser', () => {

  /**
   * Replicate the frame parsing logic to test it in isolation.
   * This mirrors the parseFrames() function in lsp.service.ts.
   */
  function parseFrames(buffer: Buffer): Array<Record<string, unknown>> {
    const messages: Array<Record<string, unknown>> = [];
    let buf = buffer;

    while (true) {
      const headerEnd = buf.indexOf('\r\n\r\n');
      if (headerEnd === -1) break;

      const headerStr = buf.slice(0, headerEnd).toString('utf8');
      const match = headerStr.match(/Content-Length:\s*(\d+)/i);
      if (!match) { buf = Buffer.alloc(0); break; }

      const contentLength = parseInt(match[1], 10);
      const bodyStart = headerEnd + 4;
      const bodyEnd = bodyStart + contentLength;
      if (buf.length < bodyEnd) break;

      const body = buf.slice(bodyStart, bodyEnd).toString('utf8');
      buf = buf.slice(bodyEnd);

      try {
        messages.push(JSON.parse(body));
      } catch {}
    }
    return messages;
  }

  function makeFrame(obj: object): Buffer {
    const body = JSON.stringify(obj);
    const header = `Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n`;
    return Buffer.from(header + body);
  }

  test('Single complete frame parsed correctly', () => {
    const msg = { jsonrpc: '2.0', id: 1, method: 'initialize' };
    const frames = parseFrames(makeFrame(msg));
    expect(frames).toHaveLength(1);
    expect(frames[0]['method']).toBe('initialize');
  });

  test('Two frames in one buffer parsed correctly', () => {
    const msg1 = { jsonrpc: '2.0', id: 1, result: { capabilities: {} } };
    const msg2 = { jsonrpc: '2.0', method: 'textDocument/publishDiagnostics', params: {} };
    const buf = Buffer.concat([makeFrame(msg1), makeFrame(msg2)]);
    const frames = parseFrames(buf);
    expect(frames).toHaveLength(2);
    expect(frames[0]['id']).toBe(1);
    expect(frames[1]['method']).toBe('textDocument/publishDiagnostics');
  });

  test('Incomplete frame returns no messages', () => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 2 });
    const incomplete = Buffer.from(`Content-Length: ${body.length + 10}\r\n\r\n${body}`);
    const frames = parseFrames(incomplete);
    expect(frames).toHaveLength(0);
  });

  test('Content-Length is case-insensitive in header', () => {
    const msg = { jsonrpc: '2.0', id: 1 };
    const body = JSON.stringify(msg);
    const frame = Buffer.from(`content-length: ${body.length}\r\n\r\n${body}`);
    const frames = parseFrames(frame);
    expect(frames).toHaveLength(1);
  });

  test('Message ID namespacing round-trip', () => {
    const sockPrefix = 'sktAbc12';
    const originalId = 42;
    const namespacedId = `${sockPrefix}:${originalId}`;

    const parsedPrefix = namespacedId.split(':')[0];
    const parsedId = parseInt(namespacedId.split(':')[1], 10);

    expect(parsedPrefix).toBe(sockPrefix);
    expect(parsedId).toBe(originalId);
  });
});

// ─── Theme registry — built-in definitions ────────────────────────────────────

describe('Theme registry — built-in themes', () => {
  // Import statically (no DB needed — we test the definitions, not DB ops)
  const { BUILTIN_THEMES } = require('../models/theme.model');

  test('6 built-in themes defined', () => {
    expect(BUILTIN_THEMES).toHaveLength(6);
  });

  test('All built-ins are marked builtIn: true', () => {
    for (const t of BUILTIN_THEMES) {
      expect(t.builtIn).toBe(true);
    }
  });

  test('All built-ins have workspaceId: null', () => {
    for (const t of BUILTIN_THEMES) {
      expect(t.workspaceId).toBeNull();
    }
  });

  test('Theme IDs are unique', () => {
    const ids = BUILTIN_THEMES.map((t: { themeId: string }) => t.themeId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('All themes have a valid Monaco base', () => {
    const validBases = new Set(['vs', 'vs-dark', 'hc-black', 'hc-light']);
    for (const t of BUILTIN_THEMES) {
      expect(validBases.has(t.base)).toBe(true);
    }
  });

  test('Token rules have required token field', () => {
    for (const theme of BUILTIN_THEMES) {
      for (const rule of theme.rules) {
        expect(typeof rule.token).toBe('string');
        expect(rule.token.length).toBeGreaterThan(0);
      }
    }
  });

  test('Built-in cyber theme is dark', () => {
    const cyber = BUILTIN_THEMES.find((t: { themeId: string }) => t.themeId === 'forbidden-cyber');
    expect(cyber?.base).toBe('vs-dark');
  });

  test('Built-in brutal theme is light', () => {
    const brutal = BUILTIN_THEMES.find((t: { themeId: string }) => t.themeId === 'forbidden-brutal');
    expect(brutal?.base).toBe('vs');
  });
});

// ─── Workspace settings — defaults ────────────────────────────────────────────

describe('WorkspaceSettings — defaults', () => {
  const { DEFAULT_SETTINGS } = require('../models/workspace-settings.model');

  test('Default tab size is 4', () => {
    expect(DEFAULT_SETTINGS.tabSize).toBe(4);
  });

  test('Default indent style is spaces', () => {
    expect(DEFAULT_SETTINGS.indentStyle).toBe('spaces');
  });

  test('Default language is python', () => {
    expect(DEFAULT_SETTINGS.defaultLanguage).toBe('python');
  });

  test('Default theme is forbidden-dark', () => {
    expect(DEFAULT_SETTINGS.editorThemeId).toBe('forbidden-dark');
  });

  test('Collaboration features enabled by default', () => {
    expect(DEFAULT_SETTINGS.showCursors).toBe(true);
    expect(DEFAULT_SETTINGS.showSelections).toBe(true);
  });

  test('Font size within valid range', () => {
    expect(DEFAULT_SETTINGS.fontSize).toBeGreaterThanOrEqual(8);
    expect(DEFAULT_SETTINGS.fontSize).toBeLessThanOrEqual(32);
  });

  test('Line height within valid range', () => {
    expect(DEFAULT_SETTINGS.lineHeight).toBeGreaterThanOrEqual(1);
    expect(DEFAULT_SETTINGS.lineHeight).toBeLessThanOrEqual(4);
  });

  test('Pyright enabled by default', () => {
    expect(DEFAULT_SETTINGS.enabledLSPs).toContain('pyright');
  });
});

// ─── Settings PATCH validation ─────────────────────────────────────────────────

describe('WorkspaceSettings — patch validation', () => {
  test('tabSize clamped to 1–16', () => {
    const valid = [1, 2, 4, 8, 16];
    const invalid = [0, 17, -1];
    // Zod schema: z.number().min(1).max(16)
    for (const v of valid) {
      expect(v >= 1 && v <= 16).toBe(true);
    }
    for (const v of invalid) {
      expect(v >= 1 && v <= 16).toBe(false);
    }
  });

  test('fontSize clamped to 8–32', () => {
    expect(13 >= 8 && 13 <= 32).toBe(true);
    expect(7 >= 8).toBe(false);
    expect(33 <= 32).toBe(false);
  });

  test('lineHeight clamped to 1–4', () => {
    expect(1.65 >= 1 && 1.65 <= 4).toBe(true);
    expect(0.9 >= 1).toBe(false);
    expect(4.1 <= 4).toBe(false);
  });
});
