import { type MutationOptions, queryOptions } from '@tanstack/react-query';
import { type ApiSchema, client } from 'api';

export const boardQueries = {
  getList: () =>
    queryOptions({
      queryKey: ['boards', 'list'],
      queryFn: ({ signal }) =>
        client.GET('/api/boards/list', { signal }).then(({ data }) => data),
    }),
  newBoard: (): MutationOptions<
    ApiSchema['BoardEntity'],
    Error,
    ApiSchema['CreateBoardDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .POST('/api/boards/new', { body: dto })
        .then(({ data }) => data as ApiSchema['BoardEntity']),
  }),
  getById: (id?: string) =>
    queryOptions({
      queryKey: ['boards', id],
      enabled: !!id,
      queryFn: ({ signal }) =>
        client
          .GET('/api/boards', { params: { query: { id: id! } }, signal })
          .then(({ data }) => data),
    }),
  getCards: (board_id?: string) =>
    queryOptions({
      queryKey: ['boards', board_id, 'cards'],
      enabled: !!board_id,
      queryFn: ({ signal }) =>
        client
          .GET('/api/cards', {
            params: { query: { board_id: board_id! } },
            signal,
          })
          .then(({ data }) => data),
    }),
  createCard: (): MutationOptions<
    ApiSchema['CardEntity'],
    Error,
    ApiSchema['CreateCardDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .POST('/api/cards/new', { body: dto })
        .then(({ data }) => data as ApiSchema['CardEntity']),
  }),
};
