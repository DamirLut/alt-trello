import type { FC } from 'react';
import { createForm } from 'react-any-shape-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { getRootVariables } from 'lib/dom';
import { pickRandom } from 'lib/utils';

import { boardQueries } from 'entities/board';
import { Button } from 'ui/button';
import { Card } from 'ui/card';
import { Dialog, DialogContent, DialogTrigger } from 'ui/dialog';
import { Input } from 'ui/input';
import { Textarea } from 'ui/textarea';
import { Text } from 'ui/typography';

import Style from './new-board-card.module.scss';

const Form = createForm({
  title: '',
  description: '',
  color: '',
});

type FormState = Parameters<
  NonNullable<Parameters<typeof Form>[0]['onFinish']>
>[0];

const gradients = getRootVariables()
  .filter((variable) => variable.startsWith('--gradient'))
  .map((variable) => variable.replace('--gradient-', ''));

export const NewBoardCard: FC = () => {
  const client = useQueryClient();
  const { mutateAsync } = useMutation(boardQueries(client).newBoard());
  const navigate = useNavigate();

  const onFinish = async (state: FormState) => {
    const board = await mutateAsync({
      title: state.title,
      color: state.color || pickRandom(gradients),
      description: state.description,
    });
    navigate(`/b/${board.id}/${board.slug}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={Style['new-board-card']}>
          <div>
            <Text>Создать</Text>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className={Style.dialog}>
        <Text Component={'h4'}>Новая доска</Text>
        <Form onFinish={onFinish}>
          <Form.Item
            name='title'
            label='Название'
            rules={[
              { required: true, message: 'Название не должно быть пустым' },
            ]}
          >
            {({ onChange }) => (
              <Input
                onChange={(e) => onChange((e.target as HTMLInputElement).value)}
              />
            )}
          </Form.Item>
          <Form.Item name='description' label='Описание'>
            {({ onChange }) => (
              <Textarea
                onChange={(e) => onChange((e.target as HTMLInputElement).value)}
              />
            )}
          </Form.Item>

          <Form.Item name='color' label='Фон'>
            {({ onChange, value }) => (
              <div className={Style['choose-colors-wrap']}>
                <div className={Style['choose-colors']}>
                  {gradients.map((gradient) => (
                    <Card
                      key={gradient}
                      className={classNames(
                        Style['color-card'],
                        value === gradient && Style['color-card-selected'],
                      )}
                      onClick={() => onChange(gradient)}
                      style={{
                        backgroundImage: `var(--gradient-${gradient})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Form.Item>

          <div>
            <Button variant='primary' color='green' type='submit'>
              Создать
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
