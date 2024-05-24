import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApiSchema } from 'api';

import { Card } from 'ui/card';
import { Text } from 'ui/typography';

import Style from './board-card.module.scss';

interface BoardCardProps {
  board: ApiSchema['BoardEntity'];
}

export const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={Style['board-card']}
      onClick={() => navigate(`/b/${board.id}/${board.slug}`)}
    >
      <Text>{board.title}</Text>
    </Card>
  );
};
