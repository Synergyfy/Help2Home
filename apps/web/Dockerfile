# Base Node image
FROM node:22-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# --- Dependency Stage ---
FROM base AS deps
WORKDIR /app

# Copy lockfile and project-specific files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/

# Install workspace dependencies
RUN pnpm install --frozen-lockfile

# --- Build Stage ---
FROM deps AS builder
WORKDIR /app

# Copy the rest of the source code
COPY apps/web ./apps/web
COPY tsconfig.json ./

# Build Next.js
WORKDIR /app/apps/web
RUN pnpm build

# --- Production Stage ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/apps/web/.next /app/apps/web/.next
COPY --from=builder /app/apps/web/public /app/apps/web/public
COPY --from=builder /app/apps/web/package.json /app/apps/web/

# Copy all node_modules (required for Next.js in a monorepo setup)
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/apps/web/node_modules /app/apps/web/node_modules

EXPOSE 3000

CMD ["pnpm", "--filter", "@help-2-home/web", "start"]
