import type { FC, ImgHTMLAttributes } from 'react';

import { FALLBACK_AVATAR } from '../../config/env';

import Style from './avatar.module.scss';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string | undefined;
  size?: number | string;
  indicator?: 'online' | 'offline';
}

export const Avatar: FC<AvatarProps> = ({
  src,
  size = 72,
  indicator,
  ...props
}) => {
  return (
    <div className={Style.avatar}>
      <img
        src={src ?? FALLBACK_AVATAR}
        width={size}
        height={size}
        draggable={false}
        {...props}
      />
      {indicator && <div className={Style[`indicator-${indicator}`]} />}
    </div>
  );
};
