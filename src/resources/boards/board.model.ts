import {v4 as uuid} from 'uuid';

class Board {
  public id: string

  public title: string

  public columns: {
    id: string,
    title: string,
    order: number,
  }[]

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

module.exports = Board;
