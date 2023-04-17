import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import DashboardPage from '@/pages/DashboardPage';
import NoMatch from '@/pages/NoMatch';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';

function App() {
  return (
    <Box as="main" bg={'gray.50'}>
      <Routes>
        <Route path="/">
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
