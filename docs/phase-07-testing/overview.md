---
sidebar_position: 1
title: Overview
---

# Phase 7 — Testing

Tests are what let you change code without fear of breaking things. They're also how you prove your API behaves correctly.

## What you'll cover

- [Testing Express APIs](./testing-express)

## The testing pyramid

- **Unit tests** — test one function in isolation (e.g. a service). Fast, lots of them.
- **Integration tests** — test units working together (e.g. a route hitting a test DB). Fewer, slower.
- **End-to-end (E2E)** — test the whole system like a real user. Fewest, slowest.

Aim for many unit tests, a solid layer of integration tests on your routes, and a few E2E checks on critical flows.

## Why it matters

Without tests, every change is a gamble and every refactor is scary. With tests, you refactor confidently and catch regressions before users do. Testing is also a design tool — code that's hard to test is usually poorly structured (which is why Phase 4's layering pays off here).

## Mini-project

Add tests to your course API:

1. **Unit test** a service function (e.g. the business rules in `todosService`).
2. **Integration test** the CRUD routes with `supertest`, hitting a test database.
3. **Integration test** the auth flow: register → login → access a protected route with the returned token → get `401` without it.
4. Wire up a `test` script and aim for meaningful coverage on your core logic.
