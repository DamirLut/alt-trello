import { type FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { boardQueries } from 'entities/board';
import { FullPageSpinner } from 'ui/full-page-spinner';

import { Card } from './ui/card.widget';
import { Column } from './ui/column.widget';
import { ColumnCreate } from './ui/column-create.widget';
import { useBoard } from './board.store';

import Style from './board.module.scss';

interface BoardProps {
  data: ApiSchema['BoardEntity'];
}

export const enum DragItem {
  Column = 'column',
  Card = 'card',
}

export const Board: FC<BoardProps> = ({ data }) => {
  const board = useBoard();
  const client = useQueryClient();
  const query = useQuery(boardQueries(client).getCards(data.id));
  const { mutateAsync: moveColumn } = useMutation(
    boardQueries(client).moveColumn(),
  );
  const { mutateAsync: moveCard } = useMutation(
    boardQueries(client).moveCard(),
  );

  useEffect(() => {
    if (!query.data) return;
    const tasks = [...query.data];

    board.setTasks(() => tasks);
  }, [query.data]);

  useEffect(() => {
    useBoard.setState({ board: data });
    const columns = [...data.columns];
    board.setColumns(() => columns);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  if (query.isPending) {
    return <FullPageSpinner />;
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === DragItem.Column) {
      board.setActiveColumn(event.active.data.current.data);
      return;
    }

    if (event.active.data.current?.type === DragItem.Card) {
      board.setActiveTask(event.active.data.current.data);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    board.setActiveColumn(null);
    board.setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (active.data.current?.type === DragItem.Card) {
      const { data: card, sortable } = active.data.current;
      const newPosition = sortable.index;
      const target_column = card.column;

      moveCard({
        board_id: data.id,
        target_column,
        card_id: card.id,
        position: newPosition,
      }).catch(console.error);
    }

    if (activeId === overId) return;
    if (active.data.current?.type !== DragItem.Column) return;

    board.setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      moveColumn({
        board_id: data.id,
        column: `${activeId}`,
        position: overColumnIndex,
      })
        .then(() => {
          console.log('moved from', activeColumnIndex, 'to', overColumnIndex);
        })
        .catch(console.error);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === DragItem.Card;
    const isOverATask = over.data.current?.type === DragItem.Card;

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      board.setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].column != tasks[overIndex].column) {
          tasks[activeIndex].column = tasks[overIndex].column;

          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === DragItem.Column;

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      board.setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].column = `${overId}`;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={closestCenter}
    >
      <div className={Style.columns}>
        <SortableContext items={board.columns.map((column) => column.id)}>
          {board.columns.map((column) => (
            <Column
              key={column.id}
              data={column}
              cards={board.tasks.filter((task) => task.column === column.id)}
            />
          ))}
          <ColumnCreate />
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {board.activeColumn && (
            <Column
              isOverlay
              data={board.activeColumn}
              cards={board.tasks.filter(
                (task) => task.column === board.activeColumn!.id,
              )}
            />
          )}
          {board.activeTask && <Card data={board.activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
