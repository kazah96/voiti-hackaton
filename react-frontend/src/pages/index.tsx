import { Route, Routes } from 'react-router-dom';
import { TestPage } from './test';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
    </Routes>
  );
};
