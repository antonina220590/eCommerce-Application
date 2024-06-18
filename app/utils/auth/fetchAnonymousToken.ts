import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import {
  projectKey,
  authUrl,
  clientId,
  scopes,
  clientSecret,
} from '@/app/utils/commercetools/commercetools-client';
import { LoginTokenRequest } from '@/app/types';

async function fetchAnonymousToken() {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch(
      `${authUrl}/oauth/${projectKey}/anonymous/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&scope=${encodeURIComponent(scopes.join(' '))}`,
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      return NextResponse.json(
        {
          message: 'Error fetchAnonymousToken -> ',
          error: error.message,
        },
        { status: response.status }
      );
    }

    const tokenData = (await response.json()) as LoginTokenRequest;
    console.log('fetchAnonymousToken fetched:', tokenData);
    return tokenData.access_token;
  } catch (error) {
    console.error('Failed to fetch user data');
    throw error;
  }
}

export default fetchAnonymousToken;
