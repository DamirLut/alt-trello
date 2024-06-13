import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { customAlphabet } from 'nanoid';

import type { CreateBoardDTO } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';
import {
  BoardMemberEntity,
  BoardPermission,
} from './entities/board-member.entity';
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
    @InjectRepository(BoardMemberEntity)
    private readonly memberRepository: EntityRepository<BoardMemberEntity>,
    private readonly entityManager: EntityManager,
    private readonly columnService: ColumnService,
    public readonly eventEmitter: EventEmitter2,
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

    const member = this.memberRepository.create({
      board,
      user: owner_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      permission: [BoardPermission.Owner],
    });

    board.members.add(member);

    this.entityManager.persist(member);
    await this.entityManager.persistAndFlush(board);

    const settings = this.boardSettingRepository.create({
      data: new BoardSetting({
        theme: new BoardThemeSetting({ color: dto.color }),
      }),
      board,
    });

    await this.columnService.create({
      board_id: board.id,
      title: 'Нужно сделать',
    });
    await this.columnService.create({
      board_id: board.id,
      title: 'В процессе',
    });
    await this.columnService.create({ board_id: board.id, title: 'Готово' });

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
    const board = await this.boardRepository.findOne(
      {
        id,
      },
      {
        populate: ['settings.data', 'columns', 'members.user'],
        populateOrderBy: { columns: { position: 1 } },
      },
    );
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }
}
