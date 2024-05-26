import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @Property({ fieldName: 'created_at', hidden: true })
  createdAt = new Date();

  @Property({
    fieldName: 'updated_at',
    onUpdate: () => new Date(),
    hidden: true,
  })
  updatedAt = new Date();
}
