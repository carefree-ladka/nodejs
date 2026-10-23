---
sidebar_position: 6
title: Logging & Code Quality
---

# Logging & Code Quality

## HTTP request logging with morgan

```bash
npm install morgan
```

```js
import morgan from 'morgan';

app.use(morgan('dev')); // concise colored logs in development
```

In production use a structured format and pipe logs to your log aggregator.

## Application logging with pino or winston

`console.log` is fine for learning, but real apps need **structured** (JSON) logs with levels (`info`, `warn`, `error`) so they're searchable in production.

```bash
npm install pino
```

```js
// src/utils/logger.js
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});
```

```js
import {logger} from './utils/logger.js';

logger.info({userId: 42}, 'user logged in');
logger.error(err, 'failed to process payment');
```

:::tip
Log structured objects, not string concatenation. `logger.info({orderId}, 'order placed')` is searchable; `console.log('order ' + orderId + ' placed')` is not.
:::

## ESLint + Prettier

Catch bugs and keep formatting consistent automatically.

```bash
npm install --save-dev eslint prettier
npx eslint --init
```

- **ESLint** finds problems (unused vars, bad patterns).
- **Prettier** formats code so nobody argues about style.

Add scripts:

```json
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

Run these in your CI pipeline (Phase 9) so bad code never merges.
