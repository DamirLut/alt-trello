import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { EnvironmentVariables } from '#config/env.config';

import type { JwtPayload } from '../auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<EnvironmentVariables>) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => request?.cookies?.auth ?? null,
      ]),
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.id,
      provider_id: payload.provider_id,
      provider: payload.provider,
    };
  }
}
