import fetch from 'node-fetch';
import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { getCookie } from 'cookies-next';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { Cart } from '@commercetools/platform-sdk';

export async function DELETE(req: NextRequest) {
  try {
    const accessToken = getCookie('accessToken', { req });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const version = searchParams.get('version');

    const response = await fetch(
      `${apiUrl}/${projectKey}/me/carts/${id}?version=${version}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      console.error('Error clearing cart -> ', error);
      return NextResponse.json(
        { message: 'Error clearing cart -> ', error: error.message },
        { status: 500 }
      );
    }
    const cartData = (await response.json()) as Cart;
    // console.log(' cart response ---> ', cartData);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      serialize('cartId', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: 0,
      })
    );

    return NextResponse.json(
      { message: 'clear cart', cartData },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error('error -> ', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error clearing cart: ', error: error.message },
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
