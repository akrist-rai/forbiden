const Router = require('@koa/router');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');

const router = new Router({ prefix: '/api/repo' });

const REPO_ROOT = path.resolve(__dirname, '../../data/repos');
const META_FILE = path.join(REPO_ROOT, '.workspaces.json');
const MAX_TREE_FILES = 400;

function normalizeGithubUrl(raw = '') {
  const value = String(raw).trim();
  const m = value.match(/^https:\/\/github\.com\/([^\/\s]+)\/([^\/\s]+?)(?:\.git)?\/?$/i);
  if (!m) return null;
  const owner = m[1];
  const repo = m[2];
  return {
    owner,
    repo,
    canonical: `https://github.com/${owner}/${repo}.git`
  };
}

function workspaceIdFromRepo(owner, repo) {
  return `${owner}__${repo}`.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
}

function workspacePath(workspaceId) {
  const id = String(workspaceId || '').trim();
  const abs = path.resolve(REPO_ROOT, id);
  if (!abs.startsWith(REPO_ROOT)) return null;
  return abs;
}

function runGit(args, cwd) {
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd, timeout: 120000, maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error((stderr || stdout || error.message || 'git command failed').trim()));
        return;
      }
      resolve((stdout || '').trim());
    });
  });
}

function isIgnoredDir(name) {
  return ['.git', 'node_modules', '.next', 'dist', 'build', '.cache', '.turbo'].includes(name);
}

async function listFilesRecursive(rootDir) {
  const results = [];

  async function walk(current) {
    if (results.length >= MAX_TREE_FILES) return;
    const entries = await fsp.readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      if (results.length >= MAX_TREE_FILES) return;
      if (entry.isDirectory()) {
        if (isIgnoredDir(entry.name)) continue;
        await walk(path.join(current, entry.name));
        continue;
      }
      if (!entry.isFile()) continue;

      const abs = path.join(current, entry.name);
      const rel = path.relative(rootDir, abs).replace(/\\/g, '/');
      results.push(rel);
    }
  }

  await walk(rootDir);
  return { files: results, truncated: results.length >= MAX_TREE_FILES };
}

function safeJoinFile(rootDir, relPath) {
  const safeRel = String(relPath || '').replace(/^\/+/, '');
  const abs = path.resolve(rootDir, safeRel);
  if (!abs.startsWith(rootDir)) return null;
  return abs;
}

async function loadWorkspaceMeta() {
  try {
    const raw = await fsp.readFile(META_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch (_) {
    return {};
  }
}

async function saveWorkspaceMeta(meta) {
  await fsp.mkdir(REPO_ROOT, { recursive: true });
  await fsp.writeFile(META_FILE, JSON.stringify(meta, null, 2), 'utf8');
}

async function getWorkspaceMeta(workspaceId) {
  const all = await loadWorkspaceMeta();
  return all[String(workspaceId || '').trim()] || null;
}

async function setWorkspaceMeta(workspaceId, value) {
  const all = await loadWorkspaceMeta();
  all[workspaceId] = value;
  await saveWorkspaceMeta(all);
}

function toAuthedRemoteUrl(repo, token) {
  if (!repo || !token) return null;
  return `https://x-access-token:${encodeURIComponent(token)}@github.com/${repo.owner}/${repo.name}.git`;
}

async function ensureGitIdentity(wsPath, username) {
  const safeUser = String(username || 'forbiden-bot').trim() || 'forbiden-bot';
  const email = `${safeUser.replace(/[^a-zA-Z0-9._-]/g, '') || 'forbiden'}@users.noreply.github.com`;
  await runGit(['config', 'user.name', safeUser], wsPath);
  await runGit(['config', 'user.email', email], wsPath);
}

async function parseStatus(wsPath) {
  const branchLine = await runGit(['rev-parse', '--abbrev-ref', 'HEAD'], wsPath);
  const porcelain = await runGit(['status', '--porcelain'], wsPath);

  let ahead = 0;
  let behind = 0;
  try {
    const counts = await runGit(['rev-list', '--left-right', '--count', '@{upstream}...HEAD'], wsPath);
    const [left, right] = counts.split(/\s+/).map((v) => parseInt(v, 10) || 0);
    behind = left;
    ahead = right;
  } catch (_) {}

  const changes = porcelain
    ? porcelain
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const status = line.slice(0, 2);
          const file = line.slice(3).trim();
          return { status, path: file };
        })
    : [];

  return {
    branch: branchLine,
    ahead,
    behind,
    changes,
    clean: changes.length === 0
  };
}

async function gitCommitPush({ wsPath, workspaceMeta, username, message, allowEmptyMessage = false }) {
  await ensureGitIdentity(wsPath, username);

  await runGit(['add', '--all'], wsPath);

  const status = await parseStatus(wsPath);
  if (status.clean) {
    return { committed: false, pushed: false, message: 'No changes to commit.' };
  }

  const commitMessage = String(message || '').trim() || (allowEmptyMessage ? 'sync changes' : '[forbiden] sync file change');
  await runGit(['commit', '-m', commitMessage], wsPath);

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  const authed = toAuthedRemoteUrl(workspaceMeta.repo, token);
  if (!authed) {
    return { committed: true, pushed: false, message: 'Committed locally. Set GITHUB_TOKEN for push.' };
  }

  await runGit(['push', authed, workspaceMeta.branch], wsPath);
  const commitSha = await runGit(['rev-parse', 'HEAD'], wsPath);

  return { committed: true, pushed: true, sha: commitSha };
}

router.post('/connect', async (ctx) => {
  const { repoUrl, branch } = ctx.request.body || {};
  const repo = normalizeGithubUrl(repoUrl);

  if (!repo) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid GitHub URL. Use https://github.com/<owner>/<repo>' };
    return;
  }

  const requestedBranch = String(branch || '').trim();
  const branchCandidates = requestedBranch ? [requestedBranch] : ['main', 'master'];
  const workspaceId = workspaceIdFromRepo(repo.owner, repo.repo);
  const wsPath = workspacePath(workspaceId);

  if (!wsPath) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid workspace.' };
    return;
  }

  await fsp.mkdir(REPO_ROOT, { recursive: true });

  try {
    let connectedBranch = branchCandidates[0];
    let lastError = null;

    for (const candidate of branchCandidates) {
      try {
        if (fs.existsSync(path.join(wsPath, '.git'))) {
          await runGit(['fetch', 'origin', candidate, '--depth', '1'], wsPath);
          await runGit(['checkout', candidate], wsPath);
          await runGit(['pull', '--ff-only', 'origin', candidate], wsPath);
        } else {
          await fsp.rm(wsPath, { recursive: true, force: true });
          await runGit(['clone', '--depth', '1', '--branch', candidate, repo.canonical, wsPath], REPO_ROOT);
        }
        connectedBranch = await runGit(['rev-parse', '--abbrev-ref', 'HEAD'], wsPath);
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (lastError) throw lastError;

    await setWorkspaceMeta(workspaceId, {
      repo: { owner: repo.owner, name: repo.repo, canonical: repo.canonical },
      branch: connectedBranch,
      updatedAt: new Date().toISOString()
    });

    const tree = await listFilesRecursive(wsPath);
    const status = await parseStatus(wsPath);
    ctx.body = {
      ok: true,
      workspaceId,
      branch: connectedBranch,
      repo: { owner: repo.owner, name: repo.repo, url: repo.canonical },
      fileCount: tree.files.length,
      truncated: tree.truncated,
      scm: status
    };
  } catch (error) {
    ctx.status = 502;
    ctx.body = { error: error.message || 'Failed to connect repository.' };
  }
});

router.get('/tree', async (ctx) => {
  const wsPath = workspacePath(ctx.query.workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const tree = await listFilesRecursive(wsPath);
  ctx.body = { ok: true, files: tree.files, truncated: tree.truncated };
});

router.get('/file', async (ctx) => {
  const wsPath = workspacePath(ctx.query.workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const abs = safeJoinFile(wsPath, ctx.query.path);
  if (!abs || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
    ctx.status = 404;
    ctx.body = { error: 'File not found.' };
    return;
  }

  try {
    const content = await fsp.readFile(abs, 'utf8');
    ctx.body = { ok: true, path: ctx.query.path, content };
  } catch (_) {
    ctx.status = 415;
    ctx.body = { error: 'Unable to read file as UTF-8 text.' };
  }
});

router.put('/file', async (ctx) => {
  const { workspaceId, path: relPath, content, username, commitMessage } = ctx.request.body || {};
  const wsPath = workspacePath(workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const abs = safeJoinFile(wsPath, relPath);
  if (!abs) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid file path.' };
    return;
  }

  const meta = await getWorkspaceMeta(workspaceId);
  if (!meta) {
    ctx.status = 400;
    ctx.body = { error: 'Workspace metadata missing. Reconnect repository.' };
    return;
  }

  await fsp.mkdir(path.dirname(abs), { recursive: true });
  await fsp.writeFile(abs, String(content ?? ''), 'utf8');

  try {
    const sync = await gitCommitPush({
      wsPath,
      workspaceMeta: meta,
      username,
      message: commitMessage || `[forbiden] update ${relPath}`,
      allowEmptyMessage: true
    });

    const scm = await parseStatus(wsPath);
    ctx.body = { ok: true, path: relPath, sync, scm };
  } catch (error) {
    ctx.status = 502;
    ctx.body = { error: error.message || 'Save committed locally but push failed.' };
  }
});

router.get('/scm/status', async (ctx) => {
  const wsPath = workspacePath(ctx.query.workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }
  const status = await parseStatus(wsPath);
  ctx.body = { ok: true, ...status };
});

router.get('/scm/log', async (ctx) => {
  const wsPath = workspacePath(ctx.query.workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const limit = Math.min(Math.max(parseInt(ctx.query.limit, 10) || 20, 1), 100);
  const out = await runGit(['log', `-n${limit}`, '--pretty=format:%H|%h|%an|%ar|%s'], wsPath);
  const commits = out
    ? out.split('\n').map((line) => {
        const [sha, shortSha, author, when, subject] = line.split('|');
        return { sha, shortSha, author, when, subject };
      })
    : [];

  ctx.body = { ok: true, commits };
});

router.get('/scm/branches', async (ctx) => {
  const wsPath = workspacePath(ctx.query.workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const lines = await runGit(['branch', '--format=%(refname:short)|%(HEAD)'], wsPath);
  const branches = lines
    ? lines.split('\n').map((line) => {
        const [name, head] = line.split('|');
        return { name: (name || '').trim(), current: String(head || '').trim() === '*' };
      }).filter((b) => b.name)
    : [];

  ctx.body = { ok: true, branches };
});

router.post('/scm/checkout', async (ctx) => {
  const { workspaceId, branch, create } = ctx.request.body || {};
  const wsPath = workspacePath(workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const target = String(branch || '').trim();
  if (!target) {
    ctx.status = 400;
    ctx.body = { error: 'Missing branch name.' };
    return;
  }

  if (create) await runGit(['checkout', '-b', target], wsPath);
  else await runGit(['checkout', target], wsPath);

  const meta = await getWorkspaceMeta(workspaceId);
  if (meta) {
    meta.branch = target;
    meta.updatedAt = new Date().toISOString();
    await setWorkspaceMeta(workspaceId, meta);
  }

  const status = await parseStatus(wsPath);
  ctx.body = { ok: true, ...status };
});

router.post('/scm/pull', async (ctx) => {
  const { workspaceId } = ctx.request.body || {};
  const wsPath = workspacePath(workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  await runGit(['pull', '--ff-only'], wsPath);
  const status = await parseStatus(wsPath);
  ctx.body = { ok: true, ...status };
});

router.post('/scm/push', async (ctx) => {
  const { workspaceId } = ctx.request.body || {};
  const wsPath = workspacePath(workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const meta = await getWorkspaceMeta(workspaceId);
  if (!meta) {
    ctx.status = 400;
    ctx.body = { error: 'Workspace metadata missing. Reconnect repository.' };
    return;
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  const authed = toAuthedRemoteUrl(meta.repo, token);
  if (!authed) {
    ctx.status = 400;
    ctx.body = { error: 'Set GITHUB_TOKEN to push to GitHub.' };
    return;
  }

  await runGit(['push', authed, meta.branch], wsPath);
  const status = await parseStatus(wsPath);
  ctx.body = { ok: true, ...status };
});

router.post('/scm/commit', async (ctx) => {
  const { workspaceId, message, username } = ctx.request.body || {};
  const wsPath = workspacePath(workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const meta = await getWorkspaceMeta(workspaceId);
  if (!meta) {
    ctx.status = 400;
    ctx.body = { error: 'Workspace metadata missing. Reconnect repository.' };
    return;
  }

  const sync = await gitCommitPush({
    wsPath,
    workspaceMeta: meta,
    username,
    message: String(message || '').trim() || '[forbiden] commit',
    allowEmptyMessage: true
  });

  const status = await parseStatus(wsPath);
  ctx.body = { ok: true, sync, ...status };
});

router.get('/scm/diff', async (ctx) => {
  const wsPath = workspacePath(ctx.query.workspaceId);
  if (!wsPath || !fs.existsSync(wsPath)) {
    ctx.status = 404;
    ctx.body = { error: 'Workspace not found.' };
    return;
  }

  const relPath = String(ctx.query.path || '').trim();
  const args = ['diff'];
  if (relPath) args.push('--', relPath);

  const diff = await runGit(args, wsPath).catch(() => '');
  ctx.body = { ok: true, path: relPath || null, diff };
});

module.exports = router;
