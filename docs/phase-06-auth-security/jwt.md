---
sidebar_position: 3
title: Sessions vs JWT
---

# Sessions vs JWT

After verifying a password, you need to keep the user logged in across requests. Two main approaches.

## Session + cookie (stateful)

1. On login, create a session **on the server** (in memory, Redis, or DB).
2. Send the session ID to the browser in an `HttpOnly` cookie.
3. On each request, look up the session by its ID.

- Pros: easy to revoke (delete the session), small cookie.
- Cons: server must store session state (use Redis so it scales across instances).

Libraries: `express-session` + a store like `connect-redis`.

## JWT (stateless)

A **JSON Web Token** is a signed token containing claims (like the user ID). The server signs it with a secret; it doesn't store anything. On each request, the server verifies the signature.

- Pros: no server-side session storage; scales horizontally easily.
- Cons: hard to revoke before expiry; must be stored safely on the client.

```bash
npm install jsonwebtoken
```

```js
import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';

// On login — sign a token
const token = jwt.sign(
  {sub: user.id, role: user.role }, // payload (claims)
  config.jwtSecret,
  {expiresIn: '15m'}
);

// On a protected request — verify
const payload = jwt.verify(token, config.jwtSecret);
// payload.sub is the user id
```

### A JWT has three parts

`header.payload.signature` — base64url encoded, joined by dots. The payload is **not encrypted**, only signed. Never put secrets (passwords, sensitive data) in a JWT.

## Access + refresh token pattern

Short-lived access tokens limit damage if stolen; a long-lived refresh token gets new access tokens.

- **Access token** — short life (e.g. 15 min), sent with each request.
- **Refresh token** — long life (e.g. 7 days), stored securely, used only to mint new access tokens. Store refresh tokens server-side so you can revoke them.

## Where to store tokens on the client

- **`HttpOnly`, `Secure`, `SameSite` cookie** — recommended; JavaScript can't read it, which blocks XSS token theft.
- **`localStorage`** — convenient but readable by any JS on the page → vulnerable to XSS. Avoid for sensitive tokens.

:::warning
If you store tokens in cookies, you must also think about **CSRF** (use `SameSite` and/or CSRF tokens). If you store them in `localStorage`, you must think hard about **XSS**. There's no free lunch — understand the tradeoff.
:::
