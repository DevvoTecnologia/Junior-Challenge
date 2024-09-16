import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   register: (
//     name: string,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
    const login = ''

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
