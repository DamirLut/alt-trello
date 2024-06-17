import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';
import { useTitle } from 'hooks/useTitle';

import { boardQueries } from 'entities/board';
import { Dialog, DialogContent } from 'ui/dialog';
import { Separator } from 'ui/separator';
import { Text, Title } from 'ui/typography';
import { CommentList } from 'widgets/comment-list/CommentList';
import { CommentWriteBox } from 'widgets/comment-writebox';
import { EditableTitle } from 'widgets/editable-title';
import { Editor } from 'widgets/editor';
import { UserStack } from 'widgets/user-stack';

import { DeleteAction } from './actions/delete-card.action';
import { MoveColumnAction } from './actions/move-column.action';
import { SelectLabelAction } from './actions/select-label.action';
import { SelectMemberAction } from './actions/select-member.action';

import Style from './fulltask.module.scss';

export const FullTask: FC = () => {
  const { id: board_id, task } = useParams<{ id: string; task: string }>();
  const taskId = Number(task?.split('-')[0]);
  const navigate = useNavigate();
  const client = useQueryClient();
  const { data } = useQuery(boardQueries(client).getCard(taskId, board_id!));
  const { mutateAsync } = useMutation(boardQueries(client).updateCardTitle());

  const board = client.getQueryData<ApiSchema['BoardEntity']>([
    'boards',
    board_id,
  ]);

  useTitle(data?.title);

  const onTitleChange = async (title: string) => {
    if (!board_id) return;
    if (!title) return;
    await mutateAsync({ title, board_id, card_id: taskId });
  };

  const onClose = () => {
    navigate('../', { relative: 'path', replace: true });
  };

  const labels =
    (data?.labels
      .map((id) => board?.settings.data.labels.find((label) => label.id === id))
      .filter((label) => !!label) as ApiSchema['BoardLabelSetting'][]) ?? [];

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
          <div className={Style.attributes}>
            <div>
              <Text className={Style.description}>Участники</Text>
              <UserStack
                avatars={
                  data?.members.map((member) => member.user.avatar) ?? []
                }
              />
            </div>
            <div>
              <Text className={Style.description}>Метки</Text>
              <div className={Style.labels}>
                {labels.map((label) => (
                  <div
                    key={label.id}
                    className={Style.label}
                    style={{ backgroundColor: label.color }}
                  >
                    {label?.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Text className={Style.description}>Описание</Text>
          {data && <Editor data={data} />}
        </article>
        <section>
          <Text className={Style.description}>Действия</Text>
          <SelectMemberAction board_id={board_id!} card_id={taskId} />
          <SelectLabelAction board_id={board_id!} card_id={taskId} />
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
