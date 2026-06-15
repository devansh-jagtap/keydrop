# KeyDrop API

> Backend API for KeyDrop - handles encryption, storage, and retrieval of environment secrets

[![License: MIT](https://img.shields.io/github/license/devansh-jagtap/keydrop?color=22d3a5)](https://github.com/devansh-jagtap/keydrop/blob/main/LICENSE)

## 🚀 Overview

The KeyDrop API provides secure storage and retrieval of encrypted environment variables. It handles:

- Project key generation
- AES-256-GCM encryption/decryption
- Secure secret storage with PostgreSQL
- Authentication via project keys

## 📦 Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/devansh-jagtap/keydrop.git
cd keydrop/packages/api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

## 🔧 Configuration

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/keydrop

# Encryption
ENCRYPTION_KEY=your_64_character_hex_encryption_key

# Server
PORT=3000
NODE_ENV=production

# API
API_URL=https://api.keydrop.dev
```

### Generating Encryption Key

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🏃 Running

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

### With Docker

```bash
docker build -t keydrop-api .
docker run -p 3000:3000 --env-file .env keydrop-api
```

## 📖 API Endpoints

### `POST /api/projects`

Create a new project and push secrets.

**Request:**

```json
{
  "secrets": {
    "DATABASE_URL": "postgres://...",
    "API_KEY": "sk_test_..."
  }
}
```

**Response:**

```json
{
  "projectKey": "proj_x82js8sh",
  "message": "Secrets encrypted and stored successfully"
}
```

### `GET /api/projects/:key`

Retrieve and decrypt secrets for a project.

**Headers:**
- `Authorization: Bearer proj_x82js8sh`

**Response:**

```json
{
  "secrets": {
    "DATABASE_URL": "postgres://...",
    "API_KEY": "sk_test_..."
  }
}
```

### `DELETE /api/projects/:key`

Delete a project and all its secrets.

**Headers:**
- `Authorization: Bearer proj_x82js8sh`

**Response:**

```json
{
  "message": "Project deleted successfully"
}
```

### `GET /health`

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  project_key VARCHAR(255) UNIQUE NOT NULL,
  encrypted_data TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔒 Security

### Encryption

- **Algorithm:** AES-256-GCM
- **Key Length:** 256 bits (32 bytes)
- **IV Length:** 96 bits (12 bytes)
- **Auth Tag:** 128 bits (16 bytes)

### Authentication

- Project keys act as bearer tokens
- No user accounts or sessions
- Keys are unguessable (cryptographically random)

### Best Practices

1. Use strong `ENCRYPTION_KEY` (64 hex characters)
2. Enable HTTPS in production
3. Use PostgreSQL with SSL
4. Implement rate limiting
5. Set up monitoring and alerts

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql $DATABASE_URL

# Run migrations
npx prisma migrate deploy
```

### Encryption Errors

Ensure `ENCRYPTION_KEY` is exactly 64 hex characters:

```bash
# Verify key length
echo -n "$ENCRYPTION_KEY" | wc -c
# Should output: 64
```

## 📊 Monitoring

### Health Check

```bash
curl https://your-api.com/health
```

### Logs

```bash
# Production logs
pm2 logs keydrop-api

# Docker logs
docker logs keydrop-api
```

## 🚀 Deployment

### Render

1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Railway

```bash
railway up
railway variables set DATABASE_URL=...
railway variables set ENCRYPTION_KEY=...
```

### Vercel

```bash
vercel --prod
```

## 📚 Documentation

- [Main Documentation](https://github.com/devansh-jagtap/keydrop)
- [SDK Documentation](https://github.com/devansh-jagtap/keydrop/tree/main/packages/sdk)
- [CLI Documentation](https://github.com/devansh-jagtap/keydrop/tree/main/packages/cli)

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](https://github.com/devansh-jagtap/keydrop/blob/main/CONTRIBUTING.md).

## 📄 License

MIT © [Devansh Jagtap](https://github.com/devansh-jagtap)
