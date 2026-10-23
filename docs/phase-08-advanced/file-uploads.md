---
sidebar_position: 3
title: File Uploads
---

# File Uploads

Handling `multipart/form-data` (file uploads) needs special middleware because `express.json()` doesn't parse it.

## multer

```bash
npm install multer
```

```js
import multer from 'multer';

// Store in memory (good for forwarding to cloud storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 5 * 1024 * 1024}, // 5 MB cap
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg'];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.post('/avatar', authenticate, upload.single('avatar'), (req, res) => {
  // req.file.buffer holds the bytes; req.file.mimetype, etc.
  res.status(201).json({size: req.file.size});
});
```

## Store files in object storage, not your server

Don't keep user uploads on the app server's local disk — it doesn't scale and disappears on redeploy. Upload to **object storage** like AWS S3 (or S3-compatible services), and store just the URL/key in your database.

## Security checklist for uploads

- **Limit file size** (`limits.fileSize`) to prevent abuse.
- **Validate MIME type and extension** — don't trust the filename.
- **Never execute uploaded files** or store them in a web-executable path.
- **Generate your own filenames** (e.g. a UUID) — don't use the client's filename directly.
- Consider scanning untrusted uploads for malware in sensitive apps.

:::warning
File uploads are a classic attack vector. Treat every uploaded byte as hostile until validated.
:::
