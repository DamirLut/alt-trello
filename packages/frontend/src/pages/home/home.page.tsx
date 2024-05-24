import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import { boardQueries } from 'entities/board/api/board.queries';
import { FullPageSpinner } from 'ui/full-page-spinner';
import { Title } from 'ui/typography';
import { BoardCard } from 'widgets/board-card';

import Style from './home.module.scss';

export const HomePage: FC = () => {
  const { data: boards, isPending } = useQuery(boardQueries.getList());

  if (isPending) {
    return <FullPageSpinner />;
  }

  return (
    <div className={Style.page}>
      <Title>Новые</Title>
      <section>
        {boards?.map((board) => <BoardCard key={board.id} board={board} />)}
      </section>
    </div>
  );
};
