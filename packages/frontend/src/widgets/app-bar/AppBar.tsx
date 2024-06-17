import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from 'api';

import { Theme, useTheme } from 'entities/theme';
import { userQueries } from 'entities/user/api';
import { Avatar } from 'ui/avatar';
import { Button } from 'ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'ui/dropdown-menu';
import { Separator } from 'ui/separator';
import { Text } from 'ui/typography';

import Style from './app-bar.module.scss';

export const AppBar: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useQuery(userQueries(queryClient).getSelf());
  const { theme, toggleTheme } = useTheme();

  const onClickLogout = () =>
    client.POST('/api/auth/logout', {}).then(() => {
      window.location.reload();
      localStorage.removeItem('access_token');
    });

  return (
    <header className={Style['app-bar']}>
      <nav>
        <Link to='/'>
          <Text className={Style.logo}>АльТрелло</Text>
        </Link>
        <Separator vertical />
      </nav>
      <nav>
        {!user ? (
          <Button variant='outline' onClick={() => navigate('/auth')}>
            login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar src={user.avatar} size={40} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate('/profile', { relative: 'path' })}
              >
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem variant='red' onClick={onClickLogout}>
                Выйти
              </DropdownMenuItem>
              <Separator color='rgba(0,0,0,.1)' />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  toggleTheme();
                }}
              >
                Оформление: {theme === Theme.LIGHT ? 'светлая' : 'темная'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
};
