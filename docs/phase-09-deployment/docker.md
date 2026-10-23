---
sidebar_position: 3
title: Docker & Containers
---

# Docker & Containers

A container packages your app with its exact runtime and dependencies, so it runs the same on your laptop and in production. This eliminates "works on my machine."

## A production Dockerfile (multi-stage)

```dockerfile
# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # if you use TypeScript; skip for plain JS

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist   # or ./src for plain JS
USER node                            # don't run as root
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

Why multi-stage: the final image doesn't include dev dependencies or build tooling, so it's smaller and more secure.

## .dockerignore

Keep junk out of the image (mirrors `.gitignore`):

```
node_modules
npm-debug.log
.env
.git
dist
```

:::danger
Never copy your `.env` or secrets into the image. Inject configuration at runtime through environment variables provided by your host.
:::

## docker-compose for local development

Run your app plus its dependencies (Postgres, Redis) with one command.

```yaml
# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/app
      REDIS_URL: redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

```bash
docker compose up --build
```

This is the smoothest way to develop locally — no hand-installing databases.

## Image best practices

- Use a specific base tag (`node:20-alpine`), not `latest`.
- Use `npm ci` (not `npm install`) for reproducible installs from the lockfile.
- Run as a non-root user (`USER node`).
- Keep images small with `alpine` and multi-stage builds.
