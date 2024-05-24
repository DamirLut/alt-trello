import { queryOptions } from '@tanstack/react-query';
import { client } from 'api';

import { ApiError } from '../../../types/api';

export const userQueries = {
  getSelf: () =>
    queryOptions({
      queryKey: ['user', 'self'],
      staleTime: 60_000 * 5,
      queryFn: ({ signal }) =>
        client.GET('/api/user', { signal }).then(({ data }) => data),
      retry(_, error) {
        if (error instanceof ApiError) {
          return error.statusCode !== 401;
        }
        return true;
      },
    }),
};
