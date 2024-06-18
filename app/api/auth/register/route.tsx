import { NextRequest, NextResponse } from 'next/server';
import {
  getToken,
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import fetch from 'node-fetch';
import { serialize } from 'cookie';
import {
  Customer,
  ResponseCustomerData,
  Address,
  LoginTokenRequest,
} from '@/app/types';
import fetchTokenData from '@/app/utils/auth/fetchTokenData';

async function setDefaultAddresses(
  customerId: string,
  token: string,
  version: number,
  defaultShipping: boolean,
  defaultBilling: boolean,
  addresses: Address[]
) {
  const actions = [];
  if (defaultShipping) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressId: addresses[0].id,
    });
  }
  if (defaultBilling) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: addresses[addresses.length - 1].id,
    });
  }

  const requestBody = {
    version,
    actions,
  };

  // console.log('Updating data with -> ', JSON.stringify(requestBody));

  const updateResponse = await fetch(
    `${apiUrl}/${projectKey}/customers/${customerId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );

  return updateResponse;
}

export async function POST(req: NextRequest) {
  const regData = await req.json();
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    checkboxDefaultShipping,
    streetShipping,
    cityShipping,
    codeShipping,
    countryShipping,
    checkboxDefaultBilling,
    streetBilling,
    cityBilling,
    codeBilling,
    countryBilling,
  } = regData;

  try {
    const token = await getToken();
    const addresses = [];

    if (streetShipping && cityShipping && codeShipping && countryShipping) {
      addresses.push({
        streetName: streetShipping,
        city: cityShipping,
        postalCode: codeShipping,
        country: countryShipping,
      });
    }
    if (streetBilling && cityBilling && codeBilling && countryBilling) {
      addresses.push({
        streetName: streetBilling,
        city: cityBilling,
        postalCode: codeBilling,
        country: countryBilling,
      });
    }

    const customerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
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

    const data = (await response.json()) as ResponseCustomerData;
    // console.log('data -> ', data);

    if (checkboxDefaultShipping || checkboxDefaultBilling) {
      const updateResponse = await setDefaultAddresses(
        data.customer.id,
        token,
        data.customer.version,
        checkboxDefaultShipping,
        checkboxDefaultBilling,
        data.customer.addresses
      );
      if (!updateResponse.ok) {
        const error = (await updateResponse.json()) as { message: string };
        return NextResponse.json(
          { message: 'Error setting default addresses', error: error.message },
          { status: 500 }
        );
      }
      const freshUserData = await fetch(
        `${apiUrl}/${projectKey}/customers/${data.customer.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const freshData = (await freshUserData.json()) as Customer;
      data.customer = freshData;
      // console.log('data--> ', data);
    }

    const userName = data.customer.firstName;

    const resTokenData = (await fetchTokenData(
      email,
      password
    )) as LoginTokenRequest;
    // console.log('resTokenData - >>', resTokenData);
    const tokenData = resTokenData;
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      serialize('accessToken', accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: expiresIn,
      })
    );
    headers.append(
      'Set-Cookie',
      serialize('userName', userName, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
      })
    );
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
      { message: 'User created successfully', data },
      { status: 200, headers }
    );
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
