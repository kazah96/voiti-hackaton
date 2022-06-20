import { AuthProvider } from 'components/user/auth';

export const withAuth = (component: () => React.ReactNode) => () => {
  return <AuthProvider>{component()}</AuthProvider>;
};
