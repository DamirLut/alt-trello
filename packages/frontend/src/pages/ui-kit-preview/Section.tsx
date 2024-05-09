import type { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { Heading } from 'ui/typography/Heading';

import Style from './ui-kit-preview.module.scss';

interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export const Section: FC<SectionProps> = ({ children, id, className }) => (
  <section id={id} className={classNames(Style.section, className)}>
    {children}
    <Heading Component={'a'} href={`#${id}`} className={Style.section_tag}>
      {id}
    </Heading>
  </section>
);
