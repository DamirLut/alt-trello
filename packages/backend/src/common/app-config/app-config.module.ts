import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';

import { Environment } from '#config/env.config';

import { validate } from './validate';

process.env.NODE_ENV ??= Environment.Development;

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: resolve(`.${process.env.NODE_ENV}.env`),
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
