---
sidebar_position: 4
title: "Project 3 — AI Knowledge Assistant"
---

# Project 3 — AI Knowledge Assistant

**Level:** AI intermediate · **Covers:** Phases 5, 8, 9

A document chatbot that answers questions from uploaded files, with citations and strict per-user access control. Your first real RAG system.

## Features

- Upload documents (PDF, text) per user.
- Ingestion pipeline: chunk → embed → store vectors with metadata.
- Semantic search over the user's own documents only (access-controlled retrieval).
- **Streaming** answers over SSE.
- **Source citations** — every answer points back to the documents it used.
- "I don't know" when the answer isn't in the documents.

## Tech stack

- **TypeScript** + **Express**
- **PostgreSQL** + **pgvector** (vectors next to relational data)
- An LLM + embeddings provider via its official SDK
- **multer** for uploads (Phase 8)

## Architecture (sketch it in your diagram)

```
Upload → chunk → embed → pgvector (with ownerId)
Question → embed → vector search (filtered by ownerId) → top-k chunks
         → prompt (question + chunks) → LLM (stream) → answer + citations
```

## Build milestones

1. Build the upload + ingestion pipeline (chunking strategy matters — tune it).
2. Store embeddings in pgvector with `ownerId` and source metadata.
3. Implement access-controlled retrieval (filter by the requesting user).
4. Construct a grounded prompt that forces citations and "I don't know."
5. Stream responses over SSE.
6. Deploy with a managed Postgres that has pgvector enabled.

## Why it's a great portfolio piece

It combines databases, file handling, streaming, and AI — and it visibly *works*: upload a document, ask a question, get a cited answer. Recruiters and users both get it immediately.

## Stretch goals

- Relevance evaluation on a small labeled dataset (Phase 9 — Production AI).
- Response + embedding caching to cut cost.
- Highlight the exact passage each citation came from.
