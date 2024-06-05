import { forwardRef, type PropsWithChildren } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import classNames from 'classnames';

import Style from './popover.module.scss';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ className?: string }>
>(({ children, className, ...props }, forwardedRef) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      sideOffset={5}
      className={classNames(className, Style.PopoverContent)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <PopoverPrimitive.Arrow className={Style.PopoverArrow} />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
