# KeyDrop CLI

> Command-line tool for pushing and managing environment secrets with KeyDrop

[![npm version](https://img.shields.io/npm/v/keydrop-cli?color=22d3a5&logo=npm)](https://www.npmjs.com/package/keydrop-cli)
[![License: MIT](https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5)](https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE)

## 📦 Installation

```bash
npm install -g keydrop-cli
```

## 🚀 Quick Start

### Push Your Secrets

```bash
keydrop push
```

This will:
1. Read your `.env` file
2. Encrypt all variables with AES-256-GCM
3. Upload to KeyDrop API
4. Replace your `.env` with:

```env
KEYDROP_KEY=proj_x82js8sh
```

### Pull Your Secrets

```bash
keydrop pull
```

Fetches and decrypts your secrets back to `.env` format.

## 📖 Commands

### `keydrop push`

Uploads your `.env` file to KeyDrop.

```bash
keydrop push [options]
```

**Options:**
- `--file <path>` - Path to .env file (default: `.env`)
- `--project <name>` - Project name for organization
- `--force` - Overwrite existing project

**Example:**

```bash
keydrop push --file .env.production --project my-app
```

### `keydrop pull`

Downloads and decrypts your secrets.

```bash
keydrop pull [options]
```

**Options:**
- `--key <key>` - Project key (uses `KEYDROP_KEY` env var if not provided)
- `--output <path>` - Output file path (default: `.env`)

**Example:**

```bash
keydrop pull --key proj_x82js8sh --output .env.local
```

### `keydrop list`

Lists all your projects.

```bash
keydrop list
```

### `keydrop delete`

Deletes a project from KeyDrop.

```bash
keydrop delete <project-key>
```

**Example:**

```bash
keydrop delete proj_x82js8sh
```

## 🔧 Configuration

### Custom API URL

For self-hosted instances:

```bash
export KEYDROP_API_URL=https://your-api.com
keydrop push
```

Or use in your `.env`:

```env
KEYDROP_API_URL=https://your-api.com
```

## 💡 Usage Examples

### Development Workflow

```bash
# Initial setup
keydrop push

# .env is now: KEYDROP_KEY=proj_x82js8sh
# Commit this to your repo (it's safe!)

# Team member clones repo
git clone your-repo
npm install
npm start # SDK automatically loads secrets
```

### Multiple Environments

```bash
# Push production secrets
keydrop push --file .env.production --project my-app-prod

# Push staging secrets
keydrop push --file .env.staging --project my-app-staging

# Pull specific environment
keydrop pull --key proj_prod_key --output .env.production
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Load secrets
  run: |
    npm install -g keydrop-cli
    keydrop pull --key ${{ secrets.KEYDROP_KEY }}
```

## 🔒 Security

- All secrets are encrypted with AES-256-GCM before upload
- Encryption happens locally on your machine
- Only encrypted data is sent to the API
- HTTPS-only communication

## 🐛 Troubleshooting

### "Unable to read .env file"

Make sure you're in the correct directory with a `.env` file:

```bash
ls -la .env
keydrop push
```

### "Authentication failed"

Verify your API connection:

```bash
curl https://api.keydrop.dev/health
```

For self-hosted instances, check your `KEYDROP_API_URL`.

### "Project already exists"

Use `--force` to overwrite:

```bash
keydrop push --force
```

## 📚 Documentation

- [Main Documentation](https://github.com/devansh-jagtap/keydrop)
- [User Guide](https://github.com/devansh-jagtap/keydrop/blob/main/USER_GUIDE.md)
- [SDK Documentation](https://github.com/devansh-jagtap/keydrop/tree/main/packages/sdk)

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](https://github.com/devansh-jagtap/keydrop/blob/main/CONTRIBUTING.md).

## 📄 License

MIT © [Devansh Jagtap](https://github.com/devansh-jagtap)
