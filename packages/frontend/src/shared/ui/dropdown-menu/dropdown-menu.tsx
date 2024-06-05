// your-dropdown-menu.jsx
import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

import classNames from 'classnames';

import type { ColorsVariant } from 'ui/types';

import Style from './dropdown-menu.module.scss';

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={classNames(className, Style.DropdownMenuContent)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <DropdownMenuPrimitive.Arrow className={Style.DropdownMenuArrow} />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ className, ...props }, forwardRef) => (
  <DropdownMenuPrimitive.Label
    className={classNames(className, Style.DropdownMenuLabel)}
    {...props}
    ref={forwardRef}
  />
));

export const DropdownMenuItem = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<
    HTMLAttributes<HTMLSelectElement> & { variant?: ColorsVariant }
  >
>(({ className, style, variant = 'green-lighten', ...props }, forwardRef) => (
  <DropdownMenuPrimitive.Item
    className={classNames(className, Style.DropdownMenuItem)}
    style={
      {
        '--highlight-color': `var(--color-${variant})`,
        ...style,
      } as CSSProperties
    }
    {...props}
    ///@ts-expect-error cant type now
    ref={forwardRef}
  />
));

export const DropdownMenuGroup = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ className, ...props }, forwardRef) => (
  <DropdownMenuPrimitive.Group
    className={classNames(className, Style.DropdownMenuGroup)}
    {...props}
    ref={forwardRef}
  />
));

export const DropdownMenuCheckboxItem = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<HTMLAttributes<HTMLSelectElement>>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={classNames(className, Style.DropdownMenuCheckboxItem)}
      {...props}
      ///@ts-expect-error cant type now
      ref={forwardedRef}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        {/* {props.checked === 'indeterminate' && <DividerHorizontalIcon />}
          {props.checked === true && <CheckIcon />} */}
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuRadioItem = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={classNames(className, Style.DropdownMenuRadioItem)}
      {...props}
      ///@ts-expect-error cant typing now :(
      ref={forwardedRef}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator>
        {/* <CheckIcon /> */}
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.RadioItem>
  );
});
