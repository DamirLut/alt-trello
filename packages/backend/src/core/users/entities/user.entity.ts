import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '#common/entities/base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @ApiProperty()
  @Property({ type: 'datetime', defaultRaw: 'now()' })
  lastActiveAt: Date;

  @ApiProperty()
  @Property()
  username: string;

  @ApiProperty()
  @Property()
  avatar: string;
}
