import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { SetType } from '#common/mikro-orm/set-type';
import { UserEntity } from '#core/users/entities/user.entity';

import { BoardEntity } from './board.entity';

export enum BoardPermission {
  Owner = 'owner',
  Member = 'member',
  Commenter = 'commenter',
  Reader = 'reader',
}

@Entity({ tableName: 'board-members' })
export class BoardMemberEntity {
  @ApiProperty()
  @PrimaryKey({ hidden: true })
  id: number;

  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @Property({
    fieldName: 'updated_at',
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();

  @ManyToOne(() => BoardEntity)
  board: Rel<BoardEntity>;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne({
    entity: () => UserEntity,
  })
  user: Rel<UserEntity>;

  @ApiProperty({ enum: BoardPermission, type: [BoardPermission] })
  @Property({
    type: SetType,
    default: '[]',
  })
  permission = new Set<BoardPermission>();
}
