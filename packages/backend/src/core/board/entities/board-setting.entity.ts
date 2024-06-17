import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  type Rel,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BoardEntity } from './board.entity';

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
  board: Rel<BoardEntity>;

  @ApiProperty()
  @Property({ type: 'json' })
  data: BoardSetting;
}

export class BoardSetting {
  @ApiProperty({ type: () => BoardThemeSetting })
  theme: BoardThemeSetting;

  @ApiProperty({ type: () => [BoardLabelSetting] })
  labels: BoardLabelSetting[] = [];

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

export class BoardLabelSetting {
  @ApiProperty({ type: String })
  label = '';
  @ApiProperty({ type: String })
  color = '';
  @ApiProperty({ type: Number })
  id: number;

  constructor(props: Partial<BoardLabelSetting>) {
    Object.assign(this, props);
  }
}
