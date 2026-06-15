# KeyDrop SDK

> Runtime SDK for fetching and injecting environment variables from KeyDrop

[![npm version](https://img.shields.io/npm/v/keydrop?color=22d3a5&logo=npm)](https://www.npmjs.com/package/keydrop)
[![License: MIT](https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5)](https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE)

## 📦 Installation

```bash
npm install keydrop
```

## 🚀 Quick Start

### Prerequisites

Before using the SDK, push your secrets with the CLI:

```bash
npm install -g keydrop-cli
keydrop push
```

This replaces your `.env` with `KEYDROP_KEY=proj_...`

### Next.js

Create `instrumentation.ts` in your project root:

```typescript
export async function register() {
  const { init } = await import("keydrop");
  await init();
}
```

Enable instrumentation in `next.config.js`:

```javascript
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
```

### Node.js / Express

```javascript
import { init } from "keydrop";

await init();

// Your app code below
const app = express();
app.listen(3000);
```

If top-level await is not supported:

```javascript
import { init } from "keydrop";

(async () => {
  await init();
  const app = express();
  app.listen(3000);
})();
```

## 🔧 How It Works

1. Reads `KEYDROP_KEY` from `process.env`
2. Fetches encrypted secrets from KeyDrop API
3. Decrypts them securely
4. Injects all variables into `process.env`

Your existing code works unchanged:

```javascript
process.env.DATABASE_URL
process.env.API_KEY
process.env.JWT_SECRET
```

## 📖 API Reference

### `init(options?)`

Initializes KeyDrop and loads environment variables.

**Parameters:**

- `options` (optional):
  - `apiUrl`: Custom KeyDrop API URL (default: `https://api.keydrop.dev`)
  - `key`: Override `KEYDROP_KEY` (default: reads from `process.env.KEYDROP_KEY`)

**Returns:** `Promise<void>`

**Example:**

```javascript
import { init } from "keydrop";

await init({
  apiUrl: "https://your-custom-api.com",
  key: "proj_custom_key",
});
```

## 🔒 Security

- All secrets are encrypted with AES-256-GCM
- HTTPS-only communication
- Secrets are injected directly into memory
- No secrets are written to disk

## 🐛 Troubleshooting

### "KEYDROP_KEY not found"

Make sure `KEYDROP_KEY` is set in your environment:

```env
KEYDROP_KEY=proj_your_key_here
```

### Secrets not loading

1. Verify your `KEYDROP_KEY` is correct
2. Check that `init()` is called before accessing `process.env`
3. Ensure the KeyDrop API is accessible

## 📚 Documentation

- [Main Documentation](https://github.com/devansh-jagtap/keydrop)
- [User Guide](https://github.com/devansh-jagtap/keydrop/blob/main/USER_GUIDE.md)
- [CLI Documentation](https://github.com/devansh-jagtap/keydrop/tree/main/packages/cli)

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](https://github.com/devansh-jagtap/keydrop/blob/main/CONTRIBUTING.md).

## 📄 License

MIT © [Devansh Jagtap](https://github.com/devansh-jagtap)
