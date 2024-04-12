import { Board } from 'src/board/board.entity';
import { Todo } from 'src/todo/todo.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('todolist')
export class Todolist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Todo, (todo) => todo.todolist, { eager: true },)
  @JoinColumn({ name: 'todolistId' })
  todos: Todo[];

  @ManyToOne(() => Board, (board) => board.todolists, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
