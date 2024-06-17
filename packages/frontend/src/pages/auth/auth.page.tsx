import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { IconApp, IconGoogle, IconVK } from 'assets/icons';
import { authQueries } from 'entities/auth/api';
import { userQueries } from 'entities/user';
import { Button } from 'ui/button';
import { Card } from 'ui/card';
import { Separator } from 'ui/separator';
import { Heading } from 'ui/typography';

import Style from './auth.module.scss';

const MethodsButtons = {
  vk: {
    icon: <IconVK width={24} height={24} />,
    title: 'ВКонтакте',
    onClick: (args: Record<string, string>) => {
      const query = {
        app_id: args.app_id,
        uuid: (Date.now() * Math.random()).toString(36),
        redirect_uri: args.redirect_url,
      };

      const link = `https://id.vk.com/auth?${new URLSearchParams(query).toString()}`;
      console.log(link);
      location.assign(link);
    },
  },

  google: {
    icon: <IconGoogle width={24} height={24} />,
    title: 'Google',
    onClick: (args: Record<string, string>) => {
      location.assign(args.redirect_url);
    },
  },
};

export const AuthPage: FC = () => {
  const { data: methods } = useQuery(authQueries.getOAuthMethods());
  const client = useQueryClient();
  const userQuery = useQuery(userQueries(client).getSelf());
  const navigate = useNavigate();

  useEffect(() => {
    if (userQuery.data) {
      navigate('/');
    }
  }, [userQuery.error]);

  return (
    <main className={Style.page}>
      <Card Component={'section'} className={Style.container}>
        <div>
          <IconApp width={128} height={128} />
        </div>
        <Separator vertical />
        <div>
          <Heading>Авторизация</Heading>
          {methods?.items?.map((item) => (
            <Button
              key={item.type}
              variant='outline'
              onClick={() => MethodsButtons[item.type]?.onClick(item)}
            >
              {MethodsButtons[item.type]?.icon}
              {MethodsButtons[item.type]?.title || item.type}
            </Button>
          ))}
        </div>
      </Card>
    </main>
  );
};
