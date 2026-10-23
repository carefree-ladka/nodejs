---
sidebar_position: 4
title: Objects & Arrays
---

# Objects & Arrays

This is the bread and butter of backend data handling.

## Destructuring

```js
const user = {id: 1, name: 'Ada', role: 'admin'};

const {name, role} = user;

// Rename + default
const {role: userRole = 'guest'} = user;

// Array destructuring
const [first, second] = ['a', 'b', 'c'];
```

Destructuring function parameters is extremely common in Express handlers:

```js
app.post('/users', (req, res) => {
  const {name, email} = req.body;
  // ...
});
```

## Spread & clone

```js
const base = {a: 1, b: 2};
const extended = {...base, c: 3};   // {a:1, b:2, c:3}
const merged = {...base, b: 99};    // later keys win → {a:1, b:99}

const arr = [1, 2];
const copy = [...arr, 3];           // [1, 2, 3]
```

:::warning
Spread is a **shallow** copy. Nested objects are still shared by reference.
:::

## The array methods you must know

```js
const nums = [1, 2, 3, 4, 5];

nums.map((n) => n * 2);              // [2,4,6,8,10] — transform
nums.filter((n) => n % 2 === 0);     // [2,4] — keep some
nums.reduce((sum, n) => sum + n, 0); // 15 — collapse to one value
nums.find((n) => n > 3);             // 4 — first match
nums.some((n) => n > 4);             // true
nums.every((n) => n > 0);            // true
nums.forEach((n) => console.log(n)); // side effects only
```

### A realistic transform

```js
const users = [
  {name: 'Ada', active: true, logins: 12},
  {name: 'Linus', active: false, logins: 3},
  {name: 'Grace', active: true, logins: 20},
];

const activeNames = users
  .filter((u) => u.active)
  .map((u) => u.name);               // ['Ada', 'Grace']

const totalLogins = users.reduce((sum, u) => sum + u.logins, 0); // 35
```

## Iterating objects

```js
const scores = {math: 90, cs: 95};

Object.keys(scores);    // ['math', 'cs']
Object.values(scores);  // [90, 95]
Object.entries(scores); // [['math',90], ['cs',95]]

for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}
```
