import type { FC, ImgHTMLAttributes } from 'react';

import Style from './avatar.module.scss';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  size?: number | string;
}

export const Avatar: FC<AvatarProps> = ({ src, size = 72, ...props }) => {
  return (
    <img
      className={Style.avatar}
      src={src}
      width={size}
      height={size}
      {...props}
    />
  );
};
