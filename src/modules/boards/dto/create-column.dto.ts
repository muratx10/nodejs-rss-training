import { IsString, IsInt } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  title?: string;

  @IsInt()
  order?: number;
}
