export interface SignInResponse {
  accessToken: string;
  userId: number;
  username: string;
  email: string | null;
}
