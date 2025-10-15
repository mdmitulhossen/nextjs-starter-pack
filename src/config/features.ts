/**
 * 🎯 Feature Flags Configuration
 *
 * Enable/disable features easily without removing code.
 * Set to `true` to enable, `false` to disable.
 *
 * To add a new feature:
 * 1. Add flag here
 * 2. Use in code: `if (FEATURES.myFeature) { ... }`
 * 3. Document in FEATURES.md
 */

export const FEATURES = {
  // ============================================
  // 🎭 Mock & Development Tools
  // ============================================

  /**
   * Mock Service Worker (MSW)
   * - Enables mock API responses during development
   * - No backend needed for frontend development
   * - Realistic API delays and error scenarios
   */
  enableMSW: process.env.NODE_ENV === 'development',

  /**
   * Developer Tools Panel
   * - API request debugger
   * - State inspector
   * - Performance profiler
   * - Feature flags toggle UI
   */
  enableDevTools: process.env.NODE_ENV === 'development',

  // ============================================
  // 🌍 Internationalization
  // ============================================

  /**
   * Multi-language support (i18n)
   * - Language switcher
   * - Translation files
   * - RTL support
   * - Date/Number formatting
   */
  enableI18n: true,

  /**
   * RTL (Right-to-Left) support
   * - For Arabic, Hebrew, etc.
   */
  enableRTL: true,

  // ============================================
  // 🎨 UI Features
  // ============================================

  /**
   * Theme Customization
   * - Multiple theme presets
   * - Color palette picker
   * - Font size controls
   */
  enableThemeCustomization: true,

  /**
   * Dark Mode
   * - System preference detection
   * - Manual toggle
   */
  enableDarkMode: true,

  /**
   * Command Palette (⌘K)
   * - Global search
   * - Quick navigation
   * - Action shortcuts
   */
  enableCommandPalette: true,

  /**
   * Page Transitions
   * - Smooth page changes
   * - Loading animations
   */
  enablePageTransitions: true,

  // ============================================
  // 📱 Progressive Web App (PWA)
  // ============================================

  /**
   * PWA Features
   * - Offline support
   * - Install prompt
   * - Service worker
   */
  enablePWA: process.env.NODE_ENV === 'production',

  /**
   * Push Notifications
   * - Browser notifications
   * - Notification preferences
   */
  enablePushNotifications: false, // Enable when backend ready

  /**
   * Offline Mode
   * - Offline page
   * - Cached content
   */
  enableOfflineMode: true,

  // ============================================
  // 🔐 Authentication & Security
  // ============================================

  /**
   * Social Auth (OAuth)
   * - GitHub, Google, etc.
   */
  enableSocialAuth: true,

  /**
   * Role-based Access Control
   * - Admin, User, Guest roles
   * - Permission checks
   */
  enableRBAC: true,

  /**
   * Two-Factor Authentication
   * - OTP via email/SMS
   */
  enable2FA: false, // Enable when backend ready

  // ============================================
  // 📊 Data & Analytics
  // ============================================

  /**
   * Analytics
   * - Google Analytics
   * - Vercel Analytics
   */
  enableAnalytics: process.env.NODE_ENV === 'production',

  /**
   * Error Tracking (Sentry)
   * - Error reporting
   * - Performance monitoring
   */
  enableErrorTracking: process.env.NODE_ENV === 'production',

  /**
   * Advanced Data Tables
   * - Sorting, filtering, pagination
   * - Row selection, bulk actions
   * - Export to CSV/Excel
   */
  enableDataTable: true,

  /**
   * Charts & Visualization
   * - Recharts integration
   * - Dashboard widgets
   */
  enableCharts: true,

  // ============================================
  // 🔔 Notifications & Communication
  // ============================================

  /**
   * Notification Center
   * - Inbox UI
   * - Notification history
   */
  enableNotificationCenter: true,

  /**
   * Real-time Features
   * - WebSocket connection
   * - Live updates
   */
  enableRealtime: false, // Enable when backend ready

  /**
   * Toast Notifications
   * - Success, error, info toasts
   */
  enableToasts: true,

  // ============================================
  // 📤 Import/Export
  // ============================================

  /**
   * CSV/Excel Export
   * - Download data as CSV
   * - Excel format support
   */
  enableExport: true,

  /**
   * CSV Import
   * - Upload and parse CSV
   * - Data validation
   */
  enableImport: true,

  /**
   * PDF Generation
   * - Export reports as PDF
   */
  enablePDFExport: true,

  // ============================================
  // 🔍 Search & Filters
  // ============================================

  /**
   * Advanced Search
   * - Global search
   * - Search suggestions
   * - Highlighting
   */
  enableAdvancedSearch: true,

  /**
   * Faceted Filters
   * - Multiple filter categories
   * - Filter combinations
   */
  enableFacetedFilters: true,

  // ============================================
  // 🎯 Performance & Optimization
  // ============================================

  /**
   * Virtual Scrolling
   * - For large lists
   * - Better performance
   */
  enableVirtualScrolling: true,

  /**
   * Infinite Scroll
   * - Load more on scroll
   */
  enableInfiniteScroll: true,

  /**
   * Image Optimization
   * - Next.js Image component
   * - Lazy loading
   * - Blur placeholder
   */
  enableImageOptimization: true,

  // ============================================
  // 🧪 Testing & Documentation
  // ============================================

  /**
   * Storybook
   * - Component showcase
   * - Interactive docs
   */
  enableStorybook: process.env.NODE_ENV === 'development',

  /**
   * Visual Testing
   * - Screenshot comparison
   */
  enableVisualTesting: false,

  /**
   * Accessibility Testing
   * - axe-core integration
   */
  enableA11yTesting: process.env.NODE_ENV === 'development',

  // ============================================
  // 📱 Responsive Features
  // ============================================

  /**
   * Mobile Menu
   * - Hamburger menu
   * - Mobile-optimized navigation
   */
  enableMobileMenu: true,

  /**
   * Responsive Images
   * - Different sizes for different screens
   */
  enableResponsiveImages: true,

  // ============================================
  // 🎨 Pre-built Pages
  // ============================================

  /**
   * Dashboard Page
   * - Widgets, charts, stats
   */
  enableDashboardPage: true,

  /**
   * Profile Page
   * - User profile view/edit
   */
  enableProfilePage: true,

  /**
   * Settings Page
   * - User preferences
   * - Account settings
   */
  enableSettingsPage: true,

  /**
   * Pricing Page
   * - Pricing tiers
   * - Plan comparison
   */
  enablePricingPage: true,

  /**
   * FAQ Page
   * - Frequently asked questions
   */
  enableFAQPage: true,

  /**
   * Contact Page
   * - Contact form
   */
  enableContactPage: true,

  /**
   * Team/About Page
   * - Team members
   * - Company info
   */
  enableTeamPage: true,

  /**
   * Blog Page
   * - Blog listing
   * - Blog post view
   */
  enableBlogPage: true,
} as const

// Type-safe feature check helper
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
  return FEATURES[feature] === true
}

// Get all enabled features
export function getEnabledFeatures(): (keyof typeof FEATURES)[] {
  return (Object.keys(FEATURES) as (keyof typeof FEATURES)[]).filter(
    (key) => FEATURES[key] === true
  )
}

// Get all disabled features
export function getDisabledFeatures(): (keyof typeof FEATURES)[] {
  return (Object.keys(FEATURES) as (keyof typeof FEATURES)[]).filter(
    (key) => FEATURES[key] === false
  )
}

// Feature categories
export const FEATURE_CATEGORIES = {
  'Mock & Development': [
    'enableMSW',
    'enableDevTools',
    'enableStorybook',
  ],
  'Internationalization': [
    'enableI18n',
    'enableRTL',
  ],
  'UI Features': [
    'enableThemeCustomization',
    'enableDarkMode',
    'enableCommandPalette',
    'enablePageTransitions',
  ],
  'PWA': [
    'enablePWA',
    'enablePushNotifications',
    'enableOfflineMode',
  ],
  'Authentication': [
    'enableSocialAuth',
    'enableRBAC',
    'enable2FA',
  ],
  'Data & Analytics': [
    'enableAnalytics',
    'enableErrorTracking',
    'enableDataTable',
    'enableCharts',
  ],
  'Notifications': [
    'enableNotificationCenter',
    'enableRealtime',
    'enableToasts',
  ],
  'Import/Export': [
    'enableExport',
    'enableImport',
    'enablePDFExport',
  ],
  'Search & Filters': [
    'enableAdvancedSearch',
    'enableFacetedFilters',
  ],
  'Performance': [
    'enableVirtualScrolling',
    'enableInfiniteScroll',
    'enableImageOptimization',
  ],
  'Testing': [
    'enableVisualTesting',
    'enableA11yTesting',
  ],
  'Responsive': [
    'enableMobileMenu',
    'enableResponsiveImages',
  ],
  'Pre-built Pages': [
    'enableDashboardPage',
    'enableProfilePage',
    'enableSettingsPage',
    'enablePricingPage',
    'enableFAQPage',
    'enableContactPage',
    'enableTeamPage',
    'enableBlogPage',
  ],
} as const
