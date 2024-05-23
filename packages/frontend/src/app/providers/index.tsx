import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from 'entities/theme';
import { FullPageError } from 'pages/full-page-error';
import { ErrorBoundary } from 'ui/error-boundary';

import { queryClient } from '../../shared/api/client';

import { Router } from './RouterProvider';

export function Providers() {
  return (
    <ErrorBoundary fallback={FullPageError}>
      <BrowserRouter>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
