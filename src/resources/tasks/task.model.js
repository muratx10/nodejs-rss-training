const uuid = require('uuid').v4;

/**
 * @typedef ITask
 * @property {string} boardId - ID of the board
 * @property {string} columnId - ID of the column
 * @property {string} description - DESCRIPTION of the task
 * @property {string} id - ID of the task
 * @property {number} order - ORDER of the task
 * @property {string} title - TITLE of the task
 * @property {string} userId - ID of the user
 */

class Task {
  /**
   * @param {ITask} - Task information
   */
  constructor({
    boardId = null,
    columnId = null,
    description = 'test description',
    id= uuid(),
    order = 0,
    title = 'Task1',
    userId = null,
  } = {}) {
    /**
     * @property {string} boardId - ID of board
     */
    this.boardId = boardId;
    /**
     * @property {string} columnId - ID of column
     */
    this.columnId = columnId;
    /**
     * @property {string} description - Description of task
     */
    this.description = description;
    /**
     * @property {string} id - ID of task
     */
    this.id = id;
    /**
     * @property {number} order - Order of task
     */
    this.order = order;
    /**
     * @property {string} title - TITLE of task
     */
    this.title = title;
    /**
     * @property {string} userId - ID of user
     */
    this.userId = userId;
  }
}

module.exports = Task;
