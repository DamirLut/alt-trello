import { type FC, Suspense } from 'react';

import { Spinner } from 'ui/spinner';

export const Loadable = (Component: FC) => {
  return (props: object) => {
    return (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
