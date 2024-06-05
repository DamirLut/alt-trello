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
  @IsPositive()
  target_column: string;
  @ApiProperty()
  @IsUUID()
  @IsPositive()
  card_id: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  position: number;
}
