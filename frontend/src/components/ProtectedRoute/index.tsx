import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import { isTokenExpired } from '../../utils/jwtUtils';

const ProtectedRoute: React.FC = () => {
  const token = getToken();
  const isAuthenticated = token && !isTokenExpired(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
