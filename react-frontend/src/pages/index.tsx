import { ProtectedRoute } from 'components/user/auth';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegistrationPage } from './auth';
import { TestPage } from './test';

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
};
