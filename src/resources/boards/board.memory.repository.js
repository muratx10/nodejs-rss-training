const Board = require('./board.model');
/**
 * @module BoardsRepo
 */

let boards = [
  new Board({title: 'Board1'}),
  new Board({title: 'Board2'}),
];

/**
 * @memberOf module:BoardsRepo
 * @returns {Promise<IBoard[]>}
 */
const getAll = async () => boards;

/**
 * @memberOf module:BoardsRepo
 * @param {string} id - ID of the board
 * @returns {Promise<IBoard>}
 */
const getById = async (id) => boards
  .find(({ id: boardId }) => boardId === id);

/**
 * @memberOf module:BoardsRepo
 * @param {IBoard} data - New board's data
 * @returns {Promise<IBoard>}
 */
const create = async (data) => {
  const board = new Board({...data});
  await boards.push(board);

  return board;
};

/**
 * @memberOf module:BoardsRepo
 * @param {string} id - ID of the board that needs to be updated
 * @param {Partial<IBoard>} data - Optional properties to update board
 * @returns {Promise<IBoard>} updated board
 */
const updateById = async (id, data) => {
  let updatedBoard;

  await boards.forEach((board, idx) => {
    if (board.id !== id) return;

    boards[idx] = {id, ...boards[idx], ...data};
    updatedBoard = boards[idx];
  })

  return updatedBoard;
};

/**
 * @memberOf module:BoardsRepo
 * @param {string} id - ID of the board to delete
 * @returns {Promise<IBoard>} deleted board
 */
const deleteById = async (id) => {
  const deletedBoard = getById(id);
  boards = boards.filter(({ id: boardId }) => boardId !== id);

  return deletedBoard;
}

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
