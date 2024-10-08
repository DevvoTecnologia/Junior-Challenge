"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface AuthContextType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const value = useMemo(
    () => ({ username, setUsername, password, setPassword }),
    [password, username],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthForm() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthForm must be used within an AuthProvider");
  }
  return context;
}
