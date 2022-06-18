import { Navigate } from 'react-router-dom';

export const withAuth = (component: () => React.ReactNode) => () => {
  const accessToken = localStorage.getItem('jwt_token');
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return component();
};
