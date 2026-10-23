---
sidebar_position: 5
title: Security Essentials
---

# Security Essentials

A checklist of protections every Express API should have. Most are a few lines each.

## Secure headers with helmet

```bash
npm install helmet
```

```js
import helmet from 'helmet';
app.use(helmet()); // sets a batch of sensible security headers
```

## Rate limiting

Throttle abusive clients and brute-force login attempts.

```bash
npm install express-rate-limit
```

```js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
});
app.use(limiter);

// A stricter limiter just for login
const loginLimiter = rateLimit({windowMs: 15 * 60 * 1000, max: 5});
router.post('/login', loginLimiter, controller.login);
```

## CORS configuration

Only allow origins you trust (see [Phase 2](/phase-02-http-web/cors-cookies)).

```js
import cors from 'cors';
app.use(cors({origin: config.allowedOrigins, credentials: true}));
```

## Validate and sanitize all input

Covered in [Phase 4](/phase-04-structure/validation). Validation is a security control, not just a data-quality one. It blocks injection and type-confusion attacks.

## The OWASP Top 10 mindset

Keep these common web vulnerabilities in mind:

- **Injection** (SQL/NoSQL) → use parameterized queries / ORMs.
- **Broken authentication** → hash passwords, short-lived tokens, rate-limit login.
- **Broken access control** → enforce authorization and ownership on every protected route.
- **XSS** → escape output; `HttpOnly` cookies; a Content-Security-Policy (helmet helps).
- **Sensitive data exposure** → HTTPS everywhere, never log secrets, don't leak stack traces.
- **Security misconfiguration** → disable `x-powered-by`, keep dependencies patched.

## Keep dependencies patched

```bash
npm audit
npm audit fix
```

Use Dependabot or Renovate (Phase 9) to automate security updates.

## Never commit secrets

Covered in [Phase 4](/phase-04-structure/config-and-env). Secrets live in environment variables / a secrets manager, never in git.

:::danger
If you expose an endpoint to the network, it needs authentication and authorization unless it's genuinely public. "I'll add auth later" is how data leaks happen. Secure it from the start.
:::
