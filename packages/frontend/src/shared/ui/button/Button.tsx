import type { CSSProperties, FC } from 'react';
import classNames from 'classnames';

import { RootComponent, type RootComponentProps } from 'ui/root-component';
import type { ColorsVariant } from 'ui/types';

import Style from './button.module.scss';

export interface ButtonProps extends RootComponentProps<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary' | 'link' | 'outline';
  color?: ColorsVariant;
}

export const Button: FC<ButtonProps> = ({
  Component = 'button',
  variant = 'primary',
  style,
  color,
  ...props
}) => {
  const btnStyle = { '--color': `var(--color-${color})` } as CSSProperties;

  if (style) {
    Object.assign(btnStyle, style);
  }

  return (
    <RootComponent
      Component={Component}
      baseClassName={classNames(Style.button, Style[`button_${variant}`])}
      style={btnStyle}
      {...props}
    />
  );
};
