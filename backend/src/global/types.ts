import type { Request } from "express";

export interface ReqUser extends Request {
  user: {
    sub: number;
    username: string;
    email: string | null;
  };
}

export type JwtPayload = ReqUser["user"] & {
  iat: number;
  exp: number;
};

export interface GithubReqUser extends Request {
  user: {
    username: string | undefined;
    email: string | undefined;
    githubUserId: string;
  };
}
