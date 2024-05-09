import classNames from 'classnames';

import type { HasComponent, HasRootRef } from '../types';

export interface RootComponentProps<T>
  extends React.AllHTMLAttributes<T>,
    HasRootRef<T>,
    HasComponent {
  baseClassName?: string | false;
}

export const RootComponent = <T,>({
  Component = 'div',
  baseClassName,
  className,
  getRootRef,
  ...restProps
}: RootComponentProps<T>) => (
  <Component
    ref={getRootRef}
    className={classNames(baseClassName, className)}
    {...restProps}
  />
);
