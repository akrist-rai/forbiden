import Router from '@koa/router';
import { z } from 'zod';
import { Message } from '@/models/message.model';

const messageRoutes = new Router();

messageRoutes.get('/:workspaceId', async (ctx) => {
  const { nodeId, limit = '50' } = ctx.query as Record<string, string>;
  const query: Record<string, unknown> = { workspaceId: ctx.params.workspaceId };
  if (nodeId) query['nodeId'] = nodeId;

  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit), 200))
    .lean();

  ctx.body = { messages };
});

messageRoutes.post('/', async (ctx) => {
  const data = z.object({
    workspaceId: z.string(),
    nodeId:      z.string().optional(),
    content:     z.string().min(1).max(4000),
  }).parse(ctx.request.body);

  const message = await Message.create({ ...data, authorId: ctx.state.operator.sub });
  ctx.status = 201;
  ctx.body = { message };
});

export default messageRoutes;
