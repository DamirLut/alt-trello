import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ExcludeMemberDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;
  @ApiProperty()
  @IsInt()
  user_id: number;
}
