import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { boardQueries } from 'entities/board';
import { FullPageSpinner } from 'ui/full-page-spinner';
import { CardColumn } from 'widgets/card-column';

import Style from './columns.module.scss';

interface ColumnsProps {
  board: ApiSchema['BoardEntity'];
}

export const Columns: FC<ColumnsProps> = ({ board }) => {
  const { data: columns, isPending } = useQuery({
    ...boardQueries.getCards(board.id),
    refetchOnWindowFocus: true,
  });

  if (isPending) {
    return <FullPageSpinner />;
  }
  if (!columns) return null;

  return (
    <section className={Style.columns}>
      {columns.map((column) => (
        <CardColumn key={column.id} data={column} />
      ))}
    </section>
  );
};
