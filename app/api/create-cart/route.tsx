import fetch from 'node-fetch';
import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { serialize } from 'cookie';
import { getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';
import fetchAnonymousToken from '@/app/utils/auth/fetchAnonymousToken';
import { Cart } from '@commercetools/platform-sdk';

export async function POST(req: NextRequest) {
  try {
    const accessToken =
      getCookie('accessToken', { req }) || (await fetchAnonymousToken());

    // console.log('accessToken --> ', accessToken);

    const { currency, lineItems } = await req.json();

    // console.log('req ---> ', req);

    const response = await fetch(`${apiUrl}/${projectKey}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency,
        lineItems,
      }),
    });

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      console.error('Error creating cart -> ', error);
      return NextResponse.json(
        { message: 'Error creating cart -> ', error: error.message },
        { status: 500 }
      );
    }
    const cartData = (await response.json()) as Cart;
    // console.log(' cart response ---> ', cartData);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      serialize('cartId', cartData.id, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: 172800,
      })
    );

    return NextResponse.json(
      { message: 'Cart created successfully', cartData },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error('error -> ', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error creating cart: ', error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response('OK', {
    status: 200,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  });
}
