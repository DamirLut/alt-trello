import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { BoardModule } from '#core/board/board.module';

import { CommentEntity } from './entities/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [MikroOrmModule.forFeature([CommentEntity]), BoardModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
