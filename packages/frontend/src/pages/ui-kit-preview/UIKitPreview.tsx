import type { FC } from 'react';

import { useTheme } from 'entities/theme';
import { Spinner } from 'ui/spinner';
import { Heading, Text, Title, Typography } from 'ui/typography';

import { Section } from './Section';

import Style from './ui-kit-preview.module.scss';

export const UIKitPreviewPage: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className={Style.preview}>
      <Heading
        level='3'
        onClick={toggleTheme}
        className={Style['switch-theme']}
      >
        Theme: {theme}
      </Heading>

      <Section id='typography'>
        <Typography>Typography</Typography>
        <Title>Title</Title>
        <Heading level='1'>Heading 1</Heading>
        <Heading level='2'>Heading 2</Heading>
        <Heading level='3'>Heading 3</Heading>
        <Text>Text</Text>
      </Section>

      <Section id='spinner'>
        <Spinner />
      </Section>
    </main>
  );
};
