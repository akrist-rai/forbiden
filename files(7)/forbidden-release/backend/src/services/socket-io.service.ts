import type { Server as SocketIOServer } from 'socket.io';

let socketIO: SocketIOServer | null = null;

export function setSocketIOInstance(io: SocketIOServer): void {
  socketIO = io;
}

export function getSocketIOInstance(): SocketIOServer | null {
  return socketIO;
}
