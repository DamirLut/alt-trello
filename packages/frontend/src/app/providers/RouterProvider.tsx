import { type FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { MainLayout } from 'pages/layout';
import { Loadable } from 'ui/loadable';
import { AuthGuard } from 'widgets/auth/ui/auth.guard';

const HomePage = Loadable(lazy(() => import('pages/home')));
const AuthPage = Loadable(lazy(() => import('pages/auth')));
const BoardPage = Loadable(lazy(() => import('pages/board')));
const TaskPage = Loadable(lazy(() => import('pages/fulltask')));
const ShareBoardPage = Loadable(lazy(() => import('pages/share-board')));

export const Router: FC = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: <AuthGuard />,
          children: [
            {
              path: '/',
              element: <HomePage />,
            },
            {
              path: '/b/:id/:slug',
              element: <BoardPage />,
              children: [
                {
                  path: ':task',
                  element: <TaskPage />,
                },
                {
                  path: 'share',
                  element: <ShareBoardPage />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <AuthPage />,
      path: '/auth',
    },
  ]);
};
