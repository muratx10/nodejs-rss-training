const uuid = require('uuid').v4;

let mockedUsers = [
  {
    id: 'b2d41ba8-a138-4829-8714-4ee6ac11d91e',
    name: 'Murat',
    login: 'muratx10',
    password: 'password'
  },
  {
    id: '97a31d8d-3a9b-4d13-9184-c1c24db1764a',
    name: 'David',
    login: 'david_login',
    password: 'password'
  },
  {
    id: 'bcc8fb44-d5ad-4334-974e-67063540d927',
    name: 'John',
    login: 'john_login',
    password: 'password'
  },
  {
    id: '327734b5-0d25-425e-8854-7ea867d96db2',
    name: 'Michael',
    login: 'michael_login',
    password: 'password'
  }
];

const getAll = async () => mockedUsers;

const getById = async (id) => mockedUsers.find(({ id: userId }) => userId === id);

const create = async (data) => {
  const user = { id: uuid(), ...data }
  await mockedUsers.push(user)

  return user;
};

const updateById = (id, data) => {
  let updatedUser;

  mockedUsers.forEach((user, idx) => {
    if (user.id !== id) return;

    mockedUsers[idx] = { id, ...mockedUsers[idx],...data };
    updatedUser = mockedUsers[idx];
  });

  return updatedUser;
};

const deleteById = (id) => {
  const deletedUser = getById(id);
  mockedUsers = mockedUsers.filter(({id: userId}) => userId !== id);

  return deletedUser;
}

module.exports = { getAll, create, getById, updateById, deleteById };
