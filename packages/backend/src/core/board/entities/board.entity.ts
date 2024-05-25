import {
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '#core/users/entities/user.entity';

import { BoardSettingEntity } from './board-setting.entity';

type BoardSetting = BoardSettingEntity;

@Entity({ tableName: 'boards' })
export class BoardEntity {
  @ApiProperty({ example: 'fxrJQl4u' })
  @PrimaryKey()
  id: string;

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'created_at' })
  createdAt = new Date();

  @ApiProperty({ type: Date })
  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt = new Date();

  @ApiProperty({ example: 'My Board' })
  @Property()
  title: string;

  @ApiProperty({ type: Number, example: 1 })
  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ApiProperty({ type: 'string', example: 'my-board' })
  @Property({ persist: false })
  get slug() {
    return this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }

  @ApiProperty()
  @OneToOne(() => BoardSettingEntity, {
    nullable: true,
    owner: true,
    strategy: LoadStrategy.SELECT_IN,
  })
  settings?: BoardSetting;
}
