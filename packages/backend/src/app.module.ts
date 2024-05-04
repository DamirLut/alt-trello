import { Module } from '@nestjs/common';

import { AppConfigModule } from '#common/app-config/app-config.module';
import { DatabaseModule } from '#common/database.module';
import { UserModule } from '#core/users/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule],
})
export class AppModule {}
