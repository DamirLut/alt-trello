import { type FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';
import classNames from 'classnames';

import { IconMoreHorizontal } from 'assets/icons';
import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Card } from 'ui/card';
import { Text } from 'ui/typography';

import { CreateCardColumn } from './card-column-create.widget';
import { CardEditableColumn } from './card-column-editable.widget';

import Style from './card-column.module.scss';

interface CardColumnProps {
  data: ApiSchema['ColumnEntity'];
}

export const CardColumn: FC<CardColumnProps> = ({ data }) => {
  const [editableCard, setEditableCard] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(boardQueries.createCard());

  const onNewTask = async (value: string) => {
    setEditableCard(false);
    if (!value) return;

    const queryKey = ['boards', data.board, 'cards'];

    queryClient.setQueryData(queryKey, (old: ApiSchema['ColumnEntity'][]) =>
      old?.map((column) => {
        if (column.id !== data.id) return column;

        const lastCard = column.cards.at(-1);

        return {
          ...column,
          cards: [
            ...column.cards,
            {
              id: (lastCard?.id ?? 0) + 1,
              title: value,
              slug: value,
              position: (lastCard?.position ?? 0) + 1,
            },
          ],
        };
      }),
    );

    await mutateAsync({
      board_id: data.board,
      column_id: data.id,
      title: value,
    });

    await queryClient.invalidateQueries({
      queryKey,
    });
  };

  return (
    <section className={Style['card-column']}>
      <Card className={classNames(Style.card, Style['header-card'])}>
        <Text>{data.title}</Text>
        <Button variant='tertiary'>
          <IconMoreHorizontal width={24} height={24} />
        </Button>
      </Card>

      <div className={Style.cards}>
        {data.cards.map((card) => (
          <Card key={card.id} className={Style.card}>
            <pre>
              <Text>{card.title}</Text>
            </pre>
          </Card>
        ))}
        {editableCard && <CardEditableColumn onUnfocused={onNewTask} />}
        <CreateCardColumn onClick={() => setEditableCard(true)} />
      </div>
    </section>
  );
};
