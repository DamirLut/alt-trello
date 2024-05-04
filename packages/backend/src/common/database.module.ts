import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Logger,
  type MiddlewareConsumer,
  Module,
  type NestModule,
  type OnModuleInit,
} from '@nestjs/common';

import { Environment } from '#root/config/env.config';
import config from '#root/mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
})
export class DatabaseModule implements NestModule, OnModuleInit {
  private logger = new Logger(DatabaseModule.name);

  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === Environment.Development) {
      await this.orm.schema.updateSchema();
    } else {
      const migrationNeeded = await this.orm.migrator.checkMigrationNeeded();

      if (!migrationNeeded) return;

      const pendingMigrations = await this.orm.migrator.getPendingMigrations();
      this.logger.log(`Pending migrations: `);
      this.logger.log(
        pendingMigrations.map((migration) => migration.name).join('\n'),
      );
      this.logger.log('Run migration up');
      await this.orm.migrator.up();
      this.logger.log('Migration end');
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
