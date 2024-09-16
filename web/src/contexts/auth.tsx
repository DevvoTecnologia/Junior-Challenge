import Cookies from 'js-cookie'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { setAuthToken } from '@/lib/axios'
export interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setAuthToken(token)
      setIsAuthenticated(true)
    }
  }, [])

  const login = useCallback(() => {
    const token = Cookies.get('token')
    if (token) {
      setAuthToken(token)
    }
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    Cookies.remove('token')
    setAuthToken('')
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
