import { type FC, useEffect, useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import type { ApiSchema } from 'api';

import { boardQueries } from 'entities/board';
import { FullPageSpinner } from 'ui/full-page-spinner';

import { Card } from './ui/card.widget';
import { Column } from './ui/column.widget';

import Style from './board.module.scss';

interface BoardProps {
  data: ApiSchema['BoardEntity'];
}

export const enum DragItem {
  Column = 'column',
  Card = 'card',
}

export const Board: FC<BoardProps> = ({ data }) => {
  const [tasks, setTasks] = useState<ApiSchema['CardEntity'][]>([]);
  const [columns, setColumns] = useState(data.columns || []);

  const query = useQuery(boardQueries.getCards(data.id));

  useEffect(() => {
    if (!query.data) return;

    setTasks([...query.data]);
  }, [query.data]);

  const [activeColumn, setActiveColumn] = useState<
    ApiSchema['ColumnEntity'] | null
  >(null);

  const [activeTask, setActiveTask] = useState<ApiSchema['CardEntity'] | null>(
    null,
  );

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
      setActiveColumn(event.active.data.current.data);
      return;
    }

    if (event.active.data.current?.type === DragItem.Card) {
      setActiveTask(event.active.data.current.data);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === DragItem.Column;
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
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
      setTasks((tasks) => {
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
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].column = overId as number;
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
        <SortableContext items={columns.map((column) => column.id)}>
          {columns.map((column) => (
            <Column
              key={column.id}
              data={column}
              cards={tasks.filter((task) => task.column === column.id)}
            />
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Column
              data={activeColumn}
              cards={tasks.filter((task) => task.column === activeColumn.id)}
            />
          )}
          {activeTask && <Card data={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
