import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTitle } from 'hooks/useTitle';

import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Dialog, DialogContent } from 'ui/dialog';
import { Separator } from 'ui/separator';
import { Text, Title } from 'ui/typography';
import { CommentList } from 'widgets/comment-list/CommentList';
import { CommentWriteBox } from 'widgets/comment-writebox';
import { EditableTitle } from 'widgets/editable-title';
import { Editor } from 'widgets/editor';

import { DeleteAction } from './actions/delete-card.action';
import { MoveColumnAction } from './actions/move-column.action';

import Style from './fulltask.module.scss';

export const FullTask: FC = () => {
  const { id: board_id, task } = useParams<{ id: string; task: string }>();
  const taskId = Number(task?.split('-')[0]);
  const navigate = useNavigate();
  const client = useQueryClient();
  const { data } = useQuery(boardQueries(client).getCard(taskId, board_id!));
  const { mutateAsync } = useMutation(boardQueries(client).updateCardTitle());

  useTitle(data?.title);

  const onTitleChange = async (title: string) => {
    if (!board_id) return;
    await mutateAsync({ title, board_id, card_id: taskId });
  };

  const onClose = () => {
    navigate('../', { relative: 'path', replace: true });
  };

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className={Style.page}>
        <article>
          <EditableTitle
            value={data?.title ?? ''}
            onChange={onTitleChange}
            as={Title}
            className={Style.title}
          />
          <Text className={Style.description}>Описание</Text>
          {data && <Editor data={data} />}
        </article>
        <section>
          <Text className={Style.description}>Действия</Text>
          <Button variant='outline'>Участники</Button>
          <MoveColumnAction
            board_id={board_id!}
            card_id={taskId}
            current_column={data?.column}
          />
          <DeleteAction board_id={board_id!} card_id={taskId} />
          <Separator />
          <Text className={Style.description}>Комментарии</Text>
          <CommentWriteBox board_id={board_id!} card_id={taskId} />
          <CommentList board_id={board_id!} card_id={taskId} />
        </section>
      </DialogContent>
    </Dialog>
  );
};
