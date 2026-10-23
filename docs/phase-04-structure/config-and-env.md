---
sidebar_position: 3
title: Configuration & Environment Variables
---

# Configuration & Environment Variables

Never hardcode ports, database URLs, or secrets. Read them from the environment.

## dotenv

```bash
npm install dotenv
```

Create a `.env` file (and **never commit it**):

```bash
# .env
PORT=3000
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=super-secret-change-me
NODE_ENV=development
```

Add it to `.gitignore`:

```
.env
```

Commit a `.env.example` (no real values) so teammates know what's needed:

```bash
# .env.example
PORT=
DATABASE_URL=
JWT_SECRET=
NODE_ENV=
```

## Load and validate config in one place

Don't scatter `process.env.X` across the codebase. Centralize and validate at startup, so a missing variable fails fast with a clear message instead of a cryptic runtime error later.

```js
// src/config/env.js
import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: required('DATABASE_URL'),
  jwtSecret: required('JWT_SECRET'),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
```

Now the rest of the app imports `config`, not `process.env`.

:::danger
Secrets (`JWT_SECRET`, API keys, DB passwords) must never be committed to git or hardcoded. In production, inject them through your host's environment/secrets manager — not a `.env` file in the repo.
:::

:::tip
Node 20.6+ can load env files natively with `node --env-file=.env server.js`, so `dotenv` is optional on recent versions. `dotenv` still works everywhere and is widely used.
:::
