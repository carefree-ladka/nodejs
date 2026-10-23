---
sidebar_position: 1
title: Overview
---

# Phase 4 — Structure & Best Practices

Your Phase 3 API works but lives in one file. Now make it maintainable. This phase is where "code that runs" becomes "code you'd put in production."

## What you'll cover

- [Project structure](./project-structure)
- [Configuration & environment variables](./config-and-env)
- [Centralized error handling](./error-handling)
- [Input validation](./validation)
- [Logging & code quality](./logging)

## Why it matters

The difference between a hobby script and a professional codebase is mostly here: clear layers, no hardcoded secrets, errors handled in one place, input validated at the edge, and useful logs. These habits make everything after this phase (databases, auth, testing) far easier.

:::info Security note
Error handling and validation are often treated as "advanced," but they're foundational. Bake them in now — not after something breaks in production.
:::

## Mini-project

**Refactor your Phase 3 CRUD API** into a proper layered structure:

1. Split into `routes` / `controllers` / `services` / `middleware`.
2. Move config into `src/config/env.js` with `dotenv` and validation.
3. Add a global error handler and an `AppError` class.
4. Validate `POST`/`PATCH` bodies with Zod.
5. Add `morgan` for request logs and an `eslint`/`prettier` setup.

Same features as before — but now it's structured like a real service.
