import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsInt()
  card_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;
}
