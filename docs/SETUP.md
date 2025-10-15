# Setup Guide

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js, React, and TypeScript
- TanStack Query and Zustand
- Tailwind CSS and shadcn/ui components
- NextAuth.js
- Testing libraries
- Development tools

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

#### Required Variables

```env
# Database (PostgreSQL recommended)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Generate NextAuth Secret

```bash
openssl rand -base64 32
```

#### Optional OAuth Providers

**GitHub OAuth:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

```env
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

**Google OAuth:**
1. Go to Google Cloud Console
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup (Optional)

If using Prisma (recommended for production):

```bash
# Install Prisma CLI
npm install -D prisma

# Initialize Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Git Setup

### Initialize Git Hooks

```bash
npm run prepare
```

This sets up Husky for:
- Pre-commit: Linting and formatting
- Commit-msg: Conventional commit validation

### Commit Message Format

```
type(scope): subject

feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## IDE Setup

### VS Code (Recommended)

The project includes `.vscode/settings.json` and `.vscode/extensions.json`.

**Recommended Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Playwright Test
- Jest Runner

Install them when prompted or manually:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

## Testing Setup

### Unit Tests (Jest)

```bash
npm test
```

### E2E Tests (Playwright)

First time setup:

```bash
npx playwright install
```

Run tests:

```bash
npm run test:e2e
```

With UI:

```bash
npm run test:e2e:ui
```

## Development Workflow

### 1. Create a New Feature

```bash
# Create a new branch
git checkout -b feature/my-feature

# Generate components
npm run generate:component MyComponent

# Generate hooks
npm run generate:hook use-my-hook

# Develop your feature
# ...

# Run tests
npm test
npm run test:e2e

# Commit changes
git add .
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature
```

### 2. Code Quality Checks

Before committing:

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format

# Test
npm test
```

### 3. Building for Production

```bash
# Build
npm run build

# Test production build
npm run start

# Analyze bundle
npm run analyze
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Type Errors

```bash
# Regenerate TypeScript definitions
npm run type-check
```

### Authentication Not Working

1. Check `NEXTAUTH_URL` matches your app URL
2. Verify `NEXTAUTH_SECRET` is set
3. For OAuth, check redirect URIs match exactly
4. Clear cookies and try again

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
vercel
```

### Docker

```bash
# Build image
docker build -t frontend-starter-pack .

# Run container
docker run -p 3000:3000 frontend-starter-pack
```

### Environment Variables for Production

Set these in your deployment platform:
- All variables from `.env.example`
- Update URLs to production domains
- Use production database credentials
- Add analytics/monitoring keys

## Next Steps

1. **Customize Theme**: Edit `tailwind.config.ts` and `src/styles/globals.css`
2. **Add Features**: Use generators for consistency
3. **Configure Auth**: Set up your auth providers
4. **Add Analytics**: Configure Vercel Analytics, Google Analytics, or Sentry
5. **Optimize**: Use bundle analyzer to identify optimizations
6. **Deploy**: Follow deployment guide for your platform

## Getting Help

- Check documentation in `/docs`
- Review example code in `/src/app/examples`
- Search issues on GitHub
- Join community discussions

## Useful Commands Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Code Quality
npm run lint                   # Run linter
npm run lint:fix              # Fix linting errors
npm run format                # Format code
npm run type-check            # Check types

# Testing
npm test                      # Run unit tests
npm run test:watch           # Watch mode
npm run test:coverage        # Coverage report
npm run test:e2e             # E2E tests
npm run test:e2e:ui          # E2E with UI

# Generators
npm run generate:component   # Generate component
npm run generate:hook        # Generate hook

# Analysis
npm run analyze              # Bundle analysis
```
