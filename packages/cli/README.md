# KeyDrop CLI

> Command-line tool for managing environment secrets with KeyDrop

[![npm version](https://img.shields.io/npm/v/keydrop-cli?color=22d3a5&logo=npm)](https://www.npmjs.com/package/keydrop-cli)
[![License: MIT](https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5)](https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE)

## 📦 Installation

```bash
npm install -g keydrop-cli
```

## 🚀 Quick Start

### 1. Login (Browser-based)

```bash
keydrop login
```

- Opens your browser automatically
- Redirects to Clerk authentication
- Sign in with email/password or OAuth (Google, GitHub, etc.)
- JWT token automatically saved locally

### 2. Push Your Secrets

```bash
keydrop push
```

Your `.env` is encrypted, uploaded, and replaced with:

```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 3. Run Commands with Secrets

```bash
keydrop run -- npm run dev
keydrop run -- next build
keydrop run -- node index.js
```

Secrets are automatically injected into the command environment.

---

## 📖 Commands

### `keydrop login`

Authenticate via browser using Clerk.

**Usage:**
```bash
keydrop login
```

**What happens:**
1. CLI generates temporary token
2. Opens browser to Clerk authentication page
3. You sign in via Clerk (supports OAuth, email/password, etc.)
4. Clerk issues JWT token
5. CLI polls API and receives JWT
6. JWT saved to `~/.keydrop/config.json`

**Example Output:**
```
 Logging in to KeyDrop...

Opening browser to complete login...

  https://keydrops.tech/auth/cli?token=cli_temp_xxx

If browser didn't open, copy the URL above.

 Waiting for you to login in the browser...

 Logged in successfully!
```

**Token Storage:**
```
~/.keydrop/config.json
```

**Authentication Flow:**
```
CLI (keydrop login)
  ↓
Generate temp token
  ↓
Open browser → Clerk
  ↓
User signs in
  ↓
Clerk issues JWT
  ↓
API stores JWT → temp token mapping
  ↓
CLI polls API
  ↓
Receives JWT
  ↓
Saves to ~/.keydrop/config.json
```

**Supported Auth Methods (via Clerk):**
- Email/Password
- Google OAuth
- GitHub OAuth
- Other OAuth providers configured in Clerk

---

### `keydrop logout`

Remove saved authentication token.

**Usage:**
```bash
keydrop logout
```

**What it does:**
- Deletes `~/.keydrop/config.json`
- Removes stored JWT token
- You'll need to login again for authenticated commands

---

### `keydrop push`

Upload your `.env` file and receive a `KEYDROP_KEY`.

**Usage:**
```bash
keydrop push
```

**Authentication:** Required (run `keydrop login` first)

**What it does:**
1. Reads your `.env` file from current directory
2. Parses all environment variables
3. Encrypts them with AES-256-GCM
4. Sends encrypted data to API with JWT token
5. API verifies JWT with Clerk
6. Stores encrypted secrets in database (linked to your Clerk user ID)
7. Returns unique `KEYDROP_KEY`
8. Overwrites `.env` with only `KEYDROP_KEY`

**Before** (`.env`):
```env
DATABASE_URL=postgres://user:pass@localhost/db
API_KEY=sk_live_abc123xyz
STRIPE_SECRET=sk_test_789xyz
JWT_SECRET=my-super-secret-key
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_APP_URL=https://myapp.com
```

**After** (`.env`):
```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

**API Endpoint:** `POST /upload`

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "secrets": {
    "DATABASE_URL": "postgres://...",
    "API_KEY": "sk_live_...",
    ...
  }
}
```

**Response:**
```json
{
  "projectKey": "proj_a1b2c3d4e5f6g7h8...",
  "message": "Secrets uploaded successfully"
}
```

---

### `keydrop pull`

Download and decrypt your secrets back to `.env` format.

**Usage:**
```bash
keydrop pull
```

**Authentication:** Required (run `keydrop login` first)

**What it does:**
1. Reads `KEYDROP_KEY` from your `.env` file
2. Fetches encrypted secrets from API
3. Decrypts secrets locally
4. Overwrites `.env` with all decrypted secrets

**Use case:** Restore original secrets when needed for debugging or local modifications.

**Before** (`.env`):
```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8
```

**After** (`.env`):
```env
DATABASE_URL=postgres://user:pass@localhost/db
API_KEY=sk_live_abc123xyz
STRIPE_SECRET=sk_test_789xyz
JWT_SECRET=my-super-secret-key
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_APP_URL=https://myapp.com
```

---

### `keydrop run`

Run any command with secrets injected into the environment.

**Usage:**
```bash
keydrop run -- <command>
```

**Authentication:** NOT required (uses `KEYDROP_KEY` from environment)

**What it does:**
1. Reads `KEYDROP_KEY` from `.env` or `process.env`
2. Fetches encrypted secrets from API
3. Decrypts secrets locally
4. Merges secrets with current environment
5. Spawns command with ALL secrets available via `process.env`

**Examples:**

**Development:**
```bash
keydrop run -- npm run dev
keydrop run -- next dev
keydrop run -- node index.js
keydrop run -- yarn dev
```

**Build:**
```bash
keydrop run -- next build
keydrop run -- npm run build
keydrop run -- vite build
keydrop run -- tsc
```

**Testing:**
```bash
keydrop run -- npm test
keydrop run -- jest
keydrop run -- vitest run
```

**Database migrations:**
```bash
keydrop run -- npx prisma migrate dev
keydrop run -- npx prisma db push
keydrop run -- knex migrate:latest
```

**How it works:**

```javascript
// 1. Read KEYDROP_KEY
const key = process.env.KEYDROP_KEY || readFromEnvFile();

// 2. Fetch secrets
const response = await fetch(`${API_URL}/secrets`, {
  headers: { Authorization: `Bearer ${key}` }
});
const secrets = await response.json();

// 3. Merge with environment
const env = { ...process.env, ...secrets };

// 4. Spawn command
spawn(command, args, { env, stdio: 'inherit' });
```

**API Endpoint:** `GET /secrets`

**Request Headers:**
```
Authorization: Bearer proj_a1b2c3d4e5f6g7h8...
```

**Response:**
```json
{
  "secrets": {
    "DATABASE_URL": "postgres://...",
    "API_KEY": "sk_live_...",
    "NEXT_PUBLIC_APP_URL": "https://...",
    ...
  }
}
```

**Note:** `NEXT_PUBLIC_*` variables and other build-time vars are also injected!

---

## 🔧 Configuration

### Custom API URL

For self-hosted or staging environments:

```bash
export KEYDROP_API_URL=https://your-api.com
keydrop login
keydrop push
```

### Custom Website URL

For custom Clerk authentication page:

```bash
export KEYDROP_WEBSITE_URL=https://your-website.com
keydrop login
```

### Token Storage

JWT tokens are stored in:
```
~/.keydrop/config.json
```

**Format:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "loggedInAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 💡 Usage Examples

### Complete Workflow

```bash
# 1. Login via browser
keydrop login

# 2. Create your .env
cat > .env << EOF
DATABASE_URL=postgres://localhost/mydb
API_KEY=sk_test_abc123
STRIPE_SECRET=sk_test_xyz789
EOF

# 3. Push secrets
keydrop push
# .env now contains only KEYDROP_KEY

# 4. Develop with secrets
keydrop run -- npm run dev

# 5. Build with secrets
keydrop run -- next build
```

### Team Onboarding

**Team member clones repo:**
```bash
git clone your-repo
cd your-repo
npm install
```

**`.env` in repo (safe to commit):**
```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8
```

**They can immediately run:**
```bash
keydrop run -- npm run dev
```

No need to request secrets from teammates!

### CI/CD Integration

**GitHub Actions:**
```yaml
name: Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm install -g keydrop-cli
      - run: npx keydrop run -- npm run build
        env:
          KEYDROP_KEY: ${{ secrets.KEYDROP_KEY }}
```

**GitLab CI:**
```yaml
build:
  script:
    - npm install
    - npm install -g keydrop-cli
    - keydrop run -- npm run build
  variables:
    KEYDROP_KEY: $KEYDROP_KEY
```

### Multiple Environments

**Development:**
```bash
# Use dev .env
keydrop push
# Save as KEYDROP_KEY_DEV
```

**Production:**
```bash
# Use prod .env  
keydrop push
# Save as KEYDROP_KEY_PROD
```

**Run with specific environment:**
```bash
KEYDROP_KEY=$KEYDROP_KEY_DEV keydrop run -- npm run dev
KEYDROP_KEY=$KEYDROP_KEY_PROD keydrop run -- npm start
```

---

## 🐛 Troubleshooting

### "Not logged in" error

```bash
keydrop login
```

Make sure you complete the browser authentication.

### Browser doesn't open

Copy the URL from terminal output and open manually:

```
https://keydrops.tech/auth/cli?token=cli_temp_xxx
```

### "No .env file found"

Make sure you're in the correct directory:

```bash
ls -la .env
keydrop push
```

### "KEYDROP_KEY not found"

When using `keydrop run`, ensure `.env` contains:

```env
KEYDROP_KEY=proj_...
```

Or set as environment variable:

```bash
export KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8
keydrop run -- npm run dev
```

### "Failed to connect to KeyDrop API"

Check your internet connection and API URL:

```bash
echo $KEYDROP_API_URL
# Should be: https://keydrop-1wzo.onrender.com (or your custom URL)
```

### Login timeout

The CLI waits up to 2 minutes for browser login. If it times out:

1. Complete signin faster
2. Check browser didn't block the authentication page
3. Try again: `keydrop login`

---

## 🔒 Security

### Clerk Authentication

- **OAuth providers**: Google, GitHub, etc.
- **Email/Password** with secure hashing
- **MFA support** (if enabled in Clerk)
- **Session management** via JWT tokens

### Encryption

- **AES-256-GCM** encryption
- Encryption happens **locally** before upload
- Only encrypted data sent to server
- **HTTPS-only** communication

### Token Security

- JWT tokens stored in `~/.keydrop/config.json`
- Tokens are issued by Clerk (trusted auth provider)
- Tokens verified on every API request
- Not shared with third parties

### Project Keys

- `KEYDROP_KEY` is safe to commit to Git
- Keys are cryptographically random
- No sensitive data in the key itself
- Keys only work with API - useless if API is down

---

## 📚 Documentation

- [Main Documentation](https://github.com/devansh-jagtap/keydrop)
- [SDK Documentation](https://github.com/devansh-jagtap/keydrop/tree/main/packages/sdk)
- [API Documentation](https://github.com/devansh-jagtap/keydrop/tree/main/packages/api)

---

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](https://github.com/devansh-jagtap/keydrop/blob/main/CONTRIBUTING.md).

---

## 📄 License

MIT © [Devansh Jagtap](https://github.com/devansh-jagtap)
