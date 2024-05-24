import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { CardColumn } from 'widgets/card-column';

import Style from './board.module.scss';

const columns = Array.from({ length: 5 });

export const BoardPage: FC = () => {
  const params = useParams();

  console.log(params);

  return (
    <section className={Style.board}>
      {columns.map(() => (
        <CardColumn />
      ))}
    </section>
  );
};
