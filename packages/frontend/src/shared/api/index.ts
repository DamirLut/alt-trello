export { client, queryClient } from './client';
export type { paths as ApiPaths } from '../../types/api-schema';

import type { components } from '../../types/api-schema';

export type ApiSchema = components['schemas'];
