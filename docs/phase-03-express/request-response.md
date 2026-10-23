---
sidebar_position: 5
title: The Request & Response Objects
---

# The Request & Response Objects

Every handler gets `req` and `res`. Know their most-used members cold.

## The request object (`req`)

```js
app.post('/users/:id', (req, res) => {
  req.params;   // route params  → { id: '42' }
  req.query;    // query string  → { sort: 'name' }
  req.body;     // parsed body   → { email: '...' } (needs express.json())
  req.headers;  // request headers
  req.method;   // 'POST'
  req.path;     // '/users/42'
  req.get('Authorization'); // read a specific header
});
```

:::warning
`req.params` and `req.query` values are always **strings**. Convert them when you need numbers: `Number(req.query.limit)`.
:::

## The response object (`res`)

```js
// Send JSON (sets Content-Type automatically)
res.json({data: [...]});

// Set a status code, then send — chainable
res.status(201).json({id: 1});

// 204 No Content — common after DELETE
res.status(204).end();

// Send plain text/HTML
res.send('Hello');

// Set a header
res.set('X-Total-Count', '42');

// Redirect
res.redirect('/login');
```

## A full CRUD handler set

```js
// GET /todos
router.get('/', (req, res) => {
  res.json({data: todos});
});

// GET /todos/:id
router.get('/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    return res.status(404).json({error: 'Todo not found'});
  }
  res.json({data: todo});
});

// POST /todos
router.post('/', (req, res) => {
  const {title} = req.body;
  if (!title) {
    return res.status(400).json({error: 'title is required'});
  }
  const todo = {id: nextId++, title, done: false};
  todos.push(todo);
  res.status(201).json({data: todo});
});

// PATCH /todos/:id
router.patch('/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({error: 'Todo not found'});
  Object.assign(todo, req.body);
  res.json({data: todo});
});

// DELETE /todos/:id
router.delete('/:id', (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});
```

Notice the pattern: validate input, handle the "not found" case, use the right status code, return consistent JSON. That discipline is what Phase 4 formalizes.
