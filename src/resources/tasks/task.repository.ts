import { ITask } from "../../interfaces/interfeces";
import { getDBConnection } from "../../db/psql";
import Task from "./task.model";

const DB = getDBConnection()!.getRepository(Task);

export const getAll = async (boardId: string): Promise<ITask[]> => DB.find({ where: { boardId } });

export const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask | undefined> => DB.findOne(taskId, { where: { boardId } });

export const create = async (item: ITask): Promise<ITask> => DB.save(item);

export const update = async (
  boardId: string,
  taskId: string,
  data: Partial<ITask>
): Promise<ITask> => {
  await DB.update(taskId, data);

  const task = await getById(boardId, taskId);

  return task!;
};

export const deleteById = async (taskId: string): Promise<boolean> => {
  const res = await DB.delete(taskId);
  return !!res.affected;
};
