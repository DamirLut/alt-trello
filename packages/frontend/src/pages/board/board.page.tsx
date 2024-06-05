import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { boardQueries } from 'entities/board';
import { FullPageSpinner } from 'ui/full-page-spinner';
import { Title } from 'ui/typography';
import { Board } from 'widgets/board';

import { ApiError } from '../../types/api';

import Style from './board.module.scss';

export const BoardPage: FC = () => {
  const params = useParams<{ id: string; slug: string }>();
  const navigate = useNavigate();
  const client = useQueryClient();

  const { data: board, isPending } = useQuery({
    ...boardQueries(client).getById(params.id),
    refetchOnWindowFocus: true,
    retry: false,
    throwOnError(error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 404) {
          navigate('/');
        }
      }
      return false;
    },
  });

  if (isPending) {
    return <FullPageSpinner />;
  }

  return (
    <div className={Style.page}>
      <Title>{board?.title ?? params.slug}</Title>
      {board && <Board data={board} />}
    </div>
  );
};
