import {
  type MutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';
import { type ApiSchema, client } from 'api';

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
  updateProfile: (): MutationOptions<
    ApiSchema['UserEntity'],
    Error,
    ApiSchema['UpdateProfileDTO']
  > => ({
    mutationFn: (dto) =>
      client.PATCH('/api/user', { body: dto }).then(({ data }) => data!),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
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
  deleteProfile: (): MutationOptions<ApiSchema['UserEntity'], Error, void> => ({
    mutationFn: () => client.DELETE('/api/user', {}).then(({ data }) => data!),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  }),
});
