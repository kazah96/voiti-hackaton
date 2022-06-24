import { ProtectedRoute } from 'components/user/auth';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegistrationPage } from './auth';
import { HomePage } from './home';

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
};
