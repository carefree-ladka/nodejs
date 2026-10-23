---
sidebar_position: 1
title: Overview
---

# Phase 3 — Express Fundamentals

This is the core of the course. Express is the most popular Node web framework — minimal, unopinionated, and built around **middleware** and **routing**.

## What you'll cover

- [Setup & first server](./setup)
- [Routing](./routing)
- [Middleware — the heart of Express](./middleware)
- [The request & response objects](./request-response)
- [Static files & templating](./static-and-templates)
- [TypeScript for backends](./typescript)
- [Express vs Fastify](./fastify-vs-express)

## Why it matters

Express gives you clean primitives for the HTTP concepts from Phase 2. Once routing and middleware click, you can build any API. Nearly every other Node framework (Fastify, NestJS, Koa) borrows the same ideas, so this knowledge transfers.

## Mini-project — the project you'll grow all course

Build a **RESTful CRUD API** for a single resource (e.g. `todos` or `books`) using **in-memory storage** (a plain array):

- `GET /todos` — list
- `GET /todos/:id` — read one (`404` if missing)
- `POST /todos` — create (`201`, validate input → `400`)
- `PATCH /todos/:id` — update
- `DELETE /todos/:id` — delete (`204`)

Use `express.Router()` to keep the routes modular. Test every endpoint with `curl` or Postman.

:::tip
Keep this project. In the next phases you'll restructure it, add a database, secure it with auth, test it, and deploy it. By the end it's a real service.
:::
