import fetch from 'node-fetch';
import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';
import fetchAnonymousToken from '@/app/utils/auth/fetchAnonymousToken';
import { Cart } from '@commercetools/platform-sdk';

export async function GET(req: NextRequest) {
  try {
    const accessToken =
      getCookie('accessToken', { req }) || (await fetchAnonymousToken());
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // console.log('accessToken --> ', accessToken);

    // console.log('req ---> ', req);

    const response = await fetch(`${apiUrl}/${projectKey}/me/carts/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      console.error('Error getting from cart -> ', error);
      return NextResponse.json(
        { message: 'Error getting from cart -> ', error: error.message },
        { status: 500 }
      );
    }
    const cartData = (await response.json()) as Cart;
    // console.log(' cart response ---> ', cartData);

    return NextResponse.json(
      { message: 'Get data from cart', cartData },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('error -> ', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error getting from cart: ', error: error.message },
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
