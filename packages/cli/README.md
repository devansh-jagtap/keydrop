# KeyDrop CLI

> Command-line tool for managing environment secrets with KeyDrop

[![npm version](https://img.shields.io/npm/v/keydrop-cli?color=22d3a5&logo=npm)](https://www.npmjs.com/package/keydrop-cli)
[![License: MIT](https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5)](https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE)

## 📦 Installation

```bash
npm install -g keydrop-cli
```

## 🚀 Quick Start

### 1. Login

```bash
keydrop login
```

You'll be prompted for email and password. Your JWT token is saved locally in `~/.keydrop/config.json`.

### 2. Push Your Secrets

```bash
keydrop push
```

This reads your `.env` file, encrypts it, uploads it, and replaces your `.env` with:

```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 3. Run Commands with Secrets

```bash
keydrop run -- npm run dev
keydrop run -- next build
keydrop run -- node index.js
```

Secrets are injected into the command environment automatically.

---

## 📖 Commands

### `keydrop login`

Authenticate with KeyDrop and save your JWT token locally.

**Usage:**
```bash
keydrop login
```

**Prompts:**
```
Email: your@email.com
Password: ******
✓ Logged in successfully
```

**What it does:**
- Prompts for email and password
- Sends credentials to `/auth/login` endpoint
- Receives JWT token (30-day expiry)
- Saves token to `~/.keydrop/config.json`
- Token is used for all subsequent authenticated commands

**Token storage location:**
```
~/.keydrop/config.json
```

**Example output:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### `keydrop logout`

Remove your saved authentication token.

**Usage:**
```bash
keydrop logout
```

**What it does:**
- Deletes `~/.keydrop/config.json`
- Removes stored JWT token
- You'll need to login again to use authenticated commands

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
4. Uploads encrypted data to KeyDrop API
5. API stores encrypted secrets in database
6. Returns a unique `KEYDROP_KEY`
7. Overwrites your `.env` with only `KEYDROP_KEY`

**Before** (`.env`):
```env
DATABASE_URL=postgres://user:pass@localhost/db
API_KEY=sk_live_abc123xyz
STRIPE_SECRET=sk_test_789xyz
JWT_SECRET=my-super-secret-key
REDIS_URL=redis://localhost:6379
```

**After** (`.env`):
```env
KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

**API Endpoint:** `POST /upload`

**Request:**
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
4. Writes all secrets back to `.env` file

**Use case:** Restore original secrets when needed for debugging or local modifications.

**Example:**

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
```

---

### `keydrop run`

Run any command with secrets injected into the environment.

**Usage:**
```bash
keydrop run -- <command>
```

**Authentication:** Not required (uses `KEYDROP_KEY` from environment)

**What it does:**
1. Reads `KEYDROP_KEY` from `.env` or environment
2. Fetches encrypted secrets from API
3. Decrypts secrets locally
4. Injects ALL secrets into command environment
5. Spawns the specified command with secrets available
6. Command runs with `process.env` populated

**Examples:**

**Development:**
```bash
keydrop run -- npm run dev
keydrop run -- next dev
keydrop run -- node index.js
```

**Build:**
```bash
keydrop run -- next build
keydrop run -- npm run build
keydrop run -- vite build
```

**Testing:**
```bash
keydrop run -- npm test
keydrop run -- jest
```

**Database migrations:**
```bash
keydrop run -- npx prisma migrate dev
keydrop run -- knex migrate:latest
```

**How it works:**

```javascript
// 1. Fetch secrets using KEYDROP_KEY
const secrets = await fetchSecrets(KEYDROP_KEY);

// 2. Merge with current environment
const env = { ...process.env, ...secrets };

// 3. Spawn command with injected secrets
spawn(command, args, { env });
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
    ...
  }
}
```

---

## 🔧 Configuration

### Custom API URL

For self-hosted or staging environments:

```bash
export KEYDROP_API_URL=https://your-api.com
keydrop login
keydrop push
```

### Token Storage

JWT tokens are stored in:
```
~/.keydrop/config.json
```

**Format:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token expiry:** 30 days

---

## 💡 Usage Examples

### Complete Workflow

```bash
# 1. Login
keydrop login

# 2. Create your .env
cat > .env << EOF
DATABASE_URL=postgres://localhost/mydb
API_KEY=sk_test_abc123
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
# .env.dev
keydrop push
# Save as KEYDROP_KEY_DEV
```

**Production:**
```bash
# .env.prod
keydrop push
# Save as KEYDROP_KEY_PROD
```

**Use environment-specific keys:**
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

Make sure you're authenticated before running `keydrop push`.

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

Or set it as environment variable:

```bash
export KEYDROP_KEY=proj_a1b2c3d4e5f6g7h8
keydrop run -- npm run dev
```

### "Invalid credentials"

Double-check email/password:

```bash
keydrop logout
keydrop login
```

### Token expired

JWT tokens expire after 30 days. Re-login:

```bash
keydrop login
```

### API connection error

Check API URL is correct:

```bash
# Default
echo $KEYDROP_API_URL

# Or set custom
export KEYDROP_API_URL=https://your-api.com
```

---

## 🔒 Security

### JWT Tokens

- 30-day expiry
- Stored in `~/.keydrop/config.json`
- Used for authenticated API calls
- Not sent to third parties

### Encryption

- AES-256-GCM encryption
- Encryption happens locally before upload
- Only encrypted data sent to server
- HTTPS-only communication

### Project Keys

- `KEYDROP_KEY` is safe to commit (it's just a reference)
- Keys are unguessable (cryptographically random)
- No sensitive data in the key itself

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
