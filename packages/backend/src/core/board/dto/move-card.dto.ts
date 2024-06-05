import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class MoveCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;
  @ApiProperty()
  @IsUUID()
  target_column: string;
  @ApiProperty()
  @IsUUID()
  card_id: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  position: number;
}
