---
sidebar_position: 5
title: Real-time, Docs & TypeScript
---

# Real-time, Docs & TypeScript

## Real-time with WebSockets

HTTP is request/response. For live updates (chat, notifications, dashboards) you want a persistent two-way connection. `socket.io` is the popular choice.

```bash
npm install socket.io
```

```js
import { createServer } from "node:http";
import { Server } from "socket.io";

const httpServer = createServer(app); // wrap your Express app
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg); // broadcast to everyone
  });
});

httpServer.listen(3000);
```

## API documentation with Swagger / OpenAPI

Describe your API in the OpenAPI format and serve interactive docs.

```bash
npm install swagger-ui-express swagger-jsdoc
```

```js
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const spec = swaggerJsdoc({
  definition: { openapi: "3.0.0", info: { title: "My API", version: "1.0.0" } },
  apis: ["./src/routes/*.js"], // JSDoc annotations in your routes
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
```

Now `http://localhost:3000/docs` gives a browsable, try-it-out UI.

## TypeScript with Express

For anything beyond a small app, **TypeScript** catches a whole class of bugs at compile time and makes refactoring safe.

```bash
npm install --save-dev typescript @types/node @types/express tsx
npx tsc --init
```

```ts
import express, { Request, Response } from "express";

const app = express();

app.get("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.json({ id });
});
```

Run in dev with `tsx` (`tsx watch src/server.ts`), compile for production with `tsc`.

Benefits: typed `req`/`res`, autocomplete everywhere, typed DB models (Prisma generates types for you), and errors caught before runtime.

:::tip
If you're starting a new serious project, consider TypeScript from day one rather than migrating later. Pair it with Prisma and Zod for end-to-end type safety from the database to the request body.
:::

## GraphQL (optional alternative to REST)

GraphQL lets clients request exactly the fields they need from a single endpoint. It's a different paradigm from REST — worth knowing, but REST is the right default for most APIs and for learning.

## Server-Sent Events (SSE)

WebSockets are two-way. Often you only need **one-way** server → client updates (notifications, progress bars, streaming AI tokens). **Server-Sent Events** are simpler: a long-lived HTTP response that the server keeps writing to.

```js
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const timer = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
  }, 1000);

  req.on("close", () => clearInterval(timer)); // clean up when client disconnects
});
```

On the client, the browser's built-in `EventSource` consumes it:

```js
const es = new EventSource("/events");
es.onmessage = (e) => console.log(JSON.parse(e.data));
```

### SSE vs WebSockets — which to use?

- **SSE** — server → client only, plain HTTP, auto-reconnect built in, trivial to implement. Perfect for live feeds, notifications, and **streaming LLM responses** (Phase 9).
- **WebSockets** — full duplex (both directions). Use for chat, multiplayer, collaborative editing — anything where the client also needs to push frequently.

For streaming AI chat tokens, **SSE is usually the right, simplest choice**.
