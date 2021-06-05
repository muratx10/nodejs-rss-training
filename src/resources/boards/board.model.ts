import {v4 as uuid} from 'uuid';

export interface IColumn {
  id: string,
  title: string,
  order: number,
}

export interface IBoard {
  id: string,
  title: string,
  columns: IColumn[]
}

class Board implements IBoard{
  public id: string

  public title: string

  public columns: IColumn[]

  constructor({
    id = uuid(),
    title = 'board',
    columns = [{
      id: uuid(),
      title: 'Column title',
      order: 0,
    }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
