const uuid = require('uuid').v4;

/**
 * @typedef IColumn
 * @property {string} id - ID of the column
 * @property {string} title - TITLE of the column
 * @property {number} order - ORDER of the column
 */

/**
 * @typedef IBoard
 * @property {string} id - ID of the board
 * @property {string} title - TITLE of the board
 * @property {Array<IColumn>} columns - Array of columns of the board
 */

class Board {
  /**
   * @param {IBoard} - Board information
   */
  constructor({
    id = uuid(),
    title = 'board',
    columns = [{
      id: uuid(),
      title: 'Column title',
      order: 0,
    }],
  } = {}) {
    /**
     * @property {string} id - ID of board
     */
    this.id = id;
    /**
     * @property {string} title - TITLE of board
     */
    this.title = title;
    /**
     * @property {IColumn[]} columns - Array of columns
     */
    this.columns = columns;
  }
}

module.exports = Board;
