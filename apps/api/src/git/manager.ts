// src/git/manager.ts — FORBINDEN real Git integration (Bun ESM + TypeScript)
// Every workspace IS a Git repository on disk.
// This module owns all file I/O and all git operations.

import { join } from 'node:path';
import {
  mkdirSync, readFileSync, writeFileSync,
  unlinkSync, renameSync, readdirSync, rmSync, statSync,
} from 'node:fs';
import { createRequire } from 'node:module';

const require     = createRequire(import.meta.url);
const simpleGit   = require('simple-git');
const chokidar    = require('chokidar');

// Repos root — can be overridden via REPOS_ROOT env var for persistent volumes
export const REPO_ROOT = process.env.REPOS_ROOT
  ? process.env.REPOS_ROOT
  : join(process.cwd(), 'repos');

mkdirSync(REPO_ROOT, { recursive: true });

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const repoPath = (wsId: string) => join(REPO_ROOT, wsId);

function git(wsId: string) {
  return simpleGit(repoPath(wsId), { config: [] });
}

// ─── ENSURE REPO ─────────────────────────────────────────────────────────────
export async function ensureRepo(
  wsId: string,
  gitUser = 'FORBINDEN Operator',
  gitEmail = 'operator@forbinden.local',
) {
  const dir    = repoPath(wsId);
  mkdirSync(dir, { recursive: true });
  const g      = git(wsId);
  const isRepo = await g.checkIsRepo().catch(() => false);

  if (!isRepo) {
    await g.init();
    await g.addConfig('user.name',  gitUser);
    await g.addConfig('user.email', gitEmail);
    writeFileSync(join(dir, '.gitignore'), '*.pyc\n__pycache__/\n.DS_Store\n*.swp\n', 'utf8');
    const files = readdirSync(dir).filter(f => f !== '.git');
    if (files.length) {
      await g.add('.');
      await g.commit('chore: initial commit [FORBINDEN]', { '--allow-empty': null });
    }
    console.log(`[git] Initialized repo: ${wsId}`);
  } else {
    await g.addConfig('user.name',  gitUser).catch(() => {});
    await g.addConfig('user.email', gitEmail).catch(() => {});
  }
  return g;
}

// ─── FILE OPERATIONS ─────────────────────────────────────────────────────────
export function readFile(wsId: string, filepath: string): string | null {
  try { return readFileSync(join(repoPath(wsId), filepath), 'utf8'); } catch { return null; }
}

export function writeFile(wsId: string, filepath: string, content: string) {
  const full = join(repoPath(wsId), filepath);
  mkdirSync(join(full, '..'), { recursive: true });
  writeFileSync(full, content, 'utf8');
}

export function deleteFile(wsId: string, filepath: string) {
  try { unlinkSync(join(repoPath(wsId), filepath)); } catch {}
}

export function renameFile(wsId: string, oldPath: string, newPath: string) {
  const from = join(repoPath(wsId), oldPath);
  const to   = join(repoPath(wsId), newPath);
  mkdirSync(join(to, '..'), { recursive: true });
  renameSync(from, to);
}

export async function listFiles(wsId: string) {
  const dir = repoPath(wsId);
  const g   = git(wsId);
  try {
    const tracked   = await g.raw(['ls-files']).then(out => out.trim().split('\n').filter(Boolean));
    const s         = await g.status();
    const untracked = (s.not_added as string[]) || [];
    const all       = [...new Set([...tracked, ...untracked])];
    return all.map(f => ({
      filepath:  f,
      size:      (() => { try { return statSync(join(dir, f)).size; } catch { return 0; } })(),
      staged:    s.staged.includes(f),
      modified:  (s.modified as string[]).includes(f),
      untracked: untracked.includes(f),
    }));
  } catch { return []; }
}

export async function listRepoPaths(wsId: string, { includeUntracked = true } = {}) {
  try {
    const args = ['ls-files', '--cached'];
    if (includeUntracked) args.push('--others', '--exclude-standard');
    args.push('-z');
    const raw = await git(wsId).raw(args);
    return raw.split('\0').map((f: string) => f.trim()).filter(Boolean);
  } catch { return []; }
}

// ─── STATUS ──────────────────────────────────────────────────────────────────
export async function status(wsId: string) {
  try {
    const s = await git(wsId).status();
    return {
      branch:    s.current,
      tracking:  s.tracking,
      ahead:     s.ahead,
      behind:    s.behind,
      staged:    s.staged,
      modified:  s.modified,
      untracked: s.not_added,
      deleted:   s.deleted,
      renamed:   s.renamed,
      clean:     s.isClean(),
    };
  } catch (e: any) { return { error: e.message }; }
}

// ─── STAGING ─────────────────────────────────────────────────────────────────
export async function stageFiles(wsId: string, files: string[] = ['.']) { await git(wsId).add(files); }
export async function unstageFile(wsId: string, filepath: string)       { await git(wsId).reset(['HEAD', '--', filepath]).catch(() => {}); }

// ─── COMMIT ──────────────────────────────────────────────────────────────────
export async function commit(wsId: string, message: string): Promise<string> {
  const g = git(wsId);
  await g.add('.');
  const result = await g.commit(message, { '--allow-empty': null });
  return result.commit;
}

// ─── LOG / GRAPH ─────────────────────────────────────────────────────────────
export async function log(wsId: string, { limit = 100, branch = '' } = {}) {
  try {
    const args = [
      '--all', `--max-count=${limit}`,
      '--pretty=format:COMMIT_SEP%H|%h|%P|%an|%ae|%ad|%s|%D',
      '--date=iso',
    ];
    if (branch) args.push(branch);
    const raw = await git(wsId).raw(['log', ...args]);
    if (!raw.trim()) return [];
    return raw.split('COMMIT_SEP').filter(Boolean).map(line => {
      const [hash, short, parents, authorName, authorEmail, date, message, refs] = line.split('|');
      return {
        hash:        hash?.trim()        || '',
        short:       short?.trim()       || '',
        parents:     parents?.trim().split(' ').filter(Boolean) || [],
        authorName:  authorName?.trim()  || '',
        authorEmail: authorEmail?.trim() || '',
        date:        date?.trim()        || '',
        message:     message?.trim()     || '',
        refs:        (refs || '').trim().split(',').map(r => r.trim()).filter(Boolean),
        branches:    (refs || '').trim().split(',').map(r => r.trim()).filter(r => r && !r.startsWith('tag:') && !r.includes('HEAD')),
        tags:        (refs || '').trim().split(',').map(r => r.trim()).filter(r => r.startsWith('tag:')).map(r => r.slice(5)),
        isHead:      (refs || '').includes('HEAD ->'),
      };
    });
  } catch { return []; }
}

export async function graphLog(wsId: string, limit = 150) {
  const commits = await log(wsId, { limit });
  if (!commits.length) return { commits: [], lanes: 0 };

  const laneMemo: Map<string, number> = new Map();
  const lanesFree: boolean[] = [];
  let maxLane = 0;

  const acquireLane = () => {
    for (let i = 0; i < lanesFree.length; i++) {
      if (lanesFree[i]) { lanesFree[i] = false; return i; }
    }
    lanesFree.push(false);
    return lanesFree.length - 1;
  };
  const releaseLane = (l: number) => { if (l < lanesFree.length) lanesFree[l] = true; };

  const annotated = commits.map(c => {
    let lane: number;
    if (laneMemo.has(c.hash)) { lane = laneMemo.get(c.hash)!; laneMemo.delete(c.hash); }
    else                       lane = acquireLane();
    maxLane = Math.max(maxLane, lane);

    c.parents.forEach((p, i) => {
      if (!laneMemo.has(p)) laneMemo.set(p, i === 0 ? lane : acquireLane());
    });
    if (c.parents.length === 0) releaseLane(lane);

    return { ...c, lane };
  });

  return { commits: annotated, lanes: maxLane + 1 };
}

// ─── DIFF ────────────────────────────────────────────────────────────────────
export async function diff(wsId: string, filepath?: string): Promise<string> {
  try { return await git(wsId).diff(filepath ? ['--', filepath] : []); } catch { return ''; }
}

export async function diffCommits(wsId: string, hashA: string, hashB = ''): Promise<string> {
  try {
    return hashB
      ? await git(wsId).diff([hashA, hashB])
      : await git(wsId).show([hashA, '--stat', '--patch']);
  } catch (e: any) { return e.message; }
}

export async function showFileAtCommit(wsId: string, filepath: string, hash: string): Promise<string | null> {
  try { return await git(wsId).show([`${hash}:${filepath}`]); } catch { return null; }
}

// ─── BLAME ────────────────────────────────────────────────────────────────────
export async function blame(wsId: string, filepath: string) {
  try {
    const raw    = await git(wsId).raw(['blame', '--porcelain', '--', filepath]);
    const lines  = raw.split('\n');
    const result: any[] = [];
    let cur: Record<string, any> = {};
    for (const line of lines) {
      if (/^[0-9a-f]{40}/.test(line)) {
        const p = line.split(' ');
        cur = { hash: p[0], origLine: parseInt(p[1]), finalLine: parseInt(p[2]) };
      } else if (line.startsWith('author '))       cur['author']  = line.slice(7);
      else if (line.startsWith('author-mail '))     cur['email']   = line.slice(13).replace(/[<>]/g, '');
      else if (line.startsWith('summary '))         cur['message'] = line.slice(8);
      else if (line.startsWith('\t')) { result.push({ ...cur, content: line.slice(1) }); cur = {}; }
    }
    return result;
  } catch { return []; }
}

// ─── BRANCHES ────────────────────────────────────────────────────────────────
export async function listBranches(wsId: string) {
  try {
    const b = await git(wsId).branch(['-a', '-v']);
    return {
      current: b.current,
      all: Object.values(b.branches).map((br: any) => ({
        name:    br.name,
        current: br.current,
        commit:  br.commit,
        label:   br.label,
        remote:  br.name.startsWith('remotes/'),
      })),
    };
  } catch { return { current: 'main', all: [] }; }
}

export async function createBranch(wsId: string, name: string, fromHash = '') {
  const g    = git(wsId);
  const args = fromHash ? [name, fromHash] : [name];
  await g.checkoutLocalBranch(name).catch(() => g.branch(args));
}

export async function checkoutBranch(wsId: string, name: string) { await git(wsId).checkout(name); }
export async function deleteBranch(wsId: string, name: string, force = false) { await git(wsId).deleteLocalBranch(name, force); }
export async function mergeBranch(wsId: string, sourceBranch: string, message?: string) {
  const args = message ? [sourceBranch, '-m', message] : [sourceBranch];
  return await git(wsId).merge(args);
}

// ─── TAGS ────────────────────────────────────────────────────────────────────
export async function listTags(wsId: string) {
  try { return (await git(wsId).tags()).all; } catch { return []; }
}
export async function createTag(wsId: string, tagName: string, message = '') {
  const g = git(wsId);
  if (message) await g.addAnnotatedTag(tagName, message);
  else         await g.addTag(tagName);
}
export async function deleteTag(wsId: string, tagName: string) { await git(wsId).raw(['tag', '-d', tagName]); }

// ─── STASH ────────────────────────────────────────────────────────────────────
export async function stashPush(wsId: string, message = '')  { return await git(wsId).stash(message ? ['push', '-m', message] : ['push']); }
export async function stashPop(wsId: string, index = 0)      { return await git(wsId).stash(['pop', `stash@{${index}}`]); }
export async function stashList(wsId: string)                 { try { return (await git(wsId).stashList()).all || []; } catch { return []; } }

// ─── REMOTE ──────────────────────────────────────────────────────────────────
export async function setRemote(wsId: string, url: string) {
  const g       = git(wsId);
  const remotes = await g.getRemotes();
  if ((remotes as any[]).find(r => r.name === 'origin')) await g.remote(['set-url', 'origin', url]);
  else                                                    await g.addRemote('origin', url);
}
export async function getRemotes(wsId: string) { try { return await git(wsId).getRemotes(true); } catch { return []; } }
export async function push(wsId: string, remote = 'origin', branch = '') {
  const g = git(wsId);
  const b = branch || (await g.status()).current;
  return await g.push(remote, b, ['--set-upstream']);
}
export async function pull(wsId: string, remote = 'origin', branch = '') {
  const g = git(wsId);
  const b = branch || (await g.status()).current;
  return await g.pull(remote, b);
}
export async function fetch(wsId: string, remote = 'origin') { return await git(wsId).fetch(remote, ['--prune', '--tags']); }
export async function cloneRemote(wsId: string, remoteUrl: string) {
  const dir    = repoPath(wsId);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const parent = join(dir, '..');
  await simpleGit(parent).clone(remoteUrl, wsId);
  await git(wsId).fetch(['--all', '--tags', '--prune']).catch(() => {});
}

// ─── RESET / REVERT ──────────────────────────────────────────────────────────
export async function resetToCommit(wsId: string, hash: string, mode = 'mixed') { await git(wsId).reset([`--${mode}`, hash]); }
export async function revertCommit(wsId: string, hash: string)  { return await git(wsId).revert([hash, '--no-commit']); }
export async function checkoutFileAtCommit(wsId: string, filepath: string, hash: string) { await git(wsId).checkout([hash, '--', filepath]); }

// ─── SHOW COMMIT ─────────────────────────────────────────────────────────────
export async function showCommit(wsId: string, hash: string) {
  try {
    const g       = git(wsId);
    const stat    = await g.show([hash, '--stat', '--no-patch']);
    const patch   = await g.show([hash, '--patch', '--no-stat']);
    const filesRaw = await g.raw(['diff-tree', '--no-commit-id', '-r', '--name-status', hash]);
    const changes = filesRaw.trim().split('\n').filter(Boolean).map(line => {
      const [status, ...rest] = line.split('\t');
      return { status, filepath: rest.join('\t') };
    });
    return { hash, stat, patch, changes };
  } catch (e: any) { return { hash, error: e.message }; }
}

export async function searchCommits(wsId: string, query: string) {
  try {
    const raw = await git(wsId).raw(['log', '--all', `--grep=${query}`, '-i', '--pretty=format:%H|%h|%an|%ad|%s', '--date=short']);
    return raw.trim().split('\n').filter(Boolean).map(line => {
      const [hash, short, author, date, ...msgParts] = line.split('|');
      return { hash, short, author, date, message: msgParts.join('|') };
    });
  } catch { return []; }
}

// ─── FILE WATCHER ─────────────────────────────────────────────────────────────
const watchers = new Map<string, any>();

export function watchRepo(wsId: string, onChanged: (fp: string) => void) {
  if (watchers.has(wsId)) return;
  const dir = repoPath(wsId);
  const w   = chokidar.watch(dir, {
    ignored:          /(^|[/\\])\.git([/\\]|$)/,
    persistent:       true,
    ignoreInitial:    true,
    awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 100 },
  });
  const rel = (fp: string) => fp.replace(dir + '/', '');
  w.on('change', (fp: string) => onChanged(rel(fp)));
  w.on('add',    (fp: string) => onChanged(rel(fp)));
  w.on('unlink', (fp: string) => onChanged(rel(fp)));
  watchers.set(wsId, w);
}

export function unwatchRepo(wsId: string) {
  const w = watchers.get(wsId);
  if (w) { w.close(); watchers.delete(wsId); }
}

// ─── REPO SYNC (db ↔ disk) ───────────────────────────────────────────────────
import { db } from '../db/index.ts';
import { nodes, workspaces } from '../db/schema.ts';
import { eq } from 'drizzle-orm';
import { extname, basename } from 'node:path';

function inferNodeType(filepath: string) {
  const name = basename(filepath).toLowerCase();
  if (/^(index|main|app|server|entry|cli)\./.test(name)) return 'entry';
  if (/\.(md|txt|json|ya?ml|toml|ini|env|lock)$/i.test(name)) return 'note';
  return 'function';
}

function inferThemeIdx(filepath: string) {
  let hash = 0;
  for (const ch of filepath) hash = (hash * 31 + ch.charCodeAt(0)) % 7;
  return hash;
}

function layoutForIndex(index: number) {
  const cols = 6, gapX = 180, gapY = 130;
  const col  = index % cols;
  const row  = Math.floor(index / cols);
  return { x: (col - Math.floor(cols / 2)) * gapX, y: row * gapY - 120 };
}

export async function syncWorkspaceRepo(wsId: string) {
  const filepaths = await listRepoPaths(wsId);
  const normalized = [...new Set(
    filepaths.map(fp => String(fp || '').replace(/\\/g, '/').replace(/^\.\//, '').trim()).filter(Boolean).sort(),
  )];

  const existing = await db.query.nodes.findMany({ where: eq(nodes.workspaceId, wsId) });
  const byPath   = new Map(existing.map(n => [n.filepath, n]));
  const keep     = new Set(normalized);

  // Delete nodes whose files are gone
  for (const node of existing) {
    if (!keep.has(node.filepath)) await db.delete(nodes).where(eq(nodes.id, node.id));
  }

  // Upsert new files
  for (const [index, filepath] of normalized.entries()) {
    const label   = basename(filepath) || filepath;
    const current = byPath.get(filepath);
    if (current) {
      if (current.label !== label || current.modified) {
        await db.update(nodes).set({ label, modified: false, updatedAt: new Date().toISOString() }).where(eq(nodes.id, current.id));
      }
      continue;
    }
    const pos = layoutForIndex(index);
    await db.insert(nodes).values({
      id:          'n_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12),
      workspaceId: wsId,
      label,
      filepath,
      type:     extname(filepath) === '.md' ? 'note' : inferNodeType(filepath),
      isMain:   /^(index|main|app|server)\./i.test(label),
      x:        pos.x,
      y:        pos.y,
      themeIdx: inferThemeIdx(filepath),
      modified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).onConflictDoNothing();
  }

  // Mark all clean
  await db.update(nodes).set({ modified: false, updatedAt: new Date().toISOString() }).where(eq(nodes.workspaceId, wsId));
  return db.query.nodes.findMany({ where: eq(nodes.workspaceId, wsId), orderBy: nodes.createdAt });
}
