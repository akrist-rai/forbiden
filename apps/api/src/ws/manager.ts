// src/ws/manager.ts — WebSocket room management + broadcast helpers
import { createRequire } from 'node:module';
import type { Server } from 'node:http';
import type { IncomingMessage } from 'node:http';
import { handleMessage } from './handlers.ts';

const require = createRequire(import.meta.url);
const { WebSocketServer, WebSocket } = require('ws');

export type WsClient = typeof WebSocket.prototype & {
  _wsId?:    string;
  _clientId?: number;
  isAlive?:  boolean;
};

// ─── ROOMS ────────────────────────────────────────────────────────────────────
const rooms = new Map<string, Set<WsClient>>();

export function joinRoom(ws: WsClient, wsId: string) {
  if (!rooms.has(wsId)) rooms.set(wsId, new Set());
  rooms.get(wsId)!.add(ws);
  ws._wsId = wsId;
}

export function leaveRoom(ws: WsClient) {
  if (!ws._wsId) return;
  const room = rooms.get(ws._wsId);
  if (room) { room.delete(ws); if (!room.size) rooms.delete(ws._wsId); }
}

export function broadcast(wsId: string, payload: unknown, excludeSelf: WsClient | null = null) {
  const room = rooms.get(wsId);
  if (!room) return;
  const msg = JSON.stringify(payload);
  for (const client of room) {
    if (client !== excludeSelf && client.readyState === WebSocket.OPEN) client.send(msg);
  }
}

export function send(ws: WsClient, payload: unknown) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload));
}

// ─── ATTACH TO HTTP SERVER ────────────────────────────────────────────────────
let clientSeq = 0;

export function attach(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WsClient, req: IncomingMessage) => {
    console.log('[WS] client connected from', req.socket.remoteAddress);
    ws.isAlive   = true;
    ws._clientId = ++clientSeq;

    ws.on('pong',    ()   => { ws.isAlive = true; });
    ws.on('message', (data: Buffer) => handleMessage(ws, data.toString()));
    ws.on('close',   ()   => leaveRoom(ws));
    ws.on('error',   (e: Error) => console.error('[WS]', e.message));

    send(ws, { type: 'connected', payload: { version: '1.0.0', ts: Date.now() } });
  });

  // Heartbeat — kill stale connections every 30s
  const hb = setInterval(() => {
    for (const ws of wss.clients as Set<WsClient>) {
      if (!ws.isAlive) { ws.terminate(); continue; }
      ws.isAlive = false;
      ws.ping();
    }
  }, 30_000);

  wss.on('close', () => clearInterval(hb));
  return wss;
}
