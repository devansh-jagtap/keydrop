<div align="center">
  <img src="website/public/svglogo.webp" alt="KeyDrop Logo" width="120" height="120" />
  <h1>KeyDrop</h1>
  <p><strong>Turn your entire <code>.env</code> file into one deployable key</strong></p>
  
  <p>
    <a href="https://www.npmjs.com/package/keydrop"><img src="https://img.shields.io/npm/v/keydrop?color=22d3a5&logo=npm" alt="npm version" /></a>
    <a href="https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE"><img src="https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5" alt="License" /></a>
    <a href="https://github.com/devansh-jagtap/keydrop/stargazers"><img src="https://img.shields.io/github/stars/devansh-jagtap/keydrop?style=social" alt="GitHub stars" /></a>
  </p>
  
  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#how-it-works">How It Works</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## 🚀 What is KeyDrop?

KeyDrop is a **deployment-first secret management platform** that replaces your entire `.env` file with a single secure key.

Instead of manually configuring dozens of environment variables across local development, CI/CD pipelines, and deployment platforms, you upload your `.env` file once and receive a single `KEYDROP_KEY` that works everywhere.

### The Problem

Managing secrets across environments is painful:

- `.env` files get shared over Slack, Discord, or email
- CI/CD platforms require repetitive manual configuration
- Team onboarding means sending sensitive credentials around
- Deployments break because one variable is missing
- Secret rotation becomes messy and inconsistent

### The KeyDrop Solution

```bash
# Before: 20+ environment variables to configure
DATABASE_URL=postgres://...
API_KEY=sk_live_...
STRIPE_SECRET=sk_test_...
JWT_SECRET=...
REDIS_URL=...
# ... and 15 more

# After: Just one key
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8
```

---

## 🔧 How It Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘

  1. Login (Browser)          2. Push Secrets              3. Develop/Build
┌──────────────┐             ┌──────────┐                 ┌──────────┐
│   keydrop    │             │ keydrop  │                 │ keydrop  │
│    login     │ ──────────▶ │   push   │ ───────────────▶│   run    │
└──────────────┘             └──────────┘                 └──────────┘
       │                            │                             │
       ▼                            ▼                             ▼
  Opens Browser               Upload .env                   Fetch secrets
  → Clerk Auth              (encrypted)                    & run command
  → Returns JWT                   │
                                  ▼
                          KEYDROP_KEY=proj_xxx

┌─────────────────────────────────────────────────────────────┐
│                     Runtime / Production                     │
└─────────────────────────────────────────────────────────────┘

  Set KEYDROP_KEY in platform       App starts with SDK
┌──────────────────────┐          ┌──────────────────────┐
│ Environment Variable │          │  import { init }     │
│ KEYDROP_KEY=proj_xxx │ ────────▶│  await init()        │
└──────────────────────┘          └──────────────────────┘
                                            │
                                            ▼
                                   Secrets loaded into
                                     process.env
```

### System Architecture

```
┌──────────────┐
│     CLI      │  keydrop login/push/pull/run
│  (keydrop)   │
└──────┬───────┘
       │
       │ Browser OAuth Flow (Clerk)
       │
       ▼
┌──────────────┐
│    Clerk     │  Authentication Provider
│ (OAuth/SSO)  │
└──────┬───────┘
       │
       │ Issues JWT Token
       │
       ▼
┌──────────────┐
│  Backend API │  Secret Management
│   (Express)  │
└──────┬───────┘
       │
       │ PostgreSQL
       │
       ▼
┌──────────────┐
│   Database   │  Users, Projects, Encrypted Secrets
│  (Postgres)  │
└──────────────┘

       ▲
       │ HTTPS + Project Key
       │
┌──────────────┐
│  Runtime SDK │  import { init } from "keydrop"
│  (keydrop)   │  await init()
└──────────────┘
```

### Secret Flow

1. **Login**: Developer runs `keydrop login`
   - CLI generates temporary token
   - Opens browser to Clerk authentication
   - User signs in via Clerk (email/password, OAuth, etc.)
   - Clerk issues JWT token
   - CLI polls API and receives JWT
   - JWT saved to `~/.keydrop/config.json`

2. **Push**: Developer runs `keydrop push`
   - CLI reads `.env` file
   - Encrypts with AES-256-GCM
   - Uploads to API with JWT authentication
   - API verifies JWT with Clerk
   - Stores encrypted secrets in PostgreSQL
   - Returns `KEYDROP_KEY`
   - CLI overwrites `.env` with only `KEYDROP_KEY`

3. **Development**: Developer runs `keydrop run -- npm run dev`
   - CLI reads `KEYDROP_KEY` from `.env`
   - Fetches encrypted secrets from API
   - Decrypts locally
   - Injects into command environment
   - Command runs with all secrets available

4. **Runtime**: App starts in production
   - SDK reads `KEYDROP_KEY` from environment
   - Fetches encrypted secrets from API
   - Decrypts and injects into `process.env`
   - App code accesses secrets normally

---

## 📦 Quick Start

### 1. Install

```bash
npm install -g keydrop-cli
npm install keydrop
```

### 2. Login (Browser-based)

```bash
keydrop login
```

This will:
- Open your browser
- Redirect to Clerk authentication
- Sign in with email/password or OAuth (Google, GitHub, etc.)
- Automatically save your session token

### 3. Push Your Secrets

```bash
keydrop push
```

**Before** (your `.env` file):
```env
DATABASE_URL=postgres://user:pass@host/db
API_KEY=sk_live_abc123
STRIPE_SECRET=sk_test_xyz789
JWT_SECRET=my-super-secret
```

**After** (`.env` is replaced with):
```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 4. Develop Locally

```bash
keydrop run -- npm run dev
# or
keydrop run -- next dev
# or
keydrop run -- node index.js
```

Your app now has access to all original environment variables!

### 5. Deploy to Production

Set **one** environment variable in your deployment platform:

```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

Add runtime initialization to your app:

```javascript
import { init } from "keydrop";
await init();

// Now all secrets are available
console.log(process.env.DATABASE_URL);
console.log(process.env.API_KEY);
```

---

## 🎯 Framework Examples

### Next.js

**Installation:**
```bash
npm install keydrop
npm install -g keydrop-cli
```

**Login and push secrets:**
```bash
keydrop login
keydrop push
```

**Development:**
```bash
keydrop run -- npm run dev
```

**Build:**
```bash
keydrop run -- next build
```

**Production runtime** - Create `instrumentation.ts`:
```typescript
export async function register() {
  const { init } = await import("keydrop");
  await init();
}
```

Enable in `next.config.js`:
```javascript
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
```

### Node.js / Express

**Installation:**
```bash
npm install keydrop
npm install -g keydrop-cli
```

**Login and push secrets:**
```bash
keydrop login
keydrop push
```

**Development:**
```bash
keydrop run -- npm start
```

**Production** - In your `index.js`:
```javascript
import { init } from "keydrop";
await init();

import express from "express";
const app = express();

app.get("/", (req, res) => {
  // All secrets loaded!
  console.log(process.env.DATABASE_URL);
  res.send("Hello World");
});

app.listen(3000);
```

If your runtime doesn't support top-level await:
```javascript
import { init } from "keydrop";

(async () => {
  await init();
  
  const app = express();
  app.listen(3000);
})();
```

---

## 🚀 Deployment

### Vercel

**1. Set environment variable:**
```
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**2. Set build command:**
```bash
npx keydrop run -- next build
```

**3. Add runtime initialization** (see Next.js example above)

**4. Deploy!**

This setup is **verified and working**.

### Railway / Render / Heroku

**1. Set environment variable:**
```
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**2. Use `keydrop run` in build command** (if needed):
```bash
keydrop run -- npm run build
```

**3. Add SDK initialization** (see examples above)

### Docker

**Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build with secrets (if needed)
ARG KEYDROP_KEY
ENV KEYDROP_KEY=$KEYDROP_KEY
RUN npx keydrop run -- npm run build

CMD ["node", "index.js"]
```

**Runtime secrets are loaded by SDK** - set `KEYDROP_KEY` when running container.

---

## 📚 Packages

| Package | Description | Documentation |
|---------|-------------|---------------|
| [`keydrop-cli`](packages/cli/README.md) | CLI for push/pull/run commands | [CLI Docs](packages/cli/README.md) |
| [`keydrop`](packages/sdk/README.md) | Runtime SDK for secret injection | [SDK Docs](packages/sdk/README.md) |
| [`api`](packages/api/README.md) | Backend API service | [API Docs](packages/api/README.md) |

---

## 🔒 Security

### Authentication

- **Clerk** for user authentication (OAuth, social login, email/password)
- **Browser-based CLI login** (secure OAuth flow)
- **JWT tokens** with Clerk verification
- **HTTPS-only** communication in production

### Encryption

- **Algorithm**: AES-256-GCM
- **Key Length**: 256 bits (32 bytes)
- **IV**: Random 12 bytes per encryption
- **Auth Tag**: 16 bytes for integrity verification

### Authorization

- Users can only access their own projects
- Ownership verification via Clerk user ID
- Runtime secret fetch uses `KEYDROP_KEY` (no user auth required)

### Storage

- Secrets encrypted before storage
- Database stores only ciphertext
- Plain text never persists to disk
- Encryption key stored securely in environment

---

## 🐛 Troubleshooting

### "Not logged in" error

```bash
keydrop login
```

Make sure you're logged in via browser before pushing secrets.

### Browser doesn't open during login

Copy the URL shown in the terminal and open it manually in your browser.

### "KEYDROP_KEY not found"

Make sure `.env` contains:
```env
KEYDROP_KEY=proj_...
```

Or set it in your environment:
```bash
export KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8
```

### Secrets not loading at runtime

1. Verify `KEYDROP_KEY` is set in environment
2. Check `init()` is called before using secrets
3. Verify API is reachable
4. Check for error messages in console

### Build-time secrets not available

Use `keydrop run` to inject secrets:

```bash
keydrop run -- next build
keydrop run -- npm run build
```

### "Invalid project key"

- Make sure you copied the full key
- Key should start with `proj_`
- Re-run `keydrop push` if needed

---

## 📖 Project Structure

```
keydrop/
├── packages/
│   ├── cli/              # CLI tool (keydrop command)
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── auth.js      # Browser-based login/logout
│   │   │   │   ├── push.js      # Upload secrets
│   │   │   │   ├── pull.js      # Download secrets
│   │   │   │   └── run.js       # Run with secrets
│   │   │   └── index.js
│   │   └── bin/
│   │       └── envlock.js
│   │
│   ├── sdk/              # Runtime SDK
│   │   └── src/
│   │       └── init.js   # Secret injection
│   │
│   └── api/              # Backend service
│       ├── src/
│       │   ├── routes/
│       │   │   └── secrets.js    # API endpoints
│       │   └── lib/
│       │       ├── clerk.js      # Clerk integration
│       │       └── auth.js       # JWT utilities
│       └── prisma/
│           └── schema.prisma     # Database schema
│
└── website/              # Landing page + Dashboard
    └── app/
        └── dashboard/    # User dashboard
```

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📝 Documentation

- [User Guide](USER_GUIDE.md) - Comprehensive usage guide
- [Implementation Details](IMPLEMENTATION.md) - Technical architecture
- [CLI Documentation](packages/cli/README.md)
- [SDK Documentation](packages/sdk/README.md)
- [API Documentation](packages/api/README.md)

---

## 🐛 Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/devansh-jagtap/keydrop/issues).

---

## 📄 License

MIT © [Devansh Jagtap](https://github.com/devansh-jagtap)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/devansh-jagtap">Devansh Jagtap</a></p>
  <p>
    <a href="https://github.com/devansh-jagtap/keydrop">GitHub</a> •
    <a href="https://www.npmjs.com/package/keydrop">npm</a> •
    <a href="https://keydrops.tech">Website</a>
  </p>
</div>
