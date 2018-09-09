export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  password: string;
  isAdmin?: boolean;
  name?: string;
}
