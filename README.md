<div align="center">
  <img src="website/public/svglogo.webp" alt="KeyDrop Logo" width="120" height="120" />
  <h1>KeyDrop 🔐</h1>
  <p><strong>Turn your entire <code>.env</code> file into one secure deployable key</strong></p>
  
  <p>
    <a href="https://www.npmjs.com/package/keydrop"><img src="https://img.shields.io/npm/v/keydrop?color=22d3a5&logo=npm" alt="npm version" /></a>
    <a href="https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE"><img src="https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5" alt="License" /></a>
    <a href="https://github.com/devansh-jagtap/keydrop/stargazers"><img src="https://img.shields.io/github/stars/devansh-jagtap/keydrop?style=social" alt="GitHub stars" /></a>
  </p>
  
  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#how-it-works">How It Works</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#packages">Packages</a>
  </p>
</div>

---

## 🚀 What is KeyDrop?

KeyDrop lets you replace dozens of environment variables with a single secure key.

Instead of manually copying `.env` files between local machines, CI pipelines, staging servers, and production environments, you push your secrets once and deploy anywhere using only `KEYDROP_KEY`.

## 💡 Why KeyDrop?

Managing secrets across environments is painful:

* `.env` files get shared over Slack, Discord, or email
* CI/CD platforms require repetitive manual setup
* Team onboarding means sending sensitive credentials around
* Deployments break because one variable is missing
* Secret rotation becomes messy and inconsistent

KeyDrop simplifies this workflow into:

```bash
keydrop push
```

Your secrets are encrypted, stored securely, and replaced with a single deployable key.

## 📊 Before vs After

### Before

```env
MONGO_URI=mongodb://...
JWT_SECRET=abc123
STRIPE_SECRET_KEY=sk_test_xxx
REDIS_URL=redis://...
```

Every environment needs all variables configured manually.

### After

```env
KEYDROP_KEY=proj_x82js8sh
```

That single key securely loads all your environment variables at runtime.

## 🔧 How It Works

### 1. Push Your `.env`

```bash
keydrop push
```

The CLI:

* Reads your `.env`
* Parses all environment variables
* Encrypts them using AES-256-GCM
* Uploads the encrypted payload to the KeyDrop API
* Returns a unique project key
* Replaces your local `.env` with:

```env
KEYDROP_KEY=proj_x82js8sh
```

### 2. Initialize KeyDrop in Your App

#### For Next.js

1. Install the latest SDK:

```bash
npm install keydrop@latest
```

2. Create `instrumentation.ts` in your project root (same level as `package.json`):

```ts
export async function register() {
  const { init } = await import("keydrop");
  await init();
}
```

> Note: If your Next.js setup does not detect `instrumentation.ts`, enable the instrumentation hook in `next.config.js`:

```js
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
```

#### For Node.js

1. Install the latest SDK:

```bash
npm install keydrop@latest
```

2. In `index.js` or `server.js`, initialize KeyDrop in the first lines:

```js
import { init } from "keydrop";
await init();

// now start your server below
const app = express();
```

If your runtime does not support top-level `await`, use an async IIFE:

```js
import { init } from "keydrop";

(async () => {
  await init();
  const app = express();
  app.listen(3000);
})();
```

### 3. Runtime Secret Injection

When your app starts:

1. The SDK reads `KEYDROP_KEY`
2. Fetches encrypted secrets from the API
3. Decrypts them securely
4. Injects them into `process.env`

Your existing code works unchanged:

```js
process.env.MONGO_URI
process.env.JWT_SECRET
process.env.STRIPE_SECRET_KEY
```

## 🚦 Quick Start

### Install

```bash
npm install keydrop@latest
npm install -g keydrop-cli
```

### Push Secrets

```bash
keydrop push
```

### Add Runtime Initialization

#### Next.js

```bash
npm install keydrop@latest
```

Create `instrumentation.ts` in your project root:

```ts
export async function register() {
  const { init } = await import("keydrop");
  await init();
}
```

> Note: If your Next.js setup does not detect `instrumentation.ts`, enable the instrumentation hook in `next.config.js`:

```js
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
```

#### Node.js

```bash
npm install keydrop@latest
```

In `index.js` or `server.js`:

```js
import { init } from "keydrop";
await init();
```

If top-level `await` is not supported in your setup, wrap startup in an async IIFE instead:

```js
import { init } from "keydrop";

(async () => {
  await init();
  const app = express();
  app.listen(3000);
})();
```

### Deploy Anywhere

Only set this environment variable:

```env
KEYDROP_KEY=proj_x82js8sh
```

Your secrets will automatically load at runtime.

## 📦 Example Flow

```bash
# Local development
keydrop push

# .env becomes
KEYDROP_KEY=proj_x82js8sh
```

Deploy to:

* Vercel
* Render
* Render
* Docker
* AWS
* VPS
* GitHub Actions

Only `KEYDROP_KEY` is required.

## 📚 Packages

| Package       | Description                                  |
| ------------- | -------------------------------------------- |
| `keydrop`     | Runtime SDK that fetches and injects secrets |
| `keydrop-cli` | CLI tool for pushing and managing secrets    |
| `api`         | Backend API for encryption and storage       |

## 🏗️ Architecture

```text
┌─────────────────┐
│   keydrop-cli   │
└────────┬────────┘
         │
         │ Reads .env
         │
         ▼
┌─────────────────┐
│ Encrypt Secrets │
│ AES-256-GCM     │
└────────┬────────┘
         │
         │ Upload encrypted payload
         ▼
┌─────────────────┐
│   KeyDrop API   │
│ Stores ciphertext│
└────────┬────────┘
         │
         │ Returns KEYDROP_KEY
         ▼
┌─────────────────┐
│ Runtime SDK     │
│ keydrop/init    │
└────────┬────────┘
         │
         │ Fetch + decrypt secrets
         ▼
┌─────────────────┐
│ process.env     │
└─────────────────┘
```

## 🔒 Security

KeyDrop is designed so secrets are never exposed in plaintext after upload.

### Encryption

* AES-256-GCM authenticated encryption
* Encrypted before storage
* Ciphertext stored in the database

### Authentication

* `KEYDROP_KEY` acts as the project access token
* No secret values exposed in logs
* HTTPS-only communication in production

### Runtime

Secrets are injected directly into memory via `process.env`.

## 🏠 Self Hosting

You can self-host the KeyDrop API.

### Clone the Repository

```bash
git clone https://github.com/devansh-jagtap/keydrop.git
cd keydrop/packages/api
npm install
```

### Configure Environment Variables

```env
DATABASE_URL=your_postgres_connection_string
ENCRYPTION_KEY=your_64_char_hex_key
```

### Start the API

```bash
npm start
```

### Point SDK & CLI to Your API

```env
KEYDROP_API_URL=https://your-api.com
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 Documentation

- [User Guide](USER_GUIDE.md) - Comprehensive usage documentation
- [Implementation Details](IMPLEMENTATION.md) - Technical implementation guide
- [API Documentation](packages/api/README.md) - API reference

## 🐛 Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/devansh-jagtap/keydrop/issues).

## 📄 License

MIT © [Devansh Jagtap](https://github.com/devansh-jagtap)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/devansh-jagtap">Devansh Jagtap</a></p>
  <p>
    <a href="https://github.com/devansh-jagtap/keydrop">GitHub</a> •
    <a href="https://www.npmjs.com/package/keydrop">npm</a> •
    <a href="https://keydrop.dev">Website</a>
  </p>
</div>
