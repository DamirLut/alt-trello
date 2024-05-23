import { queryOptions } from '@tanstack/react-query';
import { client } from 'api';

export const authQueries = {
  getOAuthMethods: () =>
    queryOptions({
      queryKey: ['oauth', 'methods'],
      queryFn: ({ signal }) =>
        client.GET('/api/utils', { signal }).then(({ data }) => data),
    }),
};
