---
sidebar_position: 1
title: Overview
---

# Phase 6 — Authentication & Security

Now lock down your API: prove who users are, control what they can do, and defend against common attacks.

## What you'll cover

- [Password hashing](./passwords)
- [Sessions vs JWT](./jwt)
- [Authorization & protecting routes](./authorization)
- [Security essentials](./security)

## Why it matters

An API without auth is an open door. This phase teaches the two halves — **authentication** (who you are) and **authorization** (what you're allowed to do) — plus the baseline protections (`helmet`, rate limiting, input validation) that keep you off the front page for the wrong reasons.

## Mini-project

Add auth to your course API:

1. `POST /auth/register` — hash the password with bcrypt, create the user.
2. `POST /auth/login` — verify the password, return a JWT.
3. `authenticate` middleware — protect routes; attach `req.user`.
4. `authorize('admin')` — a role-gated admin-only endpoint.
5. Ownership checks — users can only modify their own resources.
6. Add `helmet`, `cors`, and a login rate limiter.

:::info
This is the single most important phase for making your API production-ready. Don't rush it.
:::
