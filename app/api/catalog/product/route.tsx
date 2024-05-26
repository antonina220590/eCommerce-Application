import fetch from 'node-fetch';
import {
  getToken,
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';

export async function GET() {
  try {
    const token = await getToken();

    const response = await fetch(
      `${apiUrl}/${projectKey}/products/4850654f-005c-4787-88e0-99ad4624a770`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      return new Response(
        JSON.stringify({
          message: 'Error getting products in (!response.ok) -> ',
          error: error.message,
        }),
        { status: response.status }
      );
    }

    const products = (await response.json()) as ProductPagedQueryResponse;
    console.log('res - >>', products);

    return new Response(
      JSON.stringify({
        message: 'products -> ',
        products,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during getting products:', error.message);
      return new Response(
        JSON.stringify({
          message: 'Error during getting products -> ',
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
