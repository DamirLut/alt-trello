import { type FC, useRef, useState } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';

import { Card } from 'ui/card';

import Style from './card-column-editable.module.scss';

interface CardEditableColumnProps {
  onUnfocused?: (value: string) => void;
}

export const CardEditableColumn: FC<CardEditableColumnProps> = ({
  onUnfocused,
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState('');

  useOutsideClick(ref, () => {
    onUnfocused?.(value);
  });

  return (
    <Card className={Style['card-editable']} getRootRef={ref}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Введите новое название для задачи...'
      />
    </Card>
  );
};
