---
sidebar_position: 2
title: What Node Is & The Event Loop
---

# What Node Is & The Event Loop

## What Node.js actually is

Node.js is a **runtime** that lets you run JavaScript outside the browser. It uses:

- **V8** — Google's JavaScript engine (the same one in Chrome) to execute your code.
- **libuv** — a C library that provides the event loop and non-blocking I/O.

So Node = V8 (runs JS) + libuv (handles I/O) + a standard library of built-in modules.

## Single-threaded, non-blocking

Your JavaScript runs on a **single thread**. That sounds limiting, but the trick is that I/O operations (reading files, network calls, database queries) are **non-blocking** — Node hands them off and keeps running other code, then picks up the result later via the event loop.

```js
console.log('1');

setTimeout(() => console.log('2'), 0);

console.log('3');

// Prints: 1, 3, 2
// The timer callback runs later, even with a 0ms delay,
// because synchronous code runs first.
```

## The event loop (mental model)

1. Run all synchronous code (the "call stack").
2. When an async operation finishes, its callback is queued.
3. Once the stack is empty, the event loop pulls callbacks from the queues and runs them.

There are different queues with different priorities:

- **Microtasks** (resolved Promises, `queueMicrotask`) run *before* the next macrotask.
- **Macrotasks** (`setTimeout`, I/O callbacks) run after microtasks drain.

```js
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');

// start, end, promise, timeout
```

## Why blocking is dangerous

Because there's one thread, a long synchronous operation blocks **everything** — no other request gets handled until it finishes.

```js
// ❌ This freezes your entire server for the duration
function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {} // busy loop
}
```

:::danger
Never do heavy CPU work or synchronous I/O (`fs.readFileSync` on big files, `JSON.parse` on huge payloads) on the request path of a server. Offload CPU-heavy work to worker threads, a queue, or a separate service.
:::

## When Node shines (and when it doesn't)

- **Great for:** APIs, real-time apps, streaming, anything I/O-bound.
- **Not ideal for:** heavy CPU work (video encoding, large computations) — those block the loop.
