import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '#core/users/entities/user.entity';

import { BoardEntity } from './board.entity';

@Entity({ tableName: 'user-groups' })
export class UserGroupEntity {
  @PrimaryKey({ hidden: true })
  id: number;
  @ApiProperty()
  @Property()
  title: string;
  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  user: Rel<UserEntity>;
  @ApiProperty({ type: () => [BoardEntity] })
  @ManyToMany(() => BoardEntity)
  boards = new Collection<Rel<BoardEntity>>(this);
  @ApiProperty({ nullable: true })
  @Property({ persist: false })
  system: boolean;
}
