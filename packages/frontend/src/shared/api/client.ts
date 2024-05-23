import { QueryClient } from '@tanstack/react-query';
import createClient, { type Middleware } from 'openapi-fetch';

import { API_URL } from '../config/env';

import type { ApiSchema } from '.';

const throwOnError: Middleware = {
  async onResponse(res) {
    if (res.status >= 400) {
      const body = res.headers.get('content-type')?.includes('json')
        ? await res.clone().json()
        : await res.clone().text();
      throw new Error(body);
    }
    return undefined;
  },
};

export const client = createClient<ApiSchema>({
  baseUrl: API_URL,
});

client.use(throwOnError);

export const queryClient = new QueryClient();
