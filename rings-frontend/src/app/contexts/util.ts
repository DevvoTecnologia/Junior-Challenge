/* eslint-disable no-console */
import { login } from '@/app/services/login';
import { setToken } from '@/app/services/token';
import { ILoggedUSerData } from '@/types';

export function addTokenByUserType(role: string, token: string) {
  switch (role) {
    case 'user':
      setToken(token);
      break;
    case 'admin':
      setToken(token);
      break;
    default:
      console.log('Tipo de usuário desconhecido.');
  }
}

export function removeTokenByUserType(role: string) {
  switch (role) {
    case 'user':
      setToken('');
      break;
    case 'admin':
      setToken('');
      break;
    default:
      console.log('Tipo de usuário desconhecido.');
  }
}

export function setUserLocalStorage(user: ILoggedUSerData | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('user');

  if (json) {
    const user = JSON.parse(json);
    return user ?? null;
  }

  return null;
}

export async function loginRequest(username: string, password: string) {
  try {
    const response = await login({ username, password });

    return response;
  } catch (error) {
    if (error instanceof Error) console.log(error);
    return null;
  }
}
