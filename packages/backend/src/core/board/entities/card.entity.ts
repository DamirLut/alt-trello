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

import type { EditorJSData } from '../dto/update-content-card.dto';

import { BoardEntity } from './board.entity';
import { CardMemberEntity } from './card-member.entity';
import { ColumnEntity } from './column.entity';

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
  column: Rel<ColumnEntity>;

  @ApiProperty({ type: String })
  @ManyToOne(() => BoardEntity, { deleteRule: 'cascade' })
  board: Rel<BoardEntity>;

  @ApiProperty()
  @Property()
  position: number;

  @ApiProperty()
  @Property({ type: 'json' })
  content: EditorJSData;

  @ApiProperty({ type: String, nullable: true })
  @Property({ nullable: true })
  cover: string | null;

  @ApiProperty({ type: Number })
  @Property({ persist: false })
  get files() {
    const types = ['attaches', 'image'];
    if (!this.content) return 0;
    return this.content.blocks?.reduce((acc, value) => {
      if ('type' in value && typeof value.type === 'string') {
        return acc + +types.includes(value.type);
      }
      return acc;
    }, 0);
  }

  @ApiProperty({ type: Number })
  @Property({ default: 0 })
  comments: number;

  @ApiProperty({ type: () => [CardMemberEntity] })
  @OneToMany(() => CardMemberEntity, (e) => e.card, { orphanRemoval: true })
  members = new Collection<Rel<CardMemberEntity>>(this);
}
