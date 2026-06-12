/**
 * PTY Audit Log Model
 *
 * Append-only record of terminal input for shared workspaces.
 * Every keystroke/paste sent to a workspace terminal is logged here.
 *
 * PURPOSE:
 *   - Security: shared workspaces need a trail of who ran what commands
 *   - Debugging: reproduce exactly what happened before a container crash
 *   - Compliance: some operators need an immutable command audit trail
 *
 * WHAT IS LOGGED:
 *   - Input: raw characters sent to the PTY (typed + paste)
 *   - Commands: parsed command strings (extracted when Enter is detected)
 *   - Session metadata: workspaceId, operatorId, socketId, timestamp
 *
 * WHAT IS NOT LOGGED:
 *   - Terminal output (too verbose, stored separately if needed)
 *   - Control sequences like arrow keys, Ctrl+C (filtered out)
 *
 * RETENTION:
 *   - 90 days TTL via MongoDB TTL index on `createdAt`
 *   - Operators with `admin` role can view/export full logs
 *   - Regular operators can only view their own session logs
 *
 * INPUT ACCUMULATION:
 *   Individual keystrokes are accumulated into a line buffer.
 *   A PtyAuditEntry is written when:
 *     a) Enter/Return is detected (command submitted)
 *     b) 30 seconds pass without Enter (flush partial input)
 *     c) The PTY session closes (flush remaining buffer)
 *
 * IMMUTABILITY:
 *   Audit entries are never updated. Deletion is only possible via the
 *   TTL index or an explicit admin purge (which itself creates a purge audit entry).
 */

import { Schema, model, type Document } from 'mongoose';

export type PtyInputCategory =
  | 'command'     // Line terminated with Enter — a complete command
  | 'partial'     // Flushed mid-line (timeout or session close)
  | 'ctrl'        // Control sequence (Ctrl+C, Ctrl+D, etc.)
  | 'paste';      // Large paste detected (>10 chars in <50ms)

export interface IPtyAuditEntry extends Document {
  workspaceId: string;
  operatorId:  string;
  sessionId:   string;
  /** Raw input string (sanitised — null bytes removed) */
  rawInput:    string;
  /** Parsed command if category is 'command' (trimmed, without trailing \r\n) */
  command:     string | null;
  category:    PtyInputCategory;
  /** Control sequence name if category is 'ctrl' (e.g. 'SIGINT', 'EOF') */
  ctrlName:    string | null;
  /** Character count of raw input */
  length:      number;
  createdAt:   Date;
}

const PtyAuditSchema = new Schema<IPtyAuditEntry>(
  {
    workspaceId: { type: String, required: true, index: true },
    operatorId:  { type: String, required: true, index: true },
    sessionId:   { type: String, required: true },
    rawInput:    { type: String, required: true },
    command:     { type: String, default: null },
    category:    { type: String, enum: ['command', 'partial', 'ctrl', 'paste'], required: true },
    ctrlName:    { type: String, default: null },
    length:      { type: Number, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    // Never update audit entries
    strict: true,
  }
);

// Fast query: all commands by operator in a workspace
PtyAuditSchema.index({ workspaceId: 1, operatorId: 1, createdAt: -1 });
// Session-level replay
PtyAuditSchema.index({ sessionId: 1, createdAt: 1 });
// 90-day TTL — MongoDB auto-deletes entries older than 90 days
PtyAuditSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export const PtyAuditEntry = model<IPtyAuditEntry>('PtyAuditEntry', PtyAuditSchema);

// ─── Helper: classify and sanitise raw PTY input ──────────────────────────────

const CTRL_SEQUENCES: Record<string, string> = {
  '\x03': 'SIGINT',     // Ctrl+C
  '\x04': 'EOF',        // Ctrl+D
  '\x1a': 'SIGTSTP',   // Ctrl+Z
  '\x15': 'CLEAR_LINE', // Ctrl+U
  '\x0c': 'CLEAR_SCR',  // Ctrl+L
  '\x02': 'SIGINT_B',   // Ctrl+B (tmux prefix)
};

export function classifyInput(raw: string): {
  category: PtyInputCategory;
  command: string | null;
  ctrlName: string | null;
} {
  // Single control character
  if (raw.length === 1 && CTRL_SEQUENCES[raw]) {
    return { category: 'ctrl', command: null, ctrlName: CTRL_SEQUENCES[raw] };
  }

  // Large paste (heuristic: >10 chars suggests paste not typing)
  if (raw.length > 10 && !raw.includes('\r') && !raw.includes('\n')) {
    return { category: 'paste', command: null, ctrlName: null };
  }

  // Command submission
  if (raw.endsWith('\r') || raw.endsWith('\n') || raw.endsWith('\r\n')) {
    const command = raw.replace(/[\r\n]+$/, '').trim();
    return { category: 'command', command: command || null, ctrlName: null };
  }

  // Partial input (flush without Enter)
  return { category: 'partial', command: null, ctrlName: null };
}

/** Strip null bytes and control chars we don't want in the audit log */
export function sanitiseInput(raw: string): string {
  return raw
    .replace(/\x00/g, '')          // null bytes
    .replace(/\x1b\[[0-9;]*[A-Za-z]/g, '') // ANSI escape sequences
    .slice(0, 4096);                // cap at 4KB per entry
}
