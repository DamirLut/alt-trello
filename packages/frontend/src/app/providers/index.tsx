import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'ui/error-boundary';

import { FullPageError } from 'pages/full-page-error';

import { Router } from './RouterProvider';

export function Providers() {
  return (
    <ErrorBoundary fallback={FullPageError}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
