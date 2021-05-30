import {v4 as uuid} from 'uuid';

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}

class Task implements ITask{
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

export default Task;
