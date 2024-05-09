import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'entities/theme';
import { FullPageError } from 'pages/full-page-error';
import { ErrorBoundary } from 'ui/error-boundary';

import { Router } from './RouterProvider';

export function Providers() {
  return (
    <ErrorBoundary fallback={FullPageError}>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
