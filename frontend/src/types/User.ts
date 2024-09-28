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
