import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { CreateColumnDTO } from './dto/create-column.dto';
import { BoardEntity } from './entities/board.entity';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: EntityRepository<BoardEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: EntityRepository<ColumnEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateColumnDTO) {
    const board = await this.boardRepository.findOne(
      { id: dto.board_id },
      { populate: ['columns'] },
    );

    if (!board) {
      throw new NotFoundException('board not found');
    }

    const column = this.columnRepository.create({
      board,
      title: dto.title,
      position: board.columns.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.entityManager.persistAndFlush(column);

    return column;
  }
}
