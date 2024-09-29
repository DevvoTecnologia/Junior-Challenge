export interface User {
  id: number;
  username: string;
  rings: {
    id: number;
    name: string;
    power: string;
    owner: string;
    forgedBy: string;
  }[];
}

export type Users = User[];

export interface UserAuth {
  username: string;
  password: string;
}

export interface LoginSuccess {
  accessToken: string;
  userId: number;
  username: string;
}

export interface UserState {
  token: string;
  id: number;
  username: string;
}
