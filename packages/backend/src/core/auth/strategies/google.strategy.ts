import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { AuthProviders, type EnvironmentVariables } from '#config/env.config';

import type { AuthProfile } from '../auth.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService<EnvironmentVariables>) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('HOST') + '/api/auth/google',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: Record<string, any>,
  ): Promise<AuthProfile> {
    console.log(profile);
    return {
      id: profile.id,
      avatar: profile.photos[0].value,
      email: profile.emails[0].value,
      username: profile.displayName,
      provider: AuthProviders.GOOGLE,
    };
  }
}
