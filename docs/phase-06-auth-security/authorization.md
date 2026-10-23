---
sidebar_position: 4
title: Authorization & Protecting Routes
---

# Authorization & Protecting Routes

**Authentication** = who are you. **Authorization** = what are you allowed to do. They're different; you need both.

## An authentication middleware

Verifies the token and attaches the user to `req`.

```js
// src/middleware/authenticate.js
import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';
import {AppError} from '../utils/app-error.js';

export function authenticate(req, res, next) {
  const header = req.get('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Not authenticated', 401));
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = {id: payload.sub, role: payload.role};
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
}
```

Protect routes by adding it:

```js
router.get('/me', authenticate, controller.getProfile);
```

## Role-based access control (RBAC)

A factory that builds authorization middleware for specific roles:

```js
// src/middleware/authorize.js
import {AppError} from '../utils/app-error.js';

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return next(new AppError('Forbidden', 403));
  }
  next();
};
```

```js
// Only admins can delete users
router.delete('/users/:id', authenticate, authorize('admin'), controller.remove);
```

## Ownership checks

Roles aren't always enough. Often a user may only touch **their own** resources:

```js
export async function updatePost(req, res, next) {
  const post = await postService.getById(req.params.id);
  if (post.authorId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Forbidden', 403));
  }
  // proceed
}
```

## Status codes to get right

- `401 Unauthorized` — not logged in / bad token.
- `403 Forbidden` — logged in, but not allowed.

Mixing these up is a common bug. `401` means "who are you?", `403` means "I know who you are, and no."
