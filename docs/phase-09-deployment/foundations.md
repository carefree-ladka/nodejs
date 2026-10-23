---
sidebar_position: 2
title: Git, Linux & Load Testing
---

# Git, Linux & Load Testing

The groundwork that deployment assumes you already have. None of it is Node-specific, but you can't ship without it.

## Git & GitHub

Version control is non-negotiable. At minimum, be fluent with:

- **Branching** — do work on a feature branch, never commit straight to `main`.
- **Pull requests** — propose changes, get them reviewed, then merge.
- **Code review** — read others' PRs; write small, focused PRs that are easy to review.
- **A sane history** — meaningful commit messages, no committed secrets or `node_modules`.

```bash
git checkout -b feat/user-auth
git add src/auth
git commit -m "Add JWT authentication"
git push -u origin feat/user-auth
# open a pull request on GitHub, get review, merge to main
```

Branch protection on `main` (require passing CI + review) is what keeps the main branch deployable — it ties directly into [CI/CD](./cicd).

## Linux basics

Servers and containers run Linux. You don't need to be a sysadmin, but you should be comfortable with:

- **Shell commands** — `cd`, `ls`, `cp`, `mv`, `rm`, `cat`, `grep`, `tail -f` (watch logs).
- **Processes** — `ps`, `top`/`htop`, `kill`, understanding PIDs and signals (`SIGTERM` → graceful shutdown).
- **Permissions** — `chmod`, `chown`, why you run containers as a non-root user.
- **Networking** — ports, `curl`, `netstat`/`ss`, DNS basics, what a reverse proxy does.
- **Environment** — `export VAR=value`, how env vars reach your process.

```bash
# See what's listening on port 3000
lsof -i :3000
# Follow your app's logs
tail -f /var/log/app.log
```

## Load testing

Before you trust your API under real traffic, measure how it behaves under load. Load testing answers: how many requests/second can it handle, where does latency spike, and what breaks first.

Popular tools: **k6**, **autocannon**, **Artillery**.

```bash
npx autocannon -c 100 -d 30 http://localhost:3000/health
# 100 concurrent connections for 30 seconds
```

What to watch for:

- **Throughput** (requests/sec) and **latency percentiles** (p50, p95, p99 — not just the average).
- **Database connection limits** — the usual first bottleneck. Your connection pool size caps real concurrency; tune it and make sure it's below the database's max connections.
- **Event-loop blocking** — CPU-heavy work on the request path kills throughput (Phase 1). Load testing exposes it.
- **Memory** — watch for leaks under sustained load.

:::tip
Load test against a production-like environment, not your laptop, and test the endpoints that actually matter (auth, your heaviest queries), not just `/health`.
:::
