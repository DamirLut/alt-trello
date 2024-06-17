import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLabelDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;
  @ApiProperty()
  @IsInt()
  label_id: number;
  @ApiProperty()
  @IsString()
  label: string;
}
