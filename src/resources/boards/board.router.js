/**
 * @module BoardsRouter
 */
const router = require('express').Router();
const boardsService = require('./board.service');

/**
 * @name GET_ALL_BOARDS
 * @memberOf module:BoardsRouter
 * @function
 * @route {GET} /boards/
 * @returns {IBoard[]|Array} Array of boards or empty array
 */
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

/**
 * @name GET_BOARD_BY_ID
 * @memberOf module:BoardsRouter
 * @function
 * @route {GET} /boards/:id
 * @returns {IBoard|string} Board object or string if not found
 */
router.route('/:id').get(async (req, res) => {
  const { params: { id } } = req;
  const board = await boardsService.getById(id);

  if (!board) {
    res.status(404).send('Board not found');
    return;
  }

  res.statusCode = 200;
  res.json(board);
});

/**
 * @name CREATE_BOARD
 * @memberOf module:BoardsRouter
 * @function
 * @route {POST} /boards/
 * @returns {IBoard} created board
 */
router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);

  res.statusCode = 201;
  res.json(board);
});

/**
 * @name UPDATE_BOARD_BY_ID
 * @memberOf module:BoardsRouter
 * @function
 * @route {PUT} /boards/:id
 * @returns {IBoard|string} updated board or string if not found
 */
router.route('/:id').put(async (req, res) => {
  const { body, params: { id } } = req;
  const updatedBoard = await boardsService.updateById(id, body);

  if (!updatedBoard) {
    res.status(404).send('Board not found');
    return;
  }

  res.statusCode = 200;
  res.json(updatedBoard);
});

/**
 * @name DELETE_BOARD_BY_ID
 * @memberOf module:BoardsRouter
 * @function
 * @route {DELETE} /boards/:id
 * @returns {IBoard|string} deleted board or string if not found
 */
router.route('/:id').delete(async (req, res) => {
  const { params: { id } } = req;
  const deletedBoard = await boardsService.deleteById(id);

  if (!deletedBoard) {

    res.status(404).send('Board not found');
    return;
  }

  res.statusCode = 204;
  res.json(deletedBoard);
});

module.exports = router;
