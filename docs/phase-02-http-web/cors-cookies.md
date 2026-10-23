---
sidebar_position: 4
title: CORS, Cookies & Caching
---

# CORS, Cookies & Caching

## CORS (Cross-Origin Resource Sharing)

Browsers block a web page from calling an API on a **different origin** (different scheme, host, or port) unless the API explicitly allows it. This is a browser security feature.

- Your frontend at `https://app.example.com` calling your API at `https://api.example.com` is **cross-origin**.
- The API must send headers like `Access-Control-Allow-Origin` to permit it.

In Express you'll use the `cors` middleware:

```js
import cors from 'cors';

app.use(cors({origin: 'https://app.example.com'}));
```

:::warning
`cors()` with no options allows **all** origins. Fine for learning, risky in production. Lock it down to the origins you actually trust.
:::

:::info
CORS only affects **browsers**. Tools like `curl`, Postman, and server-to-server requests ignore it. So a "CORS error" is always a browser + configuration issue, never a reason the API itself is broken.
:::

## Cookies

A cookie is a small piece of data the server asks the browser to store and send back on future requests (via `Set-Cookie` / `Cookie` headers). They're the classic way to keep a user logged in.

Important cookie flags for auth:

- `HttpOnly` — JavaScript can't read it (protects against XSS token theft).
- `Secure` — only sent over HTTPS.
- `SameSite` — controls cross-site sending (`Strict`/`Lax`/`None`) to mitigate CSRF.

## Caching

HTTP has built-in caching via headers:

- `Cache-Control: max-age=3600` — cache for an hour.
- `ETag` + `If-None-Match` — revalidate; server can return `304 Not Modified` to save bandwidth.

You'll revisit caching seriously in [Phase 8](/phase-08-advanced/overview) with Redis, but knowing the HTTP-level basics helps.
