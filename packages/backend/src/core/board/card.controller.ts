import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '#core/auth/auth.guard';

import { CreateCardDTO } from './dto/create-card.dto';
import { CardEntity } from './entities/card.entity';
import { ColumnEntity } from './entities/column.entity';
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

  @Get()
  @ApiResponse({
    status: 200,
    type: [ColumnEntity],
  })
  getCards(@Query('board_id') board_id: string) {
    return this.cardService.getCards(board_id);
  }
}
