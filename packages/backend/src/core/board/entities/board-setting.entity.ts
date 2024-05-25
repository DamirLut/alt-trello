import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BoardEntity } from './board.entity';

type Board = BoardEntity;

@Entity({ tableName: 'board-settings' })
export class BoardSettingEntity {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'gen_random_uuid()',
    hidden: true,
  })
  id: string;

  @OneToOne(() => BoardEntity, (e) => e.settings, {
    orphanRemoval: true,
    deleteRule: 'cascade',
    hidden: true,
  })
  board: Board;

  @ApiProperty()
  @Property({ type: 'json' })
  data: BoardSetting;
}

export class BoardSetting {
  @ApiProperty({ type: () => BoardThemeSetting })
  theme: BoardThemeSetting;

  constructor(props: Partial<BoardSetting>) {
    Object.assign(this, props);
  }
}

export class BoardThemeSetting {
  @ApiProperty()
  color: string;

  constructor(props: Partial<BoardThemeSetting>) {
    Object.assign(this, props);
  }
}
