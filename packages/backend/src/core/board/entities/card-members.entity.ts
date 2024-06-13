import {
  Collection,
  Entity,
  ManyToOne,
  OneToOne,
  type Rel,
} from '@mikro-orm/core';

import { BaseEntity } from '#common/entities/base.entity';

import { BoardMemberEntity } from './board-member.entity';
import { CardEntity } from './card.entity';

@Entity({ tableName: 'card-members' })
export class CardMemberEntity extends BaseEntity {
  @OneToOne(() => CardEntity)
  card: Rel<CardEntity>;

  @ManyToOne(() => BoardMemberEntity)
  member = new Collection<BoardMemberEntity>(this);
}
