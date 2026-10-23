---
sidebar_position: 2
title: Password Hashing
---

# Password Hashing

**Rule #1: never store plaintext passwords.** If your database leaks, plaintext passwords expose every user.

## Hash, don't encrypt

- **Encryption** is reversible — wrong for passwords.
- **Hashing** is one-way — you store the hash and compare hashes on login.

Use a **slow, salted** hashing algorithm designed for passwords: `bcrypt` or `argon2`. Never use plain `md5`/`sha256` — they're too fast and crackable.

## bcrypt

```bash
npm install bcrypt
```

```js
import bcrypt from 'bcrypt';

// On registration — hash before storing
const SALT_ROUNDS = 12;
const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
// store `passwordHash` in the DB, never `plainPassword`

// On login — compare
const ok = await bcrypt.compare(plainPassword, user.passwordHash);
if (!ok) {
  throw new AppError('Invalid credentials', 401);
}
```

## Key points

- **Salt** is handled for you by bcrypt — each hash is unique even for identical passwords.
- **Cost factor** (`SALT_ROUNDS`) controls how slow hashing is. Higher = more secure but slower. 10–12 is a reasonable default.
- Never log passwords or hashes.
- On a failed login, return a generic "Invalid credentials" — don't reveal whether the email or the password was wrong.

:::tip
`argon2` is the modern winner of the Password Hashing Competition and is an excellent choice too (`npm install argon2`). bcrypt remains a solid, battle-tested default.
:::
