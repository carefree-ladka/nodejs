---
sidebar_position: 2
title: API Design at Scale
---

# API Design at Scale

Once an endpoint returns thousands of records or serves many clients, basic CRUD isn't enough.

## Pagination

Never return an unbounded list. Two common strategies:

### Offset pagination

```
GET /posts?page=2&limit=20
```

```js
const page = Number(req.query.page) || 1;
const limit = Math.min(Number(req.query.limit) || 20, 100); // cap it
const offset = (page - 1) * limit;

const [data, total] = await Promise.all([
  Post.findMany({skip: offset, take: limit}),
  Post.count(),
]);

res.json({data, meta: {page, limit, total}});
```

Simple, but gets slow and inconsistent on large/changing datasets.

### Cursor pagination

```
GET /posts?cursor=abc123&limit=20
```

Uses the last item's ID/timestamp as a pointer. Scales better and stays consistent as data changes. Preferred for large feeds.

## Filtering and sorting

```
GET /posts?status=published&author=42&sort=createdAt&order=desc
```

Whitelist the fields clients may filter/sort by — never pass raw query params straight into a query.

## Versioning

Put a version in the path so you can change the API without breaking existing clients:

```
/api/v1/posts
/api/v2/posts
```

## Consistent envelopes

Keep one response shape across the whole API (see [Phase 2 — REST](/phase-02-http-web/rest)). Clients should never have to guess where the data or the error message lives.

## Documentation

An undocumented API is hard to use. Generate interactive docs with **Swagger / OpenAPI** (covered in [Real-time, docs & TypeScript](./realtime-docs-ts)).
