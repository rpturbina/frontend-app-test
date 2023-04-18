import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/context/auth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
