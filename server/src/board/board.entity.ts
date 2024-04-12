
import { Todolist } from 'src/todolist/todolist.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Todolist, (todolist) => todolist.board, { eager: true },)
  @JoinColumn({ name: 'boardId' })
  todolists: Todolist[];

  @CreateDateColumn()
  createdAt: Date

}
