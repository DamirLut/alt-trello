import type { FC } from 'preact/compat';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
