import type { FC } from 'react';

import { Typography, type TypographyProps } from './Typography';

import Style from './typography.module.scss';

type TitleProps = TypographyProps;

export const Title: FC<TitleProps> = ({ Component = 'h1', ...props }) => (
  <Typography Component={Component} className={Style.title} {...props} />
);
