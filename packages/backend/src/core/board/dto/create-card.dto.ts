import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsUUID()
  column_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
