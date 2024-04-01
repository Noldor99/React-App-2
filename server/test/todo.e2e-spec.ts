
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import * as supertest from 'supertest';
import { app } from './test-setup';
import { TodoPriority, TodoVariant } from '../src/todo/type';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';

describe('/todo (e2e)', () => {
  let createdTodoId: number;

  let boardId: string;

  const createBoardDto: CreateBoardDto = {
    title: 'Superman'
  };

  it('/board (POST)', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/board')
      .send(createBoardDto)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    boardId = response.body.id;
  });

  it('/todo (POST)', async () => {
    const createTodoDto: CreateTodoDto = {
      description: 'TestTodo',
      boardId: boardId,
      priority: TodoPriority.high,
      title: 'simple',
      variant: TodoVariant.planned,
      deadline: new Date()
    };

    const response = await supertest(app.getHttpServer())
      .post('/todo')
      .send(createTodoDto)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    createdTodoId = response.body.id;
  });

  it('/todo/:id (DELETE)', async () => {
    const createTodoDto: CreateTodoDto = {
      description: 'TestTodo',
      boardId: boardId,
      priority: TodoPriority.high,
      title: 'simple',
      variant: TodoVariant.planned,
      deadline: new Date()
    };

    const createTodoResponse = await supertest(app.getHttpServer())
      .post('/todo')
      .send(createTodoDto)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(createTodoResponse.status).toBe(201);
    expect(typeof createTodoResponse).toBe('object');


    const deleteTodoResponse = await supertest(app.getHttpServer())
      .delete(`/todo/${createTodoResponse.body.id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(deleteTodoResponse.status).toBe(200);
    expect(typeof deleteTodoResponse.body).toBe('object');
  });
});
