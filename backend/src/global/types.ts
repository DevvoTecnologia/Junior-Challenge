export interface ReqUser extends Request {
  user: {
    sub: number;
    username: string;
    email: string;
  };
}
