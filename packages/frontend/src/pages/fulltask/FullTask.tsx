import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTitle } from 'hooks/useTitle';

import { boardQueries } from 'entities/board';
import { Dialog, DialogContent } from 'ui/dialog';
import { Title } from 'ui/typography';
import { Editor } from 'widgets/editor';

import Style from './fulltask.module.scss';

export const FullTask: FC = () => {
  const { id: board_id, task } = useParams<{ id: string; task: string }>();
  const taskId = Number(task?.split('-')[0]);
  const navigate = useNavigate();
  const client = useQueryClient();
  const { data } = useQuery(boardQueries(client).getCard(taskId, board_id!));

  useTitle(data?.title);

  const onClose = () => {
    navigate('../', { relative: 'path', replace: true });
  };

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className={Style.page}>
        <article>
          <Title>{data?.title}</Title>
          {data && <Editor data={data} />}
        </article>
        <section>bruh</section>
      </DialogContent>
    </Dialog>
  );
};
