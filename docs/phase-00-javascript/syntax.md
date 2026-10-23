---
sidebar_position: 2
title: Core Syntax & Types
---

# Core Syntax & Types

## Variables

Use `const` by default. Use `let` only when you need to reassign. Never use `var`.

```js
const name = 'Ada';     // cannot be reassigned
let count = 0;          // can be reassigned
count += 1;
```

`const` prevents reassignment, not mutation. You can still change the contents of a `const` object or array.

```js
const user = {name: 'Ada'};
user.name = 'Grace'; // allowed — we mutated, didn't reassign
// user = {} // TypeError
```

## Primitive types

- `string`, `number`, `boolean`
- `null` and `undefined`
- `bigint`, `symbol` (rarely needed early on)

Everything else (objects, arrays, functions) is a reference type.

## Template literals

Prefer backticks over string concatenation:

```js
const user = 'Ada';
console.log(`Hello, ${user}! You have ${2 + 3} messages.`);
```

## Equality: always use `===`

`==` does type coercion and causes bugs. Use `===` and `!==`.

```js
0 == '';     // true  😱
0 === '';    // false ✅
null == undefined;  // true
null === undefined; // false
```

## Truthy and falsy

Falsy values: `false`, `0`, `''`, `null`, `undefined`, `NaN`. Everything else is truthy.

```js
if (!user) {
  throw new Error('user is required');
}
```

## Useful modern operators

```js
// Optional chaining — stop if something is null/undefined
const city = user?.address?.city;

// Nullish coalescing — fallback only for null/undefined (not for 0 or '')
const port = process.env.PORT ?? 3000;

// Logical assignment
options.retries ??= 3;
```
