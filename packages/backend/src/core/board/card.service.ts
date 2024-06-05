import {
  type EntityDTO,
  EntityManager,
  EntityRepository,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import { arrayMove } from '#root/lib/utils/array';

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

    let cards = column.cards.toArray();
    const card = await this.cardRepository.findOne({ id: dto.card_id });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    card.column = column;

    const cardIndex = cards.findIndex((card) => card.id === dto.card_id);

    if (cardIndex !== -1) {
      cards = arrayMove(cards, cardIndex, dto.position);
    } else {
      cards.splice(dto.position, 0, card as unknown as EntityDTO<CardEntity>);
    }

    cards.forEach((card, position) => {
      const c = column.cards.find((c) => c.id === card.id);
      if (!c) return;
      c.position = position;
      this.entityManager.persist(c);
    });

    await this.entityManager.persistAndFlush(card);

    return card;
  }
}
