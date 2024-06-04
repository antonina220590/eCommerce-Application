import { NextRequest, NextResponse } from 'next/server';
import {
  projectKey,
  apiUrl,
} from '@/app/utils/commercetools/commercetools-client';
import fetch from 'node-fetch';
import { parseCookies } from 'nookies';
// import { Customer, ResponseCustomerData, Address } from '@/app/types';
import fetchUserData from '@/app/utils/auth/fetchUserData';

async function userUpdate(
  customerId: string,
  token: string,
  version: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  idShipping: string,
  streetShipping: string,
  cityShipping: string,
  codeShipping: string,
  countryShipping: string,
  idBilling: string,
  streetBilling: string,
  cityBilling: string,
  codeBilling: string,
  countryBilling: string
) {
  const actions = [
    { action: 'setFirstName', firstName },
    { action: 'setLastName', lastName },
    { action: 'setDateOfBirth', dateOfBirth },
    {
      action: 'changeAddress',
      addressId: idShipping,
      address: {
        streetName: streetShipping,
        city: cityShipping,
        postalCode: codeShipping,
        country: countryShipping,
      },
    },
    {
      action: 'changeAddress',
      addressId: idBilling,
      address: {
        streetName: streetBilling,
        city: cityBilling,
        postalCode: codeBilling,
        country: countryBilling,
      },
    },
  ];

  const requestBody = {
    version,
    actions,
  };

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
  // console.log('req', req);

  const {
    firstName,
    lastName,
    dateOfBirth,
    idShipping,
    streetShipping,
    cityShipping,
    codeShipping,
    countryShipping,
    idBilling,
    streetBilling,
    cityBilling,
    codeBilling,
    countryBilling,
  } = regData;

  try {
    const cookies = req.headers.get('cookie') || '';
    const { accessToken } = parseCookies({
      req: { headers: { cookie: cookies } },
    });

    // console.log('data -> ', data);
    // console.log('regData -> ', regData);

    const userData = await fetchUserData(accessToken);
    // console.log('userData -> ', userData);

    const userUpdateRequest = await userUpdate(
      userData.id,
      accessToken,
      userData.version,
      firstName,
      lastName,
      dateOfBirth,
      idShipping,
      streetShipping,
      cityShipping,
      codeShipping,
      countryShipping,
      idBilling,
      streetBilling,
      cityBilling,
      codeBilling,
      countryBilling
    );
    if (!userUpdateRequest.ok) {
      const error = (await userUpdateRequest.json()) as { message: string };
      return NextResponse.json(
        { message: 'User updating error', error: error.message },
        { status: 500 }
      );
    }

    // console.log('up userData', userData);

    const data = {
      newUserData: userUpdateRequest,
    };
    return NextResponse.json(
      { message: 'User updated successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('error -> ', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error Updating user: ', error: error.message },
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
