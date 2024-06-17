import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { boardQueries } from 'entities/board';
import { userQueries } from 'entities/user';
import { Avatar } from 'ui/avatar';
import { Dialog, DialogContent } from 'ui/dialog';
import { Select, SelectItem } from 'ui/select';
import { Separator } from 'ui/separator';
import { Spinner } from 'ui/spinner';
import { Heading, Text, Title } from 'ui/typography';

import { InviteInput, Permissions } from './invite-input';

import Style from './share-board.module.scss';

export const ShareBoardPage: FC = () => {
  const { id: boardId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { data: board, isPending } = useQuery(
    boardQueries(client).getById(boardId),
  );
  const { data: user } = useQuery(userQueries(client).getSelf());

  const { mutateAsync: inviteMember } = useMutation(
    boardQueries(client).inviteMember(),
  );
  const { mutateAsync: excludeMember } = useMutation(
    boardQueries(client).excludeMember(),
  );

  const onClose = () => {
    navigate('../', { relative: 'path', replace: true });
  };

  const onChangePermission = async (permission: string, user_id: number) => {
    if (!boardId) return;
    if (permission === '-') {
      await excludeMember({
        board_id: boardId,
        user_id,
      });
      return;
    }
    await inviteMember({
      board_id: boardId,
      user_id,
      permission,
    });
  };

  const myPermission = board?.members
    .find((member) => member.user.id === user?.id)
    ?.permission?.at(0);

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent>
        <div className={Style.page}>
          <Title>Поделиться</Title>
          <InviteInput />
          <Heading>Участники</Heading>
          <ul className={Style.members}>
            {isPending ? (
              <Spinner />
            ) : (
              board?.members.map((member) => (
                <li key={member.id}>
                  <div className={Style['members-user']}>
                    <Avatar src={member.user.avatar} size={32} />
                    <div className={Style['members-user-info']}>
                      <Text Component={'h4'}>
                        {member.user.username +
                          (member.user.id === user?.id ? ' (Вы)' : '')}
                      </Text>
                      <Text>{member.user.email}</Text>
                    </div>
                  </div>
                  <div>
                    <Select
                      value={member.permission[0]}
                      disabled={
                        member.user.id === user?.id || myPermission !== 'owner'
                      }
                      onValueChange={(value) =>
                        onChangePermission(value, member.user.id)
                      }
                    >
                      {Object.entries(Permissions).map(([key, value]) => {
                        return (
                          <SelectItem
                            key={key}
                            value={key}
                            disabled={key === 'owner'}
                          >
                            {value.title}
                          </SelectItem>
                        );
                      })}
                      <Separator />
                      <SelectItem value='-'>Исключить</SelectItem>
                    </Select>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
