'use client';

import { type ReactNode } from 'react';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { MSWProvider } from '@/components/providers/msw-provider';
import { Toaster } from '@/components/ui/toaster';

interface AppProvidersProps {
    children: ReactNode;
}

/**
 * Combined app providers
 * Wraps the app with all necessary context providers
 */
export function AppProviders({ children }: AppProvidersProps) {
    return (
        <MSWProvider>
            <ThemeProvider>
                <QueryProvider>
                    {children}
                    <Toaster />
                </QueryProvider>
            </ThemeProvider>
        </MSWProvider>
    );
}
