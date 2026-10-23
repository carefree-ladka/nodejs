---
sidebar_position: 3
title: The Module System
---

# The Module System

Node code is organized into modules. A module is just a file. (See the [ESM vs CommonJS](/phase-00-javascript/modules) page for the syntax differences.)

## Three kinds of imports

```js
// 1. Built-in (core) modules — ship with Node
import fs from 'node:fs';

// 2. Third-party modules — installed into node_modules via npm
import express from 'express';

// 3. Local modules — your own files
import {add} from './math.js';
```

:::tip
Prefer the `node:` prefix for built-ins (`node:fs`, `node:path`, `node:http`). It's explicit and avoids any ambiguity with an npm package of the same name.
:::

## How resolution works

- A path starting with `./` or `../` → a local file relative to the current one.
- A bare name like `express` → looked up in `node_modules` (current folder, then up the tree).
- A `node:`-prefixed name → a built-in module.

## Each module has its own scope

Variables declared in a module are private to that module unless you export them. There's no shared global namespace like in old browser scripts.

```js
// counter.js
let count = 0;
export function increment() {
  return ++count;
}
```

Every file that imports `increment` shares the **same** module instance, so they share `count`. Modules are cached after first load.
