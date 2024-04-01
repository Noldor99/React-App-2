
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../src/board/board.entity';
import { BoardModule } from '../src/board/board.module';
import { Todo } from '../src/todo/todo.entity';
import { TodoModule } from '../src/todo/todo.module';
import CONNECTION_TEST from '../src/database/db.connection';

let app: INestApplication;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      TypeOrmModule.forRoot({
        ...CONNECTION_TEST,
        entities: [Todo, Board],
        synchronize: true,

      }),
      TodoModule,
      BoardModule,

    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

export { app };
