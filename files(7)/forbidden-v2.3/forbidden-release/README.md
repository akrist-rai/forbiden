# FORBIDDEN

> **Graph-based collaborative IDE** — nodes instead of files, real-time multiplayer editing, Docker-backed execution, Monaco editor, xterm.js terminals, Yjs CRDT sync.

---

## Overview

FORBIDDEN is a collaborative code editor where code lives in **nodes** on a 2D canvas rather than a flat file tree. Nodes connect with directed edges. Multiple operators edit simultaneously. Every mutation is an immutable event. Containers run your code.

```
┌─────────────────────────────────────────────────────────────┐
│  OPERATOR A          OPERATOR B          OPERATOR C          │
│  browser             browser             browser             │
└──────────┬───────────────┬──────────────────┬───────────────┘
           │ Socket.IO     │ Socket.IO         │ Socket.IO
           ▼               ▼                   ▼
┌──────────────────────────────────────────────────────────────┐
│                    Koa + Socket.IO API                        │
│   REST  ·  WebSocket  ·  Yjs CRDT  ·  PTY streams           │
├───────────┬──────────┬──────────────┬────────────────────────┤
│  MongoDB  │  Redis   │   BullMQ     │  Docker containers      │
│  events   │  pubsub  │  7 workers   │  per-workspace PTY      │
└───────────┴──────────┴──────────────┴────────────────────────┘
```

---

## Stack

| Layer | Technology |
|---|---|
| Runtime | Bun 1.x |
| API server | Koa 2 + @koa/router |
| Real-time | Socket.IO 4 |
| Database | MongoDB 7 / Mongoose 8 |
| Cache / pub-sub | Redis 7 / ioredis |
| Job queue | BullMQ (7 workers) |
| CRDT | Yjs + y-protocols |
| Auth | JWT / jose |
| Containers | dockerode + node-pty |
| Validation | Zod |
| Observability | OpenTelemetry → Jaeger |
| Frontend | React 18 (CDN/Babel) · Monaco Editor · xterm.js |

---

## Project Structure

```
forbidden/
├── backend/
│   ├── src/
│   │   ├── index.ts               # Koa app + Socket.IO bootstrap
│   │   ├── config/
│   │   │   ├── db.ts              # MongoDB connection
│   │   │   ├── redis.ts           # Redis client + pub-sub
│   │   │   └── telemetry.ts       # OpenTelemetry setup
│   │   ├── middleware/
│   │   │   ├── auth.ts            # JWT verify middleware
│   │   │   ├── error.ts           # Global error handler
│   │   │   └── rateLimit.ts       # Redis-backed rate limiter
│   │   ├── models/                # Mongoose schemas (17 models)
│   │   │   ├── user.model.ts
│   │   │   ├── node.model.ts
│   │   │   ├── event.model.ts
│   │   │   ├── workspace-*.ts     # Workspace metadata/settings/members
│   │   │   ├── message.model.ts
│   │   │   ├── activity-feed.model.ts
│   │   │   ├── timeline.model.ts
│   │   │   ├── pty-audit.model.ts
│   │   │   ├── snapshot.model.ts
│   │   │   ├── task.model.ts
│   │   │   ├── team.model.ts
│   │   │   ├── theme.model.ts
│   │   │   └── ydoc.model.ts
│   │   ├── routes/                # REST API route handlers
│   │   │   ├── auth.routes.ts     # POST /auth/register, /auth/login
│   │   │   ├── workspace.routes.ts
│   │   │   ├── node.routes.ts
│   │   │   ├── message.routes.ts
│   │   │   ├── feed.routes.ts
│   │   │   ├── event.routes.ts
│   │   │   ├── task.routes.ts
│   │   │   ├── team.routes.ts
│   │   │   ├── settings.routes.ts
│   │   │   ├── crdt.routes.ts
│   │   │   └── workspace-member.routes.ts
│   │   ├── services/              # Core business logic
│   │   │   ├── event.service.ts   # Immutable event store
│   │   │   ├── fanout.service.ts  # Event → Socket.IO broadcast pipeline
│   │   │   ├── changestream.service.ts  # MongoDB change streams
│   │   │   ├── snapshot.service.ts      # Point-in-time snapshots
│   │   │   ├── container.service.ts     # Docker container lifecycle
│   │   │   ├── ydoc.service.ts          # Yjs document persistence
│   │   │   ├── awareness.service.ts     # Cursor / presence state
│   │   │   ├── lsp.service.ts           # Language server proxy
│   │   │   ├── template.service.ts      # Workspace templates
│   │   │   ├── theme.service.ts         # Theme registry
│   │   │   ├── activity-feed.service.ts
│   │   │   └── access.service.ts        # RBAC / workspace access
│   │   ├── socket/                # Socket.IO event handlers
│   │   │   ├── node.handlers.ts   # node:add/edit/delete/join/cut
│   │   │   ├── terminal.handlers.ts     # terminal:open/input/output/resize
│   │   │   ├── crdt.handlers.ts         # Yjs sync messages
│   │   │   ├── presence.handlers.ts     # awareness / cursors
│   │   │   └── lsp.handlers.ts          # LSP proxy over socket
│   │   ├── workers/
│   │   │   └── index.ts           # 7 BullMQ workers
│   │   └── tests/
│   │       ├── phase2-3.test.ts
│   │       ├── phase4.test.ts
│   │       └── phase5-7.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile                 # API server image
│   ├── Dockerfile.runtime         # Workspace container image
│   └── .env.example
├── frontend/
│   └── index.html                 # Single-file React app (no build step)
├── docker-compose.yml             # Full stack: API + MongoDB + Redis
└── otel-collector-config.yml      # OpenTelemetry collector config
```

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.0
- [Docker](https://docker.com) with the Docker socket accessible
- MongoDB 7 and Redis 7 (or use Docker Compose — recommended)

### 1. Clone and install

```bash
cd backend
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — at minimum set JWT_SECRET
```

### 3. Start with Docker Compose (recommended)

```bash
# From the project root:
docker compose up

# API will be at http://localhost:3001
# MongoDB at localhost:27017
# Redis at localhost:6379
```

### 4. Start without Docker (backend only)

```bash
# Ensure MongoDB and Redis are running locally, then:
cd backend
bun dev
```

### 5. Open the frontend

Open `frontend/index.html` in your browser. By default it connects to `http://localhost:3001`.

To point the frontend at a different API:

```html
<!-- Add before </body> in index.html -->
<script>window.FORBIDDEN_API_URL = 'https://your-api.example.com';</script>
```

Or serve it from any static host — it has no build step.

---

## Optional: Build the workspace runtime image

Workspace containers run code on behalf of operators. Build the image first:

```bash
cd backend
docker build -f Dockerfile.runtime -t forbidden/runtime:latest .
```

If you skip this, the PTY terminal will fall back to the host shell.

---

## Debug Tools

### BullMQ dashboard

```bash
docker compose --profile debug up
# Open http://localhost:3030 (user: forbidden / pass: changeme)
```

### Distributed tracing (Jaeger)

```bash
OTEL_ENABLED=true docker compose --profile tracing up
# Open http://localhost:16686 for Jaeger UI
```

---

## API Overview

### Auth

| Method | Path | Description |
|---|---|---|
| `POST` | `/auth/register` | Create operator account |
| `POST` | `/auth/login` | Returns JWT |

### Workspaces

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/workspaces` | List workspaces for operator |
| `POST` | `/api/workspaces` | Create workspace |
| `GET` | `/api/workspaces/:id` | Get workspace metadata |
| `DELETE` | `/api/workspaces/:id` | Delete workspace |

### Nodes

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/nodes/:workspaceId` | List all nodes in workspace |
| `POST` | `/api/nodes/:workspaceId` | Create node (REST fallback) |
| `PATCH` | `/api/nodes/:workspaceId/:nodeId` | Update node (REST fallback) |
| `DELETE` | `/api/nodes/:workspaceId/:nodeId` | Delete node (REST fallback) |

### Messages / Chat

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/messages/:workspaceId` | Get recent messages |
| `POST` | `/api/messages/:workspaceId` | Send message |

### Activity Feed

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/feed` | Get activity feed |
| `POST` | `/api/feed/read-all` | Mark all as read |

### Templates

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/templates` | List available workspace templates |
| `POST` | `/api/workspaces/:id` | Apply template to workspace |

### PTY Audit

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/pty-audit/:workspaceId/commands` | Get command history |

### Tasks

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/tasks/:workspaceId` | List tasks |
| `POST` | `/api/tasks/:workspaceId` | Create task |
| `PATCH` | `/api/tasks/:workspaceId/:taskId` | Update task |
| `DELETE` | `/api/tasks/:workspaceId/:taskId` | Delete task |

---

## Socket.IO Events

All events require a valid JWT in `auth.token` at connection time.

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `node:add` | `{workspaceId, nodeId, label, type, code, position}` | Create node |
| `node:edit` | `{workspaceId, nodeId, code?, position?}` | Edit node |
| `node:delete` | `{workspaceId, nodeId}` | Delete node |
| `node:join` | `{workspaceId, sourceId, targetId}` | Add edge |
| `node:cut` | `{workspaceId, sourceId, targetId}` | Remove edge |
| `terminal:open` | `{workspaceId, sessionId, cols, rows}` | Open PTY |
| `terminal:input` | `{workspaceId, sessionId, data}` | Send keystrokes |
| `terminal:resize` | `{workspaceId, sessionId, cols, rows}` | Resize PTY |
| `terminal:close` | `{workspaceId, sessionId}` | Close PTY |

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `event:new` | `{type, nodeId, ...}` | Node mutation broadcast |
| `timeline:update` | `{label, icon, accentColor, createdAt}` | Timeline entry |
| `terminal:output` | `{sessionId, data}` | PTY stdout/stderr chunk |
| `terminal:closed` | `{sessionId}` | PTY session ended |
| `message:new` | `{operatorId, operatorName, text, createdAt}` | Chat message |
| `feed:new` | `{label, icon, accentColor, createdAt}` | Feed entry |

---

## BullMQ Workers

Seven workers run in the same process as the API:

| Worker | Queue | Purpose |
|---|---|---|
| Event fanout | `event-fanout` | Broadcasts events to Socket.IO rooms |
| Snapshot | `snapshot` | Periodic workspace state snapshots |
| Container GC | `container-gc` | Stops idle Docker containers |
| Feed | `feed` | Writes activity feed entries |
| Timeline | `timeline` | Writes timeline entries |
| PTY audit | `pty-audit` | Persists command history |
| Awareness GC | `awareness-gc` | Expires stale presence state |

---

## Frontend Features

The frontend is a zero-build single HTML file using React 18 via CDN + Babel standalone.

| Feature | Details |
|---|---|
| **Auth** | 3-step bootloader: avatar picker → login → workspace select |
| **Graph canvas** | Force-directed layout with physics simulation, pan/zoom |
| **Monaco editor** | Full IntelliSense, multi-cursor, 16 syntax themes, language auto-detection |
| **xterm.js terminal** | Full PTY via Socket.IO, theme picker, FitAddon resize |
| **CRDT collaboration** | Yjs + y-websocket, operator presence dots on nodes |
| **Activity feed** | Live socket push, unread badge, mark-all-read |
| **Workspace templates** | FastAPI / React / Data Pipeline / CLI / REST Client |
| **Chat** | Socket.IO `message:new` push, loads history from API |
| **Git panel** | Per-file save + save-all, wired to `node:edit` events |
| **PTY audit log** | Bottom panel tab, loads from `/api/pty-audit` |
| **Workspace settings** | Live peer presence list, node/edge/group counts |
| **Kanban board** | Local state (wire to `/api/tasks` if needed) |
| **Command palette** | ⌘P / Ctrl+P |
| **Themes** | OBSIDIAN (cyberpunk dark) and FORSAKEN (brutalist light) |
| **Keyboard shortcuts** | N=new node, G=group, J=join, X=cut, \`=terminal, Del=delete |

---

## Environment Variables Reference

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | HTTP port |
| `NODE_ENV` | `development` | Node environment |
| `JWT_SECRET` | — | **Required.** Sign/verify JWTs |
| `MONGODB_URI` | — | **Required.** MongoDB connection string |
| `REDIS_URL` | — | **Required.** Redis connection URL |
| `CLIENT_ORIGIN` | `http://localhost:3000` | CORS allowed origin |
| `WORKSPACE_IMAGE` | `forbidden/runtime:latest` | Docker image for workspace containers |
| `OTEL_ENABLED` | `false` | Enable OpenTelemetry tracing |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | — | OTLP collector endpoint |
| `BULLBOARD_USER` | `forbidden` | BullMQ dashboard username |
| `BULLBOARD_PASS` | `changeme` | BullMQ dashboard password |

---

## Running Tests

```bash
cd backend
bun test
```

Tests cover event sourcing, fanout pipeline, CRDT sync, container lifecycle, PTY audit, and snapshots.

---

## License

MIT
