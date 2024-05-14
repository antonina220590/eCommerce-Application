import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import {
  projectKey,
  scopes,
  authUrl,
  clientId,
  clientSecret,
} from '@/app/utils/commercetools/commercetools-client';
import { serialize } from 'cookie';
import { LoginTokenRequest } from '@/app/types';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response = await fetch(
      `${authUrl}/oauth/${projectKey}/customers/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&scope=${encodeURIComponent(scopes.join(' '))}`,
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      return new NextResponse(
        JSON.stringify({
          message: 'Error logging in',
          error: error.message,
        }),
        { status: response.status }
      );
    }

    const res = (await response.json()) as LoginTokenRequest;
    const accessToken = res.access_token;
    const expiresIn = res.expires_in;

    const headers = new Headers({
      'Set-Cookie': serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: expiresIn,
      }),
      'Content-Type': 'application/json',
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Login successful -> ',
        accessToken,
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          message: 'Error during login: ',
          error: error.message,
        }),
        { status: 500 }
      );
    }
    return new NextResponse(JSON.stringify({ message: 'An unknown error: ' }), {
      status: 500,
    });
  }
}

export async function OPTIONS() {
  return new NextResponse('OK', {
    status: 200,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  });
}
