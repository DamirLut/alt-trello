import { Spinner } from 'ui/spinner';

import Style from './FullPageSpinner.module.scss';

export const FullPageSpinner = () => {
  return (
    <div className={Style['full-page-spinner']}>
      <Spinner />
    </div>
  );
};
