import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { CardEntity } from '#core/board/entities/card.entity';
import { UserEntity } from '#core/users/entities/user.entity';

type Card = CardEntity;
type User = UserEntity;

@Entity({ tableName: 'comments' })
export class CommentEntity {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty({ type: String })
  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @ApiProperty({ type: String })
  @Property({
    fieldName: 'updated_at',
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity)
  author: User;

  @ManyToOne(() => CardEntity, { cascade: [Cascade.REMOVE] })
  card: Card;

  @ApiProperty()
  @Property()
  comment: string;
}
