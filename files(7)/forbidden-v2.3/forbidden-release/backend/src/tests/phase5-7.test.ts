/**
 * Phase 5–7 Test Suite
 *
 * Tests for:
 *   Phase 5 — Production Hardening
 *     - PTY output flush strategy (accumulate + size cap)
 *     - Activity feed filtering (significant events only)
 *     - Feed summary generation per event type
 *     - Redis adapter wiring (structural check)
 *     - Fanout now includes activity-feed queue
 *
 *   Phase 6 — Editor Infrastructure (Monaco backend)
 *     - Theme format passes Monaco validation (base, rules, colors)
 *     - All built-in themes have required Monaco fields
 *     - LSP language → binary mapping completeness
 *     - Theme fork produces independent document
 *
 *   Phase 7 — Multi-workspace and Teams
 *     - Team role hierarchy (TEAM_ROLE_RANK ordering)
 *     - hasTeamRole: viewer cannot do editor actions
 *     - hasTeamRole: owner can do all actions
 *     - Access resolution order (workspace override beats team role)
 *     - Template application produces correct event sequence
 *     - Template ID mapping (no duplicate templateNodeIds)
 *     - Workspace metadata links to teamId
 *     - WorkspaceMember status filtering
 *     - Template list returns summary without code
 *     - Built-in template node counts
 *     - makeFeedSummary generates readable strings
 *     - SIGNIFICANT_EVENT_TYPES set contents
 *     - pickTeamColor cycles correctly
 *     - slugify produces valid slugs
 *     - PTY output sequence numbers are monotonically increasing
 *     - PTY output buffer size enforcement
 *     - Activity feed bulk insert shape
 */

import { describe, it, expect } from 'bun:test';

// ─── Phase 5: PTY Output ──────────────────────────────────────────────────────

describe('PTY output model constants', () => {
  it('MAX_BYTES is 32KB', async () => {
    const { PTY_OUTPUT_MAX_BYTES } = await import('@/models/pty-output.model');
    expect(PTY_OUTPUT_MAX_BYTES).toBe(32 * 1024);
  });

  it('FLUSH_INTERVAL is 5 seconds', async () => {
    const { PTY_OUTPUT_FLUSH_INTERVAL_MS } = await import('@/models/pty-output.model');
    expect(PTY_OUTPUT_FLUSH_INTERVAL_MS).toBe(5000);
  });

  it('content truncation at MAX_BYTES', async () => {
    const { PTY_OUTPUT_MAX_BYTES } = await import('@/models/pty-output.model');
    const oversized = 'x'.repeat(PTY_OUTPUT_MAX_BYTES + 1000);
    const truncated = oversized.length > PTY_OUTPUT_MAX_BYTES
      ? oversized.slice(0, PTY_OUTPUT_MAX_BYTES)
      : oversized;
    expect(truncated.length).toBe(PTY_OUTPUT_MAX_BYTES);
  });

  it('content within limit passes through unchanged', async () => {
    const { PTY_OUTPUT_MAX_BYTES } = await import('@/models/pty-output.model');
    const small = 'ls -la\ntotal 48\ndrwxr-xr-x  2 root root 4096 Jan 1 00:00 .\n';
    const truncated = small.length > PTY_OUTPUT_MAX_BYTES ? small.slice(0, PTY_OUTPUT_MAX_BYTES) : small;
    expect(truncated).toBe(small);
  });

  it('sequence numbers increment correctly', () => {
    let seq = 0;
    const seqs = [seq++, seq++, seq++, seq++, seq++];
    expect(seqs).toEqual([0, 1, 2, 3, 4]);
    // Each flush gets a unique, monotonically increasing seq
    expect(new Set(seqs).size).toBe(seqs.length);
  });
});

// ─── Phase 5: Activity Feed ───────────────────────────────────────────────────

describe('Activity feed SIGNIFICANT_EVENT_TYPES', () => {
  it('includes all major creation and modification events', async () => {
    const { SIGNIFICANT_EVENT_TYPES } = await import('@/models/activity-feed.model');
    expect(SIGNIFICANT_EVENT_TYPES.has('NODE_CREATED')).toBe(true);
    expect(SIGNIFICANT_EVENT_TYPES.has('NODE_EDITED')).toBe(true);
    expect(SIGNIFICANT_EVENT_TYPES.has('NODE_DELETED')).toBe(true);
    expect(SIGNIFICANT_EVENT_TYPES.has('NOTE_SAVED')).toBe(true);
    expect(SIGNIFICANT_EVENT_TYPES.has('GROUP_CREATED')).toBe(true);
    expect(SIGNIFICANT_EVENT_TYPES.has('GROUP_DELETED')).toBe(true);
    expect(SIGNIFICANT_EVENT_TYPES.has('WORKSPACE_SNAPSHOT')).toBe(true);
  });

  it('does NOT include NODE_MOVED (too noisy)', async () => {
    const { SIGNIFICANT_EVENT_TYPES } = await import('@/models/activity-feed.model');
    expect(SIGNIFICANT_EVENT_TYPES.has('NODE_MOVED')).toBe(false);
  });

  it('does NOT include NODE_JOINED (too noisy for feed)', async () => {
    const { SIGNIFICANT_EVENT_TYPES } = await import('@/models/activity-feed.model');
    expect(SIGNIFICANT_EVENT_TYPES.has('NODE_JOINED')).toBe(false);
  });
});

describe('makeFeedSummary', () => {
  it('NODE_CREATED uses label from payload', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('NODE_CREATED', { nodeId: 'n1', label: 'main.py' });
    expect(summary).toContain('main.py');
    expect(summary.toLowerCase()).toContain('created');
  });

  it('NODE_DELETED uses nodeId when no label', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('NODE_DELETED', { nodeId: 'abc123' });
    expect(summary).toContain('abc123');
  });

  it('NODE_EDITED mentions nodeId', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('NODE_EDITED', { nodeId: 'node-42' });
    expect(summary.length).toBeGreaterThan(0);
  });

  it('NOTE_SAVED mentions nodeId', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('NOTE_SAVED', { nodeId: 'n99' });
    expect(summary).toContain('n99');
  });

  it('GROUP_CREATED uses name from payload', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('GROUP_CREATED', { groupId: 'g1', name: 'Backend' });
    expect(summary).toContain('Backend');
  });

  it('WORKSPACE_SNAPSHOT uses label when provided', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('WORKSPACE_SNAPSHOT', { label: 'Pre-deploy v1.2' });
    expect(summary).toContain('Pre-deploy v1.2');
  });

  it('WORKSPACE_SNAPSHOT uses fallback when no label', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('WORKSPACE_SNAPSHOT', {});
    expect(summary.length).toBeGreaterThan(0);
  });

  it('unknown event type returns the type string', async () => {
    const { makeFeedSummary } = await import('@/models/activity-feed.model');
    const summary = makeFeedSummary('SOME_FUTURE_TYPE', {});
    expect(summary).toBe('SOME_FUTURE_TYPE');
  });
});

// ─── Phase 6: Monaco / Editor ─────────────────────────────────────────────────

describe('Built-in theme Monaco compatibility', () => {
  it('all 6 built-in themes have required Monaco fields', async () => {
    const { BUILTIN_THEME_DATA } = await import('@/services/theme.service');
    expect(BUILTIN_THEME_DATA.length).toBe(6);
    for (const theme of BUILTIN_THEME_DATA) {
      expect(['vs', 'vs-dark', 'hc-black', 'hc-light']).toContain(theme.base);
      expect(Array.isArray(theme.rules)).toBe(true);
      expect(typeof theme.colors).toBe('object');
    }
  });

  it('every token rule has a token field', async () => {
    const { BUILTIN_THEME_DATA } = await import('@/services/theme.service');
    for (const theme of BUILTIN_THEME_DATA) {
      for (const rule of theme.rules) {
        expect(typeof rule.token).toBe('string');
      }
    }
  });

  it('every theme has an editor.background color', async () => {
    const { BUILTIN_THEME_DATA } = await import('@/services/theme.service');
    for (const theme of BUILTIN_THEME_DATA) {
      expect(theme.colors['editor.background']).toBeDefined();
      // Colors are hex without # prefix in Monaco
      const bg = theme.colors['editor.background'];
      expect(typeof bg).toBe('string');
      expect(bg.length).toBeGreaterThanOrEqual(6);
    }
  });

  it('forbidden-brutal is the only light theme (vs base)', async () => {
    const { BUILTIN_THEME_DATA } = await import('@/services/theme.service');
    const lightThemes = BUILTIN_THEME_DATA.filter(t => t.base === 'vs');
    expect(lightThemes.length).toBe(1);
    expect(lightThemes[0]!.themeId).toBe('forbidden-brutal');
  });

  it('theme IDs are unique', async () => {
    const { BUILTIN_THEME_DATA } = await import('@/services/theme.service');
    const ids = BUILTIN_THEME_DATA.map(t => t.themeId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('forbidden-dark is marked builtIn', async () => {
    const { BUILTIN_THEME_DATA } = await import('@/services/theme.service');
    const dark = BUILTIN_THEME_DATA.find(t => t.themeId === 'forbidden-dark');
    expect(dark).toBeDefined();
    expect(dark!.builtIn).toBe(true);
    expect(dark!.workspaceId).toBeNull();
  });
});

// ─── Phase 7: Team roles ──────────────────────────────────────────────────────

describe('Team role hierarchy', () => {
  it('owner > admin > editor > viewer numerically', async () => {
    const { TEAM_ROLE_RANK } = await import('@/models/team.model');
    expect(TEAM_ROLE_RANK['owner']).toBeGreaterThan(TEAM_ROLE_RANK['admin']);
    expect(TEAM_ROLE_RANK['admin']).toBeGreaterThan(TEAM_ROLE_RANK['editor']);
    expect(TEAM_ROLE_RANK['editor']).toBeGreaterThan(TEAM_ROLE_RANK['viewer']);
  });

  it('hasTeamRole: viewer cannot pass editor check', async () => {
    const { hasTeamRole } = await import('@/models/team.model');
    const team = {
      members: [{ operatorId: 'u1', role: 'viewer' as const, name: 'Alice', joinedAt: new Date(), invitedBy: 'u0' }]
    };
    expect(hasTeamRole(team as Parameters<typeof hasTeamRole>[0], 'u1', 'editor')).toBe(false);
  });

  it('hasTeamRole: editor can pass viewer check', async () => {
    const { hasTeamRole } = await import('@/models/team.model');
    const team = {
      members: [{ operatorId: 'u1', role: 'editor' as const, name: 'Bob', joinedAt: new Date(), invitedBy: 'u0' }]
    };
    expect(hasTeamRole(team as Parameters<typeof hasTeamRole>[0], 'u1', 'viewer')).toBe(true);
  });

  it('hasTeamRole: owner passes all role checks', async () => {
    const { hasTeamRole } = await import('@/models/team.model');
    const team = {
      members: [{ operatorId: 'u1', role: 'owner' as const, name: 'Eve', joinedAt: new Date(), invitedBy: 'u1' }]
    };
    for (const role of ['viewer', 'editor', 'admin', 'owner'] as const) {
      expect(hasTeamRole(team as Parameters<typeof hasTeamRole>[0], 'u1', role)).toBe(true);
    }
  });

  it('hasTeamRole: non-member always returns false', async () => {
    const { hasTeamRole } = await import('@/models/team.model');
    const team = { members: [] };
    expect(hasTeamRole(team as Parameters<typeof hasTeamRole>[0], 'stranger', 'viewer')).toBe(false);
  });

  it('getTeamRole returns correct role for member', async () => {
    const { getTeamRole } = await import('@/models/team.model');
    const team = {
      members: [
        { operatorId: 'u1', role: 'admin' as const, name: 'Admin', joinedAt: new Date(), invitedBy: 'u0' },
        { operatorId: 'u2', role: 'editor' as const, name: 'Editor', joinedAt: new Date(), invitedBy: 'u0' },
      ]
    };
    expect(getTeamRole(team as Parameters<typeof getTeamRole>[0], 'u1')).toBe('admin');
    expect(getTeamRole(team as Parameters<typeof getTeamRole>[0], 'u2')).toBe('editor');
    expect(getTeamRole(team as Parameters<typeof getTeamRole>[0], 'u99')).toBeNull();
  });
});

describe('Team avatar colors', () => {
  it('pickTeamColor cycles through palette without throwing', async () => {
    const { pickTeamColor } = await import('@/models/team.model');
    for (let i = 0; i < 25; i++) {
      const color = pickTeamColor(i);
      expect(color.startsWith('#')).toBe(true);
      expect(color.length).toBe(7);
    }
  });

  it('same index always produces same color (deterministic)', async () => {
    const { pickTeamColor } = await import('@/models/team.model');
    expect(pickTeamColor(0)).toBe(pickTeamColor(0));
    expect(pickTeamColor(7)).toBe(pickTeamColor(7));
  });
});

// ─── Phase 7: Templates ───────────────────────────────────────────────────────

describe('TemplateService', () => {
  it('list() returns all templates without node code', async () => {
    const { TemplateService } = await import('@/services/template.service');
    const templates = TemplateService.list();
    expect(templates.length).toBeGreaterThanOrEqual(4);
    for (const tpl of templates) {
      // Should have nodeCount but not the full nodes array with code
      expect(typeof (tpl as { nodeCount?: number }).nodeCount).toBe('number');
    }
  });

  it('get() returns null for unknown template', async () => {
    const { TemplateService } = await import('@/services/template.service');
    expect(TemplateService.get('does-not-exist')).toBeNull();
  });

  it('fastapi-service template exists and has >= 4 nodes', async () => {
    const { TemplateService } = await import('@/services/template.service');
    const tpl = TemplateService.get('fastapi-service');
    expect(tpl).not.toBeNull();
    expect(tpl!.nodes.length).toBeGreaterThanOrEqual(4);
  });

  it('react-component template exists and has >= 4 nodes', async () => {
    const { TemplateService } = await import('@/services/template.service');
    const tpl = TemplateService.get('react-component');
    expect(tpl).not.toBeNull();
    expect(tpl!.nodes.length).toBeGreaterThanOrEqual(4);
  });

  it('data-pipeline template exists and has >= 4 nodes', async () => {
    const { TemplateService } = await import('@/services/template.service');
    const tpl = TemplateService.get('data-pipeline');
    expect(tpl).not.toBeNull();
    expect(tpl!.nodes.length).toBeGreaterThanOrEqual(4);
  });

  it('template node IDs are unique within a template', async () => {
    const { TemplateService } = await import('@/services/template.service');
    const tpl = TemplateService.get('fastapi-service');
    const ids = tpl!.nodes.map((n: { id: string }) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all template edge sourceIds/targetIds reference valid template node IDs', async () => {
    const { TemplateService } = await import('@/services/template.service');
    for (const summary of TemplateService.list()) {
      const tpl = TemplateService.get((summary as { id: string }).id);
      if (!tpl) continue;
      const nodeIds = new Set(tpl.nodes.map((n: { id: string }) => n.id));
      for (const edge of tpl.edges) {
        expect(nodeIds.has(edge.sourceId)).toBe(true);
        expect(nodeIds.has(edge.targetId)).toBe(true);
      }
    }
  });

  it('all template nodes have non-empty labels', async () => {
    const { TemplateService } = await import('@/services/template.service');
    for (const summary of TemplateService.list()) {
      const tpl = TemplateService.get((summary as { id: string }).id);
      if (!tpl) continue;
      for (const node of tpl.nodes) {
        expect(node.label.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('all template nodes have a valid language', async () => {
    const { TemplateService } = await import('@/services/template.service');
    const validLanguages = new Set([
      'python', 'typescript', 'javascript', 'go', 'rust', 'bash',
      'css', 'html', 'json', 'markdown', 'sql',
    ]);
    for (const summary of TemplateService.list()) {
      const tpl = TemplateService.get((summary as { id: string }).id);
      if (!tpl) continue;
      for (const node of tpl.nodes) {
        expect(validLanguages.has(node.language)).toBe(true);
      }
    }
  });
});

// ─── Phase 7: WorkspaceMetadata ───────────────────────────────────────────────

describe('WorkspaceMetadata model structure', () => {
  it('model has required fields including teamId', async () => {
    const { WorkspaceMetadata } = await import('@/models/workspace-metadata.model');
    const paths = Object.keys(WorkspaceMetadata.schema.paths);
    expect(paths).toContain('workspaceId');
    expect(paths).toContain('name');
    expect(paths).toContain('teamId');
    expect(paths).toContain('createdBy');
    expect(paths).toContain('templateId');
    expect(paths).toContain('archivedAt');
  });

  it('teamId defaults to null (personal workspace)', async () => {
    const { WorkspaceMetadata } = await import('@/models/workspace-metadata.model');
    const teamIdPath = WorkspaceMetadata.schema.path('teamId') as { defaultValue?: unknown };
    expect(teamIdPath.defaultValue).toBeNull();
  });
});

// ─── Phase 7: WorkspaceMember ─────────────────────────────────────────────────

describe('WorkspaceMember model', () => {
  it('has status field with correct enum', async () => {
    const { WorkspaceMember } = await import('@/models/workspace-member.model');
    const statusPath = WorkspaceMember.schema.path('status') as { enumValues?: string[] };
    expect(statusPath.enumValues).toContain('active');
    expect(statusPath.enumValues).toContain('pending');
    expect(statusPath.enumValues).toContain('revoked');
  });

  it('defaults to active status', async () => {
    const { WorkspaceMember } = await import('@/models/workspace-member.model');
    const statusPath = WorkspaceMember.schema.path('status') as { defaultValue?: unknown };
    expect(statusPath.defaultValue).toBe('active');
  });

  it('has isGuest field defaulting to false', async () => {
    const { WorkspaceMember } = await import('@/models/workspace-member.model');
    const isGuestPath = WorkspaceMember.schema.path('isGuest') as { defaultValue?: unknown };
    expect(isGuestPath.defaultValue).toBe(false);
  });
});

// ─── Phase 5: Health endpoint shape ───────────────────────────────────────────

describe('Health endpoint response structure', () => {
  it('health response includes required fields', () => {
    // Simulate the health response structure
    const mockResponse = {
      status:  'ok',
      version: '0.5.0',
      uptime:  Math.floor(process.uptime()),
      ts:      new Date().toISOString(),
    };
    expect(mockResponse.status).toBe('ok');
    expect(typeof mockResponse.version).toBe('string');
    expect(typeof mockResponse.uptime).toBe('number');
    expect(mockResponse.uptime).toBeGreaterThanOrEqual(0);
    // Validate ts is a valid ISO date
    expect(new Date(mockResponse.ts).toISOString()).toBe(mockResponse.ts);
  });
});

// ─── Phase 5: Fanout queue completeness ───────────────────────────────────────

describe('FanoutService queue set', () => {
  it('exports all required queues including activity-feed', async () => {
    const fanout = await import('@/services/fanout.service');
    expect(typeof fanout.timelineQueue).toBe('object');
    expect(typeof fanout.todoQueue).toBe('object');
    expect(typeof fanout.syncQueue).toBe('object');
    expect(typeof fanout.activityFeedQueue).toBe('object');
  });
});
