import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { BoardEntity } from './entities/board.entity';
import { BoardMemberEntity } from './entities/board-member.entity';
import { BoardSettingEntity } from './entities/board-setting.entity';
import { CardEntity } from './entities/card.entity';
import { CardMemberEntity } from './entities/card-members.entity';
import { ColumnEntity } from './entities/column.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      BoardEntity,
      BoardMemberEntity,
      BoardSettingEntity,
      ColumnEntity,
      CardEntity,
      CardMemberEntity,
    ]),
  ],
  controllers: [BoardController, ColumnController, CardController],
  providers: [BoardService, ColumnService, CardService],
  exports: [BoardService, ColumnService, CardService],
})
export class BoardModule {}
