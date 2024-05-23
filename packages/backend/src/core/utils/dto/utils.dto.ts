import { ApiProperty } from '@nestjs/swagger';

import { AuthProviders } from '#config/env.config';

export class OAuthMethodsDTO {
  @ApiProperty({ isArray: true, type: () => OAuthMethodDTO })
  items: OAuthMethodDTO[];
}

export class OAuthMethodDTO {
  @ApiProperty({ enum: AuthProviders })
  type: AuthProviders;

  @ApiProperty()
  redirect_url: string;

  [key: string]: unknown;
}
