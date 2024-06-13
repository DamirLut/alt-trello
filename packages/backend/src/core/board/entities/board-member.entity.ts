import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '#core/users/entities/user.entity';

import { BoardEntity } from './board.entity';

export enum BoardPermission {
  Owner = 'owner',
}

@Entity({ tableName: 'board-members' })
export class BoardMemberEntity {
  @ApiProperty()
  @PrimaryKey({ hidden: true })
  id: number;

  @Property({ fieldName: 'created_at', hidden: true })
  createdAt = new Date();

  @Property({
    fieldName: 'updated_at',
    onUpdate: () => new Date(),
    hidden: true,
  })
  updatedAt = new Date();

  @ManyToOne(() => BoardEntity, { hidden: true })
  board: Rel<BoardEntity>;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne({
    entity: () => UserEntity,
  })
  user: Rel<UserEntity>;

  @ApiProperty({ enum: BoardPermission, type: [BoardPermission] })
  @Property({
    type: 'jsonb',
    default: '[]',
  })
  permission: BoardPermission[];
}
