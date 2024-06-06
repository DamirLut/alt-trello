import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ApiSchema } from 'api';
import classNames from 'classnames';

import { Card as UICard } from 'ui/card';
import { Text } from 'ui/typography';

import { DragItem } from '../board.widget';

import Style from './card.module.scss';

interface CardColumnProps {
  data: ApiSchema['CardEntity'];
}

export const Card: FC<CardColumnProps> = ({ data }) => {
  const [isMouseOver, setMouseIsOver] = useState(false);
  const navigate = useNavigate();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: data.card_id,
    data: { type: DragItem.Card, data },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <UICard
        getRootRef={(node) => setNodeRef(node as unknown as HTMLElement)}
        style={style}
        className={classNames(Style.card, Style['card-preview'])}
      />
    );
  }

  return (
    <UICard
      getRootRef={(node) => setNodeRef(node as unknown as HTMLElement)}
      style={style}
      {...listeners}
      {...attributes}
      className={classNames(Style.card, {
        [Style['card-over']]: isOver,
        [Style['mouse-over']]: isMouseOver,
      })}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={() =>
        navigate(`./${data.card_id}-${data.slug}`, { relative: 'path' })
      }
    >
      <pre>
        <Text>{data.title}</Text>
      </pre>
    </UICard>
  );
};
