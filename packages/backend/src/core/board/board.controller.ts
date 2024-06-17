import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtUser } from '#core/auth/auth.decorator';
import { JwtAuthGuard } from '#core/auth/auth.guard';
import type { JwtPayload } from '#core/auth/auth.type';

import { CreateBoardDTO } from './dto/create-board.dto';
import { ExcludeMemberDTO } from './dto/exclude-member.dto';
import { InviteMemberDTO } from './dto/invite-member.dto';
import { UpdateLabelDTO } from './dto/update-label.dto';
import { BoardEntity } from './entities/board.entity';
import { BoardMemberEntity } from './entities/board-member.entity';
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

  @Post('/invite')
  @ApiResponse({ status: 200, type: BoardMemberEntity })
  inviteMember(@Body() dto: InviteMemberDTO) {
    return this.boardService.inviteMember(dto);
  }

  @Post('/exclude')
  @ApiResponse({ status: 200, type: BoardMemberEntity })
  excludeMember(@Body() dto: ExcludeMemberDTO) {
    return this.boardService.excludeMember(dto);
  }

  @Patch('/settings/label')
  @ApiResponse({ status: 200, type: BoardEntity })
  updateLabel(@Body() dto: UpdateLabelDTO) {
    return this.boardService.updateLabel(dto);
  }

  @Delete()
  @ApiResponse({ status: 200, type: BoardEntity })
  deleteBoard(@JwtUser() user: JwtPayload, @Query('id') id: string) {
    return this.boardService.deleteBoard(user.id, id);
  }
}
