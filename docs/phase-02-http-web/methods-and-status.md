---
sidebar_position: 2
title: HTTP Methods & Status Codes
---

# HTTP Methods & Status Codes

## The anatomy of a request/response

A request has:

- A **method** (GET, POST, …)
- A **URL** (path + query string)
- **Headers** (metadata: content type, auth token, …)
- An optional **body** (data sent to the server)

A response has:

- A **status code** (200, 404, …)
- **Headers**
- An optional **body**

## HTTP methods (verbs)

| Method | Purpose | Has body? | Idempotent? |
|--------|---------|-----------|-------------|
| `GET` | Read a resource | No | Yes |
| `POST` | Create a resource | Yes | No |
| `PUT` | Replace a resource fully | Yes | Yes |
| `PATCH` | Update part of a resource | Yes | No |
| `DELETE` | Remove a resource | Usually no | Yes |

**Idempotent** means doing it multiple times has the same effect as doing it once. `GET`, `PUT`, and `DELETE` are idempotent; `POST` is not (it creates a new thing each time).

## Status codes you must know

**2xx — Success**
- `200 OK` — standard success.
- `201 Created` — resource created (return it after a `POST`).
- `204 No Content` — success with nothing to return (often after `DELETE`).

**3xx — Redirection**
- `301 Moved Permanently`, `302 Found`, `304 Not Modified`.

**4xx — Client error (they messed up)**
- `400 Bad Request` — malformed/invalid input.
- `401 Unauthorized` — not authenticated (no/invalid credentials).
- `403 Forbidden` — authenticated but not allowed.
- `404 Not Found` — resource doesn't exist.
- `409 Conflict` — e.g. duplicate email on registration.
- `422 Unprocessable Entity` — validation failed.
- `429 Too Many Requests` — rate limited.

**5xx — Server error (you messed up)**
- `500 Internal Server Error` — unhandled exception.
- `502 Bad Gateway`, `503 Service Unavailable`.

:::tip
Returning the right status code is not cosmetic. Clients, caches, and monitoring tools all make decisions based on it. Don't return `200` with an `{error: ...}` body.
:::

## Headers you'll meet constantly

- `Content-Type: application/json` — what format the body is in.
- `Authorization: Bearer <token>` — credentials.
- `Accept` — what the client wants back.
- `Set-Cookie` / `Cookie` — cookies.
