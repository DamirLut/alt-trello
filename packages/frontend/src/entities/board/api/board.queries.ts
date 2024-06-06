import {
  type MutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { type ApiSchema, client } from 'api';

export const boardQueries = (queryClient: QueryClient) => ({
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
          .GET('/api/cards/list', {
            params: { query: { board_id: board_id! } },
            signal,
          })
          .then(({ data }) => data),
    }),
  getCard: (card_id: number, board_id: string) =>
    queryOptions({
      queryKey: ['boards', board_id, 'cards', card_id],
      queryFn: ({ signal }) =>
        client
          .GET('/api/cards', {
            params: { query: { board_id, card_id } },
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
  moveCard: (): MutationOptions<
    ApiSchema['CardEntity'],
    Error,
    ApiSchema['MoveCardDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .PATCH('/api/cards/move', { body: dto })
        .then(({ data }) => data as ApiSchema['CardEntity']),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  }),
  createColumn: (): MutationOptions<
    ApiSchema['ColumnEntity'],
    Error,
    ApiSchema['CreateColumnDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .POST('/api/columns/new', { body: dto })
        .then(({ data }) => data as ApiSchema['ColumnEntity']),
  }),
  updateColumn: (): MutationOptions<
    ApiSchema['ColumnEntity'],
    Error,
    ApiSchema['UpdateColumnDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .PATCH('/api/columns', { body: dto })
        .then(({ data }) => data as ApiSchema['ColumnEntity']),
  }),
  moveColumn: (): MutationOptions<
    ApiSchema['ColumnEntity'],
    Error,
    ApiSchema['MoveColumnDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .POST('/api/columns/move', { body: dto })
        .then(({ data }) => data as ApiSchema['ColumnEntity']),
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['boards', data.board] });
    },
  }),
  deleteColumn: (): MutationOptions<
    ApiSchema['ColumnEntity'],
    Error,
    ApiSchema['DeleteColumnDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .DELETE('/api/columns', { body: dto })
        .then(({ data }) => data as ApiSchema['ColumnEntity']),
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['boards', data.board] });
    },
  }),
  setCardContent: (): MutationOptions<
    ApiSchema['CardEntity'],
    Error,
    ApiSchema['UpdateContentCardDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .PUT('/api/cards', { body: dto })
        .then(({ data }) => data as ApiSchema['CardEntity']),
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['boards', data.board] });
    },
  }),
});
