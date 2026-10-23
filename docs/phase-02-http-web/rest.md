---
sidebar_position: 3
title: REST API Design
---

# REST API Design

REST is a style for designing HTTP APIs around **resources**.

## Core ideas

1. **Resources are nouns, not verbs.** Use `/users`, not `/getUsers`.
2. **The HTTP method is the verb.** `GET /users` reads, `POST /users` creates.
3. **Statelessness.** Each request carries everything the server needs (e.g. an auth token). The server doesn't remember you between requests.

## URL conventions

| Action | Method & path |
|--------|---------------|
| List users | `GET /users` |
| Get one user | `GET /users/:id` |
| Create a user | `POST /users` |
| Replace a user | `PUT /users/:id` |
| Update a user | `PATCH /users/:id` |
| Delete a user | `DELETE /users/:id` |

Nested resources read naturally:

```
GET  /users/:id/posts        → a user's posts
POST /users/:id/posts        → create a post for a user
```

## Use plural nouns and lowercase

```
✅ /users/42/posts
❌ /User/42/getPosts
❌ /api/user_list
```

## Query parameters for filtering, sorting, pagination

```
GET /products?category=books&sort=price&order=asc&page=2&limit=20
```

- **Filtering:** `?category=books`
- **Sorting:** `?sort=price&order=asc`
- **Pagination:** `?page=2&limit=20` (or cursor-based for large datasets)

## Consistent response shapes

Pick a convention and stick to it. One common approach:

```json
// Success
{
  "data": { "id": 42, "name": "Ada" }
}

// List with pagination metadata
{
  "data": [ /* ... */ ],
  "meta": { "page": 2, "limit": 20, "total": 134 }
}

// Error
{
  "error": {
    "message": "User not found",
    "code": "USER_NOT_FOUND"
  }
}
```

## Versioning

Put the version in the path so you can evolve without breaking clients:

```
/api/v1/users
```

## JSON is the default

Modern APIs speak JSON. Send `Content-Type: application/json`, parse incoming JSON bodies, and respond with JSON.
