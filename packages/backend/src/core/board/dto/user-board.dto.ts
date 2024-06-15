import { ApiProperty } from '@nestjs/swagger';

import { BoardEntity } from '../entities/board.entity';

export class UserBoardDTO {
  @ApiProperty({ type: [BoardEntity] })
  favorite: BoardEntity[];
  @ApiProperty({ type: [BoardEntity] })
  recently: BoardEntity[];
}
