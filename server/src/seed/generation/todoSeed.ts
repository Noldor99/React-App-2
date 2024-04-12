import { Injectable } from '@nestjs/common';
import { SeederInterface } from '../seeder.interface';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoPriority, TodoVariant } from 'src/todo/type';
import { faker } from '@faker-js/faker';
import { TodolistService } from 'src/todolist/todolist.service';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class TodoSeed implements SeederInterface {
  constructor(
    private readonly todolistService: TodolistService,
    private readonly todoService: TodoService,
  ) { }

  async seed() {
    const todolistsResponse = await this.todolistService.getAll({ limit: '100' });
    const todolists = todolistsResponse.todolists;

    let counter = 0;
    console.log(todolists.length)
    for (let i = 0; i < todolists.length; i++) {
      const todolist = todolists[i];


      for (let j = 4; j > 0; j--) {
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
          todolistId: todolist.id,
          priority: TodoPriority.medium
        };

        await new Promise((resolve) => setTimeout(resolve, 10));

        await this.todoService.create(todoSeed);
      }
    }
  }
}