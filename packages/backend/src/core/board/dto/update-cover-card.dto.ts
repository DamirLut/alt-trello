import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateCoverCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  card_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cover_url: string;
}
