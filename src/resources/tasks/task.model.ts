import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Board from "resources/boards/board.model";
import User from "resources/users/user.model";
import { ITask } from "../../interfaces/interfeces";
import BoardColumn from "../boards/column.model";

@Entity()
class Task implements ITask{
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ length: 255})
  public title: string

  @Column('integer')
  public order: number

  @Column({length: 255})
  public description: string

  @Column({nullable: true})
  public userId: string | null

  @Column()
  public boardId: string

  @Column({nullable: true})
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
