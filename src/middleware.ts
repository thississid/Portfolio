import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Enhanced auth middleware for admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // Check for session cookie (you can replace this with JWT or NextAuth session)
    const sessionCookie = request.cookies.get('admin-session');
    
    // If no session cookie, check for Basic Auth
    const authHeader = request.headers.get('authorization');
    
    if (!sessionCookie && (!authHeader || !isValidAuth(authHeader))) {
      // Redirect to a login page or return 401
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area - Secure Access"',
        },
      });
    }
  }

  return NextResponse.next();
}

function isValidAuth(authHeader: string): boolean {
  // Basic authentication implementation
  // In production, use NextAuth.js, Auth0, Clerk, or similar
  try {
    const base64Credentials = authHeader.split(' ')[1];
    if (!base64Credentials) return false;

    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Get credentials from environment variables
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'password123';

    return username === validUsername && password === validPassword;
  } catch (error) {
    return false;
  }
}

export const config = {
  // Protect all admin routes including sub-routes
  matcher: [
    '/admin/:path*',
  ],
};
