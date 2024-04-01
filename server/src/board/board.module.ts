import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from '../validation/is-unique-constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, IsUniqueConstraint],
  exports: [BoardService],
})
export class BoardModule { }
