import { Navigate } from 'react-router-dom';

export const withAuth = (component: () => React.ReactNode) => () => {
  const accessToken = localStorage.getItem('jwt_token');
  console.log(component());

  return (
    <div>
      {/* {!accessToken && <Navigate to="/login" />} */}
      {component()}
    </div>
  );
};
