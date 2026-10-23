---
sidebar_position: 7
title: Error Handling
---

# Error Handling

Good error handling separates toy code from real backends.

## Throwing and catching

```js
function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) {
    throw new Error(`Invalid age: ${input}`);
  }
  return age;
}

try {
  parseAge('abc');
} catch (err) {
  console.error(err.message);
}
```

## Always throw `Error` objects

Throw real `Error` instances (not strings). They carry a stack trace and a consistent shape.

```js
throw new Error('something broke'); // ✅
throw 'something broke';            // ❌ no stack trace
```

## Custom error classes

Later, in Express, you'll build an `AppError` to attach things like HTTP status codes:

```js
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

throw new AppError('User not found', 404);
```

## Errors in async code

A rejected promise is the async equivalent of a thrown error. With `async/await`, use `try/catch`. Never leave a promise unhandled.

```js
async function run() {
  try {
    await somethingThatMightReject();
  } catch (err) {
    // handle or rethrow
  }
}
```

:::danger
An unhandled promise rejection can crash your Node process. In production you should listen for `process.on('unhandledRejection', ...)` as a safety net — but the real fix is handling errors where they happen.
:::
