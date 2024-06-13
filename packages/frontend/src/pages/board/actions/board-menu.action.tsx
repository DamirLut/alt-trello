import type { FC } from 'react';

import { Button } from 'ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'ui/dropdown-menu';

export const BoardMenuAction: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <Button>Меню</Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Доска</DropdownMenuLabel>
        <DropdownMenuItem variant='red'>Удалить</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
