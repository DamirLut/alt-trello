import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Style from './main-layout.module.scss';

export const MainLayout: FC = () => {
  return (
    <main className={Style.main}>
      <Outlet />
    </main>
  );
};
