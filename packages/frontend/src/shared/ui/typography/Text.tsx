import type { FC } from 'react';

import { Typography, type TypographyProps } from './Typography';

import Style from './typography.module.scss';

type TextProps = TypographyProps;

export const Text: FC<TextProps> = ({ Component = 'span', ...props }) => (
  <Typography Component={Component} className={Style.text} {...props} />
);
