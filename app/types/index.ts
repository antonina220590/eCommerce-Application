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
