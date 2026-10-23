---
sidebar_position: 6
title: Concurrency & Debugging
---

# Concurrency & Debugging

## CPU-bound vs I/O-bound

This distinction drives every concurrency decision in Node:

- **I/O-bound** work (DB queries, network calls, file reads) — Node's non-blocking model handles this beautifully on the single thread. The event loop juggles thousands of concurrent I/O operations.
- **CPU-bound** work (image processing, encryption of big payloads, heavy computation) — this **blocks** the single thread and freezes your server (Phase 1 — the event loop). It needs a different tool.

## Worker threads

For CPU-heavy work, offload it to a **worker thread** so the main thread stays responsive.

```js
// main.js
import {Worker} from 'node:worker_threads';

function runHeavyTask(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-worker.js', {workerData: data});
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

```js
// heavy-worker.js
import {parentPort, workerData} from 'node:worker_threads';
const result = doExpensiveComputation(workerData); // runs off the main thread
parentPort.postMessage(result);
```

## Child processes

Run a separate program or Node script as its own OS process. Useful for shelling out to other tools or isolating work.

```js
import {execFile} from 'node:child_process';

execFile('ffmpeg', ['-i', 'in.mov', 'out.mp4'], (err, stdout) => {
  // ...
});
```

:::tip
In many real apps, the cleanest answer to heavy work isn't worker threads or child processes at all — it's a **background job queue** (BullMQ, Phase 8) with separate worker processes you can scale independently. Reach for workers/child processes when the work is tightly coupled to a single request.
:::

## Debugging

Stop debugging with `console.log` alone. Node has a real debugger.

### VS Code

Set breakpoints and press F5 with a Node launch configuration. You can inspect variables, step through code, and watch the call stack.

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug server",
      "program": "${workspaceFolder}/src/server.js"
    }
  ]
}
```

### Node Inspector

Run with `--inspect` and attach Chrome DevTools (`chrome://inspect`) or VS Code:

```bash
node --inspect src/server.js
node --inspect-brk src/server.js   # break on the first line
```

### Reading stack traces

A stack trace reads **top to bottom = most recent call first**. The top frame is usually where the error was thrown; scan down to find the first line in *your* code (not `node_modules`). That's almost always where to start.

```
TypeError: Cannot read properties of undefined (reading 'name')
    at getUser (/app/src/services/user.js:12:20)   ← your code, start here
    at /app/node_modules/express/lib/router/...
```
