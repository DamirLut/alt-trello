import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'ui/dialog';
import { Text } from 'ui/typography';

import Style from './delete-card.module.scss';

interface DeleteActionProps {
  board_id: string;
  card_id: number;
}

export const DeleteAction: FC<DeleteActionProps> = (props) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(boardQueries(queryClient).deleteCard());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onClickDelete = async () => {
    setOpen(false);
    navigate('../', { relative: 'path' });
    await mutateAsync([props.card_id, props.board_id]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' onClick={() => setOpen(true)}>
          Удалить
        </Button>
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
