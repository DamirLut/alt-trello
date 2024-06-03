import type { FC } from 'react';

import { IconPlus } from 'assets/icons';
import { DashArea } from 'ui/dash-area';
import { Text } from 'ui/typography';

import Style from './card-column-create.module.scss';

interface CreateCardColumnProps {
  onClick?: () => void;
}

export const CreateCardColumn: FC<CreateCardColumnProps> = ({ onClick }) => {
  return (
    <DashArea className={Style['card-column-create']} onClick={onClick}>
      <div>
        <IconPlus />
        <Text>Создать</Text>
      </div>
    </DashArea>
  );
};
