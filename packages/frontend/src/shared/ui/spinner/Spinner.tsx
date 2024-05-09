import type { FC } from 'react';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './spinner.module.scss';

export const Spinner: FC<RootComponentProps<HTMLDivElement>> = ({
  Component = 'div',
  ...props
}) => {
  return (
    <RootComponent
      Component={Component}
      baseClassName={Style.loader}
      {...props}
    />
  );
};
