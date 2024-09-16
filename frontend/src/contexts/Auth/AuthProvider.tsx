import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  // useCallback para garantir que validateToken não cause re-renderizações desnecessárias
  const validateToken = useCallback(async () => {
    const storageData = localStorage.getItem('authToken');
    if (storageData) {
      try {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        } else {
          // Token inválido, removendo do localStorage
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  useEffect(() => {
    validateToken(); // Chama validateToken uma vez quando o componente é montado
  }, [validateToken]);

  const signin = async (email: string, password: string) => {
    try {
      const data = await api.signin(email, password);
      if (data.status === 200) {
        setUser(data.data);
        setToken(data.data.authentication.sessionToken);
        return true;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
    return false;
  }

  const register = async (email: string, password: string, username: string) => {
    try {
      const data = await api.register(email, password, username);
      if (data.status === 200) {
        setUser(data.data);
        setToken(data.data.authentication.sessionToken);
        return true;
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
    return false;
  }

  const signout = async () => {
    try {
      await api.logout();
      setUser(null);
      setToken('');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  }

  return (
    <AuthContext.Provider value={{ user, signin, register, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
