import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteColumnDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  column_id: string;
}
