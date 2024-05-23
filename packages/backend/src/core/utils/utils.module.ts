import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Module({
  imports: [ConfigModule],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
