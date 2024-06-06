import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class MoveCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;
  @ApiProperty()
  @IsUUID()
  target_column: string;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  card_id: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  position: number;
}
