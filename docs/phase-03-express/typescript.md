---
sidebar_position: 7
title: TypeScript for Backends
---

# TypeScript for Backends

Once your JavaScript is solid (Phase 0), **use TypeScript for real projects.** It catches a whole class of bugs at compile time, makes refactoring safe, and gives you autocomplete across your entire codebase — which matters a lot as an app grows.

:::info
Learn JavaScript fundamentals first, then add TypeScript. TS is JavaScript with a type layer on top — you can't skip the JS.
:::

## Setup

```bash
npm install --save-dev typescript @types/node @types/express tsx
npx tsc --init
```

Enable **strict mode** in `tsconfig.json` from day one — it's where most of the value is:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

Run in dev with `tsx` (no build step), compile for production with `tsc`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

## The type features you'll use most

```ts
// Type annotations
function add(a: number, b: number): number {
  return a + b;
}

// Interfaces / types describe object shapes
interface User {
  id: number;
  email: string;
  role: 'user' | 'admin'; // union of literals
}

// Generics — reusable, type-safe containers
function first<T>(items: T[]): T | undefined {
  return items[0];
}

// Utility types — derive new types from existing ones
type NewUser = Omit<User, 'id'>;
type PartialUser = Partial<User>;
```

## Strict typing, `unknown`, narrowing & type-safe errors

- Prefer **`unknown`** over `any` for values you don't control (request bodies, caught errors). It forces you to check before use.
- **Narrow** types with runtime checks:

```ts
function handle(err: unknown) {
  if (err instanceof AppError) {
    return err.statusCode; // narrowed to AppError here
  }
  return 500;
}
```

- Caught errors are `unknown` in strict mode — validate them, don't assume `err.message` exists.

## Typing Express

```ts
import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.get('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.json({id});
});

// Typed error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  res.status(status).json({error: {message: 'Something went wrong'}});
});
```

## End-to-end type safety

The real payoff is types that flow through your whole stack:

- **Prisma** generates types from your database schema (Phase 5) — your models are typed for free.
- **Zod** (Phase 4) infers TypeScript types from your validation schemas, so a validated `req.body` is correctly typed:

```ts
import {z} from 'zod';

const createUser = z.object({email: z.string().email(), name: z.string()});
type CreateUserInput = z.infer<typeof createUser>; // { email: string; name: string }
```

Database → validation → request handling, all typed, all checked at compile time. That's why TypeScript + Prisma + Zod is the recommended backend stack for serious projects.
