import {
  Collection,
  Entity,
  OneToMany,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '#common/entities/base.entity';
import { BoardMemberEntity } from '#core/board/entities/board-member.entity';
import { UserGroupEntity } from '#core/board/entities/user-group.entity';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Property({ type: 'datetime', defaultRaw: 'now()' })
  lastActiveAt: Date;

  @ApiProperty()
  @Property()
  username: string;

  @ApiProperty()
  @Property()
  avatar: string;

  @ApiProperty()
  @Property({ default: '' })
  email: string;

  @OneToMany(() => BoardMemberEntity, (e) => e.user)
  boards = new Collection<Rel<BoardMemberEntity>>(this);

  @OneToMany(() => UserGroupEntity, (e) => e.user)
  groups = new Collection<Rel<UserGroupEntity>>(this);
}
