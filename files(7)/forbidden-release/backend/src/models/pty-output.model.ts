/**
 * PTY Output Model
 *
 * Records the stdout of workspace terminal sessions for debugging and audit.
 *
 * WHY STORE OUTPUT:
 *   The PTY audit log (pty-audit.model.ts) records WHAT operators typed.
 *   This model records WHAT the shell printed in response — the full context.
 *   Without output, "git push failed" is unactionable; with output you see:
 *     "error: failed to push some refs — hint: Updates were rejected because
 *      the remote contains work you don't have..."
 *
 * STORAGE STRATEGY:
 *   Output is chunky and arrives in rapid bursts. Storing every chunk as a
 *   separate document would create millions of tiny records. Instead we:
 *     1. Accumulate output in memory for up to 5 seconds (flush interval)
 *     2. When a newline is detected OR 5 seconds pass, flush to MongoDB
 *     3. Associate each flush with the session + sequence number
 *     4. On session close, flush the remaining buffer
 *
 *   A single `ls -la /workspace/nodes` response of 30 lines becomes 1 document
 *   rather than 30 individual writes.
 *
 * CONTENT LIMITS:
 *   Each document stores up to 32KB of output. Longer outputs (e.g. build logs)
 *   are split across sequential documents with the same sessionId, linked by
 *   ascending `seq` numbers.
 *
 * RETENTION:
 *   30-day TTL — shorter than the 90-day audit log because output is much
 *   larger and less frequently queried for compliance purposes.
 *
 * QUERYING:
 *   To replay a session:
 *     db.ptyoutputs.find({ sessionId }).sort({ seq: 1 })
 *
 *   To see what happened around a specific command:
 *     db.ptyoutputs.find({ workspaceId, createdAt: { $gte: t0, $lte: t1 } })
 */

import { createHash } from 'node:crypto';
import { Schema, model, type Document } from 'mongoose';

export interface IPtyOutput extends Document {
  workspaceId: string;
  operatorId:  string;
  sessionId:   string;
  /**
   * Monotonically increasing sequence number within a session.
   * Allows correct ordering when documents have identical createdAt timestamps.
   */
  seq:         number;
  /**
   * Raw terminal output chunk. May contain ANSI escape sequences — we store
   * them as-is so the output can be rendered faithfully in xterm.js.
   * Content is capped at 32KB per document.
   */
  content:     string;
  /** Byte length of content */
  length:      number;
  createdAt:   Date;
}

const PtyOutputSchema = new Schema<IPtyOutput>(
  {
    workspaceId: { type: String, required: true, index: true },
    operatorId:  { type: String, required: true },
    sessionId:   { type: String, required: true },
    seq:         { type: Number, required: true },
    content:     { type: String, required: true },
    length:      { type: Number, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Primary replay query: all output for a session in order
PtyOutputSchema.index({ sessionId: 1, seq: 1 });

// Time-range queries for debugging
PtyOutputSchema.index({ workspaceId: 1, createdAt: -1 });

// 30-day TTL
PtyOutputSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

export const PtyOutput = model<IPtyOutput>('PtyOutput', PtyOutputSchema);

/** Maximum content length per document (32KB) */
export const PTY_OUTPUT_MAX_BYTES = 32 * 1024;

/** Flush accumulated output every N milliseconds */
export const PTY_OUTPUT_FLUSH_INTERVAL_MS = 5_000;

export function cleanPtyOutput(input: Buffer | string): string {
  return String(input).replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
}

export function hashPtyOutput(input: Buffer | string): string {
  return createHash('sha256').update(input).digest('hex');
}
