import type { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { IconCheck } from 'assets/icons';
import { boardQueries } from 'entities/board';
import { Avatar } from 'ui/avatar';
import { Button } from 'ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'ui/popover/Popover';
import { Separator } from 'ui/separator';
import { Text } from 'ui/typography';

import Style from './select-member.module.scss';

interface SelectMemberActionProps {
  board_id: string;
  card_id: number;
}

export const SelectMemberAction: FC<SelectMemberActionProps> = (props) => {
  const client = useQueryClient();
  const { mutateAsync: setMember } = useMutation(
    boardQueries(client).setCardMember(),
  );

  const board = client.getQueryData<ApiSchema['BoardEntity']>([
    'boards',
    props.board_id,
  ]);
  const card = client.getQueryData<ApiSchema['CardEntity']>([
    'boards',
    props.board_id,
    'cards',
    props.card_id,
  ]);

  const boardMembers = board?.members.map((member) => ({
    id: member.user.id,
    title: member.user.username,
    avatar: member.user.avatar,
  }));
  const cardMembers = card?.members.map((member) => ({
    id: member.user.id,
    title: member.user.username,
    avatar: member.user.avatar,
  }));

  const onClick = async (user_id: number) => {
    await setMember({
      board_id: props.board_id,
      card_id: props.card_id,
      user_id,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={Style.trigger}>
          <Button variant='outline'>Участники</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className={Style.content}>
        <Text>Участники</Text>
        <Separator />
        {boardMembers?.map((member) => (
          <Button
            key={member.id}
            variant='tertiary'
            onClick={() => onClick(member.id)}
          >
            <Avatar src={member.avatar} size={20} />
            <Text>{member.title}</Text>

            <IconCheck
              color='var(--color-green)'
              height={20}
              opacity={
                cardMembers?.some((user) => user.id === member.id) ? 1 : 0
              }
            />
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
