import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { IconStar, IconStarOutline } from 'assets/icons';
import { boardQueries } from 'entities/board';
import { Card } from 'ui/card';
import { Heading } from 'ui/typography';
import { UserStack } from 'widgets/user-stack';

import Style from './board-card.module.scss';

interface BoardCardProps {
  board: ApiSchema['BoardEntity'];
  isFavorite?: boolean;
}

export const BoardCard: FC<BoardCardProps> = ({ board, isFavorite }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const client = useQueryClient();
  const { mutateAsync: toggleFavorite } = useMutation(
    boardQueries(client).toggleFavorite(),
  );

  const FavoriteIcon = isFavorite ? IconStar : IconStarOutline;

  return (
    <Card
      className={Style['board-card']}
      style={{
        backgroundImage: `var(--gradient-${board.settings?.data?.theme?.color})`,
      }}
      onClick={() => navigate(`/b/${board.id}/${board.slug}`)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={Style['board-card-content']}>
        <div className={Style.title}>
          <Heading level='3'>{board.title}</Heading>
          {isHover && (
            <FavoriteIcon
              onClick={async (e) => {
                e.stopPropagation();
                await toggleFavorite(board.id);
              }}
            />
          )}
        </div>
        <div className={Style.footer}>
          <UserStack
            avatars={board.members.map((member) => member.user.avatar)}
            size={28}
          />
        </div>
      </div>
    </Card>
  );
};
