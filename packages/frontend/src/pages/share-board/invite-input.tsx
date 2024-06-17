import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComboboxItem } from '@ariakit/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';
import classNames from 'classnames';
import { useDebounce } from 'hooks/useDebounce';

import { boardQueries } from 'entities/board';
import { userQueries } from 'entities/user';
import { Avatar } from 'ui/avatar';
import { Button } from 'ui/button';
import { Combobox } from 'ui/combobox';
import { Select, SelectItem } from 'ui/select';
import { Text } from 'ui/typography';

import Style from './share-board.module.scss';

type Permission = ApiSchema['BoardMemberEntity']['permission'][number];

export const Permissions: Record<Permission, { title: string }> = {
  owner: {
    title: 'Создатель',
  },
  member: {
    title: 'Участник',
  },
  commenter: {
    title: 'Комментатор',
  },
  reader: {
    title: 'Читатель',
  },
};

export const InviteInput: FC = () => {
  const { id: boardId } = useParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 300);
  const client = useQueryClient();
  const { data: user } = useQuery(userQueries(client).getSelf());
  const { data: users = [], isPending } = useQuery(
    userQueries(client).searchUser(debounceSearch),
  );
  const [selectedUser, setSelectedUser] = useState(-1);
  const [permission, setPermission] = useState('member');
  const { mutateAsync: inviteMember } = useMutation(
    boardQueries(client).inviteMember(),
  );

  const sendInvite = async () => {
    if (!boardId) return;
    await inviteMember({
      board_id: boardId,
      user_id: selectedUser,
      permission,
    });
    setSearch('');
    setSelectedUser(-1);
    setPermission('member');
  };

  const items = users
    .map((user) => ({
      title: user.username,
      value: user.email,
      avatar: user.avatar,
      id: user.id,
    }))
    .filter((item) => item.id !== user?.id)
    .filter((item) => !!item.value);

  return (
    <div className={Style.search}>
      <Combobox
        placeholder='Имя пользователя'
        type='email'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        isLoading={isPending}
        items={items}
        renderItem={({ item, className, ...props }) => (
          <ComboboxItem
            key={item.value}
            value={item.value}
            onClick={() => {
              setSearch(item.value);
              setSelectedUser(item.id);
            }}
            className={classNames(className, Style['user-item'])}
            {...props}
          >
            <Avatar size={28} src={item.avatar} />
            <div className={Style['user-item-text']}>
              <Text Component={'h4'}>{item.title}</Text>
              <Text>{item.value || 'скрыта'}</Text>
            </div>
          </ComboboxItem>
        )}
      />
      <Select
        value={permission}
        onValueChange={(value) => setPermission(value)}
      >
        {Object.entries(Permissions).map(([key, value]) => {
          if (key === 'owner') return;
          return (
            <SelectItem key={key} value={key}>
              {value.title}
            </SelectItem>
          );
        })}
      </Select>
      <Button color='blue' disabled={selectedUser === -1} onClick={sendInvite}>
        Пригласить
      </Button>
    </div>
  );
};
