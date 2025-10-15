/**
 * 🎭 MSW Browser Setup
 *
 * Initialize Mock Service Worker for browser/development
 */

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Start worker in development
export async function startMSW() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    await worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      quiet: false, // Show MSW logs in console
    })

    console.log('🎭 MSW: Mock Service Worker started')
    console.log('📡 Mocking API calls to:', process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000/api')
  } catch (error) {
    console.error('🎭 MSW: Failed to start Mock Service Worker:', error)
  }
}
