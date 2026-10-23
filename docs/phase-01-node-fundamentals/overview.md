---
sidebar_position: 1
title: Overview
---

# Phase 1 — Node.js Fundamentals

Express is a thin framework on top of Node. If you understand Node, Express stops feeling like magic.

## What you'll cover

- [What Node is & the event loop](./event-loop)
- [The module system](./module-system)
- [Core built-in modules](./core-modules)
- [Streams, buffers & EventEmitter](./streams-and-buffers)
- [Concurrency & debugging](./worker-threads-debugging)
- [npm & package management](./npm)

## Why it matters

Understanding Node's **single-threaded, non-blocking** model explains why async code is everywhere, why a blocking operation freezes your whole server, and why Node is great for I/O-heavy workloads but not for CPU-heavy number crunching.

## Mini-project

Build a **command-line tool** with no framework — for example a note-taker:

- `node notes.js add "buy milk"`
- `node notes.js list`
- `node notes.js remove 2`

Use `process.argv` to read commands and the `fs` module to persist notes to a JSON file. This forces you to touch the event loop, core modules, and module system all at once.
