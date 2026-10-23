---
sidebar_position: 8
title: "Advanced: Prototypes, this, Map & Set"
---

# Advanced: Prototypes, `this`, Map & Set

Concepts that trip people up and show up constantly in real code and interviews.

## Map & Set

Beyond arrays and plain objects, two built-in collections you'll reach for:

```js
// Map — key/value pairs with ANY key type, reliable ordering, easy size
const seen = new Map();
seen.set('ada', 1);
seen.set('grace', 2);
seen.get('ada');   // 1
seen.has('grace'); // true
seen.size;         // 2
for (const [name, count] of seen) { /* ... */ }

// Set — unique values
const ids = new Set([1, 2, 2, 3]);
ids.size;        // 3 (duplicate removed)
ids.has(2);      // true
[...new Set(arr)]; // dedupe an array
```

Use a `Map` instead of a plain object when keys aren't strings, order matters, or you add/remove entries frequently. Use a `Set` whenever you need uniqueness.

## `this`

`this` is determined by **how a function is called**, not where it's defined.

```js
const user = {
  name: 'Ada',
  greet() {
    return `Hi, ${this.name}`; // `this` is `user` when called as user.greet()
  },
};
user.greet(); // "Hi, Ada"

const fn = user.greet;
fn(); // `this` is undefined (strict mode) → error. The call lost its object.
```

Arrow functions don't have their own `this` — they inherit it from the enclosing scope. That's exactly why they're the safe choice for callbacks:

```js
class Timer {
  seconds = 0;
  start() {
    setInterval(() => {
      this.seconds++; // arrow keeps `this` = the Timer instance
    }, 1000);
  }
}
```

## Prototypes

JavaScript objects inherit from other objects via the **prototype chain**. When you access a property, JS walks up the chain until it finds it.

```js
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal); // dog's prototype is animal
dog.name = 'Rex';
dog.speak(); // "Rex makes a sound" — found on the prototype
```

`class` syntax is sugar over prototypes:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}
```

You rarely manipulate prototypes directly, but understanding them demystifies `class`, inheritance, and errors like "cannot read property of undefined" walking a chain.

## The event loop & microtasks (preview)

A quick mental model (expanded in [Phase 1](/phase-01-node-fundamentals/event-loop)):

- Synchronous code runs first, to completion.
- **Microtasks** (resolved Promises, `queueMicrotask`) run next, before any timer.
- **Macrotasks** (`setTimeout`, I/O callbacks) run after microtasks drain.

```js
console.log('1');
setTimeout(() => console.log('4'), 0);  // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('2');
// Order: 1, 2, 3, 4
```

Knowing microtasks beat macrotasks explains a lot of "why did this log in that order?" confusion.
