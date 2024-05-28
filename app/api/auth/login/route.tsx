import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { LoginTokenRequest } from '@/app/types';
import fetchUserData from '@/app/utils/auth/fetchUserData';
import fetchTokenData from '@/app/utils/auth/fetchTokenData';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const res = (await fetchTokenData(email, password)) as LoginTokenRequest;
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
        httpOnly: false,
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
