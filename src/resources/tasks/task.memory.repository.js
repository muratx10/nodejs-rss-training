const Task = require('./task.model');

let tasks = [
  new Task(),
];

const create = async (data) => {
  const task = new Task({...data});

  await tasks.push(task);

  return task;
}

const getAll = async () => tasks;

const updateById = async (data) => {
  const { title, order, description, userId, boardId, columnId } = data;
  const taskIdx = tasks
    .findIndex(({id: taskId}) => taskId === data.id);
  const updatedTask = {
    ...tasks[taskIdx], title, order, description, userId, boardId, columnId
  };

  tasks.splice(taskIdx, 1, updatedTask);

  return updatedTask;
};

const getById = async (id) => tasks
  .find(({ id: taskId }) => taskId === id);

const deleteById = async (id) => {
  const deletedTask = getById(id);
  tasks = tasks.filter(({ id: taskId }) => taskId !== id);

  return deletedTask;
};

const deleteByBoardId = async (boardId) => {
  const tasksForSelectedBoard = tasks
    .filter(({boardId: id}) => id === boardId);

  await Promise.allSettled(tasksForSelectedBoard
    .map(({id}) => deleteById(id)));

  return 'Deleted';
};

const removeUsersTasks = async (id) => {
  const usersTasks = tasks.filter(({ userId }) => userId === id);
  await Promise.allSettled(usersTasks
    .map(({ id: taskId }) => updateById({
      id: taskId,
      userId: null,
    })));

  return 'Deleted';
};

module.exports = {
  create,
  deleteByBoardId,
  deleteById,
  getAll,
  getById,
  removeUsersTasks,
  updateById,
};
