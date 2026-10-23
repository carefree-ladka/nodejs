---
sidebar_position: 5
title: "Project 4 — AI Support Agent"
---

# Project 4 — AI Support Agent

**Level:** Advanced · **Covers:** all phases, especially Phase 9

The capstone. An AI assistant that doesn't just answer — it *acts*, safely. It searches your knowledge base and creates support tickets, but only with authorization, validation, and human approval, fully observable and budget-capped.

## Features

- Conversational assistant with RAG over your knowledge base (builds on Project 3).
- **Tool calling**: `searchKnowledgeBase`, `createTicket`, `lookupOrder`, etc.
- **Human-in-the-loop approval** for consequential actions (creating a ticket).
- Per-tool **authorization** enforced server-side against the user's permissions.
- Argument **validation** (Zod) on every tool call.
- **Audit logs** of every tool call (who, what, args, result).
- **Retries, timeouts, and budgets** to prevent runaway loops and cost.
- **Monitoring & tracing**: tokens, latency, cost per request and per user.
- **Per-user usage limits**.

## Tech stack

- Everything from Projects 1–3, plus:
- Tool-calling (and optionally an agent framework like the OpenAI Agents SDK or LangGraph — only if orchestration demands it).
- Tracing/observability + error tracking (Sentry).

## The safety story (this is the point)

This project is less about "making AI do things" and more about **doing it responsibly**:

- The model can only *request* tools; your backend decides whether to run them.
- Authorization is enforced in code, never trusted to the prompt.
- Consequential actions wait for explicit user confirmation.
- Every action is logged and every task has a budget.

Nail this and you've demonstrated the exact judgment that separates a safe AI backend from a liability.

## Build milestones

1. Start from Project 3's RAG assistant.
2. Add tool calling with a safe executor (authorize → validate → maybe require approval → log → run).
3. Implement human approval for ticket creation.
4. Add retries, timeouts, and per-task budgets.
5. Add tracing, per-user usage limits, and an evaluation suite in CI.
6. Deploy with full monitoring and cost alerts.

## Deliverables (don't skip)

Source code, a strong README telling the safety story, API docs, tests (including tool-authorization tests), a deployed demo, and an architecture diagram showing the approval + audit flow.
