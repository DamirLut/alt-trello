import type { FC } from 'react';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './input.module.scss';

export const Input: FC<RootComponentProps<HTMLInputElement>> = ({
  Component = 'input',
  ...props
}) => {
  return (
    <RootComponent
      Component={Component}
      {...props}
      baseClassName={Style.input}
    />
  );
};
