import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
