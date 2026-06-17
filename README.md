# FORBIDEN

A graph-based collaborative code IDE — manga-inspired UI with real-time WebSocket collaboration, Monaco editor, and Supabase auth.

## Architecture

```
┌─────────────────────────────┐     ┌──────────────────────────────┐
│  Frontend  (Vercel)         │────▶│  API  (Railway / Render)     │
│  React + Vite + XYFlow      │ WS  │  Koa + Bun + Drizzle ORM    │
│  Monaco Editor              │────▶│  Supabase Postgres           │
│  Supabase Auth (client)     │     │  WebSocket server (/ws)      │
└─────────────────────────────┘     └──────────────────────────────┘
```

**Routes:**
- `/ide` — Graph IDE (default)
- `/manga-ide` — Manga-panel layout

---

## Local Development

### Prerequisites
- [Bun](https://bun.sh) ≥ 1.1.0
- A [Supabase](https://supabase.com) project

### Setup

```bash
# 1. Clone and install all deps
git clone https://github.com/your-org/forbiden.git
cd forbiden
bun run install:all

# 2. Configure the API
cp .env.example .env
# Edit .env with your Supabase credentials and DB URL

# 3. Configure the frontend
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env — set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
# For local dev you can also add: VITE_DEV_BYPASS_AUTH=true

# 4. Push DB schema
bun run db:push

# 5. Start both servers
bun run dev
```

Frontend → http://localhost:5175  
API → http://localhost:3001

---

## Deploying

### Frontend → Vercel

1. Import the repo in [Vercel](https://vercel.com)
2. Vercel will auto-detect `vercel.json` — no extra config needed
3. Add these **Environment Variables** in the Vercel dashboard:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `VITE_API_URL` | Deployed API URL, e.g. `https://forbiden-api.railway.app` |
| `VITE_WS_URL` | WebSocket URL, e.g. `wss://forbiden-api.railway.app/ws` |

> Do **not** set `VITE_DEV_BYPASS_AUTH` in Vercel — it skips authentication entirely.

### API → Railway (or Render)

The API is a persistent Bun/Koa server with WebSockets — it must run on a platform that supports long-lived connections.

**Railway:** Create a new project, point it at `apps/api`, set the start command to `bun src/server.ts`, and add:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase Postgres connection string |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret (Settings → API) |
| `ALLOWED_ORIGINS` | Your Vercel frontend URL, e.g. `https://forbiden.vercel.app` |
| `PORT` | `3001` (or leave unset; Railway sets `PORT` automatically) |

After the API is deployed, update `VITE_API_URL` and `VITE_WS_URL` in Vercel with the Railway URL and redeploy.

---

## Environment Variables Reference

### Root `.env` (API)

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_URL=https://[REF].supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=3001
ALLOWED_ORIGINS=http://localhost:5175
```

### `apps/web/.env` (Frontend)

```env
VITE_SUPABASE_URL=https://[REF].supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=                        # empty = relative /api paths (dev proxy)
VITE_WS_URL=ws://localhost:3001/ws
# VITE_DEV_BYPASS_AUTH=true          # dev only
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, TypeScript |
| Graph UI | @xyflow/react |
| Editor | Monaco Editor |
| Auth | Supabase |
| API | Koa, Bun |
| ORM | Drizzle ORM |
| DB | Supabase Postgres |
| Realtime | WebSockets (ws) |
