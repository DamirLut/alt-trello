import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApiSchema } from 'api';

import { Card } from 'ui/card';
import { Heading } from 'ui/typography';

import Style from './board-card.module.scss';

interface BoardCardProps {
  board: ApiSchema['BoardEntity'];
}

export const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={Style['board-card']}
      style={{
        backgroundImage: `var(--gradient-${board.settings.data.theme.color})`,
      }}
      onClick={() => navigate(`/b/${board.id}/${board.slug}`)}
    >
      <div className={Style['board-card-content']}>
        <Heading level='3'>{board.title}</Heading>
      </div>
    </Card>
  );
};
