import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AppProviders } from '@/lib/providers';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Frontend Starter Pack',
        template: '%s | Frontend Starter Pack',
    },
    description: 'Production-ready Next.js starter template with TypeScript, TanStack Query, and Zustand',
    keywords: ['Next.js', 'React', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS'],
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: './',
        title: 'Frontend Starter Pack',
        description: 'Production-ready Next.js starter template',
        siteName: 'Frontend Starter Pack',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Frontend Starter Pack',
        description: 'Production-ready Next.js starter template',
        creator: '@yourusername',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
                <AppProviders>
                    {children}
                </AppProviders>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
