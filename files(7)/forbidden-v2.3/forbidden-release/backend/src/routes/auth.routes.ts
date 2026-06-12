/**
 * Auth Routes
 *
 * Simple username-based auth for now.
 * GitHub OAuth removed — git is used locally inside containers,
 * not synced to GitHub as a backend service.
 *
 * Replace with your preferred auth (OAuth, Clerk, etc.) when needed.
 */

import Router from '@koa/router';
import { z } from 'zod';
import { signJWT } from '@/middleware/auth';
import { User } from '@/models/user.model';

const authRoutes = new Router();

// Register / login — creates user if not exists
authRoutes.post('/login', async (ctx) => {
  const { username } = z.object({
    username: z.string().min(2).max(40).regex(/^[a-zA-Z0-9_-]+$/),
  }).parse(ctx.request.body);

  let user = await User.findOne({ login: username });

  if (!user) {
    user = await User.create({
      githubId: `local_${username}`,  // placeholder — no GitHub binding
      login: username,
      name: username,
    });
  }

  const token = await signJWT({
    sub:    user.githubId,
    login:  user.login,
    name:   user.name,
  });

  ctx.body = { token, user: { id: user.githubId, login: user.login, name: user.name } };
});

authRoutes.get('/me', async (ctx) => {
  // authMiddleware already validated the JWT and set ctx.state.operator
  // This route sits behind authMiddleware in the API router
  ctx.body = { operator: ctx.state.operator };
});

export default authRoutes;
