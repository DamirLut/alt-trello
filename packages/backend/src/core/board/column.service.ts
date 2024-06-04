import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { CreateColumnDTO } from './dto/create-column.dto';
import type { UpdateColumnDTO } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: EntityRepository<ColumnEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateColumnDTO) {
    const count = await this.columnRepository.count({ board: dto.board_id });

    const column = this.columnRepository.create({
      board: dto.board_id,
      title: dto.title,
      position: count,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.entityManager.persistAndFlush(column);

    return column;
  }

  async update(dto: UpdateColumnDTO) {
    const column = await this.columnRepository.findOne({
      board: dto.board_id,
      id: dto.column_id,
    });

    if (!column) {
      throw new NotFoundException('column not found');
    }

    column.title = dto.title;

    await this.entityManager.persistAndFlush(column);

    return column;
  }
}
