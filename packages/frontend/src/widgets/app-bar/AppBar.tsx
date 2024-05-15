import type { FC } from 'react';

import { Avatar } from 'ui/avatar';
import { Separator } from 'ui/separator';
import { Text } from 'ui/typography';

import Style from './app-bar.module.scss';

export const AppBar: FC = () => {
  return (
    <header className={Style['app-bar']}>
      <nav>
        <Text Component={'a'} href='/' className={Style.logo}>
          Alt Trello
        </Text>
        <Separator vertical />
      </nav>
      <nav>
        <Avatar src='https://github.com/damirlut.png' size={40} />
      </nav>
    </header>
  );
};
