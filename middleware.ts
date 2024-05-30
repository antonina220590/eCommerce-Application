import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseCookies } from 'nookies';

export const config = {
  matcher: ['/login', '/registration', '/user'],
};

export function middleware(request: NextRequest) {
  const cookies = request.headers.get('cookie') || '';
  const { userName } = parseCookies({
    req: { headers: { cookie: cookies } },
  });

  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (!userName && path === '/user') {
    return NextResponse.redirect(`${url.origin}/login`);
  }
  if (userName && (path === '/login' || path === '/registration')) {
    return NextResponse.redirect(url.origin);
  }

  return NextResponse.next();
}
