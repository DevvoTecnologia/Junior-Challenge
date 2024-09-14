// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
