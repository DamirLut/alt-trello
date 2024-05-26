import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import type { EnvironmentVariables } from '#config/env.config';

import PackageJson from '../package.json';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService<EnvironmentVariables>);

  app.use(cookieParser());

  app.enableShutdownHooks();
  app.enableCors({
    exposedHeaders: ['Retry-After', 'content-type'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api');

  const documentBuilder = new DocumentBuilder()
    .setTitle('Alt-Trello API docs')
    .setVersion(PackageJson.version)
    .addBearerAuth({ in: 'header', type: 'http', name: 'Authorization' })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(config.get('PORT', 5000));
}

void bootstrap();
