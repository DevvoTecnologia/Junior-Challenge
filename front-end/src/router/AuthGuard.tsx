import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = ({ isPrivate }: { isPrivate?: boolean }) => {
  const { authorized } = useAuth();

  if (!authorized && isPrivate) return <Navigate to="/" replace />;

  if (authorized && !isPrivate) return <Navigate to="/rings" replace />;

  return <Outlet />;
};

export default AuthGuard;
