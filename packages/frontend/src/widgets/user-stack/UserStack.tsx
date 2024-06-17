import type { CSSProperties, FC } from 'react';

import { IconUserPlus } from 'assets/icons';
import { Avatar } from 'ui/avatar';

import Style from './user-stack.module.scss';

interface AvatarProps {
  url: string;
  title: string;
  indicator?: never;
}

interface UserStackProps {
  avatars: (string | AvatarProps)[];
  size?: number;
  style?: CSSProperties;
  addButton?: boolean;
  maxAvatars?: number;
  onClick?: (item: string | AvatarProps | null) => void;
}

export const UserStack: FC<UserStackProps> = ({
  avatars,
  size = 24,
  style,
  addButton,
  maxAvatars,
  onClick,
}) => {
  const normalized = avatars
    .map((avatar) => {
      if (typeof avatar === 'object') {
        return avatar;
      }

      return {
        url: avatar,
        title: '',
      };
    })
    .slice(0, maxAvatars);

  return (
    <div className={Style.stack}>
      {normalized.map((avatar) => (
        <Avatar
          key={avatar.url}
          src={avatar.url}
          title={avatar.title}
          size={size}
          style={style}
          onClick={() => onClick?.(avatar)}
        />
      ))}
      {addButton && (
        <div
          className={Style.add}
          style={Object.assign({ width: `${size}px` }, style)}
          onClick={() => onClick?.(null)}
        >
          <IconUserPlus />
        </div>
      )}
    </div>
  );
};
