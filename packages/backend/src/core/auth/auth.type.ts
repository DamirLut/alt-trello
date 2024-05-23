import type { AuthProviders } from '#config/env.config';

export interface AuthProfile {
  id: string;
  username: string;
  avatar: string;
  email: string;
  provider: AuthProviders;
}

export interface JwtPayload {
  id: number;
  provider_id: string;
  provider: string;
}
