---
sidebar_position: 8
title: Express vs Fastify
---

# Express vs Fastify

Express is the default this course teaches, but **Fastify** is the other framework worth knowing. The most important advice:

:::tip
**Pick one framework and learn it well first.** Don't try to learn Express, Fastify, Koa, and NestJS at once. The concepts (routing, middleware, validation, error handling) transfer — the syntax is a detail.
:::

## Express

- The most popular, most tutorials, largest ecosystem.
- Minimal and unopinionated — you assemble your own structure (which is why Phase 4 matters).
- Express 5 is now the default and handles async errors automatically.
- Best default for **learning** and for the vast majority of apps.

## Fastify

- Built for **performance** and low overhead.
- **Schema-first**: you define JSON schemas for routes, which gives validation *and* fast serialization out of the box.
- First-class **TypeScript** support and a structured plugin system.
- Great when throughput matters or you want built-in validation/serialization.

```js
// Fastify — a route with a response schema
import Fastify from 'fastify';
const app = Fastify({logger: true});

app.get('/health', async () => ({status: 'ok'}));

app.listen({port: 3000});
```

## How to choose

| If you want… | Choose |
|--------------|--------|
| Maximum learning resources & ecosystem | **Express** |
| The industry default, simplest start | **Express** |
| Top performance + built-in schema validation | **Fastify** |
| A heavily-structured, opinionated framework | NestJS (built on Express/Fastify) |

Everything else in this course — REST, validation with Zod, auth, databases, testing, deployment — applies regardless of which you pick. Learn the Express version here, and porting to Fastify later is mostly mechanical.
