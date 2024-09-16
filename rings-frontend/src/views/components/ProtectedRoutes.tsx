import React, { useEffect } from 'react';

import { useAuth } from '@/app/hooks/useAuth';
import { useNavigation } from '@/app/lib/navigate';

export const ProtectedRoutes = ({
  children,
}: { children: React.JSX.Element }) => {
  const { token } = useAuth();
  const navigate = useNavigation();
  const msg = `Você não possui as credenciais necessárias para acessar a página`;

  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [token]);

  if (!token) {
    return <h1>{msg}</h1>;
  }

  return children;
};
