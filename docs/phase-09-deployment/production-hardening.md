---
sidebar_position: 5
title: Production Hardening
---

# Production Hardening

Getting deployed is step one. These make your service reliable and operable.

## Health checks

Expose an endpoint your platform can ping to know the app is alive.

```js
app.get("/health", (req, res) => res.json({ status: "ok" }));
```

Advanced versions also check the database/Redis connection and return `503` if a dependency is down.

## Graceful shutdown

When the platform stops your app (deploy, scale-down), it sends `SIGTERM`. Finish in-flight requests and close connections instead of dropping everything.

```js
const server = app.listen(PORT);

function shutdown() {
  console.log("Shutting down...");
  server.close(async () => {
    await prisma.$disconnect(); // close DB
    process.exit(0);
  });
  // Force-exit if it takes too long
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```

## Process management with PM2

On a plain VM, PM2 keeps your app running, restarts it on crash, and runs multiple instances across CPU cores (cluster mode).

```bash
npm install --global pm2
pm2 start dist/server.js -i max   # one instance per CPU core
pm2 startup && pm2 save           # restart on server reboot
```

:::info
On container platforms (Render, ECS, Kubernetes) you usually **don't** use PM2 — the platform handles restarts and scaling by running multiple containers. Run one Node process per container there.
:::

## Reverse proxy (Nginx)

On a VM, put Nginx in front of Node to terminate HTTPS, serve static assets, and load-balance across instances. Managed platforms do this for you.

## HTTPS everywhere

Never serve production traffic over plain HTTP. Use your platform's managed certificates, or Let's Encrypt (free) behind Nginx. Set `Secure` on cookies.

## Error monitoring & logging

- **Error tracking:** Sentry captures exceptions with stack traces and context.
- **Structured logs:** ship your `pino` JSON logs (Phase 4) to a log platform so you can search them.
- **Metrics/uptime:** monitor response times, error rates, and get alerted when `/health` fails.

```bash
npm install @sentry/node
```

```js
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

## The production checklist

- [ ] `NODE_ENV=production`
- [ ] Secrets injected via environment, never in the repo
- [ ] HTTPS enforced
- [ ] `helmet`, CORS locked down, rate limiting on (Phase 6)
- [ ] `/health` endpoint
- [ ] Graceful shutdown on `SIGTERM`
- [ ] Managed, backed-up database (not self-hosted early on)
- [ ] Structured logging + error monitoring
- [ ] CI runs lint + tests before every deploy
- [ ] Dependencies patched (`npm audit`, Dependabot/Renovate)
