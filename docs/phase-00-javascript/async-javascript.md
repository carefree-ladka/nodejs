---
sidebar_position: 5
title: Async JavaScript
---

# Async JavaScript

This is **the** topic for backend development. Node is built around non-blocking I/O, which means you spend most of your time orchestrating asynchronous operations.

## The evolution: callbacks → promises → async/await

### Callbacks (the old way)

```js
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

Nesting these leads to "callback hell." Avoid when you can.

### Promises

A Promise represents a value that will exist later. It's either `pending`, `fulfilled`, or `rejected`.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(1000)
  .then(() => console.log('one second later'))
  .catch((err) => console.error(err));
```

### async/await (what you'll actually write)

`async`/`await` is syntactic sugar over promises. It reads like synchronous code.

```js
async function loadUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  const user = await res.json();
  return user;
}
```

:::info
`await` can only be used inside an `async` function (or at the top level of an ES module). An `async` function **always** returns a Promise.
:::

## Error handling with async/await

Wrap awaited calls in `try/catch`:

```js
async function main() {
  try {
    const user = await loadUser(1);
    console.log(user.name);
  } catch (err) {
    console.error('Failed to load user:', err.message);
  }
}
```

## Running things in parallel

Don't `await` in a loop when the operations are independent — that makes them run one after another. Use `Promise.all`:

```js
// ❌ Sequential — slow (waits for each before starting the next)
const a = await loadUser(1);
const b = await loadUser(2);

// ✅ Parallel — both start immediately
const [user1, user2] = await Promise.all([loadUser(1), loadUser(2)]);
```

Other combinators:

- `Promise.allSettled` — wait for all, never short-circuits on rejection.
- `Promise.race` — resolve/reject as soon as the first one settles.
- `Promise.any` — resolve with the first fulfilled one.

## Common mistakes

```js
// Forgetting await — `user` is a Promise, not the value
const user = loadUser(1); // ❌

// Forgetting that .map with async returns an array of promises
const users = await Promise.all(ids.map((id) => loadUser(id))); // ✅
```
