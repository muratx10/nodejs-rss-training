const uuid = require('uuid').v4;

class Task {
  constructor({
    boardId = null,
    columnId = null,
    description = 'test description',
    id= uuid(),
    order = 0,
    title = 'Task1',
    userId = null,
  } = {}) {
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
    this.id = id;
    this.order = order;
    this.title = title;
    this.userId = userId;
  }
}

module.exports = Task;
