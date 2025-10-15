/**
 * 🎭 MSW (Mock Service Worker) Entry Point
 *
 * Export mocks for easy import
 */

export { handlers } from './handlers'
export { worker, startMSW } from './browser'
export * from './data/users'
export * from './data/products'
