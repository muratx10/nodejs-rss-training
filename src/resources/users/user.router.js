const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);

  res.type('application/json')
  res.statusCode = 201;
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    res.statusCode = 404;
    return res.end();
  }

  res.type('application/json');
  res.statusCode = 200;
  res.json(User.toResponse(user));
  return res.end();
});

router.route('/:id').put(async (req, res) => {
  const { body, params: { id } } = req;
  const updatedUser = await usersService.updateById(id, body);

  res.statusCode = 200;
  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  const { params: { id } } = req;
  const deletedUser = await usersService.deleteById(id);

  res.statusCode = 204;
  res.json(User.toResponse(deletedUser));
});

module.exports = router;
