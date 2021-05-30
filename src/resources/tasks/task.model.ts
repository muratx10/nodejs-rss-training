import {v4 as uuid} from 'uuid';

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId?: string | null,
  boardId: string,
  columnId?: string,
}

class Task implements ITask{
  public id: string

  public title: string

  public order: number

  public description: string

  public userId?: string | null

  public boardId: string

  public columnId?: string

  constructor(task: ITask) {
    this.boardId = task.boardId || '';
    this.columnId = task.columnId;
    this.description = task.description || '';
    this.id = task.id || uuid();
    this.order = task.order || 0;
    this.title = task.title || '';
    this.userId = task.userId;
  }
}

export default Task;
