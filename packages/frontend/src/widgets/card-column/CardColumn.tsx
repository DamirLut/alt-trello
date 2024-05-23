import type { FC } from 'react';

import { Card } from 'ui/card';

import Style from './card-column.module.scss';

export const CardColumn: FC = () => {
  const cards = Array.from({ length: Math.random() * 25 });
  return (
    <section className={Style['card-column']}>
      <Card className={Style.card}>Column name</Card>

      <div className={Style.tasks}>
        {cards.map(() => (
          <Card className={Style.card}>Card</Card>
        ))}
      </div>
    </section>
  );
};
