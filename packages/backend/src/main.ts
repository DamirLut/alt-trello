import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import type { EnvironmentVariables } from '#config/env.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService<EnvironmentVariables>);

  app.enableShutdownHooks();
  app.enableCors({
    exposedHeaders: ['Retry-After', 'content-type'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api');

  await app.listen(config.get('PORT', 5000));
}

void bootstrap();
