import type { FC } from 'react';

import { IconApp, IconVK } from 'assets/icons';
import { Button } from 'ui/button';
import { Card } from 'ui/card';
import { Separator } from 'ui/separator';
import { Heading } from 'ui/typography';

import Style from './auth.module.scss';

export const AuthPage: FC = () => {
  return (
    <main className={Style.page}>
      <Card Component={'section'} className={Style.container}>
        <div>
          <IconApp width={128} height={128} />
        </div>
        <Separator vertical />
        <div>
          <Heading>Авторизация</Heading>
          <Button Component={'a'} variant='outline' href='/'>
            <IconVK width={24} height={24} />
            ВКонтакте
          </Button>
        </div>
      </Card>
    </main>
  );
};
