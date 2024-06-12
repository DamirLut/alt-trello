import type { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { commentQueries } from 'entities/comment/api/comment.queries';
import { Avatar } from 'ui/avatar';
import { Text } from 'ui/typography';

import Style from './comment-list.module.scss';

interface CommentListProps {
  board_id: string;
  card_id: number;
}

function formateDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString();
}

export const CommentList: FC<CommentListProps> = (props) => {
  const client = useQueryClient();
  const { data: comments } = useQuery({
    ...commentQueries(client).getComments(props.card_id, props.board_id),
    refetchInterval: 1_000,
  });

  return (
    <ul className={Style.comments}>
      {comments?.map((comment) => (
        <li key={comment.id} className={Style.comment}>
          <Avatar src={comment.author.avatar} size={28} />
          <div>
            <Text className={Style.author}>{comment.author.username}</Text>
            <pre>
              <Text className={Style.text}>{comment.comment}</Text>
            </pre>
            <Text className={Style.date}>{formateDate(comment.createdAt)}</Text>
          </div>
        </li>
      ))}
    </ul>
  );
};
