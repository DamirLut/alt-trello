import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

import type { CreateBoardDTO } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';
import {
  BoardSetting,
  BoardSettingEntity,
  BoardThemeSetting,
} from './entities/board-setting.entity';
import { ColumnService } from './column.service';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  8,
);

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: EntityRepository<BoardEntity>,
    @InjectRepository(BoardSettingEntity)
    private readonly boardSettingRepository: EntityRepository<BoardSettingEntity>,
    private readonly entityManager: EntityManager,
    private readonly columnService: ColumnService,
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

    const settings = this.boardSettingRepository.create({
      data: new BoardSetting({
        theme: new BoardThemeSetting({ color: dto.color }),
      }),
      board,
    });

    await Promise.all([
      this.columnService.create({ board_id: board.id, title: 'Todo' }),
      this.columnService.create({ board_id: board.id, title: 'Working' }),
      this.columnService.create({ board_id: board.id, title: 'Done' }),
    ]);

    await this.entityManager.persistAndFlush(settings);

    return board;
  }

  async getUserBoards(user_id: number) {
    return this.boardRepository.find(
      { owner: user_id },
      { populate: ['settings.data'], orderBy: { createdAt: 1 } },
    );
  }

  async findById(id: string) {
    return this.boardRepository.findOne(
      {
        id,
      },
      {
        populate: ['settings.data', 'columns'],
      },
    );
  }
}
