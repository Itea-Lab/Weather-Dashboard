export interface DecodedToken {
  userId: string;
  username: string;
  name: string;
  email: string;
  roles?: string | string[];
  iat: number;
  exp: number;
}
