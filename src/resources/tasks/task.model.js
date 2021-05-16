const uuid = require('uuid').v4;

class Task {
  constructor({
    id= uuid(),
    title = 'Task1',
    order = 0,
    description = 'test description',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
