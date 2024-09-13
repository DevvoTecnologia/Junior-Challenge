// components/PrivateRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth/Auth'
import { getTokenLocalStorage } from '../utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ element }: any) => {
  const { user } = useAuth()
  const token = getTokenLocalStorage()

  return token?.length || user?.token?.length ? element : <Navigate to='/login' replace />
}

export default PrivateRoute
