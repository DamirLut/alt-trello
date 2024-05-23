import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt = new Date();
}
