import type { FC } from 'react';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './textarea.module.scss';

export const Textarea: FC<RootComponentProps<HTMLTextAreaElement>> = ({
  Component = 'textarea',
  ...props
}) => {
  return (
    <RootComponent
      Component={Component}
      {...props}
      baseClassName={Style.textarea}
    />
  );
};
