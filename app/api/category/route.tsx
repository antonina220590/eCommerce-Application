import fetch from 'node-fetch';
import {
  getToken,
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { Category } from '@commercetools/platform-sdk';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  try {
    const token = await getToken();

    const response = await fetch(`${apiUrl}/${projectKey}/categories/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

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

    const categories = (await response.json()) as Category[];
    console.log('res - >>', categories);

    return new Response(
      JSON.stringify({
        message: 'categories -> ',
        categories,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during getting categories:', error.message);
      return new Response(
        JSON.stringify({
          message: 'Error during getting categories -> ',
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
