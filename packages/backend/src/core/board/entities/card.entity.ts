import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import type { EditorJSData } from '../dto/update-content-card.dto';

import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';

type Column = ColumnEntity;
type Board = BoardEntity;

@Entity({ tableName: 'cards' })
export class CardEntity {
  @PrimaryKey({
    hidden: true,
  })
  id: number;

  @ApiProperty()
  @Property()
  card_id: number;

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt = new Date();

  @ApiProperty()
  @Property()
  title: string;

  @ApiProperty({ type: 'string', example: 'awesome-task' })
  @Property({ persist: false })
  get slug() {
    return this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }

  @ApiProperty({ type: String })
  @ManyToOne(() => ColumnEntity, { deleteRule: 'cascade' })
  column: Column;

  @ApiProperty({ type: String })
  @ManyToOne(() => BoardEntity, { deleteRule: 'cascade' })
  board: Board;

  @ApiProperty()
  @Property()
  position: number;

  @ApiProperty()
  @Property({ type: 'json' })
  content: EditorJSData;
}
