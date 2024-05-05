import { type FC, Suspense } from 'preact/compat';
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
