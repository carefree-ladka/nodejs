---
sidebar_position: 4
title: CI/CD
---

# CI/CD

**CI (Continuous Integration):** automatically lint and test every push. **CD (Continuous Deployment):** automatically deploy when tests pass on the main branch.

## A GitHub Actions pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
          JWT_SECRET: test-secret
```

## What a good pipeline does

1. **Install** dependencies from the lockfile (`npm ci`).
2. **Lint** the code.
3. **Run tests** against a real (ephemeral) database service.
4. On `main` only: **build** and **deploy**.

## Deploy step

How you deploy depends on your target:

- **PaaS (Render/Railway/Fly.io)** — often auto-deploy on push to `main`; sometimes just a CLI step.
- **Container platforms** — build and push the Docker image to a registry, then update the service.
- **VM** — SSH in and pull/restart (simplest, least robust).

:::warning
Store deploy credentials and secrets in your CI provider's **encrypted secrets** (GitHub → Settings → Secrets), never in the workflow file or the repo.
:::

## Branch protection

Require the CI checks to pass before a pull request can merge into `main`. This is what actually keeps `main` deployable.
