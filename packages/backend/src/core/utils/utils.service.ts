import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthProviders, type EnvironmentVariables } from '#config/env.config';

import type { OAuthMethodDTO, OAuthMethodsDTO } from './dto/utils.dto';

const oauthMethods: Record<
  AuthProviders,
  (config: ConfigService<EnvironmentVariables>) => OAuthMethodDTO
> = {
  [AuthProviders.VK]: (config) => ({
    type: AuthProviders.VK,
    redirect_url: config.get('HOST') + '/api/auth/vk',
    app_id: config.get('VK_APP_ID'),
  }),
  [AuthProviders.GOOGLE]: (config) => ({
    type: AuthProviders.GOOGLE,
    redirect_url: config.get('HOST') + '/api/auth/google',
  }),
};

@Injectable()
export class UtilsService {
  constructor(private config: ConfigService<EnvironmentVariables>) {}

  getOAuthList(): OAuthMethodsDTO {
    const methods = this.config.get<AuthProviders[]>('AUTH_METHODS') ?? [];

    const items = methods.map((method) => oauthMethods[method]?.(this.config));

    return { items };
  }
}
