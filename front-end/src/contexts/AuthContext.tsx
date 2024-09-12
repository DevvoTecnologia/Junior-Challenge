import { localStorageKeys } from '@/constants/localStorageKeys';
import { User } from '@/entities/User';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

interface AuthContextType {
  authorized: boolean;
  // user: User | undefined;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authorized, setAuthorized] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setAuthorized(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setAuthorized(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
