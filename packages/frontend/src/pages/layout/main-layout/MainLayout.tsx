import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar } from 'widgets/app-bar';

import Style from './main-layout.module.scss';

export const MainLayout: FC = () => {
  return (
    <>
      <AppBar />
      <main className={Style.main}>
        <Outlet />
      </main>
    </>
  );
};
