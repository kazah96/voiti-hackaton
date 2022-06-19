import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './auth';
import { TestPage } from './test';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
