import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
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
import { UserGroupEntity } from './entities/user-group.entity';
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
    @InjectRepository(UserGroupEntity)
    private readonly groupsRepository: EntityRepository<UserGroupEntity>,
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
    const groups = await this.groupsRepository.find(
      { user: user_id },
      { populate: ['boards', 'boards.settings'], exclude: ['user'] },
    );

    const members = await this.memberRepository.find(
      { user: user_id },
      {
        populate: ['board', 'board.settings', 'board.owner'],
        exclude: ['user', 'permission'],
      },
    );

    members.forEach((member) => {
      groups.push({
        title: 'Доски ' + member.board.owner.username,
        boards: [member.board],
      } as unknown as (typeof groups)[0]);
    });

    const owners = await this.boardRepository.find(
      {
        owner: user_id,
      },
      { populate: ['settings'] },
    );

    groups.splice(0, 0, {
      title: 'Все доски',
      boards: owners,
      system: true,
    } as unknown as (typeof groups)[0]);

    return groups;
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

  async toggleFavorite(user_id: number, board_id: string) {
    const board = await this.boardRepository.findOne({ id: board_id });
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const FAVORITE_NAME = 'Избранные';

    let favorites = await this.groupsRepository.findOne(
      { user: user_id, title: FAVORITE_NAME },
      { populate: ['boards'] },
    );

    if (!favorites) {
      favorites = this.groupsRepository.create({
        system: false,
        title: FAVORITE_NAME,
        user: user_id,
      }) as NonNullable<typeof favorites>;
    }

    if (favorites.boards.exists((item) => item.id === board.id)) {
      favorites.boards.remove(board);
    } else {
      favorites.boards.add(board);
    }

    await this.entityManager.persistAndFlush(favorites);

    return favorites;
  }
}
