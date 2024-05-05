import { type FC, lazy } from 'preact/compat';
import { useRoutes } from 'react-router-dom';
import { Loadable } from 'ui/loadable';

import { MainLayout } from 'pages/layout';

const HomePage = Loadable(lazy(() => import('pages/home')));

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
  ]);
};
