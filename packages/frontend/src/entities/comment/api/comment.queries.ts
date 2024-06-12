import {
  type MutationOptions,
  type QueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { type ApiSchema, client } from 'api';

export const commentQueries = (queryClient: QueryClient) => ({
  createComment: (): MutationOptions<
    ApiSchema['CommentEntity'],
    Error,
    ApiSchema['CreateCommentDTO']
  > => ({
    mutationFn: (dto) =>
      client
        .POST('/api/comments', { body: dto })
        .then(({ data }) => data as ApiSchema['CommentEntity']),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  }),
  getComments: (card_id: number, board_id: string) =>
    queryOptions({
      queryKey: ['comments'],
      queryFn: () =>
        client
          .GET('/api/comments', {
            params: { query: { board_id, card_id } },
          })
          .then(({ data }) => data as ApiSchema['CommentEntity'][]),
    }),
});
