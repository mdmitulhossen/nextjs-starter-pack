/**
 * Central export for all Zustand stores
 */
export { useAuthStore } from './auth-store';
export { useUIStore } from './ui-store';

// Re-export types
export type { User } from './auth-store';
