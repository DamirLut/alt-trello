import { QueryClient } from '@tanstack/react-query';
import createClient, { type Middleware } from 'openapi-fetch';

import { ApiError } from '../../types/api';
import { API_URL } from '../config/env';

import type { ApiPaths } from '.';

const throwOnError: Middleware = {
  async onResponse(res) {
    if (res.status >= 400) {
      const error = await res.clone().json();
      throw new ApiError(error.statusCode, error.message);
    }
    return undefined;
  },
};

export const client = createClient<ApiPaths>({
  baseUrl: API_URL,
});

client.use(throwOnError);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
