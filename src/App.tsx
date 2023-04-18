import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import RequireAuth from '@/components/RequireAuth';

import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import NoMatch from '@/pages/NoMatch';
import RegisterPage from '@/pages/RegisterPage';

function App() {
  return (
    <Box as="main" bg={'gray.50'}>
      <Routes>
        <Route path="/">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
