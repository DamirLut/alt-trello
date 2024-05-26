import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  column_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
