import {
  Body,
  Controller,
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
import { UpdateContentCardDTO } from './dto/update-content-card.dto';
import { CardEntity } from './entities/card.entity';
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
}
