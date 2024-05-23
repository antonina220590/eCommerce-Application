export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginTokenRequest {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
export interface Address {
  id?: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface Customer {
  id: string;
  firstName: string;
  version: number;
  addresses: Address[];
  [key: string]: unknown;
}

export interface ResponseCustomerData {
  customer: Customer;
}
