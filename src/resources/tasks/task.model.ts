import {v4 as uuid} from 'uuid';

class Task {
  public boardId: string

  public columnId: string

  public description: string

  public id: string

  public order: number

  public title: string

  public userId: string

  constructor({
    boardId = '',
    columnId = '',
    description = 'test description',
    id= uuid(),
    order = 0,
    title = 'Task1',
    userId = '',
  } = {}) {
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
    this.id = id;
    this.order = order;
    this.title = title;
    this.userId = userId;
  }
}

module.exports = Task;
