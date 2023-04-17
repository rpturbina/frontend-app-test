import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import App from '@/App';
import theme from '@/styles/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
