const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.route('/').post(async (req, res) => {
  const { params: { boardId } } = req;
  const task = await taskService.create({...req.body, boardId});

  res.type('application/json');
  res.statusCode = 201;
  res.json(task);
});

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();

  res.json(tasks);
});

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

  res.statusCode = 200;
  res.json(updatedTask);
});

router.route('/:id').get(async (req, res) => {
  const { params: { id } } = req;
  const task = await taskService.getById(id);

  if (!task) {
    res.statusCode = 404;
    return res.end();
  }

  res.statusCode = 200;
  res.json(task);

  return res.end();
});

router.route('/:id').delete(async (req, res) => {
  const { params: { id } } = req;
  const deletedTask = await taskService.deleteById(id);

  res.statusCode = 204;
  res.json(deletedTask);
});

module.exports = router;
