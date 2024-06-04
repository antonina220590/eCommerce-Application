import fetch from 'node-fetch';
import {
  getToken,
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { DiscountedPrice } from '@commercetools/platform-sdk';

export async function GET() {
  try {
    const token = await getToken();

    const response = await fetch(`${apiUrl}/${projectKey}/product-discounts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      return new Response(
        JSON.stringify({
          message: 'Error getting discounts in (!response.ok) -> ',
          error: error.message,
        }),
        { status: response.status }
      );
    }

    const discounts = (await response.json()) as DiscountedPrice[];

    return new Response(
      JSON.stringify({
        message: 'discounts -> ',
        discounts,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during getting discounts:', error.message);
      return new Response(
        JSON.stringify({
          message: 'Error during getting discounts -> ',
          error: error.message,
        }),
        { status: 500 }
      );
    }
    console.error('An unknown error occurred:', error);
    return new Response(JSON.stringify({ message: 'An unknown error: ' }), {
      status: 500,
    });
  }
}

export async function OPTIONS() {
  return new Response('OK', {
    status: 200,
    headers: {
      Allow: 'GET, OPTIONS',
    },
  });
}
