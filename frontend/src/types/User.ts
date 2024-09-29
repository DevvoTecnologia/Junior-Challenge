export interface User {
  id: number;
  username: string;
  rings?: {
    id: number;
    name: string;
    power: string;
    owner: string;
    forgedBy: string;
    image: string;
    url: string;
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

export interface RegisterSuccess {
  id: number;
  username: string;
}

export interface UpdateUserSuccess {
  id: number;
  username: string;
}
