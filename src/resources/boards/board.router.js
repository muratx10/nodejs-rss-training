const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { params: { id } } = req;
  const board = await boardsService.getById(id);

  if (!board) {
    res.statusCode = 404;
    return res.end();
  }

  res.statusCode = 200;
  res.json(board);

  return res.end();
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);

  res.statusCode = 201;
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const { body, params: { id } } = req;
  const updatedBoard = await boardsService.updateById(id, body);

  res.statusCode = 200;
  res.json(updatedBoard);
});

router.route('/:id').delete(async (req, res) => {
  const { params: { id } } = req;
  const deletedBoard = await boardsService.deleteById(id);

  res.statusCode = 204;
  res.json(deletedBoard);
});

module.exports = router;
