import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

process.env.NODE_ENV ??= Environment.Development;

export enum AuthProviders {
  VK = 'vk',
  GOOGLE = 'google',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @Min(1000)
  PORT: number;

  @IsUrl()
  HOST: string;

  @IsString()
  SECRET_KEY: string;

  @IsString()
  DATABASE_HOST: string;

  @IsInt()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_DB: string;

  @IsEnum(AuthProviders, { each: true })
  @Transform((params) => params.value.toLowerCase().split(','))
  AUTH_METHODS: AuthProviders[];

  @ValidateIf((o) => o.AUTH_METHODS.includes(AuthProviders.VK))
  @IsNumber()
  VK_APP_ID: number;

  @ValidateIf((o) => o.AUTH_METHODS.includes(AuthProviders.VK))
  @IsString()
  VK_APP_SERVICE_KEY: string;

  @ValidateIf((o) => o.AUTH_METHODS.includes(AuthProviders.VK))
  @IsString()
  VK_APP_SECRET_KEY: string;

  @ValidateIf((o) => o.AUTH_METHODS.includes(AuthProviders.GOOGLE))
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @ValidateIf((o) => o.AUTH_METHODS.includes(AuthProviders.GOOGLE))
  @IsString()
  GOOGLE_CLIENT_SECRET: string;
}
