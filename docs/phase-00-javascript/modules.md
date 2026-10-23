---
sidebar_position: 6
title: Modules — ESM vs CommonJS
---

# Modules — ESM vs CommonJS

Node supports two module systems. You will see both, so understand both.

## CommonJS (CJS) — the classic Node system

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = {add};

// app.js
const {add} = require('./math');
console.log(add(2, 3));
```

## ES Modules (ESM) — the modern standard

```js
// math.js
export function add(a, b) {
  return a + b;
}
export default function subtract(a, b) {
  return a - b;
}

// app.js
import subtract, {add} from './math.js';
```

## How Node decides which one you're using

- Files ending in `.cjs` are always CommonJS.
- Files ending in `.mjs` are always ESM.
- Files ending in `.js` depend on the nearest `package.json`:
  - `"type": "module"` → ESM
  - `"type": "commonjs"` or missing → CommonJS

```json
// package.json
{
  "type": "module"
}
```

## Which should you use?

For new projects, prefer **ESM** (`import`/`export`) — it's the standard going forward and works great with TypeScript. Just be aware that a lot of tutorials and older packages use CommonJS.

:::warning
In ESM you must include the file extension in relative imports (`./math.js`, not `./math`). CommonJS lets you omit it.
:::
