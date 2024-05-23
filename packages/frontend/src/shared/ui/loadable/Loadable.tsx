import { type FC, Suspense } from 'react';

import { Spinner } from 'ui/spinner';

import Style from './loadable.module.scss';

export const Loadable = (Component: FC) => {
  return (props: object) => {
    return (
      <Suspense fallback={<LoadableFallback />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

const LoadableFallback = () => {
  return (
    <div className={Style.wrapper}>
      <Spinner />
    </div>
  );
};
