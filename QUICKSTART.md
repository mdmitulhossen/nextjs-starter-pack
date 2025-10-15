# 🚀 Quick Start Guide

Welcome to the Frontend Starter Pack! This guide will get you up and running in minutes.

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** ✨

## 🎯 What You Get Out of the Box

### ✅ Ready-to-Use Features

1. **Authentication**
   - Sign in page at `/auth/signin`
   - Demo mode (any email/password works)
   - Protected dashboard at `/dashboard`

2. **State Management**
   - TanStack Query for server state
   - Zustand for client state
   - All configured with best practices

3. **UI Components**
   - Beautiful shadcn/ui components
   - Dark mode support
   - Responsive design

4. **Developer Tools**
   - TypeScript with strict mode
   - ESLint + Prettier
   - Git hooks for quality checks

## 📖 Key Concepts

### TanStack Query (Server State)

Use for data from APIs:

```typescript
import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data.map(user => <div>{user.name}</div>)}</div>;
}
```

**Benefits:**
- ✅ Auto retry on failure
- ✅ Caching with smart invalidation
- ✅ Loading & error states
- ✅ Request deduplication

### Zustand (Client State)

Use for UI state:

```typescript
import { useUIStore } from '@/stores/ui-store';

function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className={isSidebarOpen ? 'open' : 'closed'}>
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  );
}
```

**Benefits:**
- ✅ Simple API
- ✅ No boilerplate
- ✅ Persist to localStorage
- ✅ DevTools support

## 🛠️ Common Tasks

### Create a New Component

```bash
npm run generate:component UserCard
```

Creates:
- `src/components/UserCard/UserCard.tsx`
- `src/components/UserCard/UserCard.test.tsx`
- `src/components/UserCard/index.ts`

### Create a Custom Hook

```bash
npm run generate:hook use-user-data
```

Creates:
- `src/hooks/use-user-data.ts`
- `src/hooks/__tests__/use-user-data.test.ts`

### Add a New Page

Create file in `src/app/your-page/page.tsx`:

```typescript
export default function YourPage() {
  return <div>Your Page</div>;
}
```

Protected page? Create in `/dashboard`:

```typescript
// src/app/dashboard/your-page/page.tsx
export default function ProtectedPage() {
  return <div>Protected Content</div>;
}
```

### Add API Route

Create file in `src/app/api/your-route/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}
```

## 🎨 Styling

### Use Tailwind Classes

```typescript
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
  <h1 className="text-2xl font-bold">Hello</h1>
</div>
```

### Use shadcn/ui Components

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

<Card>
  <Button variant="destructive">Delete</Button>
</Card>
```

### Toggle Dark Mode

```typescript
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## 🔐 Authentication

### Sign In

Visit `/auth/signin` and use any email/password (demo mode).

### Access User Session

```typescript
'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();
  
  return <div>Welcome, {session?.user?.name}!</div>;
}
```

### Sign Out

```typescript
import { signOut } from 'next-auth/react';

<button onClick={() => signOut()}>Sign Out</button>
```

### Protect a Route

Add to `src/middleware.ts`:

```typescript
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/your-protected-route/:path*', // Add this
  ],
};
```

## 🧪 Testing

### Run Tests

```bash
# Unit tests
npm test

# E2E tests (after installing Playwright)
npx playwright install
npm run test:e2e
```

### Write a Test

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

it('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## 📦 Production Build

```bash
# Build
npm run build

# Test production build locally
npm run start

# Analyze bundle size
npm run analyze
```

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 💡 Pro Tips

### 1. Use the DevTools

- **TanStack Query DevTools**: Click the icon in bottom-right (dev mode)
- **Redux DevTools**: For Zustand stores (install browser extension)

### 2. Code Quality

Pre-commit hooks will automatically:
- ✅ Format your code
- ✅ Run ESLint
- ✅ Check TypeScript
- ✅ Validate commit messages

### 3. Conventional Commits

```bash
git commit -m "feat: add user profile"
git commit -m "fix: resolve auth bug"
git commit -m "docs: update readme"
```

### 4. Environment Variables

Never commit `.env` files! Use `.env.example` as template.

For production: Set variables in Vercel/hosting platform.

### 5. API Calls

Use the pre-configured API client:

```typescript
import { apiClient } from '@/lib/api-client';

const response = await apiClient.get('/users');
const user = await apiClient.post('/users', { name: 'John' });
```

Benefits:
- ✅ Auto token injection
- ✅ Error handling
- ✅ Request/response interceptors

## 🆘 Troubleshooting

### "Port 3000 in use"

```bash
# Kill the process
netstat -ano | findstr :3000  # Windows
lsof -ti:3000 | xargs kill -9  # Mac/Linux

# Or use different port
PORT=3001 npm run dev
```

### "Module not found"

```bash
rm -rf node_modules .next
npm install
```

### Type Errors

```bash
npm run type-check
```

### Auth Not Working

1. Check `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your app
3. Clear cookies and retry

## 📚 Learn More

- **[Full Documentation](./README.md)**: Complete feature list
- **[Architecture Guide](./docs/ARCHITECTURE.md)**: Technical details
- **[Setup Guide](./docs/SETUP.md)**: Detailed setup instructions
- **[Contributing](./CONTRIBUTING.md)**: How to contribute

## 🎉 You're Ready!

Start building your app:

1. Create pages in `src/app/`
2. Add components in `src/components/`
3. Use TanStack Query for data fetching
4. Use Zustand for global state
5. Test with Jest and Playwright
6. Deploy to Vercel

**Happy coding! 🚀**

---

Questions? Check the [documentation](./README.md) or open an issue.
