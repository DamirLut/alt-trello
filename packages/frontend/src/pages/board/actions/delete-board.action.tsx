import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'ui/dialog';
import { DropdownMenuItem } from 'ui/dropdown-menu';
import { Text } from 'ui/typography';

import Style from './delete-board.module.scss';

interface DeleteActionProps {
  board_id: string;
}

export const DeleteAction: FC<DeleteActionProps> = (props) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(boardQueries(queryClient).deleteBoard());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onClickDelete = async () => {
    setOpen(false);
    navigate('/', { replace: true });
    await mutateAsync(props.board_id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={Style.trigger}>
          <DropdownMenuItem
            variant='red'
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            Удалить
          </DropdownMenuItem>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className={Style.alert}>
          <Text Component={'h3'}>Вы уверены что хотите удалить?</Text>
          <Text>Это действие нельзя будет отменить</Text>
          <div>
            <Button color='red' onClick={onClickDelete}>
              Удалить
            </Button>
            <Button color='gray' onClick={() => setOpen(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
