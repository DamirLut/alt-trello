import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { client } from 'api';

import { userQueries } from 'entities/user/api';
import { Avatar } from 'ui/avatar';
import { Button } from 'ui/button';
import { Separator } from 'ui/separator';
import { Text } from 'ui/typography';

import Style from './app-bar.module.scss';

export const AppBar: FC = () => {
  const navigate = useNavigate();
  const { data: user } = useQuery(userQueries.getSelf());

  const onClickLogout = () =>
    client.GET('/api/auth/logout', {}).then(() => window.location.reload());

  return (
    <header className={Style['app-bar']}>
      <nav>
        <Text Component={'a'} href='/' className={Style.logo}>
          Alt Trello
        </Text>
        <Separator vertical />
      </nav>
      <nav>
        {!user ? (
          <Button variant='outline' onClick={() => navigate('/auth')}>
            login
          </Button>
        ) : (
          <Avatar src={user.avatar} size={40} onClick={onClickLogout} />
        )}
      </nav>
    </header>
  );
};
