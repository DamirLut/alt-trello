import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class MoveColumnDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsUUID()
  column: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  position: number;
}
