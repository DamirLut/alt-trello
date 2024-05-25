import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { BoardEntity } from './entities/board.entity';
import { BoardSettingEntity } from './entities/board-setting.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [MikroOrmModule.forFeature([BoardEntity, BoardSettingEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
