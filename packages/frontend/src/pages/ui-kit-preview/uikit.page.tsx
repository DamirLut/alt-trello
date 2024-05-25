import type { FC } from 'react';

import { useTheme } from 'entities/theme';
import { Button } from 'ui/button';
import { Separator } from 'ui/separator';
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

      <Section
        id='separator'
        style={{
          height: 100,
          display: 'flex',
          gap: 5,
        }}
      >
        <Separator />
        <Separator vertical />
      </Section>

      <Section
        id='buttons'
        style={{ display: 'flex', gap: 10, flexDirection: 'column' }}
      >
        <div>
          <Button>primary</Button>
          <Button variant='tertiary'>tertiary</Button>
          <Button variant='link'>link</Button>
          <Button variant='outline'>outline</Button>
        </div>
        <Separator />
        <div>
          <Button color='green'>primary</Button>
          <Button color='green' variant='tertiary'>
            tertiary
          </Button>
          <Button color='green' variant='link'>
            link
          </Button>
          <Button color='green' variant='outline'>
            outline
          </Button>
        </div>
      </Section>
    </main>
  );
};
