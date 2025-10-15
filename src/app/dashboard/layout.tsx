import type { ReactNode } from 'react';

// Force dynamic rendering for authenticated pages
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 flex">
                        <a className="mr-6 flex items-center space-x-2" href="/dashboard">
                            <span className="font-bold">Dashboard</span>
                        </a>
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            <a href="/dashboard" className="hover:text-foreground/80 transition-colors">
                                Overview
                            </a>
                            <a href="/dashboard/users" className="hover:text-foreground/80 transition-colors">
                                Users
                            </a>
                            <a href="/examples" className="hover:text-foreground/80 transition-colors">
                                Examples
                            </a>
                        </nav>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <button
                            onClick={() => window.location.href = '/api/auth/signout'}
                            className="text-sm font-medium transition-colors hover:text-foreground/80"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
        </div>
    );
}
