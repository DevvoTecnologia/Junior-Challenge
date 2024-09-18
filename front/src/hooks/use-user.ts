import axios from 'axios';
import { create } from 'zustand';
import { loginSchema } from '../schemas/login-schema.ts';
import { registerSchema } from '../schemas/register-schema.ts';
import { LoggedUser, User } from '@/types/User.ts';
import { z } from 'zod';

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

type UserProps = {
  user: LoggedUser | null;
  setUser: (user: LoggedUser) => LoggedUser;
  clearUser: () => void;
  login: (loginData: { email: string; password: string }) => Promise<LoggedUser | null>;
  register: (registerData: {
    email: string;
    password: string;
    username: string;
    class: string;
  }) => Promise<User | null>;
  getUser: (id: string) => Promise<User | null>;
};
const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useUser = create<UserProps>((set) => ({
  user: initialUser,
  setUser: (user) => {
    set({ user });
    return user;
  },
  clearUser: () => {
    set({ user: null });

    localStorage.removeItem('user');
  },

  login: async (loginData: { email: string; password: string }) => {
    try {
      loginSchema.parse(loginData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Erro de validação: ${error.errors.map((e) => e.message).join(', ')}`
        );
      }
      throw new Error('Erro ao validar dados de login');
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, loginData);

      if (!response || !response.data) {
        throw new Error('Erro ao receber resposta do servidor');
      }

      localStorage.setItem('user', JSON.stringify(response.data));

      const result = set({ user: response.data });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Erro ao fazer login: ${error.response.data.error || 'Erro desconhecido'}`
          );
        } else if (error.request) {
          throw new Error('Erro de conexão: O servidor não respondeu');
        } else {
          throw new Error(`Erro inesperado: ${error.message}`);
        }
      } else {
        throw new Error(`Erro inesperado: ${error}`);
      }
    }
  },

  register: async (registerData: {
    email: string;
    password: string;
    username: string;
    class: string;
  }) => {
    try {
      registerSchema.parse(registerData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Erro de validação: ${error.errors.map((e) => e.message).join(', ')}`
        );
      }
      throw new Error('Erro ao validar dados de registro');
    }

    try {
      const response = await axios.post(`${baseUrl}/register`, registerData);

      if (!response || !response.data) {
        throw new Error('Erro ao receber resposta do servidor');
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Erro ao registrar: ${error.response.data.message || 'Erro desconhecido'}`
          );
        } else if (error.request) {
          throw new Error('Erro de conexão: O servidor não respondeu');
        } else {
          throw new Error(`Erro inesperado: ${error.message}`);
        }
      } else {
        throw new Error(`Erro inesperado: ${error}`);
      }
    }
  },
  getUser: async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);

      if (!response || !response.data) {
        throw new Error('Erro ao receber resposta do servidor');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Erro ao buscar dados do usuário: ${error.response.data.message || 'Erro desconhecido'}`
          );
        } else if (error.request) {
          throw new Error('Erro de conexão: O servidor não respondeu');
        } else {
          throw new Error(`Erro inesperado: ${error.message}`);
        }
      } else {
        throw new Error(`Erro inesperado: ${error}`);
      }
    }
  },
}));
