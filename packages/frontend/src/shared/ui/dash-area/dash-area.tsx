import type { FC } from 'react';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './dash-area.module.scss';

type DashAreaProps = RootComponentProps<HTMLDivElement>;

export const DashArea: FC<DashAreaProps> = ({
  Component = 'div',
  ...props
}) => {
  return (
    <RootComponent
      Component={Component}
      {...props}
      baseClassName={Style['dash-area']}
    />
  );
};
