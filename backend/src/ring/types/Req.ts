export interface ReqAuthUser extends Request {
  user: {
    sub: number;
    username: string;
  };
}
