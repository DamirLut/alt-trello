import { type FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { userQueries } from 'entities/user';

export const AuthGuard: FC = () => {
  const client = useQueryClient();
  const { isError, isFetched } = useQuery(userQueries(client).getSelf());
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/auth');
    }
  }, [isFetched]);

  if (isError) {
    return null;
  }

  return <Outlet />;
};
