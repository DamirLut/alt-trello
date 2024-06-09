import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsNumber()
  card_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
