import type { FC } from 'react';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './card.module.scss';

type CardProps = RootComponentProps<'div'>;

export const Card: FC<CardProps> = ({ Component = 'div', ...props }) => {
  return (
    <RootComponent
      Component={Component}
      {...props}
      baseClassName={Style.card}
    />
  );
};
