# 🎛️ Features Guide

This starter pack includes **50+ features** that you can easily enable or disable based on your project needs.

## 🎯 Quick Toggle

All features are controlled from a single file:

```typescript
// src/config/features.ts

export const FEATURES = {
  enableMSW: true, // ✅ Enabled
  enablePushNotifications: false, // ❌ Disabled
  // ... more features
};
```

---

## 📋 All Available Features

### 🎭 **Mock & Development Tools**

| Feature           | Default      | Description                                           |
| ----------------- | ------------ | ----------------------------------------------------- |
| `enableMSW`       | `true` (dev) | Mock API responses without backend                    |
| `enableDevTools`  | `true` (dev) | Developer tools panel (API debugger, state inspector) |
| `enableStorybook` | `true` (dev) | Component showcase and documentation                  |

**When to disable:**

- ❌ MSW: When connecting to real backend
- ❌ DevTools: In production (auto-disabled)
- ❌ Storybook: If not using component documentation

---

### 🌍 **Internationalization**

| Feature      | Default | Description                              |
| ------------ | ------- | ---------------------------------------- |
| `enableI18n` | `true`  | Multi-language support                   |
| `enableRTL`  | `true`  | Right-to-left languages (Arabic, Hebrew) |

**When to disable:**

- ❌ I18n: Single language app only
- ❌ RTL: No RTL languages needed

---

### 🎨 **UI Features**

| Feature                    | Default | Description                   |
| -------------------------- | ------- | ----------------------------- |
| `enableThemeCustomization` | `true`  | Multiple themes, color picker |
| `enableDarkMode`           | `true`  | Dark/light mode toggle        |
| `enableCommandPalette`     | `true`  | ⌘K global search              |
| `enablePageTransitions`    | `true`  | Smooth page animations        |

**When to disable:**

- ❌ ThemeCustomization: Fixed brand colors only
- ❌ DarkMode: Light mode only app
- ❌ CommandPalette: Simple navigation enough
- ❌ PageTransitions: Performance priority

---

### 📱 **Progressive Web App (PWA)**

| Feature                   | Default       | Description                      |
| ------------------------- | ------------- | -------------------------------- |
| `enablePWA`               | `true` (prod) | Offline support, installable app |
| `enablePushNotifications` | `false`       | Browser push notifications       |
| `enableOfflineMode`       | `true`        | Offline fallback page            |

**When to disable:**

- ❌ PWA: Desktop-only web app
- ❌ PushNotifications: Backend not ready
- ❌ OfflineMode: Always-online required

---

### 🔐 **Authentication & Security**

| Feature            | Default | Description                  |
| ------------------ | ------- | ---------------------------- |
| `enableSocialAuth` | `true`  | OAuth (GitHub, Google, etc.) |
| `enableRBAC`       | `true`  | Role-based access control    |
| `enable2FA`        | `false` | Two-factor authentication    |

**When to disable:**

- ❌ SocialAuth: Email/password only
- ❌ RBAC: Single user type app
- ❌ 2FA: Backend not ready

---

### 📊 **Data & Analytics**

| Feature               | Default       | Description                        |
| --------------------- | ------------- | ---------------------------------- |
| `enableAnalytics`     | `true` (prod) | Google Analytics, Vercel Analytics |
| `enableErrorTracking` | `true` (prod) | Sentry error reporting             |
| `enableDataTable`     | `true`        | Advanced tables with sort/filter   |
| `enableCharts`        | `true`        | Charts and visualizations          |

**When to disable:**

- ❌ Analytics: Privacy-first app
- ❌ ErrorTracking: No Sentry subscription
- ❌ DataTable: Simple lists enough
- ❌ Charts: No data visualization needed

---

### 🔔 **Notifications & Communication**

| Feature                    | Default | Description            |
| -------------------------- | ------- | ---------------------- |
| `enableNotificationCenter` | `true`  | Notification inbox UI  |
| `enableRealtime`           | `false` | WebSocket live updates |
| `enableToasts`             | `true`  | Toast notifications    |

**When to disable:**

- ❌ NotificationCenter: Simple toasts enough
- ❌ Realtime: Backend not ready
- ❌ Toasts: Never (usually needed)

---

### 📤 **Import/Export**

| Feature           | Default | Description            |
| ----------------- | ------- | ---------------------- |
| `enableExport`    | `true`  | CSV/Excel export       |
| `enableImport`    | `true`  | CSV import and parsing |
| `enablePDFExport` | `true`  | PDF generation         |

**When to disable:**

- ❌ Export: Read-only app
- ❌ Import: No bulk upload needed
- ❌ PDFExport: No reports/documents

---

### 🔍 **Search & Filters**

| Feature                | Default | Description                    |
| ---------------------- | ------- | ------------------------------ |
| `enableAdvancedSearch` | `true`  | Global search with suggestions |
| `enableFacetedFilters` | `true`  | Multiple filter categories     |

**When to disable:**

- ❌ AdvancedSearch: Simple app, few pages
- ❌ FacetedFilters: Basic filters enough

---

### 🎯 **Performance & Optimization**

| Feature                   | Default | Description                         |
| ------------------------- | ------- | ----------------------------------- |
| `enableVirtualScrolling`  | `true`  | Efficient rendering for large lists |
| `enableInfiniteScroll`    | `true`  | Load more on scroll                 |
| `enableImageOptimization` | `true`  | Next.js Image optimization          |

**When to disable:**

- ❌ VirtualScrolling: Small lists only
- ❌ InfiniteScroll: Prefer pagination
- ❌ ImageOptimization: No images

---

### 📱 **Responsive Features**

| Feature                  | Default | Description                      |
| ------------------------ | ------- | -------------------------------- |
| `enableMobileMenu`       | `true`  | Mobile navigation                |
| `enableResponsiveImages` | `true`  | Different image sizes per device |

**When to disable:**

- ❌ MobileMenu: Desktop-only app
- ❌ ResponsiveImages: Desktop-only app

---

### 🎨 **Pre-built Pages**

| Feature               | Default | Description               |
| --------------------- | ------- | ------------------------- |
| `enableDashboardPage` | `true`  | Dashboard with widgets    |
| `enableProfilePage`   | `true`  | User profile view/edit    |
| `enableSettingsPage`  | `true`  | User settings/preferences |
| `enablePricingPage`   | `true`  | Pricing tiers             |
| `enableFAQPage`       | `true`  | FAQ accordion             |
| `enableContactPage`   | `true`  | Contact form              |
| `enableTeamPage`      | `true`  | Team/About page           |
| `enableBlogPage`      | `true`  | Blog listing              |

**When to disable:**

- ❌ Any page: Not needed in your app

---

## 🛠️ How to Use Feature Flags

### **1. Check in Components**

```typescript
import { FEATURES } from '@/config/features'

export function MyComponent() {
  return (
    <div>
      {FEATURES.enableCharts && <Chart />}
      {FEATURES.enableDataTable && <DataTable />}
    </div>
  )
}
```

### **2. Conditional Imports**

```typescript
// Only import if feature enabled
const Chart = FEATURES.enableCharts
  ? lazy(() => import('./Chart'))
  : null

export function Dashboard() {
  return <>{Chart && <Chart />}</>
}
```

### **3. Route Protection**

```typescript
// src/app/dashboard/page.tsx
import { FEATURES } from '@/config/features'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  if (!FEATURES.enableDashboardPage) {
    redirect('/')
  }

  return <Dashboard />
}
```

### **4. Helper Functions**

```typescript
import { isFeatureEnabled, getEnabledFeatures } from '@/config/features';

// Check single feature
if (isFeatureEnabled('enableMSW')) {
  // ...
}

// Get all enabled features
const enabled = getEnabledFeatures();
console.log('Enabled features:', enabled);
```

---

## 🎯 Common Configurations

### **Minimal Setup (Bare bones)**

```typescript
export const FEATURES = {
  enableMSW: false,
  enableDevTools: false,
  enableI18n: false,
  enableRTL: false,
  enableThemeCustomization: false,
  enableDarkMode: true, // Keep this
  enableCommandPalette: false,
  enablePageTransitions: false,
  enablePWA: false,
  enablePushNotifications: false,
  enableOfflineMode: false,
  enableSocialAuth: false,
  enableRBAC: false,
  enable2FA: false,
  enableAnalytics: false,
  enableErrorTracking: false,
  enableDataTable: true, // Keep this
  enableCharts: false,
  enableNotificationCenter: false,
  enableRealtime: false,
  enableToasts: true, // Keep this
  enableExport: false,
  enableImport: false,
  enablePDFExport: false,
  enableAdvancedSearch: false,
  enableFacetedFilters: false,
  enableVirtualScrolling: false,
  enableInfiniteScroll: false,
  enableImageOptimization: true, // Keep this
  enableStorybook: false,
  enableVisualTesting: false,
  enableA11yTesting: false,
  enableMobileMenu: true, // Keep this
  enableResponsiveImages: true, // Keep this
  // Disable all pages except needed ones
  enableDashboardPage: true,
  enableProfilePage: false,
  enableSettingsPage: false,
  enablePricingPage: false,
  enableFAQPage: false,
  enableContactPage: false,
  enableTeamPage: false,
  enableBlogPage: false,
};
```

### **Full-Featured Setup (Everything)**

```typescript
// Just use the default config! Everything is enabled.
```

### **Development Setup**

```typescript
export const FEATURES = {
  enableMSW: true, // Mock APIs
  enableDevTools: true, // Debug tools
  enableStorybook: true, // Component docs
  enableA11yTesting: true, // Accessibility checks
  // ... rest as needed
};
```

### **Production Setup**

```typescript
export const FEATURES = {
  enableMSW: false, // No mocks in prod
  enableDevTools: false, // No debug tools
  enablePWA: true, // Enable PWA
  enableAnalytics: true, // Track usage
  enableErrorTracking: true, // Monitor errors
  // ... rest as needed
};
```

### **SaaS Product Setup**

```typescript
export const FEATURES = {
  enableI18n: true, // Multi-language
  enableDarkMode: true, // User preference
  enableThemeCustomization: true, // Branding
  enablePWA: true, // Installable
  enableSocialAuth: true, // Easy signup
  enableRBAC: true, // User roles
  enable2FA: true, // Security
  enableDashboardPage: true, // User dashboard
  enableProfilePage: true, // User profile
  enableSettingsPage: true, // Settings
  enablePricingPage: true, // Pricing tiers
  enableAnalytics: true, // Track users
  enableErrorTracking: true, // Monitor issues
  // ... rest as needed
};
```

### **Landing Page / Marketing Site**

```typescript
export const FEATURES = {
  enableI18n: true, // Multi-language
  enableDarkMode: false, // Brand consistency
  enableThemeCustomization: false, // Fixed design
  enablePageTransitions: true, // Smooth animations
  enablePricingPage: true, // Show pricing
  enableFAQPage: true, // Answer questions
  enableContactPage: true, // Contact form
  enableTeamPage: true, // About us
  enableBlogPage: true, // Content marketing
  enableAnalytics: true, // Track visitors
  // Disable app features
  enableDashboardPage: false,
  enableProfilePage: false,
  enableSettingsPage: false,
  enableDataTable: false,
  // ... rest disabled
};
```

---

## 🚀 Environment-Based Flags

You can also use environment variables:

```typescript
// src/config/features.ts
export const FEATURES = {
  enableMSW: process.env.NEXT_PUBLIC_ENABLE_MSW === 'true',
  enableAnalytics: process.env.NODE_ENV === 'production',
  // ... etc
};
```

Then in `.env.local`:

```bash
NEXT_PUBLIC_ENABLE_MSW=true
```

---

## 📦 Bundle Size Impact

Disabling features helps reduce bundle size:

| Feature         | Approx. Size | Impact |
| --------------- | ------------ | ------ |
| MSW             | ~45 KB       | Medium |
| I18n            | ~20 KB       | Small  |
| Charts          | ~150 KB      | Large  |
| PDF Export      | ~200 KB      | Large  |
| Storybook       | Dev only     | None   |
| Command Palette | ~15 KB       | Small  |

**Tip:** Disable unused heavy features for faster load times!

---

## 🔧 Feature Development Workflow

### **Adding a New Feature**

1. **Add flag** in `src/config/features.ts`
2. **Build feature** components/pages
3. **Wrap with flag check**:
   ```typescript
   {FEATURES.myNewFeature && <MyComponent />}
   ```
4. **Document** in this file
5. **Test** with flag on/off

### **Removing a Feature**

1. Set flag to `false` in `src/config/features.ts`
2. Test app without feature
3. If confirmed, delete related code
4. Remove flag from config

---

## 📚 Related Documentation

- [Frontend Architecture](./FRONTEND_ARCHITECTURE.md)
- [Quick Start Guide](../QUICK_START_GUIDE.md)
- [Feature Implementation Status](../FEATURE_STATUS.md)

---

**Pro Tip:** Start with minimal features, add as needed. Don't enable everything if you don't need it! 🎯
