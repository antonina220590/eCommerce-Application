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
import fetchUserData from '@/app/utils/auth/fetchUserData';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch(
      `${authUrl}/oauth/${projectKey}/customers/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&scope=${encodeURIComponent(scopes.join(' '))}`,
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      return NextResponse.json(
        {
          message: 'Error logging in (!response.ok) -> ',
          error: error.message,
        },
        { status: response.status }
      );
    }

    const res = (await response.json()) as LoginTokenRequest;
    // console.log('res - >>', res);
    const tokenData = res;
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in;

    const userData = await fetchUserData(accessToken);
    const userName = userData.firstName;
    // console.log('userData - >>', userData);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: expiresIn,
      })
    );
    headers.append(
      'Set-Cookie',
      serialize('userName', userName, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: expiresIn,
      })
    );

    return NextResponse.json(
      {
        message: 'Login successful -> ',
        userData,
        tokenData,
      },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: 'Error during login (error catched) -> ',
          error: error.message,
        },
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
