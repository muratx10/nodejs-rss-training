const User = require('./user.model');

let users = [
  new User({name: 'User1'}),
  new User({name: 'User2'}),
];

const getAll = async () => users;

const getById = async (id) => users
  .find(({ id: userId }) => userId === id);

const create = async (data) => {
  const user = new User({...data})
  await users.push(user)

  return user;
};

const updateById = (id, data) => {
  let updatedUser;

  users.forEach((user, idx) => {
    if (user.id !== id) return;

    users[idx] = { id, ...users[idx],...data };
    updatedUser = users[idx];
  });

  return updatedUser;
};

const deleteById = (id) => {
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
