import {v1 as uuid} from 'uuid';

export interface IColumn {
  id: string,
  title: string,
  order: number,
}

export default class Column implements IColumn {
  public id: string

  public title: string

  public order: number

  constructor(options: IColumn) {
    this.id = options.id || uuid();
    this.title = options.title || '';
    this.order = options.order || 0;
  }

  static toResponse(column: IColumn) {
    const { id, title, order } = column;
    return { id, title, order };
  }

  static fromRequest(column: IColumn) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}
