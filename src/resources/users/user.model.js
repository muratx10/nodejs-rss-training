const uuid = require('uuid').v4;

/**
 * @typedef IUserWithoutPassword
 * @property {string} id - ID of the user
 * @property {string} login - LOGIN of the user
 * @property {string} name - NAME of the user
 */

/**
 * @typedef {IUserWithoutPassword} IUser
 * @property {string} password - PASSWORD of the user
 */

class User {
  /**
   * @param {IUser} - User information
   */
  constructor({
    id = uuid(),
    login = 'user',
    name = 'USER',
    password = 'P@55w0rd'
  } = {}) {
    /**
     * @property {string} id - ID of user
     */
    this.id = id;
    /**
     * @property {string} login - LOGIN of user
     */
    this.login = login;
    /**
     * @property {string} name - NAME of user
     */
    this.name = name;
    /**
     * @property {string} password - PASSWORD of user
     */
    this.password = password;
  }

  /**
   * @static {function} toResponse -Remove password from User object
   * @param {IUser} user - User object
   * @returns {IUserWithoutPassword}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
