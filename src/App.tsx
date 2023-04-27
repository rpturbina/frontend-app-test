import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import NoMatch from '@/pages/NoMatch';
import RegisterPage from '@/pages/RegisterPage';
import UserDetailPage from '@/pages/UserDetailPage';

import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import RequireAuth from '@/components/RequireAuth';

function App() {
  return (
    <Box as="main" bg={'gray.50'}>
      <Routes>
        <Route path="/" element={<CustomErrorBoundary />}>
          <Route index element={<Navigate to={'/dashboard'} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="user/:id" element={<UserDetailPage />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
