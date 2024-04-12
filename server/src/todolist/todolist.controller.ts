import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryTodolistParamsDto } from './dto/query-todolist-params.dto';

@ApiTags('todolist')
@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Post()
  create(@Body() createTodolistDto: CreateTodolistDto) {
    return this.todolistService.create(createTodolistDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({ name: 'boardId', type: String, required: false })
  getAll(@Query() params: QueryTodolistParamsDto) {
    return this.todolistService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the todolist' })
  getOne(@Param('id') id: string) {
    return this.todolistService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') todolistId: string,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    return await this.todolistService.editTodolist(todolistId, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todolistService.remove(id);
  }
}
