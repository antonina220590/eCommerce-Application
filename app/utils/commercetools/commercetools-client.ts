import fetch from 'node-fetch';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.CTP_PROJECT_KEY!;
// const scopes = process.env.CTP_SCOPES!.split(' ');
// const scopes =
//   'view_categories:ecommerce-final-task manage_my_business_units:ecommerce-final-task manage_customers:ecommerce-final-task manage_my_quotes:ecommerce-final-task view_published_products:ecommerce-final-task manage_my_quote_requests:ecommerce-final-task create_anonymous_token:ecommerce-final-task manage_my_shopping_lists:ecommerce-final-task manage_my_payments:ecommerce-final-task manage_my_orders:ecommerce-final-task manage_my_profile:ecommerce-final-task'.split(
//     ' '
//   );
const scopes =
  'manage_extensions:ecommerce-final-task manage_tax_categories:ecommerce-final-task manage_cart_discounts:ecommerce-final-task manage_shopping_lists:ecommerce-final-task manage_project_settings:ecommerce-final-task manage_customer_groups:ecommerce-final-task manage_categories:ecommerce-final-task manage_order_edits:ecommerce-final-task manage_shipping_methods:ecommerce-final-task manage_products:ecommerce-final-task manage_types:ecommerce-final-task manage_discount_codes:ecommerce-final-task manage_orders:ecommerce-final-task manage_payments:ecommerce-final-task manage_customers:ecommerce-final-task create_anonymous_token:ecommerce-final-task manage_my_shopping_lists:ecommerce-final-task manage_my_payments:ecommerce-final-task manage_my_orders:ecommerce-final-task manage_my_profile:ecommerce-final-task'.split(
    ' '
  );
const authUrl = process.env.CTP_AUTH_URL!;
const apiUrl = process.env.CTP_API_URL!;
const clientId = process.env.CTP_CLIENT_ID!;
const clientSecret = process.env.CTP_CLIENT_SECRET!;

// console.log('Project Key:', projectKey);
// console.log('Scopes:', scopes);
// console.log('Auth URL:', authUrl);
// console.log('API URL:', apiUrl);
// console.log('Client ID:', clientId);
// console.log('Client Secret:', clientSecret);

const authMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions = {
  host: apiUrl,
  fetch,
};

const client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey,
});

const getToken = async (): Promise<string> => {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // console.log('Auth Header:', auth);

  const response = await fetch(`${authUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&scope=${scopes.join(' ')}`,
  });

  // console.log('response:', response);

  if (!response.ok) {
    const errorData = (await response.json()) as {
      error: string;
      error_description: string;
    };
    console.error('Failed to fetch access token:', errorData);
    throw new Error(
      `Failed to fetch access token: ${response.statusText} - ${errorData.error_description}`
    );
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
};

export {
  apiRoot,
  getToken,
  projectKey,
  apiUrl,
  authUrl,
  scopes,
  clientSecret,
  clientId,
};
