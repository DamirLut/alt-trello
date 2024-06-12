import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtUser } from '#core/auth/auth.decorator';
import { JwtAuthGuard } from '#core/auth/auth.guard';
import type { JwtPayload } from '#core/auth/auth.type';

import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
@ApiTags('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiResponse({ status: 201, type: CommentEntity })
  createCard(@Body() dto: CreateCommentDTO, @JwtUser() author: JwtPayload) {
    return this.commentService.create(dto, author);
  }

  @Get()
  @ApiResponse({ status: 200, type: [CommentEntity] })
  getCards(
    @Query('board_id') board_id: string,
    @Query('card_id') card_id: number,
  ) {
    return this.commentService.getComments(card_id, board_id);
  }
}
