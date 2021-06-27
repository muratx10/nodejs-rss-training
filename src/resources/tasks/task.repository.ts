import { getConnection  } from "typeorm";
import { ITask } from "../../interfaces/interfeces";
import Task from "../../entities/task.entity";

export const getAll = async (boardId: string): Promise<ITask[]> => getConnection().getRepository(Task).find({ where: { boardId } });

export const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask | undefined> => getConnection().getRepository(Task).findOne(taskId, { where: { boardId } });

export const create = async (item: ITask): Promise<ITask> => getConnection().getRepository(Task).save(item);

export const update = async (
  boardId: string,
  taskId: string,
  data: Partial<ITask>
): Promise<ITask> => {
  await getConnection().getRepository(Task).update(taskId, data);

  const task = await getById(boardId, taskId);

  return task!;
};

export const deleteById = async (taskId: string): Promise<boolean> => {
  const res = await getConnection().getRepository(Task).delete(taskId);
  return !!res.affected;
};
