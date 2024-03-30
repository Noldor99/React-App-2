import { IsOptional } from 'class-validator';
import { TodoVariant } from '../type';

export class QueryTodoParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  boardId?: string;

  @IsOptional()
  variant?: TodoVariant;
}
