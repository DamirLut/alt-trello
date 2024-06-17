import { QueryClient, queryOptions } from '@tanstack/react-query';
import { client } from 'api';

import { ApiError } from '../../../types/api';

export const userQueries = (queryClient: QueryClient) => ({
  getSelf: () =>
    queryOptions({
      queryKey: ['user', 'self'],
      staleTime: 60_000 * 5,
      queryFn: ({ signal }) =>
        client.GET('/api/user', { signal }).then(({ data }) => data),
      retry(_, error) {
        if (error instanceof ApiError) {
          queryClient;
          return error.statusCode !== 401;
        }
        return true;
      },
    }),
  searchUser: (username: string) =>
    queryOptions({
      queryKey: ['user', 'search', username],
      queryFn: ({ signal }) =>
        client
          .GET('/api/user/search', {
            signal,
            params: { query: { username } },
          })
          .then(({ data }) => data),
      enabled: !!username,
    }),
});
