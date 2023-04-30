import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

const UserDetailPage = React.lazy(() => import('@/pages/UserDetailPage'));
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const NoMatch = React.lazy(() => import('@/pages/NoMatch'));
const RegisterPage = React.lazy(() => import('@/pages/RegisterPage'));
const CustomErrorBoundary = React.lazy(
  () => import('@/components/CustomErrorBoundary')
);
const RequireAuth = React.lazy(() => import('@/components/RequireAuth'));
const FullPageLoader = React.lazy(() => import('@/components/FullPageLoader'));

function App() {
  return (
    <React.Suspense fallback={<FullPageLoader />}>
      <Box as="main" bg={'gray.50'}>
        <Routes>
          <Route element={<CustomErrorBoundary />}>
            <Route path="/">
              <Route index element={<Navigate to={'/dashboard'} />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route element={<RequireAuth />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="user/:id" element={<UserDetailPage />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Route>
        </Routes>
      </Box>
    </React.Suspense>
  );
}

export default App;
