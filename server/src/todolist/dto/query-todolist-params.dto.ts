import { IsOptional } from 'class-validator';

export class QueryTodolistParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  boardId?: string;
}
