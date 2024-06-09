import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTitle } from 'hooks/useTitle';

import { boardQueries } from 'entities/board';
import { Dialog, DialogContent } from 'ui/dialog';
import { Text, Title } from 'ui/typography';
import { EditableTitle } from 'widgets/editable-title';
import { Editor } from 'widgets/editor';

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
            value={data?.title || ''}
            onChange={onTitleChange}
            as={Title}
            className={Style.title}
          />
          <Text className={Style.description}>Описание</Text>
          {data && <Editor data={data} />}
        </article>
        <section>bruh</section>
      </DialogContent>
    </Dialog>
  );
};
