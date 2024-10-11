import type { PermittedForgedBy } from "./Ring";

export interface UserRings {
  id: number;
  name: string;
  power: string;
  owner: string;
  forgedBy: PermittedForgedBy;
  image: string;
  url: string;
}

export interface User {
  id: number;
  username: string;
  email: string | null;
  rings?: UserRings[];
}

export type Users = User[] | [];

export interface UserAuth {
  username: string;
  email: string;
  password: string;
}

export interface LoginSuccess {
  accessToken: string;
  userId: number;
  username: string;
  email: string | null;
}

export interface RegisterSuccess {
  id: number;
  username: string;
  email: string | null;
}

export interface UpdateUserSuccess {
  id: number;
  username: string;
  email: string | null;
}
