export interface LoggedUser {
  user: User;
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  class?: string;
}
