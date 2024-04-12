import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Todolist } from "./todolist.entity"
import { Repository } from "typeorm"
import { CreateTodolistDto } from "./dto/create-todolist.dto"
import { QueryTodolistParamsDto } from "./dto/query-todolist-params.dto"
import { UpdateTodolistDto } from "./dto/update-todolist.dto"

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private todolistRepository: Repository<Todolist>,
  ) { }


  async create(dto: CreateTodolistDto): Promise<Todolist> {

    const todolist = this.todolistRepository.create({
      ...dto,
      board: { id: dto.boardId },
    });
    return await this.todolistRepository.save(todolist);
  }

  async getAll(dto: QueryTodolistParamsDto) {
    const { page = 1, limit = 4, boardId } = dto;
    try {
      let queryBuilder = this.todolistRepository.createQueryBuilder('todolist')
        .leftJoinAndSelect('todolist.todos', 'todos')
        .orderBy('todolist.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);


      if (boardId) {
        queryBuilder = queryBuilder.andWhere('todolist.boardId = :boardId', { boardId });
      }
      const [todolists, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, todolists };
    } catch (e) {
      return { totalCount: 0, todolists: [] }
    }
  }

  async findOne(id: string): Promise<Todolist> {
    const todolist = await this.todolistRepository.findOne({
      where: { id },
      relations: { board: true },
    })

    if (!todolist) {
      throw new NotFoundException(`Todolist with ID ${id} not found`)
    }

    return todolist
  }

  async editTodolist(todolistId: string, dto: UpdateTodolistDto) {
    const todolist = await this.findOne(todolistId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(todolist, dtoFilter);

    const updatedTodolist = await this.todolistRepository.save(todolist);
    return updatedTodolist;
  }


  async remove(id: string) {
    const todolist = await this.findOne(id);
    return this.todolistRepository.remove(todolist)
  }

}
