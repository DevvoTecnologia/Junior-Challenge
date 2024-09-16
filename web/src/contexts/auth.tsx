import Cookies from 'js-cookie'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!Cookies.get('token'),
  )

  useEffect(() => {
    const handleCookieChange = () => {
      setIsAuthenticated(!!Cookies.get('token'))
    }

    handleCookieChange()
  }, [])

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
