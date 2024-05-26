import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { boardQueries } from 'entities/board';
import { FullPageSpinner } from 'ui/full-page-spinner';
import { Title } from 'ui/typography';

import { Columns } from './ui/columns';

export const BoardPage: FC = () => {
  const params = useParams<{ id: string; slug: string }>();

  const { data: board, isPending } = useQuery({
    ...boardQueries.getById(params.id),
    refetchOnWindowFocus: true,
  });

  if (isPending) {
    return <FullPageSpinner />;
  }

  return (
    <div>
      <Title>{board?.title ?? params.slug}</Title>
      {board && <Columns board={board} />}
    </div>
  );
};
