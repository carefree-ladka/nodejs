---
sidebar_position: 7
title: npm & Package Management
---

# npm & Package Management

`npm` is Node's package manager. It installs dependencies and runs scripts.

## Starting a project

```bash
npm init -y        # creates package.json with defaults
```

## package.json

The manifest for your project.

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

- **dependencies** — needed to run in production (`express`, `mongoose`).
- **devDependencies** — only needed during development (`jest`, `eslint`, `nodemon`).

```bash
npm install express          # adds to dependencies
npm install --save-dev jest  # adds to devDependencies
npm install                  # install everything in package.json
```

## Semantic versioning (semver)

Versions are `MAJOR.MINOR.PATCH` (e.g. `4.19.2`).

- `^4.19.2` → allow minor + patch updates (`4.x.x`), not `5.0.0`.
- `~4.19.2` → allow patch updates only (`4.19.x`).
- `4.19.2` → exact pin.

:::tip
For production apps, pin critical dependencies tightly and commit your **lockfile**. It makes installs reproducible.
:::

## The lockfile

`package-lock.json` records the exact resolved version of every package (including nested dependencies). **Commit it.** Use `npm ci` in CI/CD for clean, reproducible installs.

## npm scripts and npx

```bash
npm run dev     # runs the "dev" script
npm start       # shorthand for "npm run start"
npm test        # shorthand for "npm run test"

npx create-docusaurus@latest my-site   # run a package without installing it globally
```

## .gitignore

Never commit `node_modules` or secrets.

```
node_modules/
.env
dist/
```

## Alternatives

`pnpm` and `yarn` are popular alternatives with faster installs and stricter dependency handling. `npm` is the default and totally fine to learn with.
