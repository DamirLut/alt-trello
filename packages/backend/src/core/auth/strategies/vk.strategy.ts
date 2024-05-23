import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';

import { AuthProviders, EnvironmentVariables } from '#config/env.config';

import type { AuthProfile } from '../auth.type';

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, 'vk') {
  private readonly baseUrl = 'https://api.vk.com/';
  private readonly apiVersion = '5.131';

  constructor(private config: ConfigService<EnvironmentVariables>) {
    super();
  }

  async validate(req: Request): Promise<AuthProfile> {
    if (!('payload' in req.query))
      throw new BadRequestException('payload not provided');
    const payload = JSON.parse(req.query.payload as string);

    const { success, errors } = await this.getProfile(
      payload.token,
      payload.uuid,
    );

    if (success.length === 0) {
      console.error(errors);
      throw new ForbiddenException(errors[0].description);
    }

    return {
      id: String(success[0].user_id),
      username: success[0].first_name + ' ' + success[0].last_name,
      avatar: success[0].photo_200,
      email: success[0].email,
      provider: AuthProviders.VK,
    };
  }

  ///@ts-expect-error maybe use in future
  private async exchangeSilentToken(token: string, uuid: string) {
    const url = new URL('/method/auth.exchangeSilentAuthToken', this.baseUrl);

    url.searchParams.set('token', token);
    url.searchParams.set(
      'access_token',
      this.config.get('VK_APP_SERVICE_KEY')!,
    );
    url.searchParams.set('uuid', uuid);
    url.searchParams.set('v', this.apiVersion);

    const { response } = await fetch(url).then((res) => res.json());

    return response;
  }

  private async getProfile(token: string, uuid: string) {
    const url = new URL(
      '/method/auth.getProfileInfoBySilentToken',
      this.baseUrl,
    );

    url.searchParams.set('v', this.apiVersion);
    url.searchParams.set(
      'access_token',
      this.config.get('VK_APP_SERVICE_KEY')!,
    );
    url.searchParams.set('token', token);
    url.searchParams.set('uuid', uuid);

    const { response } = await fetch(url).then((res) => res.json());

    return response;
  }
}
