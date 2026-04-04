# Use Node.js 22 alpine for a small image size
FROM node:22-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# --- Dependency Stage ---
FROM base AS deps
WORKDIR /app

# Copy root workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy API package.json
COPY apps/api/package.json ./apps/api/

# Install dependencies for the entire workspace (needed for shared packages if they exist)
RUN pnpm install --frozen-lockfile

# --- Build Stage ---
FROM deps AS builder
WORKDIR /app

# Copy the rest of the source code
COPY apps/api ./apps/api
COPY tsconfig.json ./

# Build the app
WORKDIR /app/apps/api
RUN pnpm build

# --- Production Stage ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 3001

CMD ["node", "apps/api/dist/main"]
