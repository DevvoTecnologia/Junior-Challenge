import React from 'react';

type role = 'admin' | 'user';

export interface IUser {
  _id: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  role: role;
}

export interface ILoggedUSerData {
  username?: string;
  password?: string;
  token?: string;
  role?: string;
  id?: string;
}

export interface IContext extends ILoggedUSerData {
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export interface IAuthProvider {
  children: React.JSX.Element;
}

export enum RingType {
  Elves = 'Elfos',
  Dwarves = 'Anões',
  Men = 'Homens',
  Sauron = 'Sauron',
}
