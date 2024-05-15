import type { FC } from 'react';
import classNames from 'classnames';

import { RootComponent, type RootComponentProps } from 'ui/root-component';

import Style from './button.module.scss';

export interface ButtonProps extends RootComponentProps<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary' | 'link' | 'outline';
}

export const Button: FC<ButtonProps> = ({
  Component = 'button',
  variant = 'primary',
  ...props
}) => {
  return (
    <RootComponent
      Component={Component}
      baseClassName={classNames(Style.button, Style[`button_${variant}`])}
      {...props}
    />
  );
};
