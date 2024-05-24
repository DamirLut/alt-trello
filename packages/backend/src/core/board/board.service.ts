import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

import type { CreateBoardDTO } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  8,
);

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: EntityRepository<BoardEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(owner_id: number, dto: CreateBoardDTO) {
    const board = this.boardRepository.create({
      id: nanoid(),
      title: dto.title,
      owner: owner_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: '',
    });

    await this.entityManager.persistAndFlush(board);

    return board;
  }

  async getUserBoards(user_id: number) {
    return this.boardRepository.find({ owner: user_id });
  }
}
