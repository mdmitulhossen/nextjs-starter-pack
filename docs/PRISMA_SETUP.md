# 🗄️ Prisma Database Setup Guide

## 📋 Overview

This starter pack supports **multiple databases** via Prisma ORM:

- ✅ **PostgreSQL** (Recommended for production)
- ✅ **MongoDB** (NoSQL alternative)
- ✅ **MySQL/MariaDB**
- ✅ **SQLite** (Development only)
- ✅ **Prisma Postgres** (Cloud serverless)

---

## 🚀 Quick Start

### **Option 1: PostgreSQL (Recommended)**

#### 1. Install PostgreSQL

```bash
# Windows (using Chocolatey)
choco install postgresql

# Mac
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### 2. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE mydb;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
\q
```

#### 3. Update .env.local

```bash
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
```

#### 4. Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### **Option 2: MongoDB**

#### 1. Install MongoDB

```bash
# Windows
choco install mongodb

# Mac
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or use MongoDB Atlas (Cloud - Free)
# https://www.mongodb.com/cloud/atlas
```

#### 2. Update Schema

In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "mongodb"  // Changed from "postgresql"
  url      = env("DATABASE_URL")
}
```

Then **uncomment MongoDB models** and **comment out PostgreSQL models**.

#### 3. Update .env.local

```bash
# Local MongoDB
DATABASE_URL="mongodb://localhost:27017/mydb"

# Or MongoDB Atlas
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority"
```

#### 4. Push Schema

```bash
npx prisma db push
npx prisma generate
```

---

### **Option 3: SQLite (Development)**

#### 1. Update Schema

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

#### 2. Update .env.local

```bash
DATABASE_URL="file:./dev.db"
```

#### 3. Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### **Option 4: Prisma Postgres Cloud (Easiest)**

#### 1. Create Account

```bash
npx prisma login
npx prisma postgres create
```

#### 2. Copy Connection String

The CLI will give you a `DATABASE_URL` like:

```bash
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

#### 3. Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📝 Common Commands

### **Migrations**

```bash
# Create and apply migration
npx prisma migrate dev --name migration_name

# Apply pending migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### **Prisma Client**

```bash
# Generate Prisma Client
npx prisma generate

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

### **Database Management**

```bash
# Open Prisma Studio (GUI)
npx prisma studio

# Or use VSCode task
# Ctrl+Shift+P → Run Task → "prisma:studio"

# Push schema without migrations (MongoDB/quick prototyping)
npx prisma db push

# Pull schema from existing database
npx prisma db pull
```

### **Seeding**

```bash
# Run seed script
npx prisma db seed
```

---

## 🎯 Using Prisma in Your Code

### **1. Import Prisma Client**

```typescript
import { prisma } from '@/lib/prisma';
```

### **2. Basic CRUD Operations**

#### Create

```typescript
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});
```

#### Read

```typescript
// Find all
const users = await prisma.user.findMany();

// Find one
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
});

// Find with relations
const user = await prisma.user.findUnique({
  where: { id: '123' },
  include: {
    orders: true,
    posts: true,
  },
});
```

#### Update

```typescript
const user = await prisma.user.update({
  where: { id: '123' },
  data: { name: 'Jane Doe' },
});
```

#### Delete

```typescript
const user = await prisma.user.delete({
  where: { id: '123' },
});
```

### **3. Advanced Queries**

#### Filtering

```typescript
const users = await prisma.user.findMany({
  where: {
    OR: [{ email: { contains: 'gmail' } }, { name: { startsWith: 'John' } }],
    AND: [{ role: 'admin' }, { createdAt: { gte: new Date('2024-01-01') } }],
  },
});
```

#### Pagination

```typescript
const users = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' },
});

const total = await prisma.user.count();
```

#### Aggregations

```typescript
const stats = await prisma.order.aggregate({
  _sum: { total: true },
  _avg: { total: true },
  _count: true,
});
```

#### Transactions

```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'user@example.com' },
  });

  const order = await tx.order.create({
    data: {
      userId: user.id,
      total: 100,
    },
  });

  return { user, order };
});
```

---

## 🔧 Example: Update API Route with Prisma

Update `src/app/api/orders/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const ordersSchema = z.object({
  orderNo: z.string(),
  total: z.number(),
  userId: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count(),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /orders error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ordersSchema.parse(body);

    const newOrder = await prisma.order.create({
      data: validatedData,
      include: {
        user: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('POST /orders error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## 🎨 Prisma Studio

Visual database editor:

```bash
npx prisma studio
# Opens at http://localhost:5555
```

Or use VSCode task:

- Press `Ctrl+Shift+P`
- Type "Run Task"
- Select "prisma:studio"

---

## 📚 Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **Schema Reference:** https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- **MongoDB Guide:** https://www.prisma.io/docs/concepts/database-connectors/mongodb
- **PostgreSQL Guide:** https://www.prisma.io/docs/concepts/database-connectors/postgresql
- **Prisma Examples:** https://github.com/prisma/prisma-examples

---

## ⚡ Performance Tips

1. **Use `select` instead of `include` when possible**

```typescript
// ❌ Fetches all fields
const user = await prisma.user.findUnique({
  where: { id },
  include: { orders: true },
});

// ✅ Fetches only needed fields
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    name: true,
    orders: { select: { id: true, total: true } },
  },
});
```

2. **Use connection pooling in production**

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
```

3. **Enable query logging in development**

```typescript
// Already configured in src/lib/prisma.ts
log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'];
```

4. **Use indexes for frequently queried fields**

```prisma
model User {
  email String @unique // Automatically indexed
  role  String

  @@index([role]) // Custom index
}
```

---

## 🐛 Troubleshooting

### **Error: Prisma Client not generated**

```bash
npx prisma generate
```

### **Error: Database connection failed**

- Check DATABASE_URL in `.env.local`
- Ensure database server is running
- Verify credentials and database name

### **Error: Migration conflicts**

```bash
# Reset and reapply
npx prisma migrate reset
```

### **Error: Type errors after schema changes**

```bash
# Regenerate client
npx prisma generate
# Restart TypeScript server in VSCode
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

**Need help?** Check the [Prisma Discord](https://pris.ly/discord) or [GitHub Discussions](https://github.com/prisma/prisma/discussions)
