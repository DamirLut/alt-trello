import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class MoveCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  target_column: number;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  card_id: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  position: number;
}
