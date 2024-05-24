import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppConfigModule } from '#common/app-config/app-config.module';
import { DatabaseModule } from '#common/database.module';
import { AuthModule } from '#core/auth/auth.module';
import { BoardModule } from '#core/board/board.module';
import { UserModule } from '#core/users/user.module';
import { UtilsModule } from '#core/utils/utils.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    PassportModule,
    AuthModule,
    UserModule,
    UtilsModule,
    BoardModule,
  ],
})
export class AppModule {}
