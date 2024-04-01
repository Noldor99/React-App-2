import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from 'src/validation/is-unique-constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, IsUniqueConstraint],
  exports: [TodoService],
})
export class TodoModule { }
