// your-select.jsx
import React, { type PropsWithChildren } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import Style from './select.module.scss';

export const Select = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren & SelectPrimitive.SelectProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        ref={forwardedRef}
        className={Style.SelectTrigger}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>{/* <ChevronDownIcon /> */}</SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={Style.SelectContent}>
          <SelectPrimitive.ScrollUpButton>
            {/* <ChevronUpIcon /> */}
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className={Style.SelectViewport}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            {/* <ChevronDownIcon /> */}
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren & SelectPrimitive.SelectItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={forwardedRef}
      className={Style.SelectItem}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        {/* <CheckIcon /> */}
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
