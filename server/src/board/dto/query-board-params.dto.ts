import { IsOptional } from 'class-validator';

export class QueryBoardParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  titles?: string;
}
