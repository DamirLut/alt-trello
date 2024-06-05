import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import { arrayMove } from '#root/lib/utils/array';

import type { CreateColumnDTO } from './dto/create-column.dto';
import type { DeleteColumnDTO } from './dto/delete-column.dto';
import type { MoveColumnDTO } from './dto/move-column.dto';
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
      cards: [],
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

  async move(dto: MoveColumnDTO) {
    const columns = await this.columnRepository.find(
      {
        board: dto.board_id,
      },
      {
        orderBy: { position: 1 },
      },
    );

    if (!columns) {
      throw new NotFoundException('column not found');
    }

    const columnIndex = columns.findIndex((column) => column.id === dto.column);

    arrayMove(columns, columnIndex, dto.position).forEach(
      (column, position) => {
        column.position = position;

        this.entityManager.persist(column);
      },
    );

    await this.entityManager.flush();

    return columns.find((column) => column.id === dto.column);
  }

  async deleteColumn(dto: DeleteColumnDTO) {
    const column = await this.columnRepository.findOne({
      board: dto.board_id,
      id: dto.column_id,
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    await this.entityManager.removeAndFlush(column);

    return column;
  }
}
