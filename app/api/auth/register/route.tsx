import { NextRequest, NextResponse } from 'next/server';
import {
  getToken,
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  const regData = await req.json();
  const { email, password, firstName, lastName } = regData;

  // console.log('regData', regData);

  try {
    const token = await getToken();

    // console.log('token: ', token);

    // TODO - refactor according with our data from form (or at least change names)
    const customerDraft = {
      email,
      password,
      firstName,
      lastName,
    };

    const response = await fetch(`${apiUrl}/${projectKey}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDraft),
    });

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      console.error('Error creating user -> ', error);
      return NextResponse.json(
        { message: 'Error creating user', error: error.message },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      message: 'User created successfully -> ',
      data,
    });
  } catch (error) {
    console.error('error -> ', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error creating user: ', error: error.message },
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
