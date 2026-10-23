---
sidebar_position: 4
title: Centralized Error Handling
---

# Centralized Error Handling

Don't scatter `try/catch` and `res.status(500)` everywhere. Funnel all errors into one place.

## A custom error class

```js
// src/utils/app-error.js
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // expected error, not a bug
    Error.captureStackTrace(this, this.constructor);
  }
}
```

Now anywhere in your services you can throw meaningful errors:

```js
if (!todo) {
  throw new AppError('Todo not found', 404);
}
```

## The global error-handling middleware

An Express error handler has **four** arguments. Register it **last**, after all routes.

```js
// src/middleware/error-handler.js
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Log the full error server-side
  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      message: err.isOperational ? err.message : 'Internal server error',
    },
  });
}
```

:::warning
Never leak stack traces or internal error messages to clients in production. Return a generic message for unexpected (`5xx`) errors; only show details for your own operational errors.
:::

## Catching async errors

Here's the classic trap: in Express 4, if an `async` handler rejects, the error does **not** automatically reach your error middleware — the request hangs.

```js
// ❌ If this throws, Express 4 won't catch it
app.get('/x', async (req, res) => {
  const data = await mightReject();
  res.json(data);
});
```

Fix it with a small wrapper:

```js
// src/utils/async-handler.js
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

```js
import {asyncHandler} from '../utils/async-handler.js';

router.get('/:id', asyncHandler(async (req, res) => {
  const todo = await todosService.getById(req.params.id);
  res.json({data: todo}); // thrown AppError now flows to errorHandler
}));
```

:::info
**Express 5** (now the default on new installs) handles rejected promises from async handlers automatically, so the wrapper is optional there. Know the wrapper pattern anyway — tons of real codebases use Express 4.
:::

## A 404 handler

Put this just before the error handler to catch unmatched routes:

```js
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(errorHandler);
```
