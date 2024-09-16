/* eslint-disable import/prefer-default-export */
import { AuthContext } from '@/app/contexts/AuthProvider';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
