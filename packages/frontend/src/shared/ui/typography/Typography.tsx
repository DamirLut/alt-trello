import type { FC } from 'react';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './typography.module.scss';

export type TypographyProps = RootComponentProps<HTMLElement>;

export const Typography: FC<TypographyProps> = ({
  Component = 'span',
  ...props
}) => (
  <RootComponent
    Component={Component}
    baseClassName={Style.typography}
    {...props}
  />
);
