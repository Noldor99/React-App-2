import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoPriority } from './type';
import { Todolist } from 'src/todolist/todolist.entity';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TodoPriority, default: TodoPriority.low })
  priority: TodoPriority;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Todolist, (todolist) => todolist.todos, {
    onDelete: 'CASCADE',
  })
  todolist: Todolist;

  @Column()
  todolistId: string;

}
