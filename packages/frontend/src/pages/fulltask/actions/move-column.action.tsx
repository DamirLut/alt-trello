import type { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'ui/popover/Popover';
import { Separator } from 'ui/separator';
import { Text } from 'ui/typography';

import Style from './move-column.module.scss';

interface MoveColumnActionProps {
  board_id: string;
  card_id: number;
  current_column?: string;
}

export const MoveColumnAction: FC<MoveColumnActionProps> = (props) => {
  const client = useQueryClient();
  const { mutateAsync: moveCard } = useMutation(
    boardQueries(client).moveCard(),
  );

  const board = client.getQueryData<ApiSchema['BoardEntity']>([
    'boards',
    props.board_id,
  ]);

  const columns = board?.columns.map((column) => ({
    id: column.id,
    title: column.title,
  }));

  const onClick = async (column_id: string) => {
    await moveCard({
      board_id: props.board_id,
      target_column: column_id,
      card_id: props.card_id,
      position: 9999,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={Style.trigger}>
          <Button variant='outline'>Переместить</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className={Style.content}>
        <Text>В колонку</Text>
        <Separator />
        {columns?.map((column) => (
          <Button
            key={column.id}
            variant='outline'
            disabled={props.current_column === column.id}
            onClick={() => onClick(column.id)}
          >
            {column.title}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
