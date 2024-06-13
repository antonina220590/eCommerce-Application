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
    const accessToken = getCookie('accessToken', { req });
    const cartId = getCookie('cartId', { req });
    const { currency, lineItems } = await req.json();

    // console.log('accessToken --> ', accessToken);
    // console.log('req ---> ', req);

    let response;
    let cartData;

    if (cartId && accessToken) {
      // checking existing cart
      const existingCart = await fetch(
        `${apiUrl}/${projectKey}/me/carts/${cartId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      cartData = (await existingCart.json()) as Cart;
      const currentVersion = cartData.version || 1;

      lineItems[0].action = 'addLineItem';
      console.log('lineItems ---> ', lineItems);
      console.log('currentVersion ---> ', currentVersion);

      // cart updating
      response = await fetch(`${apiUrl}/${projectKey}/me/carts/${cartId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: currentVersion,
          actions: lineItems,
        }),
      });

      if (!response.ok) {
        const error = (await response.json()) as { message: string };
        console.error('Error updating cart -> ', error);
        return NextResponse.json(
          { message: 'Error updating cart -> ', error: error.message },
          { status: 500 }
        );
      }
      cartData = (await response.json()) as Cart;

      return NextResponse.json(
        { message: 'Cart updated successfully', cartData },
        {
          status: 200,
        }
      );
    }

    // cart creating

    const anonymousToken = (await fetchAnonymousToken()) as string;
    response = await fetch(`${apiUrl}/${projectKey}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${anonymousToken}`,
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
    cartData = (await response.json()) as Cart;
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
    headers.append(
      'Set-Cookie',
      serialize('accessToken', anonymousToken, {
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
