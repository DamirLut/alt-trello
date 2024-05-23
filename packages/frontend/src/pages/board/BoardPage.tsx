import type { FC } from 'react';

import { CardColumn } from 'widgets/card-column';

import Style from './board.module.scss';

const columns = Array.from({ length: 5 });

export const BoardPage: FC = () => {
  return (
    <section className={Style.board}>
      {columns.map(() => (
        <CardColumn />
      ))}
    </section>
  );
};
