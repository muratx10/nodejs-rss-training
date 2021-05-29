/**
 * @module TasksRouter
 */
const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

/**
 * @name CREATE_TASK
 * @memberOf module:TasksRouter
 * @function
 * @route {POST} /boards/:boardId/tasks/
 * @returns {ITask} created task
 */
router.route('/').post(async (req, res) => {
  const { params: { boardId } } = req;
  const task = await taskService.create({...req.body, boardId});

  res.type('application/json');
  res.statusCode = 201;
  res.json(task);
});

/**
 * @name GET_ALL_TASKS
 * @memberOf module:TasksRouter
 * @function
 * @route {GET} /boards/:boardId/tasks/
 * @returns {ITask[]|Array} Array of tasks or empty array
 */
router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();

  res.json(tasks);
});

/**
 * @name UPDATE_TASK_BY_ID
 * @memberOf module:TasksRouter
 * @function
 * @route {PUT} /boards/:boardId/tasks/:id
 * @returns {ITask|string} updated task object or string if not found
 */
router.route('/:id').put(async (req, res) => {
  const { params: { id, boardId } } = req;
  const { body: { columnId, description, order, title, userId } } = req;
  const updatedTask = await taskService.updateById({
    boardId,
    columnId,
    description,
    id,
    order,
    title,
    userId,
  });

  if (!updatedTask) {
    res.status(404).send('Not found');
    return;
  }

  res.statusCode = 200;
  res.json(updatedTask);
});

/**
 * @name GET_TASK_BY_ID
 * @memberOf module:TasksRouter
 * @function
 * @route {GET} /boards/:boardId/tasks/:id
 * @returns {ITask|string} Task object or string if not found
 */
router.route('/:id').get(async (req, res) => {
  const { params: { id } } = req;
  const task = await taskService.getById(id);

  if (!task) {
    res.status(404).send('Not found');
    return;
  }

  res.statusCode = 200;
  res.json(task);
});

/**
 * @name DELETE_TASK_BY_ID
 * @memberOf module:TasksRouter
 * @function
 * @route {DELETE} /boards/:boardId/tasks/:id
 * @returns {ITask|string} deleted task or string if not found
 */
router.route('/:id').delete(async (req, res) => {
  const { params: { id } } = req;
  const deletedTask = await taskService.deleteById(id);

  if (!deletedTask) {
    res.status(404).send('Not found');
    return;
  }

  res.statusCode = 204;
  res.json(deletedTask);
});

module.exports = router;
