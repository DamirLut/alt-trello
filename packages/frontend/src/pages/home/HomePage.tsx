import type { FC } from 'react';

import { Spinner } from 'ui/spinner';
import { Title } from 'ui/typography';

import Style from './home.module.scss';

export const HomePage: FC = () => {
  return (
    <div className={Style.page}>
      <Title>Alt Trello</Title>
      <Spinner />
    </div>
  );
};
