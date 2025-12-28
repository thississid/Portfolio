import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple auth middleware for admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    // Basic auth check (you should use NextAuth or similar in production)
    if (!authHeader || !isValidAuth(authHeader)) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

function isValidAuth(authHeader: string): boolean {
  // Example: Basic authentication
  // In production, use NextAuth, Auth0, or similar
  const base64Credentials = authHeader.split(' ')[1];
  if (!base64Credentials) return false;

  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Replace with environment variables
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export const config = {
  matcher: '/admin/:path*',
};
