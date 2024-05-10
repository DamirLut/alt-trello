import type { FC } from 'react';

import { Button } from 'ui/button';
import { Separator } from 'ui/separator';
import { Heading, Title } from 'ui/typography';

export const AuthPage: FC = () => {
  return (
    <section>
      <Title>Alt Trello</Title>
      <Heading>Авторизация</Heading>
      <Separator />
      <div>
        <Button>ВКонтакте</Button>
        <Button>Yandex</Button>
        <Button>Mail.ru</Button>
        <Button>Google.com</Button>
      </div>
    </section>
  );
};
