import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { CreateCardDTO } from './dto/create-card.dto';
import type { MoveCardDTO } from './dto/move-card.dto';
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
    return this.cardRepository.find(
      {
        column: {
          board: board_id,
        },
      },
      {
        orderBy: { position: 1 },
      },
    );
  }

  async moveCard(dto: MoveCardDTO) {
    const column = await this.columnRepository.findOne(
      {
        id: dto.target_column,
        board: dto.board_id,
      },
      {
        populate: ['cards'],
        populateOrderBy: { position: 1 },
      },
    );

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const card = await this.cardRepository.findOne({ id: dto.card_id });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    card.column = column;

    const temp = column.cards.map((card) => card.id);

    console.log(temp.indexOf(dto.card_id), dto.position);

    console.log(temp);

    temp.splice(temp.indexOf(dto.card_id), 1);
    temp.splice(dto.position, 0, dto.card_id);

    console.log(temp);

    temp.forEach((cardId, position) => {
      const card = column.cards.find((c) => c.id === cardId)!;
      card.position = position;
      this.entityManager.persist(card);
    });

    await this.entityManager.persistAndFlush(card);

    return card;
  }
}
