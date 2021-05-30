import Board, { IBoard } from './board.model';

let boards = [
  new Board({title: 'Board1'}),
  new Board({title: 'Board2'}),
];

export const getAll = async () => boards;

export const getById = async (id: string) => boards
  .find(({ id: boardId }) => boardId === id);

export const create = async (data: IBoard) => {
  const board = new Board({...data});
  await boards.push(board);

  return board;
};

export const updateById = async (id: string, data: IBoard) => {
  let updatedBoard;

  boards.forEach((board, idx) => {
    if (board.id !== id) {
      return;
    }

    boards[idx] = { ...boards[idx], ...data };
    updatedBoard = boards[idx];
  });

  return updatedBoard;
};

export const deleteById = async (id: string) => {
  const deletedBoard = getById(id);
  boards = boards.filter(({ id: boardId }) => boardId !== id);

  return deletedBoard;
};
