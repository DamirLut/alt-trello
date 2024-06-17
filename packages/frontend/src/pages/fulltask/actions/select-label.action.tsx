import { type CSSProperties, type FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { IconCheck, IconEdit } from 'assets/icons';
import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'ui/popover/Popover';
import { Separator } from 'ui/separator';
import { Text } from 'ui/typography';
import { EditableTitle } from 'widgets/editable-title';

import Style from './select-label.module.scss';

interface SelectLabelActionProps {
  board_id: string;
  card_id: number;
}

export const SelectLabelAction: FC<SelectLabelActionProps> = (props) => {
  const client = useQueryClient();
  const { mutateAsync: setLabel } = useMutation(
    boardQueries(client).setCardLabel(),
  );
  const { mutateAsync: updateLabel } = useMutation(
    boardQueries(client).updateLabel(),
  );
  const [isEdit, setIsEdit] = useState(false);

  const board = client.getQueryData<ApiSchema['BoardEntity']>([
    'boards',
    props.board_id,
  ]);

  const card = client.getQueryData<ApiSchema['CardEntity']>([
    'boards',
    props.board_id,
    'cards',
    props.card_id,
  ]);

  const labels = board?.settings.data.labels.map((label) => ({
    color: label.color,
    label: label.label,
    id: label.id,
  }));

  const onClick = async (label_id: number) => {
    if (isEdit) return;
    await setLabel({
      board_id: props.board_id,
      card_id: props.card_id,
      label_id,
    });
  };
  const onChange = async (label_id: number, text: string) => {
    await updateLabel({
      board_id: props.board_id,
      label: text,
      label_id,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={Style.trigger}>
          <Button variant='outline'>Метки</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className={Style.content}>
        <div className={Style.header}>
          <Text>Метки {isEdit && '(ред.)'}</Text>
          <IconEdit onClick={() => setIsEdit(!isEdit)} />
        </div>
        <Separator />
        {labels?.map((label) => (
          <Button
            key={label.id}
            style={{ '--color': label.color } as CSSProperties}
            variant='primary'
            onClick={() => onClick(label.id)}
          >
            <EditableTitle
              value={label.label}
              readonly={!isEdit}
              className={Style.title}
              onChange={(value) => onChange(label.id, value)}
            />
            {!isEdit && (
              <IconCheck
                color='var(--color-white)'
                height={20}
                opacity={card?.labels?.includes(label.id) ? 1 : 0}
              />
            )}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
