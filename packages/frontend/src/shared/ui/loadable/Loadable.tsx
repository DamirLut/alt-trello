import { type FC, Suspense } from 'react';

import { FullPageSpinner } from 'ui/full-page-spinner';

export const Loadable = (Component: FC) => {
  return (props: object) => {
    return (
      <Suspense fallback={<FullPageSpinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
