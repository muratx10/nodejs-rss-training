import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Board from "entities/board.entity";
import User from "entities/user.entity";
import { ITask } from "../interfaces/interfaces";
import BoardColumn from "./column.entity";

@Entity({name: 'Task'})
class Task implements ITask{
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar', { length: 255})
  public title: string

  @Column('integer', {})
  public order: number

  @Column('varchar',{length: 255})
  public description: string

  @Column({nullable: true})
  public userId: string | null

  @Column('varchar', {length: 255})
  public boardId: string

  @Column('varchar', {nullable: true})
  public columnId: string | null

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user!: User;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: Board;

  @ManyToOne(() => BoardColumn, { onDelete: 'SET NULL'})
  column!: BoardColumn

  constructor(boardId: string, {
    columnId = null,
    description = '',
    id = uuid(),
    order = 0,
    title = '',
    userId = null,
  }: Partial<ITask>) {
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description || '';
    this.id = id || uuid();
    this.order = order || 0;
    this.title = title || '';
    this.userId = userId;
  }
}

export default Task;
