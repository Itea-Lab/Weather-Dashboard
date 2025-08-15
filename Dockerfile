# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
LABEL author="PancakesLmao <phucthin29@gmail.com>"
LABEL description="Dockerfile for Next.js weather dashboard"
LABEL version="1.3"

WORKDIR /app

# Use corepack to activate pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
# Cache pnpm store and prefetch dependencies
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch && pnpm install --frozen-lockfile

FROM deps AS build
COPY next.config.ts tsconfig.json postcss.config.mjs ./
COPY src ./src
COPY public ./public
# Cache Next.js build
RUN --mount=type=cache,target=/app/.next/cache \
    pnpm run build

FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Activate pnpm via corepack for prod
RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml ./
# Cache pnpm store for prod install
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch && pnpm install --prod --frozen-lockfile

# Copy only necessary files from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["pnpm", "start"]