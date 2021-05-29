const Board = require('./board.model');

let boards = [
  new Board({title: 'Board1'}),
  new Board({title: 'Board2'}),
];

const getAll = async () => boards;

const getById = async (id) => boards
  .find(({ id: boardId }) => boardId === id);

const create = async (data) => {
  const board = new Board({...data});
  await boards.push(board);

  return board;
};

const updateById = async (id, data) => {
  let updatedBoard;

  await boards.forEach((board, idx) => {
    if (board.id !== id) return;

    boards[idx] = {id, ...boards[idx], ...data};
    updatedBoard = boards[idx];
  })

  return updatedBoard;
};

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
