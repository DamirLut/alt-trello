import { Entity, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from '#common/entities/base.entity';
import type { AuthProviders } from '#config/env.config';
import { UserEntity } from '#core/users/entities/user.entity';

@Entity({ tableName: 'authorizations' })
export class AuthEntity extends BaseEntity {
  @Property()
  provider_id: string;

  @Property()
  provider: AuthProviders;

  @Property()
  email: string;

  @OneToOne(() => UserEntity, { owner: true })
  user: UserEntity;
}
