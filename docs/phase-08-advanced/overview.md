---
sidebar_position: 1
title: Overview
---

# Phase 8 — Advanced Topics

These round out a production-grade skill set. You don't need all of them for every project — pick what your app requires. Each page is a focused primer with pointers to go deeper.

## What you'll cover

- [API design at scale](./api-design) — versioning, pagination, filtering.
- [File uploads](./file-uploads) — `multer` and cloud storage.
- [Caching & background jobs](./caching-and-jobs) — Redis and queues.
- [Real-time, docs & TypeScript](./realtime-docs-ts) — WebSockets, Swagger, TypeScript.

## Why it matters

Real apps outgrow basic CRUD. Lists need pagination, users upload files, slow work moves to background jobs, hot data gets cached, and larger teams want type safety and API docs. Knowing these exist — and when to reach for them — is what separates "can build a tutorial app" from "can build a product."

## Mini-project

Extend your course API with at least two of:

1. **Redis caching** on a read-heavy endpoint, with cache invalidation on writes.
2. A **background job queue** (BullMQ) that sends a welcome email after registration.
3. **File uploads** with `multer` (e.g. user avatars).
4. **Swagger/OpenAPI** docs for all your endpoints.
5. Migrate the project to **TypeScript**.
