import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

process.env.NODE_ENV ??= Environment.Development;

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @Min(1000)
  PORT: number;

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
}
