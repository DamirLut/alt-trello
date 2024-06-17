import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { BoardPermission } from '../entities/board-member.entity';

export class InviteMemberDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;
  @ApiProperty()
  @IsInt()
  user_id: number;
  @ApiProperty()
  @IsEnum(BoardPermission)
  permission: BoardPermission;
}
