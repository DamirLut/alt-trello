import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '#core/users/entities/user.entity';

import { CardEntity } from './card.entity';

@Entity({ tableName: 'card-members' })
export class CardMemberEntity {
  @ApiProperty()
  @PrimaryKey({ hidden: true })
  id: number;

  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @ManyToOne(() => CardEntity)
  card: Rel<CardEntity>;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne({
    entity: () => UserEntity,
  })
  user: Rel<UserEntity>;
}
