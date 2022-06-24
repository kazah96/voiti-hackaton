import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context';

export const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuthContext();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
