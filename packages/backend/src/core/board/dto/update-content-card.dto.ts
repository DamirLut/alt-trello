import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateContentCardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  board_id: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  card_id: number;

  @ApiProperty({ type: () => EditorJSData })
  @IsObject()
  @IsNotEmpty()
  content: EditorJSData;
}

export class EditorJSData {
  @ApiProperty()
  @IsString()
  version: string;
  @ApiProperty()
  @IsNumber()
  time: number;
  @ApiProperty()
  @IsObject({ each: true })
  blocks: object[];
}
