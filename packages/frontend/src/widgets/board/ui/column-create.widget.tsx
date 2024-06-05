import type { FC } from 'react';
import type { ApiSchema } from 'api';

import { IconPlus } from 'assets/icons';
import { DashArea } from 'ui/dash-area';

import { useBoard } from '../board.store';

import Style from './column-create.module.scss';

export const ColumnCreate: FC = () => {
  const setColumns = useBoard((select) => select.setColumns);

  const onClick = () => {
    setColumns((columns) => [
      ...columns,
      { id: '', title: '' } as ApiSchema['ColumnEntity'],
    ]);
  };

  return (
    <DashArea className={Style['create-column']} onClick={onClick}>
      <IconPlus />
      Создать
    </DashArea>
  );
};
