// import fetch from 'node-fetch';
// import {
//   getToken,
//   projectKey,
//   apiUrl,
// } from '@/app/utils/commercetools/commercetools-client';
// //import CartDraft from '@commercetools/platform-sdk';
// import Cart from '@commercetools/platform-sdk';
// import { NextRequest, NextResponse } from 'next/server';

// interface Cart {
//   CartData: Cart;
// }

// async function POST(req: NextRequest) {
//   try {
//     const token = await getToken();
//     const response = await fetch(`${apiUrl}/${projectKey}/carts`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         currency: 'USD',
//       }),
//     });

//     if (!response.ok) {
//       const error = (await response.json()) as { message: string };
//       console.error('Error creating cart -> ', error);
//       return NextResponse.json(
//         { message: 'Error creating cart', error: error.message },
//         { status: 500 }
//       );
//     }
//     const data = (await response.json()) as Cart;
//     console.log(data);

//     return NextResponse.json(
//       { message: 'Cart created successfully', data },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('error -> ', error);
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { message: 'Error creating cart: ', error: error.message },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { message: 'An unknown error occurred' },
//       { status: 500 }
//     );
//   }
// }

// export async function OPTIONS() {
//   return new Response('OK', {
//     status: 200,
//     headers: {
//       Allow: 'POST, OPTIONS',
//     },
//   });
// }
