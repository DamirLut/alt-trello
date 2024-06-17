import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '#core/auth/auth.guard';

import { CreateCardDTO } from './dto/create-card.dto';
import { MoveCardDTO } from './dto/move-card.dto';
import { SetCardMemberDTO } from './dto/set-card-member.dto';
import { UpdateCardDTO } from './dto/update-card-title.dto';
import { UpdateContentCardDTO } from './dto/update-content-card.dto';
import { UpdateCoverCardDTO } from './dto/update-cover-card.dto';
import { CardEntity } from './entities/card.entity';
import { CardMemberEntity } from './entities/card-member.entity';
import { CardService } from './card.service';

@Controller('/cards')
@ApiTags('cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('/new')
  @ApiResponse({ status: 201, type: CardEntity })
  create(@Body() dto: CreateCardDTO) {
    return this.cardService.create(dto);
  }

  @Get('/list')
  @ApiResponse({
    status: 200,
    type: [CardEntity],
  })
  getCards(@Query('board_id') board_id: string) {
    return this.cardService.getCards(board_id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: CardEntity,
  })
  getCard(
    @Query('board_id') board_id: string,
    @Query('card_id') card_id: number,
  ) {
    return this.cardService.getCard(card_id, board_id);
  }

  @Delete()
  @ApiResponse({
    status: 200,
    type: CardEntity,
  })
  deleteCard(
    @Query('board_id') board_id: string,
    @Query('card_id') card_id: number,
  ) {
    return this.cardService.deleteCard(card_id, board_id);
  }

  @Patch('/move')
  @ApiResponse({ status: 200, type: CardEntity })
  moveCard(@Body() dto: MoveCardDTO) {
    return this.cardService.moveCard(dto);
  }

  @Put()
  @ApiResponse({ status: 200, type: CardEntity })
  setContent(@Body() dto: UpdateContentCardDTO) {
    return this.cardService.setContent(dto);
  }

  @Put('/cover')
  @ApiResponse({ status: 200, type: CardEntity })
  setCover(@Body() dto: UpdateCoverCardDTO) {
    return this.cardService.setCover(dto);
  }

  @Patch()
  @ApiResponse({ status: 200, type: CardEntity })
  setTitle(@Body() dto: UpdateCardDTO) {
    return this.cardService.updateTitle(dto);
  }

  @Post('/members')
  @ApiResponse({ status: 201, type: CardMemberEntity })
  setMember(@Body() dto: SetCardMemberDTO) {
    return this.cardService.setMember(dto);
  }
}
