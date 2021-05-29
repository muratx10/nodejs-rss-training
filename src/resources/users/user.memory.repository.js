const User = require('./user.model');

/**
 * @module UsersRepo
 */

let users = [
  new User({name: 'User1'}),
  new User({name: 'User2'}),
];

/**
 * @memberOf module:UsersRepo
 * @returns {Promise<IUser[]>}
 */
const getAll = async () => users;

/**
 * @memberOf module:UsersRepo
 * @param {string} id - ID of user
 * @returns {Promise<IUserWithoutPassword>}
 */
const getById = async (id) => users
  .find(({ id: userId }) => userId === id);


/**
 * @memberOf module:UsersRepo
 * @param {IUser} data - New user's data
 * @returns {Promise<IUserWithoutPassword>}
 */
const create = async (data) => {
  const user = new User({...data})
  await users.push(user)

  return user;
};

/**
 * @memberOf module:UsersRepo
 * @param {string} id - ID of the user that needs to be updated
 * @param {Partial<IUser>} data - Optional user properties to update
 * @returns {Promise<IUserWithoutPassword>} updated user
 */
const updateById = async (id, data) => {
  let updatedUser;

  users.forEach((user, idx) => {
    if (user.id !== id) return;

    users[idx] = { id, ...users[idx],...data };
    updatedUser = users[idx];
  });

  return updatedUser;
};

/**
 * @memberOf module:UsersRepo
 * @param {string} id - ID of user to delete
 * @returns {Promise<IUserWithoutPassword>} deleted user
 */
const deleteById = async (id) => {
  const deletedUser = getById(id);
  users = users.filter(({id: userId}) => userId !== id);

  return deletedUser;
}

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
