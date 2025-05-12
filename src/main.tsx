import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SnackbarUtilsConfigurator from './utils/SnackbarUtilsConfigurator.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={5} preventDuplicate={false}>
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>
);
