import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '#core/auth/auth.guard';

import { CreateColumnDTO } from './dto/create-column.dto';
import { DeleteColumnDTO } from './dto/delete-column.dto';
import { MoveColumnDTO } from './dto/move-column.dto';
import { UpdateColumnDTO } from './dto/update-column.dto';
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

  @Patch()
  @ApiResponse({ status: 200, type: ColumnEntity })
  updateColumn(@Body() dto: UpdateColumnDTO) {
    return this.columnService.update(dto);
  }

  @Post('/move')
  @ApiResponse({ status: 200, type: ColumnEntity })
  moveColumn(@Body() dto: MoveColumnDTO) {
    return this.columnService.move(dto);
  }

  @Delete()
  @ApiResponse({ status: 200, type: ColumnEntity })
  deleteColumn(@Body() dto: DeleteColumnDTO) {
    return this.columnService.deleteColumn(dto);
  }
}
