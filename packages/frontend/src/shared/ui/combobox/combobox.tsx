import {
  type ChangeEventHandler,
  type HTMLInputTypeAttribute,
  useRef,
  useState,
} from 'react';
import {
  Combobox as BaseCombobox,
  ComboboxItem,
  type ComboboxItemProps,
  ComboboxList,
  ComboboxProvider,
} from '@ariakit/react';
import { Anchor } from '@radix-ui/react-popover';

import { Popover } from 'ui/popover';
import { PopoverContent } from 'ui/popover/Popover';
import { Spinner } from 'ui/spinner';
import { Text } from 'ui/typography';

import Style from './combobox.module.scss';

interface ItemProps {
  value: string;
  title: string;
}

interface ComboboxProps<T> {
  items: T[];
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isLoading?: boolean;
  renderItem?: (props: { item: T } & ComboboxItemProps) => JSX.Element;
}

export const Combobox = <T extends ItemProps>(props: ComboboxProps<T>) => {
  const comboboxRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ComboboxProvider open={open} setOpen={setOpen}>
        <Anchor asChild>
          <BaseCombobox
            ref={comboboxRef}
            className={Style.combobox}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
          />
        </Anchor>
        <PopoverContent
          sideOffset={8}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            const target = event.target as Element | null;
            const isCombobox = target === comboboxRef.current;
            const inListbox = target && listboxRef.current?.contains(target);
            if (isCombobox || inListbox) {
              event.preventDefault();
            }
          }}
          className={Style.popover}
          style={{ display: props.value ? 'block' : 'none' }}
        >
          {props.isLoading ? (
            <Spinner className={Style.loader} />
          ) : (
            <ComboboxList
              ref={listboxRef}
              role='listbox'
              className={Style.listbox}
            >
              {props.items?.length === 0 ? (
                <Text>Нет результатов</Text>
              ) : (
                props.items?.map((item) => {
                  if (props.renderItem) {
                    return props.renderItem({
                      item,
                      focusOnHover: true,
                      className: Style.option,
                    });
                  }
                  return (
                    <ComboboxItem
                      key={item.value}
                      value={item.value}
                      focusOnHover
                      className={Style.option}
                    >
                      {item.title}
                    </ComboboxItem>
                  );
                })
              )}
            </ComboboxList>
          )}
        </PopoverContent>
      </ComboboxProvider>
    </Popover>
  );
};
