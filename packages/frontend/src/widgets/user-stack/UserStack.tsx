import type { FC } from 'react';

import { Avatar } from 'ui/avatar';

import Style from './user-stack.module.scss';

interface UserStackProps {
  avatars: (string | { url: string; title: string })[];
  size?: number;
}

export const UserStack: FC<UserStackProps> = ({ avatars, size }) => {
  const normalized = avatars.map((avatar) => {
    if (typeof avatar === 'object') {
      return avatar;
    }

    return {
      url: avatar,
      title: '',
    };
  });

  return (
    <div className={Style.stack}>
      {normalized.map((avatar) => (
        <Avatar
          key={avatar.url}
          src={avatar.url}
          title={avatar.title}
          size={size ?? 24}
        />
      ))}
    </div>
  );
};
