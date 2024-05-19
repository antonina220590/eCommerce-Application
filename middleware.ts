import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseCookies } from 'nookies';

export const config = {
  matcher: ['/login', '/registration'],
};

export function middleware(request: NextRequest) {
  const cookies = request.headers.get('cookie') || '';
  const { accessToken } = parseCookies({
    req: { headers: { cookie: cookies } },
  });

  if (accessToken) {
    const url = request.nextUrl.clone();
    return NextResponse.redirect(url.origin);
  }

  return NextResponse.next();
}
