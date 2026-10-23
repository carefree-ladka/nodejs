---
sidebar_position: 2
title: Testing Express APIs
---

# Testing Express APIs

## Choosing a test runner

- **Jest** — batteries-included, hugely popular.
- **Vitest** — faster, ESM-first, Jest-compatible API. Great modern choice.
- **node:test** — Node's built-in runner, zero dependencies.

Any works. Examples below use Jest-style syntax (which Vitest shares).

```bash
npm install --save-dev jest supertest
```

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Unit testing a service

Services have no `req`/`res`, so they're easy to test in isolation.

```js
// todos.service.test.js
import {describe, it, expect} from '@jest/globals';
import * as service from '../src/services/todos.service.js';

describe('todos service', () => {
  it('marks new todos as not done by default', () => {
    const todo = service.create({title: 'Write tests'});
    expect(todo.done).toBe(false);
    expect(todo.title).toBe('Write tests');
  });
});
```

## Integration testing routes with supertest

`supertest` sends real HTTP requests to your app **without** opening a port. This is why splitting `app.js` from `server.js` (Phase 4) matters — you import the app directly.

```js
// todos.routes.test.js
import request from 'supertest';
import {createApp} from '../src/app.js';

const app = createApp();

describe('Todos API', () => {
  it('creates a todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({title: 'Buy milk'})
      .expect(201);

    expect(res.body.data).toMatchObject({title: 'Buy milk', done: false});
  });

  it('returns 400 for invalid input', async () => {
    await request(app).post('/todos').send({}).expect(400);
  });

  it('returns 404 for a missing todo', async () => {
    await request(app).get('/todos/999999').expect(404);
  });
});
```

## Testing the auth flow

```js
it('protects routes and accepts a valid token', async () => {
  await request(app).get('/todos/me').expect(401); // no token

  await request(app)
    .post('/auth/register')
    .send({email: 'a@b.com', password: 'secret123', name: 'Ada'})
    .expect(201);

  const login = await request(app)
    .post('/auth/login')
    .send({email: 'a@b.com', password: 'secret123'})
    .expect(200);

  const token = login.body.data.token;

  await request(app)
    .get('/todos/me')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});
```

## Handling the database in tests

- Use a **separate test database** (e.g. via `NODE_ENV=test` and a different `DATABASE_URL`).
- **Reset state** between tests (truncate tables / clear collections in a `beforeEach`).
- For pure unit tests, **mock** the model layer so no real DB is touched.

## Mocking

Replace slow or external dependencies (DB, third-party APIs, email) with fakes so tests are fast and deterministic.

```js
import {jest} from '@jest/globals';

jest.spyOn(emailService, 'send').mockResolvedValue(true);
```

:::tip
Write tests that assert **behavior** (status codes, response shape, side effects), not implementation details. Those survive refactors; brittle tests that check internals get deleted.
:::
