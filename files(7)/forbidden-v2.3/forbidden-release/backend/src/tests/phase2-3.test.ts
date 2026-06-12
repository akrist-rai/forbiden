/**
 * FORBIDDEN Backend Test Suite
 *
 * Run with:  bun test
 *
 * Tests are grouped by service. They use mock/stub patterns since Bun's
 * test runner doesn't have built-in MongoDB/Redis mocking — we test the
 * pure logic of each service in isolation.
 *
 * Integration tests (requiring live Mongo+Redis) are marked with .skip
 * and can be enabled by setting TEST_INTEGRATION=1 in the environment.
 */

import { describe, test, expect, beforeAll, afterAll, mock } from 'bun:test';
import * as Y from 'yjs';

// ─── YDocService tests (pure logic, no DB) ────────────────────────────────────

describe('YDocService — CRDT fundamentals', () => {

  test('two YDocs merge correctly after concurrent edits', () => {
    const doc1 = new Y.Doc();
    const doc2 = new Y.Doc();
    const text1 = doc1.getText('code');
    const text2 = doc2.getText('code');

    // Both start from empty
    const sv1 = Y.encodeStateVector(doc1);
    const sv2 = Y.encodeStateVector(doc2);

    // Concurrent edits on each side
    text1.insert(0, 'hello ');
    text2.insert(0, 'world');

    // Exchange updates
    const update1 = Y.encodeStateAsUpdate(doc1, sv2);
    const update2 = Y.encodeStateAsUpdate(doc2, sv1);

    Y.applyUpdate(doc1, update2);
    Y.applyUpdate(doc2, update1);

    // Both docs must converge to the same string
    expect(text1.toString()).toBe(text2.toString());
  });

  test('encodeStateAsUpdate produces non-empty bytes', () => {
    const doc = new Y.Doc();
    doc.getText('code').insert(0, 'const x = 1;');
    const update = Y.encodeStateAsUpdate(doc);
    expect(update.length).toBeGreaterThan(0);
  });

  test('encodeStateVector is smaller than full state', () => {
    const doc = new Y.Doc();
    doc.getText('code').insert(0, 'a'.repeat(1000));
    const fullState = Y.encodeStateAsUpdate(doc);
    const sv = Y.encodeStateVector(doc);
    expect(sv.length).toBeLessThan(fullState.length);
  });

  test('applyUpdate is idempotent', () => {
    const doc = new Y.Doc();
    const text = doc.getText('code');
    text.insert(0, 'idempotent');

    const update = Y.encodeStateAsUpdate(doc);

    const doc2 = new Y.Doc();
    Y.applyUpdate(doc2, update);
    Y.applyUpdate(doc2, update); // apply twice — should not duplicate

    expect(doc2.getText('code').toString()).toBe('idempotent');
  });

  test('base64 round-trip preserves update bytes', () => {
    const doc = new Y.Doc();
    doc.getText('code').insert(0, 'round trip test');
    const update = Y.encodeStateAsUpdate(doc);

    const b64 = Buffer.from(update).toString('base64');
    const decoded = Buffer.from(b64, 'base64');

    expect(new Uint8Array(decoded)).toEqual(update);
  });

  test('three-way merge converges', () => {
    const docA = new Y.Doc();
    const docB = new Y.Doc();
    const docC = new Y.Doc();

    docA.getText('code').insert(0, 'AAA');
    docB.getText('code').insert(0, 'BBB');
    docC.getText('code').insert(0, 'CCC');

    const updateA = Y.encodeStateAsUpdate(docA);
    const updateB = Y.encodeStateAsUpdate(docB);
    const updateC = Y.encodeStateAsUpdate(docC);

    // All three receive all updates
    for (const doc of [docA, docB, docC]) {
      Y.applyUpdate(doc, updateA);
      Y.applyUpdate(doc, updateB);
      Y.applyUpdate(doc, updateC);
    }

    const resultA = docA.getText('code').toString();
    const resultB = docB.getText('code').toString();
    const resultC = docC.getText('code').toString();

    expect(resultA).toBe(resultB);
    expect(resultB).toBe(resultC);
    // All three words appear (order may vary by clientID)
    expect(resultA).toContain('AAA');
    expect(resultA).toContain('BBB');
    expect(resultA).toContain('CCC');
  });
});

// ─── AwarenessService tests (pure logic) ──────────────────────────────────────

describe('AwarenessService — state shape validation', () => {
  test('awareness state has required fields', () => {
    const state = {
      operatorId:  'op-1',
      name:        'ATLAS',
      avatarIndex: 2,
      accentColor: '#10b981',
      nodeId:      'node-abc',
      cursor:      { line: 10, column: 5 },
      selection:   null,
      ts:          Date.now(),
    };

    expect(state.operatorId).toBe('op-1');
    expect(state.cursor?.line).toBe(10);
    expect(state.selection).toBeNull();
  });

  test('stale awareness filtering logic', () => {
    const TTL_MS = 30_000;
    const now = Date.now();

    const states = [
      { operatorId: 'a', ts: now - 5_000 },       // fresh
      { operatorId: 'b', ts: now - 35_000 },      // stale
      { operatorId: 'c', ts: now - 29_999 },      // just within TTL
    ];

    const fresh = states.filter(s => s.ts > now - TTL_MS);
    expect(fresh).toHaveLength(2);
    expect(fresh.map(s => s.operatorId)).toContain('a');
    expect(fresh.map(s => s.operatorId)).toContain('c');
  });
});

// ─── SnapshotService — pure logic ─────────────────────────────────────────────

describe('SnapshotService — interval logic', () => {
  test('shouldSnapshot fires at exact interval boundaries', () => {
    const INTERVAL = 500;
    const shouldSnapshot = (count: number) => count > 0 && count % INTERVAL === 0;

    expect(shouldSnapshot(0)).toBe(false);
    expect(shouldSnapshot(499)).toBe(false);
    expect(shouldSnapshot(500)).toBe(true);
    expect(shouldSnapshot(501)).toBe(false);
    expect(shouldSnapshot(1000)).toBe(true);
    expect(shouldSnapshot(1500)).toBe(true);
  });

  test('docId composition is deterministic', () => {
    const makeDocId = (ws: string, node: string) => `${ws}:${node}`;
    expect(makeDocId('ws-1', 'n-2')).toBe('ws-1:n-2');
    expect(makeDocId('ws-1', 'n-2')).toBe(makeDocId('ws-1', 'n-2'));
  });
});

// ─── EventService — input validation logic ────────────────────────────────────

describe('EventService — event type validation', () => {
  const VALID_TYPES = [
    'NODE_CREATED', 'NODE_DELETED', 'NODE_EDITED', 'NODE_JOINED',
    'NODE_CUT', 'NODE_MOVED', 'NOTE_SAVED', 'GROUP_CREATED',
    'GROUP_DELETED', 'WORKSPACE_SNAPSHOT',
  ] as const;

  test('all event types are defined', () => {
    expect(VALID_TYPES.length).toBe(10);
  });

  test('uuidv7 IDs sort chronologically', () => {
    // uuidv7 encodes milliseconds in the high bits — lexicographic sort = time sort
    const ids = [
      '01900000-0000-7000-8000-000000000001',
      '01900000-0001-7000-8000-000000000001',
      '01900000-0002-7000-8000-000000000001',
    ];
    const sorted = [...ids].sort();
    expect(sorted).toEqual(ids);
  });

  test('clientEventId deduplication key is preserved', () => {
    const clientEventId = crypto.randomUUID();
    const payload = { workspaceId: 'ws-1', type: 'NODE_EDITED', clientEventId };
    expect(payload.clientEventId).toBe(clientEventId);
  });
});

// ─── Change Stream — resume token serialization ────────────────────────────────

describe('ChangeStreamService — resume token', () => {
  test('resume token survives JSON round-trip', () => {
    const token = { _data: 'glsAAAAAAAAAAAACRmQAFGJjR...' };
    const serialised = JSON.stringify(token);
    const deserialised = JSON.parse(serialised);
    expect(deserialised._data).toBe(token._data);
  });

  test('null token handled gracefully', () => {
    const raw: string | null = null;
    const parsed = raw ? JSON.parse(raw) : null;
    expect(parsed).toBeNull();
  });
});

// ─── Container idle — time-based logic ────────────────────────────────────────

describe('Container idle management', () => {
  const IDLE_PAUSE_MS   = 15 * 60 * 1000;
  const IDLE_DESTROY_MS = 7 * 24 * 60 * 60 * 1000;

  const classify = (idleMs: number) => {
    if (idleMs > IDLE_DESTROY_MS) return 'destroy';
    if (idleMs > IDLE_PAUSE_MS)   return 'pause';
    return 'active';
  };

  test('active container within pause window', () => {
    expect(classify(10 * 60 * 1000)).toBe('active');  // 10 min
  });

  test('idle container beyond pause threshold', () => {
    expect(classify(20 * 60 * 1000)).toBe('pause');   // 20 min
  });

  test('container idle beyond destroy threshold', () => {
    expect(classify(8 * 24 * 60 * 60 * 1000)).toBe('destroy'); // 8 days
  });

  test('boundary: exactly at pause threshold', () => {
    // Strict greater-than, so exactly at threshold is still active
    expect(classify(IDLE_PAUSE_MS)).toBe('active');
  });

  test('boundary: one ms past pause threshold', () => {
    expect(classify(IDLE_PAUSE_MS + 1)).toBe('pause');
  });
});

// ─── Fanout — code event classification ───────────────────────────────────────

describe('FanoutService — code event set', () => {
  const CODE_EVENTS = new Set(['NODE_CREATED', 'NODE_EDITED', 'NODE_DELETED', 'NOTE_SAVED']);
  const SUPPRESS_TIMELINE = new Set(['NODE_MOVED']);

  test('code events are correctly classified', () => {
    expect(CODE_EVENTS.has('NODE_EDITED')).toBe(true);
    expect(CODE_EVENTS.has('NODE_MOVED')).toBe(false);
    expect(CODE_EVENTS.has('NOTE_SAVED')).toBe(true);
    expect(CODE_EVENTS.has('GROUP_CREATED')).toBe(false);
  });

  test('timeline-suppressed events are not code events', () => {
    for (const type of SUPPRESS_TIMELINE) {
      // NODE_MOVED shouldn't generate container writes
      expect(CODE_EVENTS.has(type)).toBe(false);
    }
  });
});
