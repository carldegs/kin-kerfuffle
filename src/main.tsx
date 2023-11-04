import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import theme from '@/features/theme';

const rootElement = document.getElementById('root');

// eslint-disable-next-line no-console
console.log(
  `%cVitemplate v${APP_VERSION}`,
  'color: yellow; background-color: black; padding: 4px 8px;'
);

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
