import { ProtectedRoute } from 'components/user/auth';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegistrationPage } from './auth';
import { DevicesPage } from './devices';
import { HomePage } from './home';
import { LogsPage } from './logs';
import { OrganizationPage } from './organization';
import { WorkerLogs } from './organization/WorkerLogs';
import { ProfilePage } from './profile';

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
      <Route
        path="/organization"
        element={
          <ProtectedRoute>
            <OrganizationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organization/:id"
        element={
          <ProtectedRoute>
            <WorkerLogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/logs"
        element={
          <ProtectedRoute>
            <LogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/devices"
        element={
          <ProtectedRoute>
            <DevicesPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
};
