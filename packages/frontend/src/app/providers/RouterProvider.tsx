import { type FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { MainLayout } from 'pages/layout';
import { Loadable } from 'ui/loadable';

const HomePage = Loadable(lazy(() => import('pages/home')));
const UIKitPage = Loadable(lazy(() => import('pages/ui-kit-preview')));

export const Router: FC = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
      ],
    },
    {
      element: <UIKitPage />,
      path: '/ui-kit',
    },
  ]);
};
