import type { FC } from 'react';
import classNames from 'classnames';

import { Typography, type TypographyProps } from './Typography';

import Style from './typography.module.scss';

interface HeadingProps extends TypographyProps {
  level?: '1' | '2' | '3';
}

export const Heading: FC<HeadingProps> = ({
  Component = 'h2',
  level = '1',
  ...props
}) => (
  <Typography
    Component={Component}
    className={classNames(Style.heading, Style['heading-' + level])}
    {...props}
  />
);
