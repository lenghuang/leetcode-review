import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

const BROWSE_AUTH_PAGES = ['/forgot-password', '/sign-in', '/sign-up'];

/**
 * Creates a new URL by combining a base path with the query parameters from an existing request.
 *
 * @param basePath - The base path for the new URL (e.g., '/sign-in', '/protected'). This should be a relative path.
 * @param requestURL - The original request URL as a string or URL object.  This is used to resolve the `basePath` into a full URL.
 * @param searchParams - The `URLSearchParams` object from the original request, containing the query parameters to be persisted.
 * @returns A new `URL` object with the combined base path and query parameters.
 */
const createURLWithQueryParams = (
  basePath: string,
  requestURL: string | URL,
  searchParams: URLSearchParams
): URL => {
  const redirectUrl = new URL(basePath, requestURL);
  searchParams.forEach((value, key) => {
    redirectUrl.searchParams.set(key, value);
  });
  return redirectUrl;
};

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
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
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // protected routes
    if (request.nextUrl.pathname.startsWith('/protected') && user.error) {
      const redirectUrl = createURLWithQueryParams(
        '/sign-in',
        request.url,
        request.nextUrl.searchParams
      );
      return NextResponse.redirect(redirectUrl);
    }

    if (
      user &&
      !user.error &&
      BROWSE_AUTH_PAGES.includes(request.nextUrl.pathname)
    ) {
      const redirectUrl = createURLWithQueryParams(
        '/protected',
        request.url,
        request.nextUrl.searchParams
      );
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    console.error(e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
