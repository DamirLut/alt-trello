import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';

import { Input } from 'ui/input';
import { Text } from 'ui/typography';

interface EditableTitleProps {
  onChange?: (value: string) => void;
  value: string;
  as?: FC;
  className?: string;
  readonly?: boolean;
}

export const EditableTitle: FC<EditableTitleProps> = (props) => {
  const [value, setValue] = useState(props.value);
  const [isEdit, setIsEdit] = useState(() => {
    if (props.readonly) return false;
    return props.value === '';
  });
  const ref = useRef(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleUpdate = () => {
    setIsEdit(false);
    props.onChange?.(value);
    if (!value) {
      setValue(props.value);
    }
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

  const onClick = () => {
    if (props.readonly) return;
    setIsEdit(true);
  };

  return (
    <Component onClick={onClick} className={props.className}>
      {value}
    </Component>
  );
};
