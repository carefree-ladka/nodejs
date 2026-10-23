---
sidebar_position: 4
title: Middleware — The Heart of Express
---

# Middleware — The Heart of Express

**Almost everything in Express is middleware.** Understanding it is the single most important Express skill.

## What is middleware?

A middleware is a function that receives the request (`req`), the response (`res`), and a `next` function. It runs in order, and each one can:

- inspect or modify `req`/`res`,
- end the request by sending a response, or
- call `next()` to pass control to the next middleware.

```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control along — forget this and the request hangs forever
}

app.use(logger);
```

:::danger
If a middleware neither sends a response nor calls `next()`, the request **hangs**. This is the most common beginner bug.
:::

## The request flow

```
incoming request
   ↓
express.json()        (parse body)
   ↓
logger                (custom)
   ↓
auth middleware       (maybe reject with 401)
   ↓
route handler         (send response)
   ↓
error handler         (if anything threw)
```

## Types of middleware

### Application-level

Runs for every request (or every request under a path).

```js
app.use(express.json());          // all routes
app.use('/admin', requireAdmin);  // only /admin/*
```

### Router-level

Attached to an `express.Router()` instance.

### Built-in

- `express.json()` — parse JSON bodies.
- `express.urlencoded({extended: true})` — parse form submissions.
- `express.static('public')` — serve static files.

### Third-party

- `cors`, `helmet`, `morgan`, `express-rate-limit`, etc.

### Error-handling (special — four arguments)

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({error: err.message});
});
```

## Writing route-specific middleware

Middleware can be applied to a single route by passing it before the handler:

```js
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({error: 'Not authenticated'});
  }
  next();
}

app.get('/profile', requireAuth, (req, res) => {
  res.json({user: '...'});
});
```

## Order is everything

Middleware runs in the order you register it. `express.json()` must come **before** any handler that reads `req.body`. The error handler must be registered **last**.
