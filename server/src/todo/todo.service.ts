import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Todo } from "./todo.entity"
import { Repository } from "typeorm"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { QueryTodoParamsDto } from "./dto/query-todo-params.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) { }


  async create(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...dto,
      board: { id: dto.boardId },

    });
    return await this.todoRepository.save(todo);
  }

  async getAll(dto: QueryTodoParamsDto) {
    const { page = 1, limit = 4, variant, boardId } = dto;
    try {
      let queryBuilder = this.todoRepository.createQueryBuilder('todo')
        .orderBy('todo.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (variant) {
        queryBuilder = queryBuilder.where('todo.variant = :variant', { variant });
      }

      if (boardId) {
        queryBuilder = queryBuilder.andWhere('todo.boardId = :boardId', { boardId });
      }

      const [todos, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, todos };
    } catch (e) {
      return { totalCount: 0, todos: [] }
    }
  }


  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }

    return todo
  }

  async editTodo(todoId: string, dto: UpdateTodoDto) {
    const todo = await this.findOne(todoId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(todo, dtoFilter);

    const updatedTodo = await this.todoRepository.save(todo);
    return updatedTodo;
  }


  async remove(id: string) {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo)
  }

}
