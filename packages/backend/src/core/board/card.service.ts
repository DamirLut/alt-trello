import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { CreateCardDTO } from './dto/create-card.dto';
import { CardEntity } from './entities/card.entity';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: EntityRepository<CardEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: EntityRepository<ColumnEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateCardDTO) {
    const column = await this.columnRepository.findOne(
      {
        id: dto.column_id,
        board: dto.board_id,
      },
      { populate: ['cards'] },
    );

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const card = this.cardRepository.create({
      column: dto.column_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: '',
      title: dto.title,
      position: column.cards.length,
    });

    await this.entityManager.persistAndFlush(card);

    return card;
  }

  getCards(board_id: string) {
    return this.columnRepository.find(
      {
        board: board_id,
      },
      {
        populate: ['cards'],
        populateOrderBy: { position: 1 },
        orderBy: { position: 1 },
      },
    );
  }
}
