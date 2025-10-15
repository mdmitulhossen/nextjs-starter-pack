import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

/**
 * Middleware for protecting routes
 * Redirects unauthenticated users to sign-in page
 */
export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Check if user is trying to access admin routes
        if (path.startsWith('/admin') && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/auth/signin',
        },
    }
);

/**
 * Configure which routes require authentication
 */
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/settings/:path*',
        '/profile/:path*',
    ],
};
