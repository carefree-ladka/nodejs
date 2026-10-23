---
sidebar_position: 1
title: Overview
---

# Phase 10 — DevOps & Deployment

Code that isn't deployed helps no one. This phase takes your tested API and puts it in production, the right way.

## What you'll cover

- [Git, Linux & load testing](./foundations)
- [Docker & containers](./docker)
- [CI/CD](./cicd)
- [Production hardening](./production-hardening)
- [Where to deploy](./hosting)

## Why it matters

Deployment is where a lot of projects stall. Knowing containers, pipelines, and the handful of production concerns (health checks, graceful shutdown, secrets, monitoring) is what lets you ship confidently and keep the service healthy afterward.

## Environments

Keep at least three, each with its own config and database:

- **development** — your machine.
- **staging** — a production-like environment for final testing.
- **production** — the real thing.

Everything that differs between them (URLs, secrets, feature flags) comes from environment variables (Phase 4) — never hardcoded.

## Capstone project

Bring the whole course together. Take your fully-featured API and:

1. **Containerize** it with a multi-stage `Dockerfile` and `docker-compose` for local dev.
2. **Set up CI/CD** with GitHub Actions — lint + test on every push, deploy on green `main`.
3. **Deploy** to a PaaS (Render/Railway) with a **managed database**.
4. **Harden** it: HTTPS, `/health`, graceful shutdown, structured logging, and error monitoring (Sentry).

When this runs in production and survives a redeploy without dropping requests, you've completed the roadmap. 🎉
