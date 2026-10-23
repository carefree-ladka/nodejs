---
sidebar_position: 3
title: Embeddings & RAG
---

# Embeddings & RAG

Models only know what they were trained on and what you put in the prompt. **Retrieval-Augmented Generation (RAG)** grounds answers in *your* data by finding relevant documents and feeding them to the model as context.

## Embeddings & semantic similarity

An **embedding** is a vector (list of numbers) that represents the meaning of a piece of text. Texts with similar meaning have vectors that are close together. This lets you search by **meaning**, not just keywords.

```js
const {data} = await client.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'How do I reset my password?',
});
const vector = data[0].embedding; // e.g. 1536 numbers
```

Similarity is usually measured with **cosine similarity** — the closer to 1, the more related.

## The RAG pipeline

```
Documents → chunk → embed → store vectors
                                   ↓
User question → embed → vector search → top-k chunks
                                   ↓
         Build prompt (question + retrieved chunks) → LLM → answer + citations
```

### 1. Ingestion & chunking

Split documents into chunks (e.g. a few hundred tokens each, with some overlap) so retrieval returns focused, relevant pieces. Store useful **metadata** with each chunk (source file, page, owner) — you'll need it for citations and access control.

```js
// Pseudocode
for (const chunk of splitIntoChunks(documentText, {size: 500, overlap: 50})) {
  const embedding = await embed(chunk.text);
  await db.insertChunk({
    text: chunk.text,
    embedding,
    source: chunk.source,
    page: chunk.page,
    ownerId: userId, // for access-controlled retrieval
  });
}
```

### 2. Vector storage & search

Store embeddings in a vector-capable store:

- **pgvector** — a PostgreSQL extension. Great default if you already use Postgres (Phase 5): your vectors live next to your relational data.
- **Dedicated vector databases** — Pinecone, Qdrant, Weaviate, Milvus — when you need scale or specialized features.

```sql
-- pgvector: find the 5 most similar chunks
SELECT text, source, page
FROM chunks
WHERE owner_id = $1            -- access control
ORDER BY embedding <=> $2      -- <=> is cosine distance
LIMIT 5;
```

### 3. Generation with citations

Put the retrieved chunks into the prompt and ask the model to answer **only** from them, citing sources.

```js
const context = chunks
  .map((c, i) => `[${i + 1}] (${c.source} p.${c.page})\n${c.text}`)
  .join('\n\n');

const messages = [
  {
    role: 'system',
    content:
      'Answer ONLY using the provided context. Cite sources like [1]. ' +
      'If the answer is not in the context, say you do not know.',
  },
  {role: 'user', content: `Context:\n${context}\n\nQuestion: ${question}`},
];
```

## Things that make RAG good (or bad)

- **Chunking strategy** — too big dilutes relevance, too small loses context. Tune it.
- **Citations** — always return which source each claim came from; it builds trust and aids debugging.
- **Relevance evaluation** — measure whether retrieved chunks actually answer the question (see [Production AI](./production-ai)).
- **Access-controlled retrieval** — filter the vector search by the user's permissions so one user can never retrieve another's documents. This is a real security boundary, not an afterthought.

:::warning
Retrieved documents are **untrusted input**. A malicious document can contain instructions aimed at the model ("ignore previous instructions…"). This is indirect prompt injection — covered in [Production AI](./production-ai).
:::

## Build

A **PDF/document chatbot**: upload documents (Phase 8 file uploads), chunk + embed + store them in Postgres/pgvector, retrieve per-user with access control, and answer questions with inline citations.
