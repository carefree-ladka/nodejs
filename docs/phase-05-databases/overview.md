---
sidebar_position: 1
title: Overview
---

# Phase 5 — Databases

In-memory arrays lose everything on restart. Time to persist data for real.

## What you'll cover

- [SQL databases (PostgreSQL + Prisma)](./sql)
- [NoSQL (MongoDB + Mongoose)](./mongodb)

## Why it matters

Persistence is the point of most backends. You'll also learn concepts that apply to every database: connection management, modeling relationships, indexing for performance, and preventing injection attacks.

## Key cross-cutting concepts

- **Connection lifecycle** — open a pooled connection at startup, reuse it, close it on shutdown. Don't connect per request.
- **Relationships** — one-to-many and many-to-many between your resources.
- **Indexes** — add them to fields you filter/sort by, or queries get slow as data grows.
- **Injection safety** — use parameterized queries / an ORM; never concatenate user input into queries.

## Mini-project

**Replace the in-memory storage** in your course API with a real database:

1. Pick SQL (Prisma) **or** MongoDB (Mongoose).
2. Model **two related resources** — e.g. `users` and `posts` (a user has many posts).
3. Move all data access into the `models` layer; services call models, not the DB directly.
4. Handle the "not found" case and surface DB errors through your global error handler.
5. Store the connection string in `.env` — never hardcode it.

:::tip
Use a managed database or Docker for local development so you're not installing a database server by hand. A `docker-compose.yml` with Postgres or Mongo is the smoothest path (you'll formalize this in Phase 9).
:::
