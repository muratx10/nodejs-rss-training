import {Router} from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {handleRequest} from '../../utils/handleRequest';
import Board from './board.model';
import * as boardsService from './board.service';

const router = Router();

router
  .route('/')
  .get(handleRequest(async (_req, res) => {
    const boards = await boardsService.getAll();

    res.status(StatusCodes.OK).json(boards);
  }))
  .post(handleRequest(async (req, res) => {
    const board = await boardsService.create(new Board(req.body));

    res.status(StatusCodes.CREATED).json(board);
  }));

router
  .route('/:boardId')
  .get(handleRequest(async (req, res) => {
    const {params: {boardId}} = req;
    const board = await boardsService.getById(boardId!);

    if (!board) res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    else res.status(StatusCodes.OK).json(board);
  }))
  .put(handleRequest(async (req, res) => {
    const {params: {boardId}, body} = req;
    const updatedBoard = await boardsService.updateById(boardId!, body);

    if (!updatedBoard) res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    else res.status(StatusCodes.OK).json(updatedBoard);
  }))
  .delete(handleRequest(async (req, res) => {
    const {params: {boardId}} = req;
    const deletedBoard = await boardsService.deleteById(boardId!);

    if (!deletedBoard) res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    else res.status(StatusCodes.NO_CONTENT).json(deletedBoard);
  }));

export default router;
