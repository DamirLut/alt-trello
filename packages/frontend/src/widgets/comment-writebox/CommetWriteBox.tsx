import { type FC, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { commentQueries } from 'entities/comment/api/comment.queries';
import { userQueries } from 'entities/user';
import { Avatar } from 'ui/avatar';
import { Button } from 'ui/button';
import { Textarea } from 'ui/textarea';

import Style from './comment-writebox.module.scss';

interface CommentWriteBoxProps {
  board_id: string;
  card_id: number;
}

export const CommentWriteBox: FC<CommentWriteBoxProps> = (props) => {
  const client = useQueryClient();
  const { data: user } = useQuery(userQueries.getSelf());
  const { mutateAsync } = useMutation(commentQueries(client).createComment());
  const ref = useRef<HTMLTextAreaElement>(null);

  const sendComment = async () => {
    const target = ref.current;
    if (!target) return;
    const value = target.value.trim();
    if (!value) return;
    target.value = '';
    await mutateAsync({
      comment: value,
      board_id: props.board_id,
      card_id: props.card_id,
    });
  };

  const handleInput: React.KeyboardEventHandler<HTMLTextAreaElement> = async (
    event,
  ) => {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      await sendComment();
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.comment}>
        <div className={Style['avatar-wrapper']}>
          <Avatar src={user?.avatar} size={28} />
        </div>
        <Textarea
          getRootRef={ref}
          placeholder='Написать комментарий'
          onKeyDown={handleInput}
        />
      </div>
      <div className={Style.actions}>
        <Button color='blue' onClick={sendComment}>
          Отправить
        </Button>
      </div>
    </div>
  );
};
