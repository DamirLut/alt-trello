import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { ColumnEntity } from './column.entity';

type Column = ColumnEntity;

@Entity({ tableName: 'cards' })
export class CardEntity {
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

  @ApiProperty()
  @Property()
  position: number;
}
