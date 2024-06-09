import { type FC, useMemo, useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';
import classNames from 'classnames';

import { IconMoreHorizontal } from 'assets/icons';
import { boardQueries } from 'entities/board';
import { Card as UICard } from 'ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'ui/dropdown-menu';
import { EditableTitle } from 'widgets/editable-title';

import { useBoard } from '../board.store';
import { DragItem } from '../board.widget';

import { Card } from './card.widget';
import { CreateCardColumn } from './card-column-create.widget';
import { CardEditableColumn } from './card-column-editable.widget';

import Style from './column.module.scss';

interface CardColumnProps {
  data: ApiSchema['ColumnEntity'];
  cards: ApiSchema['CardEntity'][];
  isOverlay?: boolean;
}

export const Column: FC<CardColumnProps> = ({ data, cards, isOverlay }) => {
  const client = useQueryClient();
  const { setColumns, board_id } = useBoard((select) => ({
    setColumns: select.setColumns,
    board_id: select.board?.id ?? '<empty>',
  }));
  const cardsIds = useMemo(() => {
    return cards.map((card) => card.card_id);
  }, [cards]);

  const [editableCard, setEditableCard] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: createCard } = useMutation(
    boardQueries(client).createCard(),
  );
  const { mutateAsync: createColumn } = useMutation(
    boardQueries(client).createColumn(),
  );
  const { mutateAsync: updateColumn } = useMutation(
    boardQueries(client).updateColumn(),
  );

  const { mutate: deleteColumn } = useMutation(
    boardQueries(client).deleteColumn(),
  );

  const saveUpdates = async (title: string) => {
    title = title.trim();
    if (title === data.title) return;

    if (title === '') {
      return setColumns((columns) =>
        columns.filter((column) => column.id !== ''),
      );
    }

    setColumns((columns) =>
      columns.map((column) => {
        if (column.id !== data.id) return column;
        return { ...column, title };
      }),
    );

    if (data.id === '') {
      await createColumn({ board_id, title });
    } else {
      await updateColumn({ board_id, column_id: data.id, title });
    }
    await queryClient.refetchQueries({ queryKey: ['boards', board_id] });
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
    value = value.trim();
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
              id: Date.now().toString(36),
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

  if (transform) Object.assign(transform, { scaleY: 1 });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <section
      className={classNames(Style['card-column'], {
        [Style['card-column-overlay']]: isOverlay,
        [Style['card-column-dragging']]: isDragging,
      })}
      style={style}
      ref={setNodeRef}
    >
      <UICard
        className={classNames(Style.card, Style['header-card'])}
        {...attributes}
        {...listeners}
      >
        <EditableTitle value={data.title} onChange={saveUpdates} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconMoreHorizontal
              color='var(--color-text)'
              width={24}
              height={24}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem
              variant='red'
              onClick={() =>
                deleteColumn({ board_id: data.board, column_id: data.id })
              }
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </UICard>

      <ol className={Style.cards}>
        <SortableContext items={cardsIds}>
          {cards.map((card) => (
            <Card key={card.card_id} data={card} />
          ))}
        </SortableContext>
        {!isDragging && !isOverlay && (
          <>
            {editableCard && <CardEditableColumn onUnfocused={onNewTask} />}
            <CreateCardColumn onClick={() => setEditableCard(true)} />
          </>
        )}
      </ol>
    </section>
  );
};
