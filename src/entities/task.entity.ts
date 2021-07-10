import { ITask } from 'interfaces/interfaces';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Board from './board.entity';
import User from './user.entity';

@Entity({ name: 'task' })
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  title!: string;

  @Column('integer')
  order!: number;

  @Column('varchar', { length: 200 })
  description!: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null = null;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId!: string;

  @Column('uuid', { nullable: true })
  columnId!: string;
}
