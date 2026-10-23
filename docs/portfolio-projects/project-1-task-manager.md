---
sidebar_position: 2
title: "Project 1 — Task Manager API"
---

# Project 1 — Task Manager API

**Level:** Beginner · **Covers:** Phases 0–7

A clean, typed REST API for managing tasks with real authentication. This is the project that proves you understand the fundamentals of a backend.

## Features

- User registration and login (hashed passwords, JWT).
- CRUD for tasks, scoped to the logged-in user (ownership checks).
- Input validation on every write (Zod).
- Pagination, filtering, and sorting on the task list.
- Centralized error handling and consistent response envelopes.
- Unit + integration tests, and OpenAPI/Swagger docs.

## Tech stack

- **TypeScript** + **Express**
- **PostgreSQL** with **Prisma**
- **Zod** for validation, **JWT** + **bcrypt** for auth
- **Vitest**/**Jest** + **supertest** for tests

## Suggested data model

- `User` — id, email (unique), passwordHash, createdAt
- `Task` — id, title, description, status, dueDate, ownerId → User

## Build milestones

1. Scaffold the layered structure (Phase 4): routes → controllers → services → models.
2. Add Prisma + Postgres and the two models with a migration.
3. Implement auth: register, login, `authenticate` middleware.
4. Implement task CRUD with validation and ownership checks.
5. Add pagination/filtering/sorting to `GET /tasks`.
6. Write tests for the auth flow and the CRUD routes.
7. Generate Swagger docs and deploy.

## Stretch goals

- Task labels/tags (many-to-many).
- Refresh tokens stored server-side.
- Rate limiting on the login route.
