import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const migrationsPath = './migrations';

export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_DB,
  entities: ['./**/entities/*.entity.js'],
  entitiesTs: ['./src/**/entities/*.entity.ts'],
  extensions: [Migrator],
  driver: PostgreSqlDriver,
  debug: process.env.NODE_ENV === 'development',
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: migrationsPath,
    pathTs: migrationsPath,
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    emit: 'ts',
  },
});
