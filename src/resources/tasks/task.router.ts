import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { handleRequest } from "../../utils/handleRequest";
import Task from "../../entities/task.entity";
import * as tasksService from "./task.service";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(handleRequest(async (req, res) => {
    const { params: { boardId } } = req;
    const tasks = await tasksService.getAll(boardId!);

    res.status(StatusCodes.OK).json(tasks);
  }))
  .post(handleRequest(async (req, res) => {
    const { params: { boardId }, body } = req;
    const task = await tasksService.create(new Task(boardId!, body));

    if (!task) {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    } else {
      res.status(StatusCodes.CREATED).json(task);
    }
  }));

router
  .route("/:taskId")
  .get(handleRequest(async (req, res) => {
    const { params: { taskId, boardId } } = req;
    const task = await tasksService.getById(boardId!, taskId!);

    if (!task) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(task);
    }
  }))
  .put(handleRequest(async (req, res) => {
    const { params: { taskId, boardId }, body } = req;
    const updatedTask = await tasksService.updateById(boardId!, taskId!, body);

    if (!updatedTask) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(updatedTask);
    }
  }))
  .delete(handleRequest(async (req, res) => {
    const { params: { taskId } } = req;
    const deletedTask = await tasksService.deleteById(taskId!);

    if (!deletedTask) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } else {
      res.status(StatusCodes.NO_CONTENT).json(deletedTask);
    }
  }));

export default router;

