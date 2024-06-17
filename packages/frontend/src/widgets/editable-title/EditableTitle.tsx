import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';

import { Input } from 'ui/input';
import { Text } from 'ui/typography';

interface EditableTitleProps {
  onChange?: (value: string) => void;
  value: string;
  as?: FC;
  className?: string;
}

export const EditableTitle: FC<EditableTitleProps> = (props) => {
  const [value, setValue] = useState(props.value);
  const [isEdit, setIsEdit] = useState(props.value === '');
  const ref = useRef(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleUpdate = () => {
    setIsEdit(false);
    props.onChange?.(value);
  };

  useOutsideClick(ref, handleUpdate);

  if (isEdit) {
    return (
      <Input
        getRootRef={ref}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onKeyDown={async (e) => {
          if (e.key !== 'Enter') return;
          handleUpdate();
        }}
        className={props.className}
      />
    );
  }

  const Component = props?.as ?? Text;

  return (
    <Component onClick={() => setIsEdit(true)} className={props.className}>
      {value}
    </Component>
  );
};
