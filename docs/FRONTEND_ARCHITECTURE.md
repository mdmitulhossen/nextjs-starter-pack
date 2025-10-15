# 🎨 Frontend Architecture Guide

## 📋 Overview

This is a **frontend-focused** starter pack. Backend API integration is done via external APIs (not included in this project).

---

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # NextAuth only (no business logic APIs)
│   │   └── auth/          # NextAuth endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
│
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── forms/            # Form components
│   └── layout/           # Layout components
│
├── hooks/                # Custom React hooks
│   ├── use-toast.ts      # Toast notifications
│   └── use-users.ts      # Example: TanStack Query hook
│
├── lib/                  # Core utilities
│   ├── api-client.ts     # Axios instance for external APIs
│   ├── prisma.ts         # Prisma client (if using DB)
│   └── utils.ts          # Helper functions
│
├── services/             # API service layer
│   ├── user-service.ts   # Example: User API calls
│   └── product.service.ts # Example: Product API calls
│
├── stores/               # Zustand state management
│   ├── auth-store.ts     # Auth state
│   └── ui-store.ts       # UI state (sidebar, theme, etc.)
│
├── types/                # TypeScript types
│   └── index.ts          # Global types
│
└── styles/               # Global styles
    └── globals.css       # Tailwind + custom CSS
```

---

## 🔌 Backend API Integration

### **Where to Connect Your Backend**

Update `src/lib/api-client.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### **Environment Variables**

Create `.env.local`:

```bash
# Your Backend API
NEXT_PUBLIC_API_URL=https://api.yourbackend.com/v1

# Or multiple APIs
NEXT_PUBLIC_AUTH_API=https://auth.yourbackend.com
NEXT_PUBLIC_DATA_API=https://data.yourbackend.com
```

---

## 📦 Service Layer Pattern

### **1. Create a Service**

```bash
npm run generate:service products
```

This creates `src/services/products.service.ts`:

```typescript
import { apiClient } from '@/lib/api-client';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export const productsService = {
  getAll: async () => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (data: Omit<Product, 'id'>) => {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },
};
```

### **2. Create Query Hooks**

```bash
npm run generate:query products
```

This creates `src/hooks/use-products.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '@/services/products.service';
import { toast } from '@/hooks/use-toast';

export const PRODUCTS_QUERY_KEY = {
  all: ['products'] as const,
  lists: () => [...PRODUCTS_QUERY_KEY.all, 'list'] as const,
  list: (filters: string) => [...PRODUCTS_QUERY_KEY.lists(), filters] as const,
  details: () => [...PRODUCTS_QUERY_KEY.all, 'detail'] as const,
  detail: (id: string) => [...PRODUCTS_QUERY_KEY.details(), id] as const,
};

export const useProducts = () => {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY.lists(),
    queryFn: productsService.getAll,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY.all });
      toast({ title: 'Product created!' });
    },
  });
};
```

### **3. Use in Components**

```typescript
'use client'
import { useProducts, useCreateProduct } from '@/hooks/use-products'

export default function ProductsPage() {
  const { data: products, isLoading } = useProducts()
  const createProduct = useCreateProduct()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

---

## 🔐 Authentication Flow

### **Client-Side Auth (No Backend)**

Uses **NextAuth.js** with JWT strategy:

```typescript
// src/lib/auth/auth-options.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // TODO: Call your backend API
        const response = await fetch('https://your-api.com/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });

        const user = await response.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
};
```

---

## 🎯 State Management

### **Client State (Zustand)**

For UI state, preferences, etc:

```typescript
// src/stores/cart-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);
```

### **Server State (TanStack Query)**

For API data:

```typescript
// Already handled by generated hooks
const { data, isLoading } = useProducts();
```

---

## 🛠️ Available Generators

### **Frontend Generators**

```bash
npm run generate:component Button    # UI component
npm run generate:page products       # New page
npm run generate:hook use-products   # Custom hook
npm run generate:store cart          # Zustand store
```

### **API Integration Generators**

```bash
npm run generate:service products    # API service layer
npm run generate:query products      # TanStack Query hooks
```

### **Backend Generators (Skip if frontend-only)**

```bash
# Only use if you're building backend in Next.js
npm run generate:api-route users
```

---

## 📝 Recommended Backend Options

### **Option 1: Separate Backend (Recommended)**

- **Node.js/Express**
- **NestJS**
- **Django**
- **Laravel**
- **Go/Fiber**
- **FastAPI**

Connect via `NEXT_PUBLIC_API_URL`

### **Option 2: BaaS (Backend as a Service)**

- **Supabase** - PostgreSQL + Auth + Storage
- **Firebase** - NoSQL + Auth + Realtime
- **Appwrite** - Open source BaaS
- **Pocketbase** - SQLite BaaS

### **Option 3: Next.js API Routes**

- Use `src/app/api` for simple endpoints
- Not recommended for complex business logic
- Good for: webhooks, proxies, simple CRUD

---

## 🚀 Quick Start

### **1. Clone and Install**

```bash
git clone <repo-url>
cd frontend-starter-pack
npm install
```

### **2. Setup Environment**

```bash
cp .env.example .env.local
# Edit NEXT_PUBLIC_API_URL
```

### **3. Run Development Server**

```bash
npm run dev
# Opens http://localhost:3000
```

### **4. Generate Your First Feature**

```bash
# Create service
npm run generate:service products

# Create query hooks
npm run generate:query products

# Create page
npm run generate:page products
```

---

## 📚 Key Dependencies

### **Core**

- **Next.js 15** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety

### **State Management**

- **TanStack Query** - Server state
- **Zustand** - Client state

### **UI**

- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Headless components
- **Lucide React** - Icons

### **Forms & Validation**

- **React Hook Form** - Form handling
- **Zod** - Schema validation

### **API**

- **Axios** - HTTP client
- **NextAuth.js** - Authentication

---

## 🔧 Configuration Files

- `next.config.js` - Next.js config
- `tailwind.config.ts` - Tailwind config
- `tsconfig.json` - TypeScript config
- `.vscode/` - VSCode workspace settings
- `.env.local` - Environment variables (not committed)
- `.env.example` - Example environment variables

---

## 📖 Documentation

- [Quick Start Guide](./QUICK_START_GUIDE.md)
- [Prisma Setup](./PRISMA_SETUP.md) - Only if using database
- [2 Minute Demo](./2_MINUTE_DEMO.md)
- [DX Improvements](./DX_IMPROVEMENTS_COMPLETE.md)

---

## 🎨 Frontend-First Philosophy

This starter pack is designed for:

- ✅ **Frontend developers** building UI/UX
- ✅ **Teams with separate backend**
- ✅ **Rapid prototyping** with mock APIs
- ✅ **Modern React patterns** (hooks, suspense, server components)
- ✅ **Type-safe development** (TypeScript everywhere)

**Not ideal for:**

- ❌ Full-stack monoliths
- ❌ Complex backend business logic
- ❌ Direct database access from frontend

---

**Questions?** Check the docs or create an issue!
