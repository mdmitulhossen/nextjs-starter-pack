/**
 * 🎭 MSW Provider
 *
 * Client component to initialize MSW in development
 */

'use client'

import { useEffect, useState } from 'react'
import { FEATURES } from '@/config/features'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(!FEATURES.enableMSW)

  useEffect(() => {
    async function initMSW() {
      if (FEATURES.enableMSW && process.env.NODE_ENV === 'development') {
        const { startMSW } = await import('@/mocks/browser')
        await startMSW()
        setMswReady(true)
      }
    }

    initMSW()
  }, [])

  if (!mswReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🎭</div>
          <p className="text-lg">Initializing Mock Service Worker...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
