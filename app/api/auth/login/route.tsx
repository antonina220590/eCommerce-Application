import { NextRequest, NextResponse } from 'next/server';
import {
  getToken,
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import fetch from 'node-fetch';
import { LoginPayload } from '@/app/types';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const token = await getToken();

    console.log('token: ', token);

    // TODO - refactor according with our data from form
    const customerDraft: LoginPayload = {
      email,
      password,
    };

    const response = await fetch(`${apiUrl}/${projectKey}/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDraft),
    });

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      console.error('Error logging in:', error);
      return NextResponse.json(
        { message: 'Error logging in', error: error.message },
        { status: 500 }
      );
    }

    const userData = await response.json();
    return NextResponse.json({ message: 'Login successful', userData });
  } catch (error) {
    console.error('error -> ', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Unexpected error during login: ', error: error.message },
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
