---
sidebar_position: 6
title: Where to Deploy
---

# Where to Deploy

There's no single "best" host — it depends on how much control vs convenience you want.

## Beginner-friendly PaaS (start here)

These handle servers, HTTPS, and scaling for you. You push code or a container; they run it.

- **Render** — simple, great free-ish tier, auto-deploy from GitHub.
- **Railway** — very fast setup, nice for side projects.
- **Fly.io** — runs containers close to users, good free allowance.

For your first deploy, pick one of these. You'll be live in minutes.

## Cloud providers (more control)

- **AWS** — EC2 (VMs), ECS/Fargate (containers), Elastic Beanstalk (managed), Lambda (serverless).
- **Google Cloud** — Cloud Run (containers, excellent for Node), GKE.
- **Azure** — App Service, Container Apps.

More powerful and flexible, but more to configure. Worth learning once you're comfortable.

## Serverless

- **AWS Lambda + API Gateway** — pay per request, scales to zero. Great for spiky/low traffic, but has cold starts and a different programming model.

## Managed databases (don't self-host early)

Running your own production database is a lot of undifferentiated work (backups, failover, patching). Use a managed service:

- **PostgreSQL:** Neon, Supabase, Amazon RDS.
- **MongoDB:** MongoDB Atlas.
- **Redis:** Upstash, Redis Cloud.

## A sensible progression

1. **First deploy:** Render or Railway, straight from GitHub, with a managed Postgres/Mongo.
2. **Add CI/CD:** GitHub Actions runs tests, platform auto-deploys on green `main`.
3. **Grow into cloud/containers** (Cloud Run, ECS) only when you have a real reason — scale, cost, or compliance.

:::tip
Deploy a trivial "hello world" Express app to a PaaS early in your learning — ideally right after Phase 3. When deployment isn't scary, you'll ship your real project without hesitation.
:::
