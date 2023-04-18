import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import App from '@/App';
import { AuthProvider } from '@/context/auth';
import theme from '@/styles/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              position: 'bottom',
            },
          }}
        >
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
