import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppConfigModule } from '#common/app-config/app-config.module';
import { DatabaseModule } from '#common/database.module';
import { UPLOAD_PATH } from '#config/constant';
import { AuthModule } from '#core/auth/auth.module';
import { BoardModule } from '#core/board/board.module';
import { UserModule } from '#core/users/user.module';
import { UtilsModule } from '#core/utils/utils.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    PassportModule,
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_PATH,
      serveRoot: '/api/assets/',
    }),
    AuthModule,
    UserModule,
    UtilsModule,
    BoardModule,
  ],
})
export class AppModule {}
