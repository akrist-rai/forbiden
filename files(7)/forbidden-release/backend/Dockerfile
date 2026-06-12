# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun build src/index.ts --outdir dist --target bun --sourcemap=external

# ─── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM oven/bun:1-slim AS runtime
WORKDIR /app

# node-pty and dockerode need native bindings
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpython3-dev python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

EXPOSE 3001

RUN useradd -m forbidden
USER forbidden

CMD ["bun", "run", "dist/index.js"]
