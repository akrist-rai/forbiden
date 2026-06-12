/**
 * Task Board REST Routes
 *
 * Full CRUD implementation for the FORBIDDEN task board.
 * Tasks are created automatically by the todo-update BullMQ worker,
 * but operators can also create, move, edit, and delete them manually.
 *
 * Board view groups tasks by status column and enriches each task
 * with node metadata for display in the frontend Kanban.
 *
 * All routes are workspace-scoped and require JWT auth.
 *
 * Routes:
 *   GET    /tasks/:workspaceId          — board view (all tasks, grouped by status)
 *   GET    /tasks/:workspaceId/list     — flat list with optional status filter
 *   POST   /tasks/:workspaceId          — create task manually
 *   PATCH  /tasks/:workspaceId/:taskId  — update status / title / priority
 *   DELETE /tasks/:workspaceId/:taskId  — hard delete (or archive)
 */

import Router from '@koa/router';
import { z } from 'zod';
import { Task } from '@/models/task.model';
import { Node } from '@/models/node.model';

const taskRoutes = new Router();

// ─── Validation schemas ───────────────────────────────────────────────────────

const CreateTaskSchema = z.object({
  title:  z.string().min(1).max(200),
  nodeId: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'done', 'archived']).default('todo'),
});

const UpdateTaskSchema = z.object({
  title:  z.string().min(1).max(200).optional(),
  status: z.enum(['todo', 'in-progress', 'done', 'archived']).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field (title or status) must be provided',
});

const ListQuerySchema = z.object({
  status: z.enum(['todo', 'in-progress', 'done', 'archived']).optional(),
  nodeId: z.string().optional(),
  limit:  z.coerce.number().max(200).default(100),
  skip:   z.coerce.number().default(0),
});

// Column order and labels for the board view
const BOARD_COLUMNS = [
  { id: 'todo',        label: 'TO DO',       color: '#4285f4' },
  { id: 'in-progress', label: 'IN PROGRESS', color: '#ffc410' },
  { id: 'done',        label: 'DONE',        color: '#10b981' },
  { id: 'archived',    label: 'ARCHIVED',    color: '#6a6a8a' },
] as const;

// ─── GET /:workspaceId — Board view ───────────────────────────────────────────

taskRoutes.get('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;

  const tasks = await Task.find({ workspaceId })
    .sort({ updatedAt: -1 })
    .lean();

  // Enrich with node metadata in bulk (one query, not N)
  const nodeIds = [...new Set(tasks.map(t => t.nodeId).filter(Boolean))] as string[];
  const nodes = nodeIds.length
    ? await Node.find({ id: { $in: nodeIds }, workspaceId }).lean()
    : [];
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  const enriched = tasks.map(t => ({
    ...t,
    node: t.nodeId ? nodeMap.get(t.nodeId) ?? null : null,
  }));

  // Group into columns
  const columns = BOARD_COLUMNS.map(col => ({
    ...col,
    tasks: enriched.filter(t => t.status === col.id),
    count: enriched.filter(t => t.status === col.id).length,
  }));

  ctx.body = {
    workspaceId,
    columns,
    totals: {
      all:        tasks.length,
      todo:       tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done:       tasks.filter(t => t.status === 'done').length,
      archived:   tasks.filter(t => t.status === 'archived').length,
    },
  };
});

// ─── GET /:workspaceId/list — Flat list with filters ─────────────────────────

taskRoutes.get('/:workspaceId/list', async (ctx) => {
  const { workspaceId } = ctx.params;
  const { status, nodeId, limit, skip } = ListQuerySchema.parse(ctx.query);

  const filter: Record<string, unknown> = { workspaceId };
  if (status) filter['status'] = status;
  if (nodeId) filter['nodeId'] = nodeId;

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
    Task.countDocuments(filter),
  ]);

  ctx.body = { tasks, total, limit, skip };
});

// ─── POST /:workspaceId — Create task ─────────────────────────────────────────

taskRoutes.post('/:workspaceId', async (ctx) => {
  const { workspaceId } = ctx.params;
  const body = CreateTaskSchema.parse(ctx.request.body);

  const task = await Task.create({
    workspaceId,
    nodeId: body.nodeId,
    title:  body.title,
    status: body.status,
  });

  ctx.status = 201;
  ctx.body = { task };
});

// ─── PATCH /:workspaceId/:taskId — Update task ────────────────────────────────

taskRoutes.patch('/:workspaceId/:taskId', async (ctx) => {
  const { workspaceId, taskId } = ctx.params;
  const updates = UpdateTaskSchema.parse(ctx.request.body);

  const task = await Task.findOneAndUpdate(
    { _id: taskId, workspaceId },
    { $set: updates },
    { new: true },
  ).lean();

  if (!task) {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
    return;
  }

  ctx.body = { task };
});

// ─── DELETE /:workspaceId/:taskId — Archive or hard delete ────────────────────

taskRoutes.delete('/:workspaceId/:taskId', async (ctx) => {
  const { workspaceId, taskId } = ctx.params;

  // Default: archive (preserves history). Pass ?hard=1 for true deletion.
  const hard = ctx.query['hard'] === '1';

  if (hard) {
    const result = await Task.deleteOne({ _id: taskId, workspaceId });
    if (result.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = { error: 'Task not found' };
      return;
    }
    ctx.body = { deleted: true };
  } else {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, workspaceId },
      { $set: { status: 'archived' } },
      { new: true },
    ).lean();

    if (!task) {
      ctx.status = 404;
      ctx.body = { error: 'Task not found' };
      return;
    }
    ctx.body = { task, archived: true };
  }
});

export default taskRoutes;
