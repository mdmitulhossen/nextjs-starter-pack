# 🎭 Mock Service Worker (MSW) Guide

## 📋 Overview

MSW allows you to develop your frontend **without a backend**. It intercepts API calls and returns mock data, making it perfect for:

- ✅ Frontend development before backend is ready
- ✅ Testing different API scenarios
- ✅ Demos and presentations
- ✅ Offline development

---

## 🚀 Quick Start

### **1. Enable MSW**

In `src/config/features.ts`:

```typescript
export const FEATURES = {
  enableMSW: true, // ✅ Enabled by default in development
};
```

### **2. Start Development Server**

```bash
npm run dev
```

You'll see in the console:

```
🎭 MSW: Mock Service Worker started
📡 Mocking API calls to: http://localhost:3000/api
```

### **3. Make API Calls**

All API calls to `/api/*` are automatically mocked!

```typescript
// This will be intercepted by MSW
const response = await fetch('/api/users');
const data = await response.json();
// Returns mock users!
```

---

## 📡 Available Mock Endpoints

### **👥 Users API**

```typescript
// GET /api/users - Get all users (with pagination, search, filters)
GET /api/users?page=1&perPage=10&search=john&role=admin&status=active

// GET /api/users/:id - Get single user
GET /api/users/1

// POST /api/users - Create user
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}

// PUT /api/users/:id - Update user
PUT /api/users/1
{
  "name": "Jane Doe"
}

// DELETE /api/users/:id - Delete user
DELETE /api/users/1
```

### **📦 Products API**

```typescript
// GET /api/products - Get all products (with filters)
GET /api/products?page=1&perPage=10&search=headphones&category=Electronics&featured=true&minPrice=50&maxPrice=500

// GET /api/products/:id - Get single product
GET /api/products/1

// POST /api/products - Create product
POST /api/products
{
  "name": "Wireless Headphones",
  "description": "Premium headphones",
  "price": 299.99,
  "category": "Electronics",
  "stock": 50
}

// PUT /api/products/:id - Update product
PUT /api/products/1
{
  "price": 249.99,
  "stock": 45
}

// DELETE /api/products/:id - Delete product
DELETE /api/products/1
```

### **🔐 Auth API**

```typescript
// POST /api/auth/login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password" // Any password works in mock
}

// POST /api/auth/register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🎯 Using with Services

Your existing services will work automatically:

```typescript
// src/services/user-service.ts
import { apiClient } from '@/lib/api-client';

export const userService = {
  getUsers: async () => {
    // This calls /api/users and gets mock data!
    const response = await apiClient.get('/users');
    return response.data;
  },
};
```

```typescript
// In your component
import { useUsers } from '@/hooks/use-users'

export function UsersList() {
  const { data, isLoading } = useUsers()

  // data contains mock users from MSW!
  return <div>...</div>
}
```

---

## 📝 Mock Data

### **Pre-loaded Data**

- **Users**: 25 mock users (5 predefined + 20 generated)
- **Products**: 26 mock products (6 predefined + 20 generated)

### **Customize Mock Data**

Edit `src/mocks/data/users.ts` or `src/mocks/data/products.ts`:

```typescript
// src/mocks/data/users.ts
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Your Custom User',
    email: 'custom@example.com',
    role: 'admin',
    // ...
  },
];
```

---

## 🔧 Customizing Handlers

### **Add New Endpoint**

Edit `src/mocks/handlers.ts`:

```typescript
// Add to handlers array
export const customHandlers = [
  // GET /api/orders
  http.get(`${API_URL}/orders`, async () => {
    await delay(300); // Simulate network delay

    return HttpResponse.json({
      data: [{ id: '1', total: 299.99, status: 'pending' }],
    });
  }),
];

// Add to combined handlers
export const handlers = [
  ...userHandlers,
  ...productHandlers,
  ...authHandlers,
  ...customHandlers, // ← Add here
];
```

### **Simulate Errors**

```typescript
http.get(`${API_URL}/users/:id`, async ({ params }) => {
  const userId = String(params['id']);

  // Simulate 404 error
  if (userId === '999') {
    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Simulate 500 error
  if (userId === '500') {
    return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  // Normal response
  const user = users.find((u) => u.id === userId);
  return HttpResponse.json({ data: user });
});
```

### **Adjust Network Delay**

```typescript
// src/mocks/handlers.ts
const NETWORK_DELAY = 300; // Change to 0 for instant responses, 1000 for slow network
```

---

## 🎮 Testing Different Scenarios

### **Test Pagination**

```typescript
// Get page 1
GET /api/users?page=1&perPage=5

// Get page 2
GET /api/users?page=2&perPage=5
```

### **Test Search**

```typescript
GET /api/users?search=john        // Search by name
GET /api/products?search=wireless // Search products
```

### **Test Filters**

```typescript
GET /api/users?role=admin&status=active
GET /api/products?category=Electronics&featured=true&minPrice=100&maxPrice=500
```

### **Test CRUD Operations**

```typescript
// Create
POST /api/users { "name": "Test", "email": "test@example.com" }

// Update
PUT /api/users/1 { "name": "Updated Name" }

// Delete
DELETE /api/users/1
```

---

## 🔀 Switching Between Mock and Real API

### **Option 1: Feature Flag**

```typescript
// src/config/features.ts
export const FEATURES = {
  enableMSW: false, // ✅ Disable to use real API
};
```

### **Option 2: Environment Variable**

```bash
# .env.local
NEXT_PUBLIC_ENABLE_MSW=false
```

```typescript
// src/config/features.ts
export const FEATURES = {
  enableMSW: process.env.NEXT_PUBLIC_ENABLE_MSW === 'true',
};
```

### **Option 3: API URL**

Change `NEXT_PUBLIC_API_URL` to point to real backend:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourbackend.com/v1
```

MSW only intercepts `/api/*` routes, so external URLs bypass it.

---

## 🧪 Testing with MSW

### **In Unit Tests**

```typescript
// __tests__/users.test.ts
import { server } from '@/mocks/server'; // For Node.js tests
import { userHandlers } from '@/mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches users', async () => {
  const response = await fetch('/api/users');
  const data = await response.json();

  expect(data.data).toHaveLength(10);
});
```

### **Override Handler for Test**

```typescript
test('handles error', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json({ error: 'Server error' }, { status: 500 });
    })
  );

  // Now /api/users returns error
});
```

---

## 📊 MSW DevTools

MSW logs all intercepted requests in the browser console:

```
[MSW] GET /api/users (200 OK)
[MSW] POST /api/users (201 Created)
[MSW] GET /api/products?page=2 (200 OK)
```

---

## 🚨 Troubleshooting

### **MSW not starting**

**Problem:** MSW doesn't intercept requests

**Solutions:**

1. Check feature flag: `FEATURES.enableMSW === true`
2. Check console for errors
3. Ensure `mockServiceWorker.js` exists in `public/` folder
4. Restart dev server: `npm run dev`

### **Service worker registration failed**

**Problem:** Browser blocks service worker

**Solutions:**

1. Use `http://localhost:3000` (not `127.0.0.1`)
2. Clear browser cache
3. Check browser console for errors
4. Reinitialize: `npx msw init public/ --save`

### **Requests not being mocked**

**Problem:** Some requests bypass MSW

**Solutions:**

1. Check API URL matches handler URL
2. Ensure handler is added to `handlers` array
3. Check request method (GET/POST/PUT/DELETE)
4. Check MSW console logs

---

## 🎯 Best Practices

### **1. Keep Mock Data Realistic**

```typescript
// ✅ Good - Realistic data
{
  email: "john.doe@company.com",
  createdAt: "2024-01-15T10:30:00Z"
}

// ❌ Bad - Fake data
{
  email: "test@test.com",
  createdAt: "2024-01-01"
}
```

### **2. Simulate Network Delays**

```typescript
await delay(300); // Realistic delay
```

### **3. Test Error Scenarios**

```typescript
// Test 404, 500, validation errors
```

### **4. Keep Handlers Organized**

```typescript
// Separate handlers by resource
userHandlers;
productHandlers;
orderHandlers;
authHandlers;
```

### **5. Use TypeScript Types**

```typescript
const body = (await request.json()) as Partial<User>;
```

---

## 📚 Resources

- **MSW Docs:** https://mswjs.io/docs/
- **MSW GitHub:** https://github.com/mswjs/msw
- **Examples:** https://github.com/mswjs/examples

---

**Happy Mocking!** 🎭
