import { type MutationOptions, queryOptions } from '@tanstack/react-query';
import { type ApiSchema, client } from 'api';

export const boardQueries = {
  getList: () =>
    queryOptions({
      queryKey: ['boards', 'list'],
      queryFn: ({ signal }) =>
        client.GET('/api/board/list', { signal }).then(({ data }) => data),
    }),
  newBoard: (): MutationOptions<
    ApiSchema['BoardEntity'],
    Error,
    ApiSchema['CreateBoardDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .POST('/api/board/new', { body: dto })
        .then(({ data }) => data as ApiSchema['BoardEntity']),
  }),
};
