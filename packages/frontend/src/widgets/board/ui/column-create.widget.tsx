import type { FC } from 'react';
import type { ApiSchema } from 'api';

import { IconPlus } from 'assets/icons';
import { DashArea } from 'ui/dash-area';

import { useBoard } from '../board.store';

import Style from './column-create.module.scss';

export const ColumnCreate: FC = () => {
  const { setColumns, columns } = useBoard((select) => ({
    setColumns: select.setColumns,
    columns: select.columns,
  }));

  const onClick = () => {
    setColumns([
      ...columns,
      { id: -1, title: '' } as ApiSchema['ColumnEntity'],
    ]);
  };

  return (
    <DashArea className={Style['create-column']} onClick={onClick}>
      <IconPlus />
      Создать
    </DashArea>
  );
};
