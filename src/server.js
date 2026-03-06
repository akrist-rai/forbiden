require('dotenv').config();
const Koa = require('koa');
const cors = require('@koa/cors');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Routers
const aiRouter = require('./routes/ai');
const runnerRouter = require('./routes/runner');
const graphRouter = require('./routes/graph');

// Socket Handlers
const setupEditorSockets = require('./sockets/editor');
const setupTerminalSockets = require('./sockets/terminal');
const setupGraphSockets = require('./sockets/graph');

const app = new Koa();
const server = http.createServer(app.callback());

// Middleware
app.use(cors({ origin: '*' }));
app.use(require('koa-bodyparser')()); // To parse JSON requests

// Serve the frontend entry file when opening the backend URL in browser.
app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && (ctx.path === '/' || ctx.path === '/index.html')) {
    const indexPath = path.resolve(__dirname, '../index.html');
    if (fs.existsSync(indexPath)) {
      ctx.type = 'html';
      ctx.body = fs.createReadStream(indexPath);
      return;
    }
  }
  await next();
});

// REST Routes
app.use(aiRouter.routes()).use(aiRouter.allowedMethods());
app.use(runnerRouter.routes()).use(runnerRouter.allowedMethods());
app.use(graphRouter.routes()).use(graphRouter.allowedMethods());

// WebSocket Initialization
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Centralized state for connected users
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log(`[+] Connection established: ${socket.id}`);
  
  // Attach modular socket handlers
  setupEditorSockets(io, socket, activeUsers);
  setupTerminalSockets(socket);
  setupGraphSockets(io, socket);
});

// Boot Server on 0.0.0.0 to expose to the local network
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=== BACKEND ONLINE ===`);
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`Network Access: http://${net.address}:${PORT}`);
      }
    }
  }
});
