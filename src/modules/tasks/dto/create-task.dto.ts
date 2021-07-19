import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string | undefined;

  @IsInt()
  order: number | undefined;

  @IsString()
  description: string | undefined;

  @IsUUID()
  @IsOptional()
  userId: string | null | undefined;

  @IsOptional()
  @IsUUID()
  boardId: string | undefined;

  @IsOptional()
  @IsUUID()
  columnId: string | undefined;
}
