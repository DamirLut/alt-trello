import { type FC, Fragment } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { boardQueries } from 'entities/board/api/board.queries';
import { FullPageSpinner } from 'ui/full-page-spinner';
import { Title } from 'ui/typography';
import { BoardCard, NewBoardCard } from 'widgets/board-card';

import Style from './home.module.scss';

export const HomePage: FC = () => {
  const client = useQueryClient();
  const { data: groups, isPending } = useQuery(boardQueries(client).getList());

  if (isPending) {
    return <FullPageSpinner />;
  }

  const favorites =
    groups
      ?.find((group) => group.title === 'Избранные')
      ?.boards.map((board) => board.id) ?? [];

  return (
    <div className={Style.page}>
      {groups?.map((group) => {
        const { title, system, boards } = group;
        if (boards.length === 0) return null;

        return (
          <Fragment key={title}>
            <Title>{title}</Title>
            <section>
              {boards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  isFavorite={favorites.includes(board.id)}
                />
              ))}
              {system && <NewBoardCard />}
            </section>
          </Fragment>
        );
      })}
    </div>
  );
};
