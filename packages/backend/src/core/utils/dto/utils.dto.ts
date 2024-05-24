import { ApiProperty } from '@nestjs/swagger';

import { AuthProviders } from '#config/env.config';

export class AuthMethodsDTO {
  @ApiProperty({ isArray: true, type: () => AuthMethodDTO })
  items: AuthMethodDTO[];
}

export class AuthMethodDTO {
  @ApiProperty({ enum: AuthProviders })
  type: AuthProviders;

  @ApiProperty()
  redirect_url: string;

  [key: string]: unknown;
}
