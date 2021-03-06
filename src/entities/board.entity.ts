import { v4 as uuid } from "uuid";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
// eslint-disable-next-line import/no-cycle
import BoardColumn from "./column.entity";
import { IBoard, IColumn } from "../interfaces/interfaces";

@Entity({name: 'Board'})
class Board implements IBoard {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column('varchar', { length: 255 })
  public title: string;

  @OneToMany(
    () => BoardColumn,
    column => column.board,
    { onDelete: "CASCADE", cascade: true, eager: true }
  )

  public columns: IColumn[];

  constructor({
    id = uuid(),
    title = "board",
    columns = [{
      id: uuid(),
      title: "Column title",
      order: 0
    }]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
