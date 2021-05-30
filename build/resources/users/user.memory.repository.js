import User from './user.model';
let users = [
    new User({ name: 'User1' }),
    new User({ name: 'User2' }),
];
export const getAll = async () => users;
export const getById = async (id) => users
    .find(({ id: userId }) => userId === id);
export const create = async (data) => {
    const user = new User({ ...data });
    await users.push(user);
    return user;
};
export const updateById = async (id, data) => {
    let updatedUser;
    users.forEach((user, idx) => {
        if (user.id !== id)
            return;
        users[idx] = { ...users[idx], ...data };
        updatedUser = users[idx];
    });
    return updatedUser;
};
export const deleteById = async (id) => {
    const deletedUser = getById(id);
    users = users.filter(({ id: userId }) => userId !== id);
    return deletedUser;
};
//# sourceMappingURL=user.memory.repository.js.map