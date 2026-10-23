---
sidebar_position: 2
title: Setup & First Server
---

# Setup & First Server

## Create the project

```bash
mkdir express-api && cd express-api
npm init -y
npm install express
```

Set `"type": "module"` in `package.json` so you can use `import` syntax:

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  }
}
```

:::tip
`node --watch` (Node 18.11+) restarts the server automatically when files change. No need for `nodemon` anymore.
:::

## Your first server

```js
// src/server.js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'Hello from Express'});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Run it:

```bash
npm run dev
```

Visit `http://localhost:3000`. You should see the JSON response.

## Test it from the terminal

```bash
curl http://localhost:3000
# {"message":"Hello from Express"}
```

## The `app` object

`express()` returns an application object. The methods you'll use most:

- `app.use(...)` — register middleware.
- `app.get/post/put/patch/delete(path, handler)` — define routes.
- `app.listen(port, cb)` — start the server.

That's the entire skeleton of every Express app. Everything else is middleware and routes.
