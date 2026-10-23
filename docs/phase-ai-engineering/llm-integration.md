---
sidebar_position: 2
title: LLM API Integration
---

# LLM API Integration

The foundation: calling a hosted large language model from your Node backend. Most providers (OpenAI, Anthropic, Google, and open-source models via compatible APIs) expose similar chat-style APIs and ship a JavaScript/TypeScript SDK.

```bash
npm install openai
```

:::info
The examples use the OpenAI SDK because its API shape is a de-facto standard that many providers emulate. The concepts — messages, streaming, structured output, retries — transfer to any provider. Keep your API key in an environment variable (Phase 4), never in code.
:::

## Prompts, system instructions & conversation history

A chat request is a list of messages with roles: `system` (instructions/persona), `user`, and `assistant` (the model's past replies). To hold a conversation, you resend the relevant history each turn — the model is stateless between calls.

```js
import OpenAI from 'openai';
import {config} from '../config/env.js';

const client = new OpenAI({apiKey: config.openaiApiKey});

const messages = [
  {role: 'system', content: 'You are a concise support assistant.'},
  {role: 'user', content: 'How do I reset my password?'},
];

const res = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
});

console.log(res.choices[0].message.content);
```

:::warning
Context windows are finite. Long conversations must be **trimmed or summarized** before you exceed the window. Don't blindly append forever — track token usage and drop or compress old turns.
:::

## Token usage, latency, pricing & context windows

- **Tokens** are the unit of both billing and context size (roughly ¾ of a word each).
- You pay per input **and** output token; longer prompts and replies cost more.
- Latency grows with output length — streaming (below) makes it feel faster.
- Every model has a **maximum context window**; input + output must fit inside it.

Log `res.usage` (prompt/completion tokens) so you can attribute cost per request and per user.

## Streaming responses with SSE

Waiting for a full response feels slow. Stream tokens to the client as they're generated using **Server-Sent Events** (see [SSE in Phase 8](/phase-08-advanced/realtime-docs-ts#server-sent-events-sse)).

```js
router.post('/chat', authenticate, async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: req.body.messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) res.write(`data: ${JSON.stringify({delta})}\n\n`);
  }
  res.write('data: [DONE]\n\n');
  res.end();
});
```

## Structured JSON output + schema validation

For anything programmatic (extraction, classification), make the model return JSON and **validate it** with Zod (Phase 4). Never trust the shape blindly — models occasionally return malformed or unexpected data.

```js
import {z} from 'zod';

const Ticket = z.object({
  title: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
});

const res = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [/* ... */],
  response_format: {type: 'json_object'},
});

const parsed = Ticket.parse(JSON.parse(res.choices[0].message.content));
```

## Retries, timeouts & provider errors

Model APIs are external dependencies — they fail, rate-limit, and time out. Treat them like any flaky network call:

- Set a **timeout** on each request.
- **Retry** transient errors (`429`, `5xx`) with exponential backoff and jitter.
- Surface a clean error through your global error handler (Phase 4) — don't leak provider internals.
- Have a **fallback** (a cheaper/alternate model, or a graceful "try again") when the provider is down.

```js
const client = new OpenAI({
  apiKey: config.openaiApiKey,
  timeout: 30_000,
  maxRetries: 3,
});
```

## Build

A `/chat` endpoint that streams responses over SSE, keeps per-conversation history (trimmed to fit the context window), records token usage per request, and handles provider errors gracefully.
