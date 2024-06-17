import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from 'ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'ui/dropdown-menu';

import { DeleteAction } from './delete-board.action';

export const BoardMenuAction: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Button>Меню</Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Доска</DropdownMenuLabel>
        <DeleteAction board_id={id ?? ''} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
