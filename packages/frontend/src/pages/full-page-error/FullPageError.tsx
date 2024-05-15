import type { FC } from 'react';

import { Card } from 'ui/card';
import { Separator } from 'ui/separator';
import { Text, Title } from 'ui/typography';

import Style from './full-page-error.module.scss';

interface FullPageError {
  error: string | Error;
}

export const FullPageError: FC<FullPageError> = (props) => {
  const error = props.error instanceof Error ? props.error.stack : props.error;

  return (
    <section className={Style.container}>
      <Card>
        <Title>Error</Title>
        <Separator />
        <Text>{error}</Text>
      </Card>
    </section>
  );
};
