---
sidebar_position: 5
title: Input Validation
---

# Input Validation

**Never trust client input.** Validate everything that comes in `req.body`, `req.params`, and `req.query` before using it.

## Why it matters

Unvalidated input leads to corrupt data, confusing bugs, and security holes (injection, type confusion). Validation at the edge keeps the rest of your code simple because downstream code can assume data is well-formed.

## Zod (recommended)

```bash
npm install zod
```

```js
// src/schemas/todo.schema.js
import {z} from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
  done: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});
```

A reusable validation middleware:

```js
// src/middleware/validate.js
import {AppError} from '../utils/app-error.js';

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join(', ');
    return next(new AppError(message, 400));
  }
  req.body = result.data; // now parsed + typed + defaults applied
  next();
};
```

Use it on routes:

```js
import {validate} from '../middleware/validate.js';
import {createTodoSchema} from '../schemas/todo.schema.js';

router.post('/', validate(createTodoSchema), controller.create);
```

## Alternatives

- **Joi** — mature, very popular, similar idea.
- **express-validator** — chains validators onto routes; integrates tightly with Express.

Any of them is fine. The important thing is that you validate **at the boundary** and reject bad input with a `400` before it reaches your business logic.
