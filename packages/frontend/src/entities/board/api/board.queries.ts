import { queryOptions } from '@tanstack/react-query';
import { client } from 'api';

export const boardQueries = {
  getList: () =>
    queryOptions({
      queryKey: ['boards', 'list'],
      queryFn: ({ signal }) =>
        client.GET('/api/board/list', { signal }).then(({ data }) => data),
    }),
};
