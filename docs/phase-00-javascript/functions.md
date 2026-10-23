---
sidebar_position: 3
title: Functions
---

# Functions

## Declarations vs expressions vs arrows

```js
// Declaration — hoisted
function add(a, b) {
  return a + b;
}

// Expression
const subtract = function (a, b) {
  return a - b;
};

// Arrow function — concise, and does NOT bind its own `this`
const multiply = (a, b) => a * b;
```

## Default, rest, and spread

```js
function greet(name = 'friend') {
  return `Hi, ${name}`;
}

// Rest — collect arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3); // 6

// Spread — expand an array into arguments
const nums = [4, 5, 6];
sum(...nums); // 15
```

## `this` and arrow functions

Arrow functions inherit `this` from the surrounding scope. This matters a lot in callbacks. For most backend code you'll prefer arrow functions precisely because they avoid `this` surprises.

```js
const timer = {
  seconds: 0,
  start() {
    // arrow keeps `this` pointing at `timer`
    setInterval(() => {
      this.seconds += 1;
    }, 1000);
  },
};
```

## Higher-order functions

Functions that take or return functions. This is everywhere in Express middleware.

```js
function withLogging(fn) {
  return (...args) => {
    console.log('calling with', args);
    return fn(...args);
  };
}

const loudAdd = withLogging((a, b) => a + b);
loudAdd(2, 3); // logs, then returns 5
```
