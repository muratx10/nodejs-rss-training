import { IsArray, IsString } from 'class-validator';
import { CreateColumnDto } from './create-column.dto';

export class CreateBoardDto {
  @IsString()
  title?: string;

  @IsArray()
  columns?: CreateColumnDto[];
}
