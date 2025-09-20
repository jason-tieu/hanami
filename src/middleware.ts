import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth/sign-in',
    '/auth/callback',
    '/terms',
    '/privacy',
  ];

  // Static assets and API routes
  const isStaticAsset = pathname.startsWith('/_next') || 
                       pathname.startsWith('/static') ||
                       pathname.startsWith('/favicon') ||
                       pathname.startsWith('/og') ||
                       pathname.startsWith('/sitemap') ||
                       pathname.startsWith('/robots') ||
                       pathname.includes('.');

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If it's a static asset or public route, allow access
  if (isStaticAsset || isPublicRoute) {
    return response;
  }

  // Protected routes - require authentication
  const protectedRoutes = [
    '/units',
    '/assignments', 
    '/exams',
    '/timetable',
    '/grades',
    '/announcements',
    '/calendar',
    '/planner',
    '/resources',
    '/integrations',
    '/notifications',
    '/settings',
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If it's a protected route and user is not authenticated, redirect to sign-in
  if (isProtectedRoute && !session) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    signInUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
