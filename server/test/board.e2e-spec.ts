import * as supertest from 'supertest';
import { CreateBoardDto } from '../src/board/dto/create-board.dto';
import { UpdateBoardDto } from '../src/board/dto/update-board.dto';
import { app } from './test-setup';

describe('/board (e2e)', () => {

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

  it('/board/pagination (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/board')
      .query({ page: 1, limit: 4 });

    expect(response.status).toBe(200);
    expect(response.body.boards).toBeDefined();
    expect(Array.isArray(response.body.boards)).toBe(true);
    expect(response.body.totalCount).toBeDefined();
    expect(typeof response.body.totalCount).toBe('number');
  });

  it('/board/:id (GET)', async () => {


    const response = await supertest(app.getHttpServer()).get(
      `/board/${boardId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('/board/:id (PUT)', async () => {
    const updateBoardDto: UpdateBoardDto = { title: 'NewName' };

    const createBoard = await supertest(app.getHttpServer())
      .post('/board')
      .send(createBoardDto)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const response = await supertest(app.getHttpServer())
      .patch(`/board/${createBoard.body.id}`)
      .send(updateBoardDto)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updateBoardDto.title);
  });

  it('/board/:id (DELETE)', async () => {
    const createBoard = await supertest(app.getHttpServer())
      .post('/board')
      .send(createBoardDto)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const response = await supertest(app.getHttpServer())
      .delete(`/board/${createBoard.body.id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
