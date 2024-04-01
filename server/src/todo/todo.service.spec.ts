import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoPriority, TodoVariant } from './type';
import { BoardService } from '../board/board.service';
import { Board } from '../board/board.entity';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Board),
          useClass: Repository,
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  describe('addTodo', () => {
    it('should add a todo successfully', async () => {
      const createTodoDto: CreateTodoDto = {
        description: 'TestTodo',
        boardId: '1',
        priority: TodoPriority.high,
        title: 'simple',
        variant: TodoVariant.planned,
        deadline: new Date()
      };

      const createdTodo = new Todo();
      createdTodo.id = '1';
      createdTodo.description = 'Super Strength';

      jest.spyOn(todoRepository, 'create').mockReturnValueOnce(createdTodo);
      jest.spyOn(todoRepository, 'save').mockResolvedValueOnce(createdTodo);

      const result = await todoService.create(createTodoDto);

      expect(result).toEqual(createdTodo);
    });
  });

  describe('removeTodo', () => {

    it('should throw NotFoundException if todo with specified id is not found', async () => {
      const todoId = '1';

      jest.spyOn(todoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(todoService.remove(todoId)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return a message if todo id is not provided', async () => {
      const result = await todoService.remove(null);

      expect(result).toEqual({ message: 'Todo id is not provided' });
    });
  });
});
