import type { FC } from 'react';
import classNames from 'classnames';

import Style from './separator.module.scss';

export interface SeparatorProps {
  vertical?: boolean;
}

export const Separator: FC<SeparatorProps> = (props) => {
  return (
    <hr
      className={classNames(Style.separator, {
        [Style.separator_vertical]: props.vertical,
        [Style.separator_horizontal]: !props.vertical,
      })}
    />
  );
};
