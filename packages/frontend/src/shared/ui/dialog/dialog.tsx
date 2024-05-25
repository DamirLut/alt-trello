import React, { type PropsWithChildren } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';

import { IconClose } from 'assets/icons';

import Style from './dialog.module.scss';

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ className?: string }>
>(({ children, className, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={Style.overlay} />
    <DialogPrimitive.Content
      ref={forwardedRef}
      className={classNames(Style.content, className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close aria-label='Close' className={Style.close}>
        <IconClose />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
