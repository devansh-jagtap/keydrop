# Contributing to KeyDrop

Thank you for your interest in contributing to KeyDrop! This guide will help you get started with contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 🤝 Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher
- **npm** or **yarn**
- **PostgreSQL** database (for API development)
- **Git** for version control
- A code editor (we recommend VS Code)

### Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/keydrop.git
cd keydrop
```

3. **Add upstream** remote:

```bash
git remote add upstream https://github.com/devansh-jagtap/keydrop.git
```

---

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all package dependencies
npm run install:all
```

Or install individually:

```bash
# CLI
cd packages/cli
npm install

# SDK
cd packages/sdk
npm install

# API
cd packages/api
npm install

# Website
cd website
npm install
```

### 2. Environment Configuration

#### API Setup

Create `packages/api/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/keydrop_dev
ENCRYPTION_KEY=your_64_character_hex_key_here
JWT_SECRET=your_jwt_secret_here
PORT=3001
NODE_ENV=development
```

Generate encryption key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Website Setup

Create `website/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Database Setup

```bash
cd packages/api

# Create database
createdb keydrop_dev

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### 4. Start Development Servers

**Terminal 1 - API:**
```bash
cd packages/api
npm run dev
```

**Terminal 2 - Website:**
```bash
cd website
npm run dev
```

**Terminal 3 - CLI (for testing):**
```bash
cd packages/cli
npm link
```

---

## 📁 Project Structure

```
keydrop/
├── packages/
│   ├── cli/                 # Command-line interface
│   │   ├── src/
│   │   │   ├── commands/    # CLI commands
│   │   │   └── utils/       # Utilities
│   │   └── bin/             # Executable entry point
│   │
│   ├── sdk/                 # Runtime SDK
│   │   └── src/
│   │       └── init.js      # Main initialization
│   │
│   └── api/                 # Backend API
│       ├── src/
│       │   ├── routes/      # API endpoints
│       │   └── lib/         # Auth, encryption, etc.
│       └── prisma/          # Database schema
│
└── website/                 # Landing page + Dashboard
    └── app/
        ├── dashboard/       # User dashboard
        └── auth/           # Authentication pages
```

---

## 💻 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update tests as needed
- Update documentation

### 3. Test Your Changes

```bash
# Run tests for specific package
cd packages/api
npm test

cd packages/cli
npm test

# Test CLI locally
cd packages/cli
npm link
keydrop --version
```

### 4. Commit Your Changes

See [Commit Guidelines](#commit-guidelines) below.

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 🎨 Coding Standards

### JavaScript/TypeScript

- Use **ES6+** syntax
- Use **async/await** instead of callbacks
- Use **const** and **let**, avoid **var**
- Use **template literals** for string interpolation
- Use **arrow functions** where appropriate

**Example:**

```javascript
// ✅ Good
const fetchSecrets = async (key) => {
  const response = await fetch(`${API_URL}/secrets`, {
    headers: { Authorization: `Bearer ${key}` }
  });
  return response.json();
};

// ❌ Bad
var fetchSecrets = function(key) {
  return fetch(API_URL + '/secrets', {
    headers: { Authorization: 'Bearer ' + key }
  }).then(function(response) {
    return response.json();
  });
};
```

### File Organization

- One component/function per file (for large modules)
- Group related utilities
- Export at the bottom of file

### Naming Conventions

- **Variables/Functions:** camelCase (`getUserData`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)
- **Classes:** PascalCase (`UserService`)
- **Files:** kebab-case (`auth-service.js`)

### Error Handling

Always handle errors gracefully:

```javascript
// ✅ Good
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error.message);
  throw new Error('Failed to complete operation');
}

// ❌ Bad
const result = await riskyOperation(); // No error handling
```

### Comments

- Write self-documenting code
- Add comments for complex logic
- Document functions with JSDoc

```javascript
/**
 * Encrypts secrets using AES-256-GCM
 * @param {Object} secrets - Key-value pairs to encrypt
 * @param {string} encryptionKey - 64-char hex encryption key
 * @returns {Object} Encrypted data with IV and auth tag
 */
function encryptSecrets(secrets, encryptionKey) {
  // Implementation...
}
```

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(cli): add logout command"

# Bug fix
git commit -m "fix(api): handle missing encryption key gracefully"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change
git commit -m "feat(api)!: change authentication to Clerk OAuth

BREAKING CHANGE: JWT authentication replaced with Clerk"
```

### Commit Messages Best Practices

- Use imperative mood ("add" not "added")
- Keep subject line under 50 characters
- Capitalize first letter
- No period at the end
- Provide context in the body for complex changes

---

## 🔄 Pull Request Process

### Before Creating a PR

1. ✅ Update from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. ✅ Run tests:
   ```bash
   npm test
   ```

3. ✅ Update documentation if needed

4. ✅ Ensure code follows style guidelines

### Creating the PR

1. **Title:** Use conventional commit format
   - ✅ `feat(cli): add pull command`
   - ❌ `Added new feature`

2. **Description:** Include:
   - What changes were made
   - Why they were made
   - How to test them
   - Related issues (if any)

**Template:**

```markdown
## Description
Brief description of changes

## Changes Made
- Added X feature
- Fixed Y bug
- Updated Z documentation

## How to Test
1. Step 1
2. Step 2
3. Expected result

## Related Issues
Closes #123
Fixes #456
```

### PR Review Process

- Maintainers will review your PR
- Address feedback promptly
- Keep discussion focused and respectful
- Be open to suggestions

### After PR is Merged

```bash
git checkout main
git pull upstream main
git push origin main
```

---

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Specific package
cd packages/api
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Writing Tests

Place tests next to the code they test:

```
src/
  commands/
    auth.js
    auth.test.js
```

**Example test:**

```javascript
import { describe, it, expect } from 'vitest';
import { encryptSecrets } from './encryption.js';

describe('encryptSecrets', () => {
  it('should encrypt secrets correctly', () => {
    const secrets = { API_KEY: 'test123' };
    const key = 'a'.repeat(64);
    
    const result = encryptSecrets(secrets, key);
    
    expect(result).toHaveProperty('encryptedData');
    expect(result).toHaveProperty('iv');
    expect(result).toHaveProperty('authTag');
  });
});
```

### Testing CLI Locally

```bash
cd packages/cli
npm link
keydrop --version
keydrop login
keydrop push
```

---

## 📚 Documentation

### What to Document

- New features
- API changes
- Breaking changes
- Configuration options
- Usage examples

### Where to Document

- **README.md** - Project overview
- **USER_GUIDE.md** - Detailed usage guide
- **Package READMEs** - Package-specific docs
- **Code comments** - Complex logic
- **JSDoc** - Function documentation

### Documentation Style

- Be clear and concise
- Use examples
- Include code snippets
- Add screenshots for UI changes
- Update table of contents

---

## 🐛 Reporting Bugs

### Before Reporting

1. Search existing issues
2. Try latest version
3. Check documentation

### Creating a Bug Report

Include:

- **Description:** Clear description of the bug
- **Steps to Reproduce:** Numbered steps
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happens
- **Environment:**
  - OS: Windows/macOS/Linux
  - Node version: `node -v`
  - Package version: `keydrop --version`
- **Error Messages:** Full error output
- **Screenshots:** If applicable

**Template:**

```markdown
## Bug Description
Brief description

## Steps to Reproduce
1. Step 1
2. Step 2
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: macOS 13.1
- Node: v18.12.0
- KeyDrop: v1.0.0

## Error Output
```
[error output here]
```

## Additional Context
Any other relevant information
```

---

## 💡 Suggesting Features

### Before Suggesting

1. Check existing feature requests
2. Review roadmap
3. Consider if it fits project scope

### Creating a Feature Request

Include:

- **Problem:** What problem does this solve?
- **Solution:** How should it work?
- **Alternatives:** Other approaches considered
- **Use Cases:** Real-world examples
- **Priority:** Nice-to-have vs. critical

**Template:**

```markdown
## Problem
Description of the problem or need

## Proposed Solution
How the feature should work

## Alternatives Considered
Other approaches you've thought about

## Use Cases
- Use case 1
- Use case 2

## Additional Context
Mockups, examples, etc.
```

---

## 🏆 Recognition

Contributors will be:

- Added to Contributors list in README
- Mentioned in release notes
- Credited in documentation

---

## 📞 Getting Help

- **GitHub Issues:** For bugs and features
- **GitHub Discussions:** For questions
- **Discord:** [Join our community](#) (coming soon)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Your contributions make KeyDrop better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🎉**
