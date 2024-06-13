import { type EntityDTO, EntityRepository, sql } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

import { arrayMove } from '#root/lib/utils/array';

import { CreateCardDTO } from './dto/create-card.dto';
import { MoveCardDTO } from './dto/move-card.dto';
import { UpdateCardDTO } from './dto/update-card-title.dto';
import {
  EditorJSData,
  UpdateContentCardDTO,
} from './dto/update-content-card.dto';
import { UpdateCoverCardDTO } from './dto/update-cover-card.dto';
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

    const [maxCardId] = await this.entityManager
      .createQueryBuilder(ColumnEntity, 'column')
      .select(['id', sql`MAX(cards.card_id) + 1 as id`])
      .where({ board: dto.board_id })
      .join('cards', 'cards', { column: dto.column_id })
      .groupBy('column.id')
      .execute<{ id: number }[]>();

    const card = this.cardRepository.create({
      column: dto.column_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: '',
      title: dto.title.trim(),
      position: column.cards.length,
      card_id: maxCardId?.id ?? 1,
      board: dto.board_id,
      content: new EditorJSData(),
      files: 0,
      comments: 0,
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
    const card = await this.cardRepository.findOne({
      card_id: dto.card_id,
      board: dto.board_id,
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    card.column = column;

    const cardIndex = cards.findIndex((card) => card.card_id === dto.card_id);

    if (cardIndex !== -1) {
      cards = arrayMove(cards, cardIndex, dto.position);
    } else {
      cards.splice(dto.position, 0, card as unknown as EntityDTO<CardEntity>);
    }

    cards.forEach((card, position) => {
      const c = column.cards.find((c) => c.card_id === card.id);
      if (!c) return;
      c.position = position;
      this.entityManager.persist(c);
    });

    await this.entityManager.persistAndFlush(card);

    return card;
  }

  async getCard(card_id: number, board_id: string) {
    const card = await this.cardRepository.findOne({
      card_id,
      board: board_id,
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }

  async deleteCard(card_id: number, board_id: string) {
    const card = await this.cardRepository.findOne({
      card_id,
      board: board_id,
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    console.log('DELETE!');

    await this.entityManager.removeAndFlush(card);

    return card;
  }

  async setContent(dto: UpdateContentCardDTO) {
    const card = await this.cardRepository.findOne({
      card_id: dto.card_id,
      board: dto.board_id,
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    card.content = dto.content;

    await this.entityManager.persistAndFlush(card);

    return card;
  }

  async setCover(dto: UpdateCoverCardDTO) {
    const card = await this.cardRepository.findOne({
      card_id: dto.card_id,
      board: dto.board_id,
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    card.cover = dto.cover_url;

    await this.entityManager.persistAndFlush(card);

    return card;
  }

  async updateTitle(dto: UpdateCardDTO) {
    const card = await this.cardRepository.findOne({
      card_id: dto.card_id,
      board: dto.board_id,
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    card.title = dto.title;

    await this.entityManager.persistAndFlush(card);

    return card;
  }
}
