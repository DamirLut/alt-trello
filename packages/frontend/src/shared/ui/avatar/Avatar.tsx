import type { FC } from 'react';

import Style from './avatar.module.scss';

export interface AvatarProps {
  src: string;
  size?: number | string;
}

export const Avatar: FC<AvatarProps> = ({ src, size = 72 }) => {
  return <img className={Style.avatar} src={src} width={size} height={size} />;
};
