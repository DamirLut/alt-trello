import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '#common/entities/base.entity';

import { ColumnEntity } from './column.entity';

type Column = ColumnEntity;

@Entity({ tableName: 'cards' })
export class CardEntity extends BaseEntity {
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

  @ApiProperty({ type: Number })
  @ManyToOne(() => ColumnEntity, { deleteRule: 'cascade' })
  column: Column;

  @ApiProperty()
  @Property()
  position: number;
}
