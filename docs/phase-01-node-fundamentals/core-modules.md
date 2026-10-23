---
sidebar_position: 4
title: Core Built-in Modules
---

# Core Built-in Modules

Node ships with a standard library. Here are the ones you'll actually use.

## `fs` — file system

Prefer the promise-based API (`fs/promises`) with `async/await`.

```js
import {readFile, writeFile} from 'node:fs/promises';

await writeFile('notes.json', JSON.stringify({notes: []}, null, 2));
const raw = await readFile('notes.json', 'utf8');
const data = JSON.parse(raw);
```

:::warning
There are synchronous versions (`readFileSync`, etc.). They're fine in CLI scripts and at startup, but **never** on a server's request path — they block the event loop.
:::

## `path` — cross-platform paths

Never build paths with string concatenation. Windows and macOS use different separators; `path` handles it.

```js
import path from 'node:path';

path.join('uploads', 'images', 'a.png'); // uploads/images/a.png
path.extname('photo.png');                // .png
path.basename('/tmp/photo.png');          // photo.png
```

## `http` — the raw web server

Express is built on top of this. Build a server with it once so Express makes sense.

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({message: 'Hello from raw Node'}));
});

server.listen(3000, () => console.log('http://localhost:3000'));
```

## `events` — the EventEmitter

Node's pub/sub primitive. Lots of Node APIs (streams, servers) are built on it.

```js
import {EventEmitter} from 'node:events';

const bus = new EventEmitter();
bus.on('userRegistered', (user) => console.log('welcome', user.name));
bus.emit('userRegistered', {name: 'Ada'});
```

## Others worth knowing

- `process` — environment, arguments, exit (see below).
- `os` — system info (CPU count, memory).
- `url` — parsing and building URLs.
- `crypto` — hashing, random bytes, UUIDs (`crypto.randomUUID()`).
- `stream` — processing data piece by piece (large files, uploads).

## `process` essentials

```js
process.argv;      // command-line arguments
process.env.PORT;  // environment variables
process.exit(1);   // exit with a non-zero (error) code

process.on('SIGTERM', () => {
  // graceful shutdown — close servers/DB connections
});
```
