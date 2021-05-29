/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('src/resources/users/user.router');
const boardRouter = require('src/resources/boards/board.router');
const taskRouter = require('src/resources/tasks/task.router');
// import express from 'express';
// import swaggerUI from 'swagger-ui-express';
// import path from 'path';
// import YAML from 'yamljs';
// import userRouter from'./resources/users/user.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

module.exports = app;
