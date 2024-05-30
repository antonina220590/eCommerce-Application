import fetch from 'node-fetch';
import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import { getCookie } from 'cookies-next';
import { Customer } from '@commercetools/platform-sdk';

export async function GET(request: Request) {
  try {
    const accessToken = getCookie('accessToken', { req: request });

    const response = await fetch(`${apiUrl}/${projectKey}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('response', response);

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      return new Response(
        JSON.stringify({
          message: 'Error getting userData in (!response.ok) -> ',
          error: error.message,
        }),
        { status: response.status }
      );
    }

    const userData = (await response.json()) as Customer;
    console.log('res userData - >>', userData);

    return new Response(
      JSON.stringify({
        message: 'user -> ',
        userData,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during getting userData:', error.message);
      return new Response(
        JSON.stringify({
          message: 'Error during getting userData -> ',
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
