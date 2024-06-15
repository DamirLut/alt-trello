import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BoardEntity } from './board.entity';
import { CardEntity } from './card.entity';

@Entity({ tableName: 'columns' })
export class ColumnEntity {
  @ApiProperty()
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'gen_random_uuid()',
  })
  id: string;

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt = new Date();

  @ApiProperty({ example: 'TODO' })
  @Property()
  title: string;

  @ApiProperty({ type: String })
  @ManyToOne(() => BoardEntity, { deleteRule: 'cascade' })
  board: Rel<BoardEntity>;

  @ApiProperty()
  @Property()
  position: number;

  @ApiProperty({ type: () => [CardEntity] })
  @OneToMany(() => CardEntity, (e) => e.column)
  cards = new Collection<Rel<CardEntity>>(this);
}
