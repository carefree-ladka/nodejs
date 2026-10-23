---
sidebar_position: 3
title: NoSQL (MongoDB + Mongoose)
---

# NoSQL (MongoDB + Mongoose)

MongoDB stores **documents** (JSON-like objects) in **collections**. There are no rigid tables or joins by default — each document can be flexible. It's popular with Node because documents map naturally to JavaScript objects.

## Core concepts

- **Document** — a record, stored as BSON (binary JSON). Looks like a JS object.
- **Collection** — a group of documents (like a table).
- **No enforced schema** at the database level — your app (via Mongoose) defines the shape.
- **References vs embedding** — you either embed related data inside a document or store a reference (`ObjectId`) to another document.

## Mongoose (ODM)

Mongoose adds schemas, validation, and relationship helpers on top of the MongoDB driver.

```bash
npm install mongoose
```

Connect:

```js
import mongoose from 'mongoose';

await mongoose.connect(process.env.DATABASE_URL);
```

Define a schema and model:

```js
// src/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {type: String, required: true, unique: true, lowercase: true},
    name: {type: String, required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  },
  {timestamps: true} // adds createdAt / updatedAt automatically
);

export const User = mongoose.model('User', userSchema);
```

CRUD operations:

```js
// Create
const user = await User.create({email: 'ada@example.com', name: 'Ada'});

// Read
const users = await User.find({name: 'Ada'});
const one = await User.findById(id);

// Populate a reference (like a join)
const withPosts = await User.findById(id).populate('posts');

// Update
await User.findByIdAndUpdate(id, {name: 'Grace'}, {new: true});

// Delete
await User.findByIdAndDelete(id);
```

## Embedding vs referencing

- **Embed** when data is accessed together and doesn't grow unbounded (e.g. an address inside a user).
- **Reference** when data is large, shared, or grows without limit (e.g. a user's thousands of posts).

## SQL or NoSQL — which to learn?

Learn **one** well for now. A good default:

- **PostgreSQL** if your data is relational and structured (most business apps).
- **MongoDB** if your data is document-shaped or you want flexible schemas.

The Express skills are identical either way — only the model layer changes. For the course project, pick one and go deep.

## Indexes matter everywhere

Both SQL and MongoDB slow to a crawl without indexes on the fields you filter/sort by. Add an index to any field you frequently query (like `email`).
