import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodolistDto {

  @ApiProperty({
    example: '000',
  })
  @IsNotEmpty()
  readonly boardId: string;

  @ApiProperty({
    example: 'Amber',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Must be at least 3 characters long' })
  readonly title: string;

}
