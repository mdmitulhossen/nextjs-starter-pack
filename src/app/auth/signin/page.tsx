'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function SignInPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: 'Error',
                    description: 'Invalid email or password',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Success',
                    description: 'You have been signed in',
                });
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: 'github' | 'google') => {
        setIsLoading(true);
        try {
            await signIn(provider, { callbackUrl: '/dashboard' });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to sign in',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="bg-border h-px flex-1" />
                        <span className="text-muted-foreground text-xs">OR CONTINUE WITH</span>
                        <div className="bg-border h-px flex-1" />
                    </div>

                    <div className="grid gap-4">
                        <Button
                            variant="outline"
                            onClick={() => { void handleOAuthSignIn('github'); }}
                            disabled={isLoading}
                        >
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => { void handleOAuthSignIn('google'); }}
                            disabled={isLoading}
                        >
                            Google
                        </Button>
                    </div>

                    <p className="text-muted-foreground mt-4 text-center text-sm">
                        Demo: Use any email/password to sign in
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
