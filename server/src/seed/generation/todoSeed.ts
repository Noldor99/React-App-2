import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoPriority, TodoVariant } from 'src/todo/type';
import { faker } from '@faker-js/faker';
import { BoardService } from 'src/board/board.service';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class TodoSeed implements SeederInterface {
  constructor(
    private readonly boardService: BoardService,
    private readonly todoService: TodoService,
  ) { }

  async seed() {
    const boardsResponse = await this.boardService.getAll({ limit: '100' });
    const boards = boardsResponse.boards;

    let counter = 0;
    console.log(boards.length)
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];


      for (let j = 24; j > 0; j--) {
        counter++;
        const todovariant =
          j % 4 === 0
            ? TodoVariant.todo
            : j % 4 === 1
              ? TodoVariant.progress
              : j % 4 === 2
                ? TodoVariant.planned
                : TodoVariant.closed;

        const todoSeed: CreateTodoDto = {
          title: `Todo${counter}`,
          description: faker.lorem.paragraph(),
          boardId: board.id,
          priority: TodoPriority.medium,
          variant: todovariant,
        };

        await new Promise((resolve) => setTimeout(resolve, 10));

        await this.todoService.create(todoSeed);
      }
    }
  }
}