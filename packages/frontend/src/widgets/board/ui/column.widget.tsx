import { type ChangeEvent, type FC, useRef, useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';
import classNames from 'classnames';
import useOutsideClick from 'hooks/useOutsideClick';

import { IconMoreHorizontal } from 'assets/icons';
import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Card as UICard } from 'ui/card';
import { Input } from 'ui/input';
import { Text } from 'ui/typography';

import { useBoard } from '../board.store';
import { DragItem } from '../board.widget';

import { Card } from './card.widget';
import { CreateCardColumn } from './card-column-create.widget';
import { CardEditableColumn } from './card-column-editable.widget';

import Style from './column.module.scss';

interface CardColumnProps {
  data: ApiSchema['ColumnEntity'];
  cards: ApiSchema['CardEntity'][];
}

export const Column: FC<CardColumnProps> = ({ data, cards }) => {
  const { setColumns, columns, board_id } = useBoard((select) => ({
    setColumns: select.setColumns,
    columns: select.columns,
    board_id: select.board?.id ?? '<empty>',
  }));
  const ref = useRef(null);
  const [editableCard, setEditableCard] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: createCard } = useMutation(boardQueries.createCard());
  const { mutateAsync: createColumn } = useMutation(
    boardQueries.createColumn(),
  );
  const { mutateAsync: updateColumn } = useMutation(
    boardQueries.updateColumn(),
  );
  //const { mutateAsync: moveCard } = useMutation(boardQueries.moveCard());

  const [editMode, setEditMode] = useState(data.title === '');

  const saveUpdates = async () => {
    setEditMode(false);
    if (data.title === '') {
      return setColumns(columns.filter((column) => column.id !== -1));
    }
    if (data.id === -1) {
      /// create column
      await createColumn({ board_id, title: data.title });
    } else {
      await updateColumn({ board_id, column_id: data.id, title: data.title });
    }
    await queryClient.refetchQueries({ queryKey: ['boards', board_id] });
  };

  useOutsideClick(ref, saveUpdates);

  const updateColumnTitle = (title: string) => {
    setColumns(
      columns.map((column) => {
        if (column.id !== data.id) return column;
        return { ...column, title };
      }),
    );
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: DragItem.Column,
      data,
    },
  });

  const queryKey = ['boards', data.board, 'cards'];

  const onNewTask = async (value: string) => {
    setEditableCard(false);
    if (!value) return;

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

    await createCard({
      board_id: data.board,
      column_id: data.id,
      title: value,
    });

    await queryClient.invalidateQueries({
      queryKey,
    });
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <section className={Style['card-column']} style={style} ref={setNodeRef}>
      <UICard
        className={classNames(Style.card, Style['header-card'])}
        {...attributes}
        {...listeners}
      >
        {editMode ? (
          <Input
            getRootRef={ref}
            value={data.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateColumnTitle(e.target.value)
            }
            onKeyDown={async (e) => {
              if (e.key !== 'Enter') return;
              await saveUpdates();
            }}
          />
        ) : (
          <>
            <Text onClick={() => setEditMode(true)}>{data.title}</Text>
            <Button variant='tertiary'>
              <IconMoreHorizontal width={24} height={24} />
            </Button>
          </>
        )}
      </UICard>

      <div className={Style.cards}>
        <SortableContext items={cards.map((card) => `${data.id}-${card.id}`)}>
          {cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </SortableContext>
        {!isDragging && (
          <>
            {editableCard && <CardEditableColumn onUnfocused={onNewTask} />}
            <CreateCardColumn onClick={() => setEditableCard(true)} />
          </>
        )}
      </div>
    </section>
  );
};
