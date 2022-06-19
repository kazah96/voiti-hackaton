import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <div>123</div>
      <Suspense fallback="Loading...">{component()}</Suspense>
    </BrowserRouter>
  );
