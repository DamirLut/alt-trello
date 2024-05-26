import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '#common/entities/base.entity';

import { BoardEntity } from './board.entity';
import { CardEntity } from './card.entity';

type Board = BoardEntity;
type Card = CardEntity;

@Entity({ tableName: 'columns' })
export class ColumnEntity extends BaseEntity {
  @ApiProperty({ example: 'TODO' })
  @Property()
  title: string;

  @ApiProperty({ type: String })
  @ManyToOne(() => BoardEntity, { deleteRule: 'cascade' })
  board: Board;

  @ApiProperty()
  @Property()
  position: number;

  @ApiProperty({ type: [CardEntity] })
  @OneToMany(() => CardEntity, (e) => e.column)
  cards = new Collection<Card>(this);
}
