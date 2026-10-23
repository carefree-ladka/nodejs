---
sidebar_position: 2
title: SQL Databases (PostgreSQL + Prisma)
---

# SQL Databases (PostgreSQL + Prisma)

Relational databases store data in **tables** with rows and columns, and enforce relationships between them. PostgreSQL is the recommended default — powerful, free, and widely used.

## Core relational concepts

- **Table** — a collection of rows (e.g. `users`).
- **Column** — a typed field (e.g. `email TEXT`).
- **Primary key** — unique identifier for a row (`id`).
- **Foreign key** — a reference to a row in another table (`post.author_id → users.id`).
- **Relationships** — one-to-one, one-to-many, many-to-many.
- **Index** — speeds up lookups on a column (at the cost of write speed/storage).

## SQL basics

```sql
SELECT id, name FROM users WHERE active = true ORDER BY name LIMIT 10;
INSERT INTO users (name, email) VALUES ('Ada', 'ada@example.com');
UPDATE users SET name = 'Grace' WHERE id = 1;
DELETE FROM users WHERE id = 1;

-- JOIN: combine related tables
SELECT posts.title, users.name
FROM posts
JOIN users ON users.id = posts.author_id;
```

Learn enough SQL to read and reason about queries, even if an ORM writes most of them for you.

## Prisma (recommended ORM)

Prisma gives you a type-safe client generated from a schema, plus migrations.

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

Define your schema:

```prisma
// prisma/schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String?
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

Create and apply a migration:

```bash
npx prisma migrate dev --name init
```

Use the client in a model/service:

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create
await prisma.user.create({ data: { email: "ada@example.com", name: "Ada" } });

// Read with relation
const users = await prisma.user.findMany({ include: { posts: true } });

// Update
await prisma.user.update({ where: { id: 1 }, data: { name: "Grace" } });

// Delete
await prisma.user.delete({ where: { id: 1 } });
```

## Migrations

A migration is a versioned, repeatable change to your database schema (add a table, add a column). Migrations let you evolve the schema safely across environments and teammates. Never hand-edit production tables — always migrate.

## Other options

- **Drizzle** — lightweight, SQL-like, very TypeScript-friendly.
- **Knex** — a query builder (you write SQL-ish JS, no ORM magic).
- **Sequelize** — older, mature ORM.

## Preventing SQL injection

Never build queries with string concatenation. Use parameterized queries or an ORM — both separate data from the SQL command.

```js
// ❌ Injectable
db.query(`SELECT * FROM users WHERE email = '${email}'`);

// ✅ Parameterized
db.query("SELECT * FROM users WHERE email = $1", [email]);
```

ORMs like Prisma parameterize for you automatically.

## Constraints — let the database enforce correctness

Don't rely only on app-level checks. The database can guarantee data integrity:

- **`NOT NULL`** — a column must have a value.
- **`UNIQUE`** — no duplicates (e.g. one account per email).
- **`PRIMARY KEY`** — unique + not null identifier.
- **`FOREIGN KEY`** — referential integrity; can't reference a non-existent row.
- **`CHECK`** — custom rule (e.g. `price >= 0`).

Constraints are your last line of defense against bad data, even if a bug slips past validation.

## Transactions — all-or-nothing

A transaction groups several statements so they either **all** succeed or **all** roll back. Essential whenever one logical operation touches multiple rows/tables (transfer money, place an order + decrement inventory).

```js
// Prisma — everything inside succeeds together or not at all
await prisma.$transaction(async (tx) => {
  await tx.account.update({
    where: { id: from },
    data: { balance: { decrement: 100 } },
  });
  await tx.account.update({
    where: { id: to },
    data: { balance: { increment: 100 } },
  });
});
```

Without a transaction, a crash between the two updates would lose money. With one, the first update rolls back.

## Connection pooling

Opening a database connection is expensive. A **pool** keeps a set of reusable connections open and hands them out per query.

- Open the pool once at startup; reuse it for every request (never connect per request).
- The pool size caps real concurrency — and must stay **below the database's max connections**, especially when running multiple app instances. This is a classic production bottleneck (see [Phase 10 — load testing](/phase-09-deployment/foundations#load-testing)).

## Query optimization

As data grows, slow queries surface. The essentials:

- **Index** the columns you filter, join, and sort on. Missing indexes are the #1 cause of slow queries.
- Use **`EXPLAIN ANALYZE`** to see how Postgres executes a query and whether it uses an index.
- Avoid **N+1 queries** — don't loop and query per item; fetch related data in one query (`include`/`join`).
- Select only the columns you need; don't `SELECT *` large rows you won't use.

```sql
EXPLAIN ANALYZE SELECT * FROM posts WHERE author_id = 42;
-- Look for "Index Scan" (good) vs "Seq Scan" on a big table (often bad)
```
