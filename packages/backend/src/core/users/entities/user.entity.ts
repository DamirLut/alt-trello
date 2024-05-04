import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '#common/entities/base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ type: 'datetime', defaultRaw: 'now()' })
  lastActiveAt: Date;
}
