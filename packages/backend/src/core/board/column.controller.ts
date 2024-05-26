import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '#core/auth/auth.guard';

import { CreateColumnDTO } from './dto/create-column.dto';
import { ColumnEntity } from './entities/column.entity';
import { ColumnService } from './column.service';

@Controller('/columns')
@ApiTags('columns')
@UseGuards(JwtAuthGuard)
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post('/new')
  @ApiResponse({ status: 201, type: ColumnEntity })
  newColumn(@Body() dto: CreateColumnDTO) {
    return this.columnService.create(dto);
  }
}
