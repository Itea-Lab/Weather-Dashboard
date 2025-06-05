export interface User {
  id: string;
  username: string;
  passwordHash: string | undefined;
  name: string | undefined;
  email: string | undefined;
  roles: string[];
}
