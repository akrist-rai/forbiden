import Router from '@koa/router';
import { z } from 'zod';
import { Node } from '@/models/node.model';

const nodeRoutes = new Router();

nodeRoutes.get('/:workspaceId', async (ctx) => {
  const nodes = await Node.find({ workspaceId: ctx.params.workspaceId, deletedAt: null }).lean();
  ctx.body = { nodes };
});

export default nodeRoutes;
