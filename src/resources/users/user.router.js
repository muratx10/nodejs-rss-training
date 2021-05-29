/**
 * @module UsersRouter
 */

const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

/**
 * @name GET_ALL_USERS
 * @memberOf module:UsersRouter
 * @function
 * @route {GET} /users/
 * @returns {IUser[]|Array} Array of user objects or empty array
 */
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

/**
 * @name CREATE_USER
 * @memberOf module:UsersRouter
 * @function
 * @route {POST} /users/
 * @returns {IUser} created user
 */
router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);

  res.statusCode = 201;
  res.json(User.toResponse(user));
});

/**
 * @name GET_USER_BY_ID
 * @memberOf module:UsersRouter
 * @function
 * @route {GET} /users/:id
 * @returns {IUser|string} User object or string if not found
 */
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  res.statusCode = 200;
  res.json(User.toResponse(user));
});

/**
 * @name UPDATE_USER_BY_ID
 * @memberOf module:UsersRouter
 * @function
 * @route {PUT} /users/:id
 * @returns {IUser|string} updated user or string if not found
 */
router.route('/:id').put(async (req, res) => {
  const { body, params: { id } } = req;
  const updatedUser = await usersService.updateById(id, body);

  if (!updatedUser) {
    res.status(404).send('User not found');
    return;
  }

  res.statusCode = 200;
  res.json(User.toResponse(updatedUser));
});

/**
 * @name DELETE_USER_BY_ID
 * @memberOf module:UsersRouter
 * @function
 * @route {DELETE} /users/:id
 * @returns {IUser|string} deleted user or string if not found
 */
router.route('/:id').delete(async (req, res) => {
  const { params: { id } } = req;
  const deletedUser = await usersService.deleteById(id);

  if (!deletedUser) {
    res.status(404).send('User not found');
    return;
  }

  res.statusCode = 204;
  res.json(User.toResponse(deletedUser));
});

module.exports = router;
