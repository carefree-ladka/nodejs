---
sidebar_position: 2
title: Project Structure
---

# Project Structure

A single `server.js` doesn't scale. Separate concerns into layers.

## A proven layout

```
src/
├── config/          # env loading, DB connection setup
│   └── env.js
├── routes/          # map URLs to controllers
│   └── todos.routes.js
├── controllers/     # read req, call services, send res
│   └── todos.controller.js
├── services/        # business logic (no req/res here)
│   └── todos.service.js
├── models/          # data layer (DB schemas/queries)
│   └── todo.model.js
├── middleware/      # auth, validation, error handling
│   ├── error-handler.js
│   └── validate.js
├── utils/           # helpers (AppError, asyncHandler)
│   └── app-error.js
├── app.js           # build the Express app (middleware + routes)
└── server.js        # start the server (listen)
```

## The layering rule

Data flows **in one direction**:

```
route → controller → service → model → database
```

- **Routes** only wire URLs to controller functions.
- **Controllers** handle HTTP: read `req`, call a service, shape the `res`. No business logic.
- **Services** contain business logic. They know nothing about `req`/`res`.
- **Models** talk to the database.

This separation makes code testable (you can test services without HTTP) and swappable (change the database without touching controllers).

## Split `app.js` from `server.js`

Keep app construction separate from starting the server. This makes testing much easier (you can import `app` into tests without opening a port).

```js
// src/app.js
import express from "express";
import todosRouter from "./routes/todos.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/todos", todosRouter);

  app.use(errorHandler); // must be last
  return app;
}
```

```js
// src/server.js
import { createApp } from "./app.js";

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
```

## Example of one vertical slice

```js
// src/routes/todos.routes.js
import { Router } from "express";
import * as controller from "../controllers/todos.controller.js";

const router = Router();
router.get("/", controller.list);
router.post("/", controller.create);
export default router;
```

```js
// src/controllers/todos.controller.js
import * as todosService from "../services/todos.service.js";

export async function list(req, res) {
  const todos = await todosService.getAll();
  res.json({ data: todos });
}

export async function create(req, res) {
  const todo = await todosService.create(req.body);
  res.status(201).json({ data: todo });
}
```

```js
// src/services/todos.service.js
import * as Todo from "../models/todo.model.js";

export function getAll() {
  return Todo.findAll();
}

export function create(input) {
  // business rules live here
  return Todo.insert({ ...input, done: false });
}
```

## The repository pattern

The **repository** is the data-access layer — the only place that talks to the database. Services depend on a repository interface, not on Prisma/Mongoose directly. This keeps business logic independent of the specific database and makes services easy to test with a fake repository.

```js
// src/repositories/todo.repository.js — the ONLY place that knows about the DB
export function createTodoRepository(db) {
  return {
    findAll: () => db.todo.findMany(),
    findById: (id) => db.todo.findUnique({ where: { id } }),
    insert: (data) => db.todo.create({ data }),
    remove: (id) => db.todo.delete({ where: { id } }),
  };
}
```

```js
// src/services/todos.service.js — business logic, no DB details
export function createTodoService(todoRepo) {
  return {
    async getById(id) {
      const todo = await todoRepo.findById(id);
      if (!todo) throw new AppError("Todo not found", 404);
      return todo;
    },
  };
}
```

## Dependency injection

Notice the services and repositories above are **factory functions** that receive their dependencies as arguments, instead of importing them directly. That's dependency injection — "pass dependencies in" rather than "reach out and grab them."

```js
// src/container.js — wire everything together in ONE place
import { PrismaClient } from "@prisma/client";
import { createTodoRepository } from "./repositories/todo.repository.js";
import { createTodoService } from "./services/todos.service.js";

const db = new PrismaClient();
const todoRepo = createTodoRepository(db);
export const todoService = createTodoService(todoRepo);
```

Why bother?

- **Testability** — inject a fake repository in unit tests; no real database needed (Phase 7).
- **Flexibility** — swap the database or an external service without touching business logic.
- **Clarity** — one place (`container.js`) shows how the app is assembled.

:::tip
You don't need a heavy DI framework. Plain factory functions wired up in one file get you the benefits without the ceremony. Larger teams sometimes adopt NestJS, which has DI built in.
:::
