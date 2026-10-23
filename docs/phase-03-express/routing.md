---
sidebar_position: 3
title: Routing
---

# Routing

A route maps an **HTTP method + path** to a handler function.

## Basic routes

```js
app.get('/products', (req, res) => { /* list */ });
app.post('/products', (req, res) => { /* create */ });
app.get('/products/:id', (req, res) => { /* read one */ });
app.put('/products/:id', (req, res) => { /* replace */ });
app.patch('/products/:id', (req, res) => { /* update */ });
app.delete('/products/:id', (req, res) => { /* delete */ });
```

## Route parameters

`:id` captures a value from the URL into `req.params`.

```js
app.get('/products/:id', (req, res) => {
  const {id} = req.params;
  res.json({id});
});

// Multiple params
app.get('/users/:userId/posts/:postId', (req, res) => {
  const {userId, postId} = req.params;
  res.json({userId, postId});
});
```

## Query parameters

Everything after `?` lands in `req.query`.

```js
// GET /products?category=books&limit=10
app.get('/products', (req, res) => {
  const {category, limit} = req.query;
  res.json({category, limit});
});
```

## Reading the request body

With `express.json()` enabled, JSON bodies are parsed into `req.body`.

```js
app.post('/products', (req, res) => {
  const {name, price} = req.body;
  res.status(201).json({id: 1, name, price});
});
```

## Organizing routes with `express.Router()`

As the app grows, don't pile everything into `server.js`. Split routes into routers.

```js
// src/routes/products.routes.js
import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => { /* GET /products */ });
router.get('/:id', (req, res) => { /* GET /products/:id */ });
router.post('/', (req, res) => { /* POST /products */ });

export default router;
```

```js
// src/server.js
import productsRouter from './routes/products.routes.js';

app.use('/products', productsRouter);
```

Now every route in the router is automatically prefixed with `/products`. This is the foundation of the clean structure you'll build in [Phase 4](/phase-04-structure/overview).

## Route order matters

Express checks routes top to bottom and stops at the first match. Put specific routes before dynamic ones.

```js
app.get('/products/featured', ...); // must come first
app.get('/products/:id', ...);       // otherwise "featured" matches :id
```
