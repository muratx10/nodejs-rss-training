import User from './user.model';
import { notFoundError } from '../../constants';
const users = [
    new User({ name: 'User1' }),
    new User({ name: 'User2' }),
];
export const getAll = async () => users;
export const getById = async (id) => {
    if (!users[id])
        throw new Error(notFoundError);
    return users[id];
};
export const create = async (user) => {
    users[user.id] = user;
    return users[user.id];
};
export const updateById = async (id, data) => {
    if (!users[id])
        throw new Error(notFoundError);
    users[id] = { ...users[id], ...data };
    return users[id];
};
export const deleteById = async (id) => {
    if (!users[id])
        throw new Error(notFoundError);
    const deletedUser = users[id];
    delete users[id];
    return deletedUser;
};
//# sourceMappingURL=user.memory.repository.js.map