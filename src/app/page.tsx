import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="container flex flex-col items-center gap-8 px-4 py-24 md:py-32">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Frontend Starter Pack
                    </h1>
                    <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
                        Production-ready Next.js template with TypeScript, TanStack Query, Zustand, and modern
                        best practices for 2025.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/dashboard">
                            <Button size="lg">Get Started</Button>
                        </Link>
                        <Link href="/examples">
                            <Button size="lg" variant="outline">
                                View Examples
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container px-4 py-16">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>⚡ TanStack Query</CardTitle>
                                <CardDescription>
                                    Auto retry, SWR, request deduplication, and smart caching out of the box
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Exponential backoff retry</li>
                                    <li>• Stale-while-revalidate</li>
                                    <li>• Prefetching & optimistic updates</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>🎯 Zustand State</CardTitle>
                                <CardDescription>
                                    Minimal boilerplate with middleware support and DevTools integration
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Persist middleware</li>
                                    <li>• Immer for immutability</li>
                                    <li>• Full TypeScript support</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>🔒 Authentication</CardTitle>
                                <CardDescription>
                                    NextAuth.js with JWT, OAuth providers, and route protection
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• GitHub & Google OAuth</li>
                                    <li>• Role-based access control</li>
                                    <li>• Protected routes middleware</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>🎨 Modern UI</CardTitle>
                                <CardDescription>
                                    Tailwind CSS with shadcn/ui components and dark mode support
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Accessible components</li>
                                    <li>• Smooth animations</li>
                                    <li>• Responsive design</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Analytics & Monitoring</CardTitle>
                                <CardDescription>
                                    Sentry error tracking, Vercel Analytics, and Web Vitals monitoring
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Error boundary integration</li>
                                    <li>• Performance metrics</li>
                                    <li>• User behavior tracking</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>🧪 Testing Ready</CardTitle>
                                <CardDescription>
                                    Jest, React Testing Library, Playwright, and MSW for API mocking
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Unit & integration tests</li>
                                    <li>• E2E testing setup</li>
                                    <li>• Accessibility testing</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t py-8">
                <div className="container px-4 text-center text-sm text-muted-foreground">
                    <p>Built with Next.js, TypeScript, TanStack Query, and Zustand</p>
                </div>
            </footer>
        </main>
    );
}
