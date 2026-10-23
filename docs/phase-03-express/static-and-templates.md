---
sidebar_position: 6
title: Static Files & Templating
---

# Static Files & Templating

Most of the time you'll build JSON APIs, but Express can also serve files and render HTML.

## Serving static files

```js
import express from 'express';
import path from 'node:path';

const app = express();

// Serve everything in /public at the site root
app.use(express.static(path.join(process.cwd(), 'public')));
```

Now `public/style.css` is available at `http://localhost:3000/style.css`. Great for serving a built frontend, images, or downloads.

## Server-side templating (optional)

If you need the server to render HTML (not a separate frontend app), you can use a template engine like EJS, Pug, or Handlebars.

```bash
npm install ejs
```

```js
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.get('/profile', (req, res) => {
  res.render('profile', {name: 'Ada'});
});
```

```html
<!-- views/profile.ejs -->
<h1>Hello, <%= name %></h1>
```

:::info
For modern apps, the common pattern is an Express **JSON API** plus a separate frontend (React, Vue, etc.). Reach for server-side templating only when you specifically want the server to produce HTML.
:::
