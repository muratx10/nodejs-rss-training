import { ITask } from './task.model';

class TasksDB {
  private readonly _tasks: Record<string, Map<string, ITask>>;

  constructor() {
    this._tasks = {};
  }

  async getAll(boardId: string): Promise<ITask[]> {
    return this._tasks[boardId]
      ? Array.from(this._tasks[boardId]!.values())
      : [];
  }

  async getById(boardId: string, id: string): Promise<ITask | undefined> {
    return this._tasks[boardId]
      ? this._tasks[boardId]!.get(id)
      : undefined;
  }

  async create(boardId: string, id: string, task: ITask): Promise<ITask> {
    if (!this._tasks[boardId]) this._tasks[boardId] = new Map();

    this._tasks[boardId]!.set(id, task);

    return task;
  }

  async update(boardId: string, id: string, task: Partial<ITask>): Promise<ITask> {
    const taskToUpdate = this._tasks[boardId]
      ? this._tasks[boardId]!.get(id)
      : null;

    if (!this._tasks[boardId]) this._tasks[boardId] = new Map();

    const updatedTask = {...taskToUpdate, ...task} as ITask;

    this._tasks[boardId]!.set(id, updatedTask);

    return updatedTask;
  }

  async deleteById(boardId: string, id: string): Promise<ITask | undefined> {
    const deletedTask = this._tasks[boardId]!.get(id);

    if (deletedTask) this._tasks[boardId]!.delete(id);

    return deletedTask;
  }
}

export default new TasksDB();
