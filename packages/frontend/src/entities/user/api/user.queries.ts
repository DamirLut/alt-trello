import { queryOptions } from '@tanstack/react-query';
import { client } from 'api';

export const userQueries = {
  getSelf: () =>
    queryOptions({
      queryKey: ['user', 'self'],
      staleTime: 60_000 * 5,
      queryFn: ({ signal }) =>
        client.GET('/api/user', { signal }).then(({ data }) => data),
    }),
};
