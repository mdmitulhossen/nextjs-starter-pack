# 🚀 Frontend Starter Pack

A comprehensive Next.js 15 starter template with all the essential features you need to build modern web applications.

## ✨ Features

### 🎯 Core Features

- ⚡ **Next.js 15** with App Router and Server Components
- 🎨 **Tailwind CSS** for styling
- 🧩 **shadcn/ui** - 30+ pre-built components
- 📝 **TypeScript** - Type-safe development
- 🎭 **Feature Flags** - Toggle features dynamically
- 🔧 **Mock Service Worker (MSW)** - API mocking for development

### 📋 Form Components (6 Forms)

All forms use **React Hook Form** + **Zod** validation:

- 🔐 **Login Form** - Email/password with remember me
- 📝 **Register Form** - Full registration with terms acceptance
- 👤 **Profile Form** - User profile editing with avatar
- ⚙️ **Settings Form** - Account settings and preferences
- 🔍 **Search Form** - Advanced search with filters
- 📊 **Multi-Step Form** - 4-step wizard with progress tracking

### 📊 Data Management

- **Advanced Data Table** powered by TanStack Table v8
  - ✅ Sorting and filtering
  - 📄 Pagination
  - 🎯 Row selection with bulk actions
  - 📥 Export to CSV/JSON
  - 👁️ Column visibility toggle
  - 🎨 Customizable columns

### 📄 Pre-built Pages

- 📊 **Dashboard** - Analytics with recharts (Line, Bar, Pie charts)
- 💰 **Pricing** - Pricing plans with monthly/yearly toggle
- ❓ **FAQ** - Accordion-based questions and answers
- 📧 **Contact** - Contact form with validation
- 👥 **Team** - Team members showcase

### 🛡️ Error Handling

- 🚨 **ErrorBoundary** - React error boundary component
- 🔍 **404 Page** - Custom not found page
- ⚠️ **500 Page** - Global error page
- 📡 **Offline Detector** - Network status detection

### 📱 Responsive Utilities

**Hooks:**

- `useMediaQuery(query)` - Media query detection
- `useBreakpoint()` - Current breakpoint (sm/md/lg/xl/2xl)
- `useIsMobile()` - Mobile device detection
- `useIsTablet()` - Tablet device detection
- `useIsDesktop()` - Desktop device detection
- `useWindowSize()` - Window dimensions
- `useOrientation()` - Portrait/landscape detection

**Components:**

- `<ShowAt breakpoint="md">` - Show at breakpoint and above
- `<HideAt breakpoint="lg">` - Hide at breakpoint and above
- `<MobileOnly>` - Mobile-only content
- `<TabletOnly>` - Tablet-only content
- `<DesktopOnly>` - Desktop-only content
- `<ResponsiveContainer>` - Breakpoint-specific styling

### ✨ Animation Utilities

**Powered by Framer Motion:**

**Entrance Animations:**

- `<FadeIn>` - Fade in animation
- `<FadeInUp>` - Fade in from bottom
- `<FadeInDown>` - Fade in from top
- `<FadeInLeft>` - Slide in from left
- `<FadeInRight>` - Slide in from right
- `<ScaleIn>` - Scale up animation
- `<SlideInFromBottom>` - Slide in with spring
- `<StaggerContainer>` + `<StaggerItem>` - Sequential animations

**Scroll Animations:**

- `<ScrollFadeInUp>` - Animate when scrolled into view
- `<ScrollFadeInLeft>` - Slide in from left on scroll
- `<ScrollFadeInRight>` - Slide in from right on scroll
- `<ScrollScaleIn>` - Scale in on scroll
- `<ScrollStagger>` - Stagger children on scroll
- `<ScrollReveal>` - Smooth reveal on scroll

**Loading Skeletons:**

- `<CardSkeleton>` - Card placeholder
- `<TableSkeleton>` - Table placeholder
- `<ListSkeleton>` - List placeholder
- `<AvatarSkeleton>` - Avatar placeholder
- `<ButtonSkeleton>` - Button placeholder
- `<FormSkeleton>` - Form placeholder
- `<DashboardSkeleton>` - Dashboard placeholder
- `<ProductCardSkeleton>` - Product card placeholder
- And many more...

## 🏗️ Project Structure

```
frontend-starter-pack/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── pages/               # Pre-built pages
│   │   │   ├── dashboard/
│   │   │   ├── pricing/
│   │   │   ├── faq/
│   │   │   ├── contact/
│   │   │   └── team/
│   │   ├── test/                # Test/Demo pages
│   │   │   ├── data-table/
│   │   │   ├── responsive/
│   │   │   └── animations/
│   │   ├── not-found.tsx        # 404 page
│   │   ├── global-error.tsx     # 500 page
│   │   └── layout.tsx
│   ├── components/
│   │   ├── forms/               # Form components
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── profile-form.tsx
│   │   │   ├── settings-form.tsx
│   │   │   ├── search-form.tsx
│   │   │   └── multi-step-form.tsx
│   │   ├── responsive/          # Responsive components
│   │   │   ├── show-at.tsx
│   │   │   ├── hide-at.tsx
│   │   │   ├── mobile-only.tsx
│   │   │   ├── desktop-only.tsx
│   │   │   ├── tablet-only.tsx
│   │   │   └── responsive-container.tsx
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── data-table.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ... (30+ components)
│   │   ├── error-boundary.tsx
│   │   └── offline-detector.tsx
│   ├── hooks/
│   │   ├── use-feature-flag.ts
│   │   └── use-responsive.ts
│   ├── lib/
│   │   ├── animations/          # Animation utilities
│   │   │   ├── presets.ts
│   │   │   ├── components.tsx
│   │   │   └── scroll.tsx
│   │   └── utils.ts
│   └── mocks/                   # MSW mocks
│       ├── browser.ts
│       └── handlers.ts
├── public/
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Test Pages

Visit these pages to see features in action:

- **Data Table Demo**: `/test/data-table`
- **Responsive Utilities**: `/test/responsive`
- **Animations Demo**: `/test/animations`
- **Dashboard**: `/pages/dashboard`
- **Pricing**: `/pages/pricing`
- **FAQ**: `/pages/faq`
- **Contact**: `/pages/contact`
- **Team**: `/pages/team`

## 📚 Usage Examples

### Feature Flags

```tsx
import { useFeatureFlag } from '@/hooks/use-feature-flag';

function MyComponent() {
  const isEnabled = useFeatureFlag('new-feature');

  if (!isEnabled) return null;

  return <div>New Feature!</div>;
}
```

### Forms

```tsx
import { LoginForm } from '@/components/forms/login-form';

function LoginPage() {
  return <LoginForm />;
}
```

### Data Table

```tsx
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

function UsersPage() {
  return <DataTable columns={columns} data={users} />;
}
```

### Responsive Hooks

```tsx
import { useBreakpoint, useIsMobile } from '@/hooks/use-responsive';
import { ShowAt, MobileOnly } from '@/components/responsive';

function ResponsiveComponent() {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();

  return (
    <>
      <p>Current breakpoint: {breakpoint}</p>

      <ShowAt breakpoint="md">
        <div>Visible on medium screens and up</div>
      </ShowAt>

      <MobileOnly>
        <div>Mobile menu</div>
      </MobileOnly>
    </>
  );
}
```

### Animations

```tsx
import { FadeInUp, ScrollFadeInUp } from '@/lib/animations';
import { CardSkeleton } from '@/components/ui/skeleton';

function AnimatedComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* On mount animation */}
      <FadeInUp delay={0.2}>
        <Card>Content</Card>
      </FadeInUp>

      {/* On scroll animation */}
      <ScrollFadeInUp>
        <Card>Scrolled content</Card>
      </ScrollFadeInUp>

      {/* Loading skeleton */}
      {loading && <CardSkeleton />}
    </>
  );
}
```

### Direct Framer Motion

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, hoverScale } from '@/lib/animations/presets';

function InteractiveCard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      whileHover={hoverScale}
      whileTap={{ scale: 0.95 }}
    >
      Hover and click me!
    </motion.div>
  );
}
```

### Error Boundary

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

## 🧩 shadcn/ui Components Installed

- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Form
- ✅ Select
- ✅ Checkbox
- ✅ Textarea
- ✅ Radio Group
- ✅ Switch
- ✅ Dialog
- ✅ Tabs
- ✅ Badge
- ✅ Avatar
- ✅ Separator
- ✅ Progress
- ✅ Table
- ✅ Dropdown Menu
- ✅ Accordion
- ✅ Alert
- ✅ Skeleton
- And more...

## 📦 Dependencies

### Core

- `next` - Next.js framework
- `react` - React library
- `typescript` - Type safety

### UI & Styling

- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Headless UI components
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes

### Forms

- `react-hook-form` - Form management
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation integration

### Data Table

- `@tanstack/react-table` - Table management

### Charts

- `recharts` - Chart library

### Animations

- `framer-motion` - Animation library

### Development

- `msw` - API mocking
- `eslint` - Code linting
- `prettier` - Code formatting

## 🎨 Customization

### Tailwind Config

Modify `tailwind.config.ts` to customize colors, spacing, breakpoints, etc.

### Feature Flags

Edit feature flag configuration in your code:

```tsx
const featureFlags = {
  'new-dashboard': true,
  'beta-features': false,
};
```

### MSW Handlers

Add more API mocks in `src/mocks/handlers.ts`:

```tsx
export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({ users: [] });
  }),
];
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips

1. **Use TypeScript** - All components are type-safe
2. **Feature Flags** - Test features before releasing
3. **MSW** - Develop without backend ready
4. **Responsive Hooks** - Build mobile-first
5. **Animations** - Enhance UX with smooth transitions
6. **Error Boundaries** - Catch errors gracefully
7. **Loading Skeletons** - Improve perceived performance

## 🎯 Next Steps

1. Add authentication (NextAuth.js)
2. Integrate a database (Prisma + PostgreSQL)
3. Add state management (Zustand/Jotai)
4. Set up testing (Vitest + Testing Library)
5. Add i18n (next-intl)
6. Configure CI/CD (GitHub Actions)

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS
