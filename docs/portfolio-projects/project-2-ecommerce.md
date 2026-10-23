---
sidebar_position: 3
title: "Project 2 — Production E-commerce Backend"
---

# Project 2 — Production E-commerce Backend

**Level:** Intermediate · **Covers:** Phases 4–8, 10

A backend with the moving parts real products have: a catalog, orders, payments, caching, background work, and a full deployment pipeline.

## Features

- Product catalog with categories, search, pagination.
- Cart and order lifecycle (created → paid → fulfilled).
- **Payments in sandbox mode** (e.g. Stripe test mode) with webhook handling.
- **Redis caching** on hot reads (product listings) with invalidation on writes.
- **Background jobs** (BullMQ): send order-confirmation emails, update inventory.
- Inventory management with safe concurrent decrements (transactions).
- Admin-only endpoints (role-based authorization).

## Tech stack

- **TypeScript** + **Express**
- **PostgreSQL** + **Prisma** (transactions for inventory/orders)
- **Redis** (caching + BullMQ queues)
- **Stripe** (sandbox) for payments
- **Docker** + **docker-compose**, **GitHub Actions** CI/CD

## Why these pieces matter

- **Transactions** keep orders and inventory consistent — you can't sell the last item twice.
- **Caching** is the difference between a snappy catalog and hammering the database.
- **Queues** keep checkout fast by moving email/inventory work off the request path.
- **Webhooks** teach you to handle asynchronous, untrusted callbacks from a third party (verify signatures!).

## Build milestones

1. Model products, carts, orders, inventory; seed sample data.
2. Implement the catalog with caching + invalidation.
3. Build the order flow and integrate sandbox payments + webhook verification.
4. Decrement inventory inside a transaction; handle out-of-stock.
5. Add a BullMQ worker for confirmation emails.
6. Containerize with Docker Compose (app + Postgres + Redis).
7. Set up CI/CD and deploy with a managed database.

## Stretch goals

- Idempotency keys on checkout to prevent double-charging.
- Load test the catalog and tune the connection pool (Phase 10).
