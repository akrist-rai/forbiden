import type { Socket, Server } from 'socket.io';
import { getRedis } from '@/config/redis';

const PRESENCE_TTL = 30; // seconds

export function registerPresenceHandlers(socket: Socket, io: Server) {
  const { workspaceId } = socket.handshake.query as { workspaceId: string };
  const { id: operatorId } = socket.data.operator;

  socket.on('presence:update', async (data: { nodeId?: string; cursor?: unknown }) => {
    const redis = getRedis();
    const key = `presence:${workspaceId}:${operatorId}`;

    const presence = { operatorId, workspaceId, nodeId: data.nodeId, cursor: data.cursor, ts: Date.now() };
    await redis.setex(key, PRESENCE_TTL, JSON.stringify(presence));

    // Broadcast to other operators in the room (not back to sender)
    socket.to(`workspace:${workspaceId}`).emit('presence:update', presence);
  });

  socket.on('presence:request', async (_data, ack) => {
    const all = await getActivePresence(workspaceId);
    ack?.({ presence: all });
  });
}

export async function clearPresence(operatorId: string, workspaceId: string): Promise<void> {
  const redis = getRedis();
  await redis.del(`presence:${workspaceId}:${operatorId}`);
}

export async function getActivePresence(workspaceId: string): Promise<unknown[]> {
  const redis = getRedis();
  const keys = await redis.keys(`presence:${workspaceId}:*`);
  if (!keys.length) return [];
  const values = await redis.mget(...keys);
  return values.filter(Boolean).map(v => JSON.parse(v!));
}
