---
sidebar_position: 1
title: Overview
---

# Phase 0 — JavaScript Foundations

Node.js _is_ JavaScript running outside the browser. If your JavaScript is shaky, your backend will be shaky. Spend real time here.

## What you'll cover

- [Core syntax & types](./syntax)
- [Functions](./functions)
- [Objects & arrays](./objects-and-arrays)
- [Async JavaScript](./async-javascript) ← the most important topic for backend work
- [Modules: ESM vs CommonJS](./modules)
- [Error handling](./error-handling)
- [Advanced: prototypes, `this`, Map & Set](./advanced-concepts)

## Why it matters

Backend code is overwhelmingly about **transforming data** and **waiting on I/O** (databases, networks, files). That means two JavaScript skills dominate everything else:

1. Manipulating objects and arrays cleanly.
2. Handling asynchronous operations without creating a mess.

## Mini-project

Write a few small scripts, no framework:

1. A `delay(ms)` function that returns a Promise resolving after `ms` milliseconds.
2. A script that fetches data from a public API (e.g. `https://jsonplaceholder.typicode.com/users`) with `async`/`await`, then transforms it with `map`/`filter`/`reduce` and prints a summary.
3. The same fetch, but running several requests in parallel with `Promise.all`.

:::tip
Node 18+ has a built-in global `fetch`, so you don't need `node-fetch` or `axios` for these scripts.
:::
