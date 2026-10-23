---
sidebar_position: 1
title: Overview
---

# Phase 2 — HTTP & Web Fundamentals

Express is a thin convenience layer over HTTP. Every "Express concept" is really an HTTP concept with nicer syntax. Learn the protocol and Express becomes obvious.

## What you'll cover

- [HTTP methods & status codes](./methods-and-status)
- [REST API design](./rest)
- [CORS, cookies & caching](./cors-cookies)

## Why it matters

When you return `res.status(404)`, set a cookie, or hit a CORS error, you're working directly with HTTP. If you understand requests, responses, verbs, and status codes, you'll design clean APIs and debug issues fast.

## Mini-project

Using **only the raw `http` module** (no Express yet), build a tiny server that:

- Responds to `GET /ping` with `200` and `{ "message": "pong" }`.
- Responds to `GET /time` with the current time.
- Returns `404` with a JSON error for anything else.
- Sets the `Content-Type: application/json` header correctly.

Doing this by hand makes you appreciate exactly what Express does for you in the next phase.
