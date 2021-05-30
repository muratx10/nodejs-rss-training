import { notFoundError } from '../../constants';
import { tasks } from '../tasks/task.memory.repository';
import Board, { IBoard } from './board.model';

export const boards = [
  new Board({title: 'Board1'}),
  new Board({title: 'Board2'}),
];

export const getAll = async () => boards;

export const getById = async (id: string) => {
  if (!boards[id]) throw new Error(notFoundError);

  return boards[id];
};

export const create = async (board: IBoard) => {
  boards[board.id] = board;
  tasks[board.id] = {};

  return boards[board.id];
};

export const updateById = async (id: string, data: IBoard) => {
  if (!boards[id]) throw new Error(notFoundError);

  boards[id] = { ...boards[id], ...data };

  return boards[id];
};

export const deleteById = async (id: string) => {
  if (!boards[id]) throw new Error(notFoundError);

  const deletedBoard = boards[id];

  delete boards[id];
  delete tasks[id];

  return deletedBoard;
};
