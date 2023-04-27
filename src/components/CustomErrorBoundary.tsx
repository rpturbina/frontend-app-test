import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';

const CustomErrorBoundary = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
