import { type FC, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from 'api';

import { userQueries } from 'entities/user';
import { Avatar } from 'ui/avatar';
import { Button } from 'ui/button';
import { Card } from 'ui/card';
import { Dialog, DialogContent, DialogTrigger } from 'ui/dialog';
import { Input } from 'ui/input';
import { Separator } from 'ui/separator';
import { Heading, Text } from 'ui/typography';

import Style from './profile.module.scss';

export const ProfilePage: FC = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(userQueries(queryClient).getSelf());
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [open, setOpen] = useState(false);

  const { mutateAsync } = useMutation(userQueries(queryClient).updateProfile());
  const { mutateAsync: deleteProfile } = useMutation(
    userQueries(queryClient).deleteProfile(),
  );

  const onSave = async () => {
    if (!username) return;
    if (!email) return;
    await mutateAsync({ username, email });
  };

  const onClickDelete = async () => {
    setOpen(false);
    client
      .POST('/api/auth/logout', {})
      .then(() => {
        window.location.reload();
        localStorage.removeItem('access_token');
      })
      .catch(console.error);
    await deleteProfile();
  };

  return (
    <section className={Style.page}>
      <Card>
        <Heading>Профиль</Heading>
        <div>
          <Avatar src={user?.avatar} />
          <div>
            <Text Component={'label'}>
              Имя
              <Input
                value={username}
                onChange={(e) =>
                  setUsername((e.target as HTMLInputElement).value)
                }
              />
            </Text>
            <Text Component={'label'}>
              Почта
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              />
            </Text>
            <div className={Style['profile-footer']}>
              <Button color='blue' onClick={onSave}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <Heading>Настройки</Heading>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div>
                <Button color='red'>Удалить профиль</Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <div className={Style.alert}>
                <Text Component={'h3'}>Вы уверены что хотите удалить?</Text>
                <Text>Это действие нельзя будет отменить</Text>
                <div>
                  <Button color='red' onClick={onClickDelete}>
                    Удалить
                  </Button>
                  <Button color='gray' onClick={() => setOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </section>
  );
};
