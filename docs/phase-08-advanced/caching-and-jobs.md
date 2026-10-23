---
sidebar_position: 4
title: Caching & Background Jobs
---

# Caching & Background Jobs

Two of the highest-impact production techniques, both commonly built on **Redis** (an in-memory data store).

## Caching with Redis

Cache expensive or frequently-read data so you don't hit the database every time.

```bash
npm install ioredis
```

```js
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export async function getProduct(id) {
  const cacheKey = `product:${id}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached); // cache hit

  const product = await Product.findById(id); // cache miss → DB
  await redis.set(cacheKey, JSON.stringify(product), 'EX', 300); // TTL 5 min
  return product;
}
```

**Cache invalidation** is the hard part: when the underlying data changes, delete or update the cached copy.

```js
await redis.del(`product:${id}`); // after an update/delete
```

:::tip
Start by caching read-heavy, rarely-changing data (product catalogs, config). Always set a TTL so stale data eventually expires even if you forget to invalidate.
:::

## Background jobs & queues

Slow work (sending email, image processing, generating reports) shouldn't block the HTTP response. Push it onto a **queue** and let a separate **worker** process it.

```bash
npm install bullmq
```

```js
// producer — add a job during the request (fast)
import {Queue} from 'bullmq';
const emailQueue = new Queue('email', {connection: {url: process.env.REDIS_URL}});

await emailQueue.add('welcome', {userId: user.id});
res.status(201).json({data: user}); // respond immediately
```

```js
// worker — runs in a separate process
import {Worker} from 'bullmq';

new Worker('email', async (job) => {
  if (job.name === 'welcome') {
    await sendWelcomeEmail(job.data.userId);
  }
}, {connection: {url: process.env.REDIS_URL}});
```

Benefits: faster responses, automatic retries on failure, and the ability to scale workers independently of your API.

## Other Redis uses

- **Session storage** (Phase 6) so sessions survive restarts and scale across instances.
- **Rate limiting** state shared across multiple app instances.
- **Pub/sub** for real-time features.
