import type { CSSProperties, FC } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTitle } from 'hooks/useTitle';

import { boardQueries } from 'entities/board';
import { FullPageSpinner } from 'ui/full-page-spinner';
import { Title } from 'ui/typography';
import { Board } from 'widgets/board';
import { UserStack } from 'widgets/user-stack';

import { ApiError } from '../../types/api';

import { BoardMenuAction } from './actions/board-menu.action';

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

  useTitle(board?.title);

  if (isPending) {
    return <FullPageSpinner />;
  }

  return (
    <div
      className={Style.page}
      style={
        {
          '--background': `var(--gradient-${board?.settings?.data?.theme?.color})`,
        } as CSSProperties
      }
    >
      <div className={Style.head}>
        <Title>{board?.title ?? params.slug}</Title>
        <UserStack
          size={48}
          style={
            {
              '--border-width': '4px',
              '--color-overlay': 'var(--color-background)',
            } as CSSProperties
          }
          avatars={
            board?.members?.map((member) => ({
              url: member.user.avatar,
              title: member.user.username,
            })) ?? []
          }
          addButton
          onClick={(item) => {
            if (item !== null) return;
            navigate('./share');
          }}
        />
        <BoardMenuAction />
      </div>
      <div className={Style.board}>{board && <Board data={board} />}</div>
      <Outlet />
    </div>
  );
};
