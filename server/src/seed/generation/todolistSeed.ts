import { Injectable } from '@nestjs/common';
import { CreateTodolistDto } from 'src/todolist/dto/create-todolist.dto';
import { BoardService } from 'src/board/board.service';
import { TodolistService } from 'src/todolist/todolist.service';
import { SeederInterface } from 'src/seed/seeder.interface';
import { TodoVariant } from 'src/todo/type';

@Injectable()
export class TodolistSeed implements SeederInterface {
  constructor(
    private readonly boardService: BoardService,
    private readonly todolistService: TodolistService,
  ) { }

  async seed() {
    const boardsResponse = await this.boardService.getAll({ limit: '100' });
    const boards = boardsResponse.boards;

    let counter = 0;
    console.log(boards.length)
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];


      for (let j = 0; j < 4; j++) {
        counter++;
        const todovariant =
          j % 4 === 0
            ? TodoVariant.closed
            : j % 4 === 1
              ? TodoVariant.planned
              : j % 4 === 2
                ? TodoVariant.progress
                : TodoVariant.todo;

        const todolistSeed: CreateTodolistDto = {
          title: todovariant,
          boardId: board.id,

        };

        await new Promise((resolve) => setTimeout(resolve, 10));

        await this.todolistService.create(todolistSeed);
      }
    }
  }
}