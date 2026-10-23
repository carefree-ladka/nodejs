---
sidebar_position: 1
title: Overview
---

# Phase 9 — Generative AI Engineering with Node.js

This is the AI specialization. The key insight: **you do not need to train your own LLM to build useful AI products.** You consume models through APIs and do the engineering around them — exactly the kind of work a Node backend is great at.

## The golden rule

> Learn normal backend engineering first, then add AI as a capability.

An AI feature is still a backend feature. Your app still needs authentication, authorization, data storage, validation, testing, logging, and reliable error handling (Phases 0–8). AI doesn't replace any of that — it sits on top of it.

## What you'll cover

- [LLM API integration](./llm-integration) — prompts, streaming, structured output, retries.
- [Embeddings & RAG](./embeddings-rag) — answer questions from your own documents.
- [Tool calling & AI agents](./tool-calling-agents) — let models take actions safely.
- [Production AI](./production-ai) — prompt injection, evaluation, cost control, monitoring.

## Why it matters

AI features (chatbots, document Q&A, assistants, summarization) are in huge demand, and the backend is where the real engineering lives: orchestrating model calls, grounding answers in your data, calling tools safely, controlling cost, and keeping it reliable. The model is a dependency; the system around it is your job.

## Mini-projects (built across the phase)

1. A **streaming chatbot** endpoint that keeps conversation history.
2. A **document Q&A** bot (RAG) that answers from uploaded PDFs with citations.
3. An **AI assistant** that uses tool calling to search a knowledge base and create tickets with user confirmation.
4. Add **monitoring, evaluations, and per-user usage limits** to the document bot.

:::warning
Treat everything a model outputs, and everything a user or document feeds into a model, as **untrusted**. Prompt injection, unsafe tool execution, and runaway cost are the three things that bite AI backends in production. Phase 9's last page is dedicated to them.
:::
