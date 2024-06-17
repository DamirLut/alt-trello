import {
  Collection,
  Entity,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '#core/users/entities/user.entity';

import { BoardMemberEntity } from './board-member.entity';
import { BoardSettingEntity } from './board-setting.entity';
import { ColumnEntity } from './column.entity';

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

  @ApiProperty()
  @Property({ default: '' })
  description: string;

  @ApiProperty({ type: Number, example: 1 })
  @ManyToOne(() => UserEntity)
  owner: Rel<UserEntity>;

  @ApiProperty({ type: 'string', example: 'my-board' })
  @Property({ persist: false })
  get slug() {
    return this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }

  @ApiProperty({ type: BoardSettingEntity })
  @OneToOne(() => BoardSettingEntity, {
    nullable: true,
    owner: true,
    strategy: LoadStrategy.SELECT_IN,
    orphanRemoval: true,
  })
  settings?: Rel<BoardSettingEntity>;

  @ApiProperty({ type: () => [ColumnEntity] })
  @OneToMany(() => ColumnEntity, (e) => e.board)
  columns = new Collection<Rel<ColumnEntity>>(this);

  @ApiProperty({ type: () => [BoardMemberEntity] })
  @OneToMany(() => BoardMemberEntity, (e) => e.board, { orphanRemoval: true })
  members = new Collection<Rel<BoardMemberEntity>>(this);
}
