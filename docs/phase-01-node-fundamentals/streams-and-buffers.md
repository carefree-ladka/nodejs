---
sidebar_position: 5
title: Streams, Buffers & EventEmitter
---

# Streams, Buffers & EventEmitter

Three low-level Node concepts that power file handling, HTTP, and much of the standard library.

## Buffers

A `Buffer` is a fixed-length chunk of raw binary data. JavaScript strings aren't ideal for binary (images, files, network packets), so Node uses buffers.

```js
const buf = Buffer.from('hello', 'utf8');
buf.length;            // 5
buf.toString('hex');   // '68656c6c6f'
buf.toString('base64');
```

You'll mostly encounter buffers when reading files, handling uploads, or working with crypto. You rarely create them by hand, but you need to recognize them.

## Streams

A stream processes data **piece by piece** instead of loading it all into memory. This is essential for large files — you don't want a 2 GB upload sitting in RAM.

Four types: **Readable**, **Writable**, **Duplex**, and **Transform**.

```js
import {createReadStream, createWriteStream} from 'node:fs';

// Copy a huge file without loading it fully into memory
createReadStream('big-input.log')
  .pipe(createWriteStream('copy.log'));
```

`pipe()` connects a readable stream to a writable one and handles **backpressure** (pausing the source when the destination can't keep up).

```js
import {pipeline} from 'node:stream/promises';
import {createGzip} from 'node:zlib';

// Compress a file with proper error handling
await pipeline(
  createReadStream('data.json'),
  createGzip(),
  createWriteStream('data.json.gz'),
);
```

HTTP requests and responses are streams too — which is how you can stream large downloads or AI responses (Phase 9) to clients.

## EventEmitter

Node's publish/subscribe primitive. Many core objects (servers, streams) are emitters under the hood.

```js
import {EventEmitter} from 'node:events';

class OrderService extends EventEmitter {}
const orders = new OrderService();

orders.on('placed', (order) => sendConfirmation(order));
orders.emit('placed', {id: 1});
```

- `.on(event, listener)` — subscribe.
- `.once(event, listener)` — subscribe for a single fire.
- `.emit(event, ...args)` — publish.

:::tip
EventEmitter is great for decoupling within a single process. For work that must survive restarts or run in another process (emails, heavy jobs), use a real queue instead (BullMQ, Phase 8).
:::
