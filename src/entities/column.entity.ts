import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
// eslint-disable-next-line import/no-cycle
import Board from "./board.entity";
import { IBoard, IColumn } from "../interfaces/interfaces";

@Entity({name: 'Column'})
class BoardColumn implements IColumn {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column("integer")
  order: number;

  @ManyToOne(() => Board, { onDelete: "CASCADE" })
  board!: IBoard;

  @Column('varchar', {length: 255})
  boardId: string = "";

  constructor({
    id = uuid(),
    title = "",
    order = 0
  }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default BoardColumn;
