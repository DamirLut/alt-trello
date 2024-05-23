import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import type { EnvironmentVariables } from '#config/env.config';
import { UserModule } from '#core/users/user.module';

import { AuthEntity } from './entities/auth.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { VKStrategy } from './strategies/vk.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables>) => {
        return {
          secret: config.get('SECRET_KEY'),
        };
      },
    }),
    MikroOrmModule.forFeature([AuthEntity]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, VKStrategy, GoogleStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
