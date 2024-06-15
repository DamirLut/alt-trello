import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtUser } from '#core/auth/auth.decorator';
import { JwtAuthGuard } from '#core/auth/auth.guard';
import type { JwtPayload } from '#core/auth/auth.type';

import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';
import { UserGroupEntity } from './entities/user-group.entity';
import { BoardService } from './board.service';

@Controller('boards')
@ApiTags('boards')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('/new')
  @ApiResponse({ status: 201, type: BoardEntity })
  createBoard(@Body() dto: CreateBoardDTO, @JwtUser() user: JwtPayload) {
    return this.boardService.create(user.id, dto);
  }

  @Get('/list')
  @ApiResponse({
    status: 200,
    type: [UserGroupEntity],
  })
  getUserList(@JwtUser() user: JwtPayload) {
    return this.boardService.getUserBoards(user.id);
  }

  @Get()
  @ApiResponse({ status: 200, type: BoardEntity })
  getBoardById(@JwtUser() _user: JwtPayload, @Query('id') id: string) {
    return this.boardService.findById(id);
  }

  @Post('/favorite')
  @ApiResponse({ status: 200, type: UserGroupEntity })
  toggleFavorite(@JwtUser() user: JwtPayload, @Query('id') id: string) {
    return this.boardService.toggleFavorite(user.id, id);
  }
}
